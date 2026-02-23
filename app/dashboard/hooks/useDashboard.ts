/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useDashboard.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../firebase";
import {
  checkSubscription,
  subscribe,
  unsubscribe,
  getAllSubscribers,
} from "../subscriber";
import { BackendUser, Subscriber, SubscriptionStatus } from "../../types/dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper function to clear cookies
const clearAuthCookies = async () => {
  try {
    await fetch("/api/auth/clear-cookie", {
      method: "POST",
    });
  } catch (error) {
    console.error("Error clearing cookies:", error);
  }
};

export function useDashboard() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [users, setUsers] = useState<BackendUser[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "users" | "subscribers">("profile");
  const [roleUpdateLoading, setRoleUpdateLoading] = useState<string | null>(null);
  const [subscriberActionLoading, setSubscriberActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("checking");

  // Protect route and fetch user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
      } else {
        setFirebaseUser(currentUser);
        await fetchUserData(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Scroll effect for Nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch current user data from backend
  const fetchUserData = async (user: FirebaseUser) => {
    try {
      const token = await user.getIdToken();

      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      setBackendUser(userData);

      await checkUserSubscriptionStatus(user.email!);

      if (userData.role === "admin") {
        await fetchAllUsers(token);
        await fetchAllSubscribers();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Check if current user is subscribed
  const checkUserSubscriptionStatus = async (email: string) => {
    try {
      setSubscriptionStatus("checking");
      const result = await checkSubscription(email);

      if (!result.exists) {
        setSubscriptionStatus("not_found");
      } else if (result.isActive) {
        setSubscriptionStatus("active");
      } else {
        setSubscriptionStatus("inactive");
      }
    } catch (error) {
      console.error("Error checking subscriber status:", error);
      setSubscriptionStatus("not_found");
      setError("Failed to check subscription status");
    }
  };

  // Fetch all users (admin only)
  const fetchAllUsers = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all subscribers (admin only)
  const fetchAllSubscribers = async () => {
    try {
      const data = await getAllSubscribers();
      const transformedData: Subscriber[] = data.map((sub: any) => ({
        _id: sub._id,
        email: sub.email,
        name: sub.name,
        subscribedAt: sub.createdAt,
        unsubscribedAt: sub.unsubscribedAt,
        status: sub.status === "active" ? "active" : "UNSUBSCRIBED",
      }));
      setSubscribers(transformedData);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  // Subscribe current user
  const handleSubscribe = async () => {
    if (!firebaseUser?.email) return;

    setSubscriberActionLoading("subscribe");
    setError("");
    setSuccess("");

    try {
      await subscribe({
        email: firebaseUser.email,
        name: backendUser?.name || firebaseUser.displayName || undefined,
      });

      setSubscriptionStatus("active");
      setSuccess("Successfully subscribed to newsletter!");

      if (backendUser?.role === "admin") {
        await fetchAllSubscribers();
      }
    } catch (error: any) {
      console.error("Failed to subscribe:", error);

      if (
        error.message?.includes("already exists") ||
        error.message?.includes("already subscribed")
      ) {
        setSubscriptionStatus("active");
        setError("You are already subscribed!");
      } else {
        setError(error.message || "Failed to subscribe");
      }
    } finally {
      setSubscriberActionLoading(null);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  // Unsubscribe current user
  const handleUnsubscribe = async () => {
    if (!firebaseUser?.email) return;

    setSubscriberActionLoading("unsubscribe");
    setError("");
    setSuccess("");

    try {
      await unsubscribe({ email: firebaseUser.email });

      setSubscriptionStatus("inactive");
      setSuccess("Successfully unsubscribed from newsletter");

      if (backendUser?.role === "admin") {
        await fetchAllSubscribers();
      }
    } catch (error: any) {
      console.error("Failed to unsubscribe:", error);
      setError(error.message || "Failed to unsubscribe");
    } finally {
      setSubscriberActionLoading(null);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: string, authorId?: string) => {
    setRoleUpdateLoading(userId);
    setError("");
    setSuccess("");

    try {
      const token = await firebaseUser?.getIdToken();

      const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: newRole,
          authorId: authorId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const updatedUser = await response.json();

      setUsers(users.map((u) => (u._id === userId ? updatedUser : u)));

      if (backendUser?._id === userId) {
        setBackendUser(updatedUser);
      }

      setSuccess(`Role updated to ${newRole} successfully`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setError(error.message || "Failed to update role");
    } finally {
      setRoleUpdateLoading(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    await clearAuthCookies();
    router.push("/");
    router.refresh(); // Force refresh to update server components
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-pink-900 text-white";
      case "writer":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" ? "bg-green-800 text-white" : "bg-red-600 text-white";
  };

  const canSubscribe = () => {
    return subscriptionStatus === "not_found" || subscriptionStatus === "inactive";
  };

  const isSubscribed = () => {
    return subscriptionStatus === "active";
  };

  return {
    // State
    firebaseUser,
    backendUser,
    users,
    subscribers,
    loading,
    scrolled,
    activeTab,
    roleUpdateLoading,
    subscriberActionLoading,
    error,
    success,
    subscriptionStatus,
    
    // Actions
    setActiveTab,
    handleLogout,
    handleSubscribe,
    handleUnsubscribe,
    updateUserRole,
    
    // Helpers
    getRoleBadgeColor,
    getStatusBadgeColor,
    canSubscribe,
    isSubscribed,
  };
}