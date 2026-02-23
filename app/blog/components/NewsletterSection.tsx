/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  checkSubscription,
  subscribe,
  unsubscribe,
} from "../../dashboard/subscriber";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

interface SubscriptionStatusProps {
  email?: string | null;
}

type StatusState = "loading" | "not_found" | "active" | "inactive" | "error";

export default function SubscriptionStatus({
  email: propEmail,
}: SubscriptionStatusProps) {
  const [user, setUser] = useState<any>(null);
  const [backendUser, setBackendUser] = useState<any>(null);
  const [status, setStatus] = useState<StatusState>("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setErrorMessage(null);

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setBackendUser(data);
          }
        } catch (error) {
          console.error("Error fetching backend user:", error);
        }
      } else {
        setBackendUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const effectiveEmail = propEmail || user?.email || null;

  useEffect(() => {
    if (!effectiveEmail) {
      setStatus("not_found");
      return;
    }

    let mounted = true;

    async function verify() {
      try {
        setStatus("loading");
        setErrorMessage(null);
        const result = await checkSubscription(effectiveEmail);
        if (!mounted) return;
        if (!result.exists) setStatus("not_found");
        else if (result.isActive) setStatus("active");
        else setStatus("inactive");
      } catch (error) {
        console.error("Subscription check failed:", error);
        if (mounted) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to check subscription status",
          );
        }
      }
    }

    verify();
    return () => {
      mounted = false;
    };
  }, [effectiveEmail]);

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (user) {
        await subscribe({
          email: user.email!,
          name: user.displayName || backendUser?.name || undefined,
        });
      } else {
        if (!formData.email) {
          setErrorMessage("Please enter your email");
          setIsSubmitting(false);
          return;
        }
        await subscribe(formData);
      }
      setStatus("active");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!effectiveEmail) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await unsubscribe({ email: effectiveEmail });
      setStatus("inactive");
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to unsubscribe. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setErrorMessage("Failed to sign in with Google. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  // Tailwind classes for consistent styling
  const containerClasses =
    "relative bg-[#F7F5F0] p-7 overflow-hidden w-full min-w-[280px] font-sans before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#A50044] before:to-[#004D98] after:content-['NEWSLETTER'] after:absolute after:bottom-[-12px] after:right-[-8px] after:font-['Bebas_Neue'] after:text-[72px] after:leading-none after:text-[#004D98]/10 after:tracking-wider after:pointer-events-none";

  const labelClasses =
    "font-['Bebas_Neue'] text-2xl tracking-wider text-[#0A0A0A] mb-1 leading-tight";

  const sublabelClasses =
    "text-lg font-light text-[#5A5A5A] mb-5 tracking-wide";

  const errorClasses =
    "bg-[#A50044]/10 border-l-3 border-[#A50044] p-2 text-lg text-[#A50044] mb-4 rounded-r";

  const inputClasses =
    "w-full p-3 font-normal bg-white border border-[#E0DDD8] rounded-sm outline-none text-[#0A0A0A] placeholder:text-[#B0ADA8] focus:border-[#004D98] disabled:opacity-50 disabled:bg-[#F0EEE9]";

  const primaryButtonClasses =
    "w-full py-3 px-4 font-['Bebas_Neue'] text-base tracking-wider text-white bg-[#004D98] rounded-sm cursor-pointer transition-colors hover:bg-[#003A72] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

  const secondaryButtonClasses =
    "w-full py-2.5 px-4  font-medium text-[#0A0A0A] bg-white border border-[#E0DDD8] rounded-sm cursor-pointer flex items-center justify-center gap-2 transition-colors hover:border-[#004D98] hover:bg-[#004D98]/10 disabled:opacity-50 disabled:cursor-not-allowed";

  const dividerClasses = "flex items-center gap-2.5 my-4";

  const dividerLineClasses = "flex-1 h-px bg-[#E0DDD8]";

  const dividerTextClasses =
    "font-light text-[#B0ADA8] tracking-wider uppercase";

  const statusPillClasses =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-lg font-medium tracking-wide mb-3 before:w-1.5 before:h-1.5 before:rounded-full before:bg-current";

  const emailTagClasses =
    "font-light text-[#5A5A5A] mb-4 flex items-center gap-1";

  const emailTagStrongClasses = "font-medium text-[#0A0A0A]";

  const dangerButtonClasses =
    "text-lg font-medium text-[#A50044] bg-none border-none cursor-pointer p-0 tracking-wide underline underline-offset-3 decoration-1 opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed";

  const spinnerClasses =
    "inline-block w-3 h-3 border-2 border-[#E0DDD8] border-t-[#004D98] rounded-full animate-spin mr-1.5 align-middle";

  const actionsClasses = "flex flex-col gap-2";

  if (!user) {
    return (
      <div className={containerClasses}>
        {status === "active" ? (
          <>
            <div className={labelClasses}>You&apos;re In</div>
            <div className={sublabelClasses}>Your subscription is active</div>
            {errorMessage && <div className={errorClasses}>{errorMessage}</div>}
            <div
              className={`${statusPillClasses} before:bg-[#A50044] text-[#A50044] bg-[#A50044]/10`}
            >
              Subscribed
            </div>
            <button
              onClick={handleUnsubscribe}
              disabled={isSubmitting}
              className={dangerButtonClasses}
            >
              {isSubmitting ? "Processing..." : "Unsubscribe"}
            </button>
          </>
        ) : (
          <>
            <div className={labelClasses}>Stay in the Loop</div>
            <div className={sublabelClasses}>
              Get updates delivered to your inbox
            </div>
            {errorMessage && <div className={errorClasses}>{errorMessage}</div>}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 mb-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Name (optional)"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClasses}
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClasses}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={primaryButtonClasses}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
            <div className={dividerClasses}>
              <div className={dividerLineClasses} />
              <span className={dividerTextClasses}>or</span>
              <div className={dividerLineClasses} />
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className={secondaryButtonClasses}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {status === "loading" && (
        <>
          <div className={labelClasses}>Newsletter</div>
          <div className={sublabelClasses}>
            <span className={spinnerClasses} />
            Checking your status...
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className={labelClasses}>Newsletter</div>
          <div className={errorClasses}>
            {errorMessage || "Unable to check subscription status."}
          </div>
        </>
      )}

      {(status === "not_found" || status === "inactive") && (
        <>
          <div className={labelClasses}>
            {status === "inactive" ? "Come Back" : "Join Us"}
          </div>
          <div className={sublabelClasses}>
            {status === "inactive"
              ? "You've been missed."
              : "Get updates in your inbox."}
          </div>
          {errorMessage && <div className={errorClasses}>{errorMessage}</div>}
          {status === "inactive" && (
            <div
              className={`${statusPillClasses} before:bg-[#5A5A5A] text-[#5A5A5A] bg-black/5`}
            >
              Unsubscribed
            </div>
          )}
          <div className={emailTagClasses}>
            As <strong className={emailTagStrongClasses}>{user.email}</strong>
            {backendUser?.name && <span> · {backendUser.name}</span>}
          </div>
          <div className={actionsClasses}>
            <button
              onClick={() => handleSubscribe()}
              disabled={isSubmitting}
              className={primaryButtonClasses}
            >
              {isSubmitting
                ? status === "inactive"
                  ? "Resubscribing..."
                  : "Subscribing..."
                : status === "inactive"
                  ? "Resubscribe"
                  : "Subscribe Now"}
            </button>
          </div>
        </>
      )}

      {status === "active" && (
        <>
          <div className={labelClasses}>You&apos;re In</div>
          <div className={sublabelClasses}>Your subscription is active</div>
          {errorMessage && <div className={errorClasses}>{errorMessage}</div>}
          <div
            className={`${statusPillClasses} before:bg-[#A50044] text-[#A50044] bg-[#A50044]/10`}
          >
            Subscribed
          </div>
          <div className={emailTagClasses}>
            As <strong className={emailTagStrongClasses}>{user.email}</strong>
          </div>
          <button
            onClick={handleUnsubscribe}
            disabled={isSubmitting}
            className={dangerButtonClasses}
          >
            {isSubmitting ? "Processing..." : "Unsubscribe"}
          </button>
        </>
      )}
    </div>
  );
}
