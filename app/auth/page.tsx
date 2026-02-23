/* eslint-disable @typescript-eslint/no-explicit-any */
// app/auth/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/nav";
import AnimatedButton from "../components/button";

// API URL - adjust based on your environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
  }, [searchParams]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const syncUserWithBackend = async (firebaseUser: any) => {
    try {
      const firebaseToken = await firebaseUser.getIdToken();

      const response = await fetch(`${API_URL}/auth/firebase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with backend");
      }

      const data = await response.json();

      console.log("Backend response:", data);

      // Store in localStorage for client-side use
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Set cookies for server-side access
      try {
        const cookieResponse = await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: data.token,
            user: data.user,
          }),
        });

        if (!cookieResponse.ok) {
          console.warn("Failed to set cookies, but authentication succeeded");
        }
      } catch (cookieError) {
        // Don't fail the whole login if cookies fail - user can still use the app
        console.warn(
          "Cookie setting failed, but user is authenticated:",
          cookieError,
        );
      }

      return data;
    } catch (error) {
      console.error("Backend sync error:", error);
      throw error;
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
      }

      // Sync with backend
      await syncUserWithBackend(userCredential.user);

      router.push("/dashboard");
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please sign in instead.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please use a stronger password.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        default:
          setError(
            error.message || `Failed to ${isLogin ? "login" : "sign up"}`,
          );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
                setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);


  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      // Sync with backend
      await syncUserWithBackend(result.user);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google auth error:", error);
      setError(error.message || "Failed to authenticate with Google");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingUser = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await syncUserWithBackend(user);
          router.push("/dashboard");
        } catch (error) {
          console.error("Error syncing existing user:", error);
        }
      }
    };

    checkExistingUser();
  }, [router]);

  return (
    <>
      <section
        ref={containerRef}
        className="bg-gray-800 relative min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 mt-6 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="fixed inset-0 z-0">
          {/* Mobile Background */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              backgroundImage: "url('/fabric-logo-1.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Large Screen Background */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: "url('/fabric-logo-2.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Background shapes */}
        <div
          className="absolute top-[5%] left-[2%] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-full bg-[#a50044] opacity-50 sm:opacity-50 animate-float-1 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:opacity-70 cursor-pointer shadow-lg shadow-pink-500/30"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px) scale(${1 + Math.sin(Date.now() / 3000) * 0.1})`,
          }}
        />

        <div
          className="absolute top-[8%] right-[2%] w-28 h-28 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 rounded-full bg-[#004d98] opacity-50 sm:opacity-50 animate-float-2 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:opacity-70 cursor-pointer shadow-lg shadow-blue-500/30"
          style={{
            transform: `translate(${mousePosition.x * -0.07}px, ${mousePosition.y * -0.07}px) rotate(${mousePosition.x * 0.1}deg)`,
          }}
        />

        <div
          className="absolute bottom-[8%] left-[5%] w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 xl:w-48 xl:h-48 bg-[#a50044] opacity-45 sm:opacity-45 animate-float-3 transition-all duration-200 hover:scale-105 sm:hover:scale-110 hover:opacity-65 cursor-pointer shadow-lg shadow-pink-500/20"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotate(${mousePosition.x * 0.08}deg)`,
          }}
        />

        <div
          className="absolute top-[35%] right-[3%] w-20 h-20 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 bg-[#004d98] opacity-45 sm:opacity-45 animate-float-4 transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:opacity-65 cursor-pointer shadow-lg shadow-blue-500/20"
          style={{
            transform: `translate(${mousePosition.x * -0.06}px, ${mousePosition.y * 0.06}px) rotate(${mousePosition.y * 0.05}deg)`,
          }}
        />

        <div
          className="absolute top-[18%] left-[70%] w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#a50044] opacity-50 animate-float-3 transition-all duration-300 hover:scale-125 cursor-pointer shadow-md shadow-pink-500/40"
          style={{
            transform: `translate(${mousePosition.x * 0.065}px, ${mousePosition.y * -0.065}px)`,
          }}
        />

        <div
          className="absolute bottom-[25%] right-[15%] w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#004d98] opacity-50 animate-float-4 transition-all duration-300 hover:scale-125 cursor-pointer shadow-md shadow-blue-500/40"
          style={{
            transform: `translate(${mousePosition.x * -0.075}px, ${mousePosition.y * 0.075}px)`,
          }}
        />

        <div
          className="absolute top-[65%] right-[8%] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#a50044] opacity-45 animate-float-1 transition-all duration-200 hover:rotate-45 cursor-pointer shadow-md shadow-pink-500/30"
          style={{
            transform: `translate(${mousePosition.x * 0.045}px, ${mousePosition.y * 0.045}px) rotate(${mousePosition.x * 0.06}deg)`,
          }}
        />

        <div
          className="absolute bottom-[12%] left-[30%] w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 bg-[#004d98] opacity-45 animate-float-2 transition-all duration-200 hover:rotate-45 cursor-pointer shadow-md shadow-blue-500/30"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px) rotate(${-mousePosition.y * 0.06}deg)`,
          }}
        />

        <div
          className="absolute top-[55%] left-[10%] w-24 h-10 sm:w-48 sm:h-16 md:w-56 md:h-32 lg:w-64 lg:h-40 xl:w-72 xl:h-44 bg-[#a50044] opacity-40 sm:opacity-35 animate-float-2 transition-all duration-200 hover:scale-105 hover:opacity-55 cursor-pointer shadow-lg shadow-pink-500/20"
          style={{
            transform: `translate(${mousePosition.x * 0.035}px, ${mousePosition.y * -0.035}px) skewX(${mousePosition.x * 0.02}deg)`,
          }}
        />

        <div
          className="hidden sm:block absolute top-[28%] left-[60%] md:left-[55%] w-12 h-28 sm:w-14 sm:h-44 md:w-64 md:h-72 lg:w-80 lg:h-90 xl:w-96 xl:h-96 bg-[#004d98] opacity-40 sm:opacity-35 animate-float-1 transition-all duration-200 hover:scale-105 hover:opacity-55 cursor-pointer shadow-lg shadow-blue-500/20"
          style={{
            transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * 0.07}px) skewY(${mousePosition.y * 0.02}deg)`,
          }}
        />

        {/* Main Container */}
        <div className="relative w-full max-w-[95%] xs:max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto z-10">
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl blur-sm opacity-60 animate-pulse-slow"></div>

          <div
            className="relative p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 text-white rounded-xl sm:rounded-2xl border border-white/30 bg-black/30 transition-all duration-300 hover:border-white/50 hover:shadow-2xl hover:shadow-pink-500/30"
            style={{ backdropFilter: "blur(1px)" }}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16 items-center lg:items-start">
              {/* Left side – Welcome Section */}
              <div className="hidden lg:flex lg:flex-1 flex-col justify-center text-left space-y-8 xl:space-y-10 pr-8 xl:pr-12">
                <div className="pt-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-2xl"></div>
                  <Image
                    src="/texture-wood.png"
                    alt="Premium authentication"
                    width={150}
                    height={150}
                    className="w-full max-w-lg object-contain rounded-2xl opacity-80 hover:opacity-100 transition-opacity duration-500"
                    priority
                  />
                </div>

                <div className="space-y-3">
                  <h1 className="font-bold leading-[1.1] text-4xl xl:text-5xl 2xl:text-6xl bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                    KARIBU
                  </h1>
                  <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 backdrop-blur-sm text-white rounded-xl text-sm xl:text-base animate-shake max-w-lg shadow-lg shadow-red-500/10">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - Auth form */}
              <div className="w-full lg:flex-1 lg:max-w-md xl:max-w-lg text-center">
                {/* Mobile/Tablet title */}
                <div className="lg:hidden mb-6 sm:mb-8">
                  <Image
                    src="/texture-wood.png"
                    alt="Premium authentication"
                    width={150}
                    height={150}
                    className="w-full max-w-lg object-contain rounded-2xl opacity-80 hover:opacity-100 transition-opacity duration-500"
                    priority
                  />
                  <div className="inline-block relative">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight bg-white bg-clip-text text-transparent animate-gradient">
                      {isLogin ? "KARIBU" : "Create Account"}
                    </h1>
                    <div className="h-1 w-16 mx-auto bg-linear-to-r from-pink-900 to-blue-900 rounded-full animate-pulse"></div>
                  </div>

                  <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mt-3 font-light">
                    {isLogin
                      ? "Sign in to continue your journey"
                      : "Join thousands of users today"}
                  </p>
                </div>

                {/* Mobile error display */}
                {error && (
                  <div className="lg:hidden mb-4 xs:mb-5 p-3 xs:p-4 bg-red-500/20 border-2 border-red-500/50 text-white rounded-xl text-xs sm:text-sm md:text-base animate-shake shadow-lg shadow-red-500/20">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-red-400 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="flex-1">{error}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Google Button */}
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                      className="relative w-full flex items-center justify-center gap-3 sm:gap-4 p-4 xs:p-5 sm:p-6 text-base xs:text-lg sm:text-xl md:text-2xl bg-white/15 border-2 border-white/50 rounded-xl text-white hover:bg-white/25 hover:border-white/70 transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95 font-semibold shadow-xl hover:shadow-2xl hover:shadow-blue-500/30"
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={28}
                        height={28}
                        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8"
                      />
                      <span className="bg-linear-to-r from-white to-white/90 bg-clip-text text-transparent">
                        {isLogin
                          ? "Continue with Google"
                          : "Sign up with Google"}
                      </span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative my-4 xs:my-5 sm:my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm md:text-base">
                      <span className="px-3 bg-linear-to-r from-gray-800 via-gray-900 to-gray-800 text-white/60 font-medium">
                        or continue with email
                      </span>
                    </div>
                  </div>

                  {/* Email Form */}
                  <form
                    onSubmit={handleEmailAuth}
                    className="space-y-3 xs:space-y-4 sm:space-y-5"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="relative w-full text-sm xs:text-base sm:text-lg md:text-xl px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 md:py-5 bg-white/10 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 font-light"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="relative w-full text-sm xs:text-base sm:text-lg md:text-xl px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 md:py-5 bg-white/10 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 font-light"
                        required
                      />
                    </div>

                    {!isLogin && (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <input
                          type="password"
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="relative w-full text-sm xs:text-base sm:text-lg md:text-xl px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 md:py-5 bg-white/10 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 font-light"
                          required
                        />
                      </div>
                    )}

                    <div className="relative mt-4 xs:mt-5 sm:mt-6">
                      <AnimatedButton
                        type="submit"
                        disabled={loading}
                        ariaLabel={isLogin ? "Sign in" : "Create account"}
                        color="#a50044"
                        className="
                          w-full bg-blue-900/80
                          text-sm xs:text-base sm:text-lg md:text-xl
                          py-2.5 xs:py-3 sm:py-4
                          rounded-lg
                          font-medium
                          hover:scale-105 active:scale-95
                          shadow-lg hover:shadow-xl hover:shadow-pink-900/40
                          border border-white/20
                        "
                      >
                        {loading
                          ? isLogin
                            ? "Signing in..."
                            : "Creating account..."
                          : isLogin
                            ? "Sign in with Email"
                            : "Create account with Email"}
                      </AnimatedButton>
                    </div>
                  </form>

                  {isLogin && (
                    <a
                      href="/forgot-password"
                      className="text-xs sm:text-sm md:text-base text-white/70 hover:text-pink-400 transition block mt-2 xs:mt-3 sm:mt-4 font-medium"
                    >
                      Forgot your password?
                    </a>
                  )}

                  {/* Legal Agreement Text - Added Here */}
                  <div className="mt-6 pt-4 border-t border-white/20 text-center">
                    <p className="text-xs text-white/60">
                      By {isLogin ? "signing in" : "creating an account"}, you agree to our{" "}
                      <Link 
                        href="/terms-of-service" 
                        className="text-pink-400 hover:text-pink-300 underline transition-colors"
                        target="_blank"
                      >
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link 
                        href="/privacy-policy" 
                        className="text-pink-400 hover:text-pink-300 underline transition-colors"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link 
                        href="/cookie-policy" 
                        className="text-pink-400 hover:text-pink-300 underline transition-colors"
                        target="_blank"
                      >
                        Cookie Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <p className="mt-5 xs:mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-white/90">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={toggleMode}
                    className="font-bold text-transparent bg-linear-to-r from-pink-400 to-blue-400 bg-clip-text hover:from-pink-300 hover:to-blue-300 transition-all duration-300 underline"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.6;
            }
            50% {
              opacity: 0.8;
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          @keyframes gradient {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }

          .animate-float-1 {
            animation: float-1 15s ease-in-out infinite;
          }

          .animate-float-2 {
            animation: float-2 13s ease-in-out infinite;
            animation-delay: 1.5s;
          }

          .animate-float-3 {
            animation: float-3 17s ease-in-out infinite;
            animation-delay: 3s;
          }

          .animate-float-4 {
            animation: float-4 19s ease-in-out infinite;
            animation-delay: 2.5s;
          }

          @keyframes float-1 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(30px, -25px) scale(1.05);
            }
            50% {
              transform: translate(15px, -40px) scale(0.95);
            }
            75% {
              transform: translate(-20px, -15px) scale(1.02);
            }
          }

          @keyframes float-2 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 30px) scale(1.08);
            }
            66% {
              transform: translate(-15px, -20px) scale(0.92);
            }
          }

          @keyframes float-3 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            20% {
              transform: translate(25px, 15px) rotate(45deg);
            }
            50% {
              transform: translate(30px, 30px) rotate(90deg);
            }
            80% {
              transform: translate(15px, 25px) rotate(135deg);
            }
          }

          @keyframes float-4 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            30% {
              transform: translate(20px, -35px) scale(1.1);
            }
            60% {
              transform: translate(-25px, -20px) scale(0.9);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>
      </section>
    </>
  );
}