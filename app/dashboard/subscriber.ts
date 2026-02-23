// lib/subscriber.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export type SubscriptionStatus = "active" | "UNSUBSCRIBED";

export interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  unsubscribedAt?: string;
  resubscribedAt?: string;
}

interface SubscribePayload {
  email: string;
  name?: string;
}

interface EmailPayload {
  email: string;
}

// 📋 Get all subscribers (with optional status filter)
export async function getAllSubscribers(status?: SubscriptionStatus): Promise<Subscriber[]> {
  const url = status 
    ? `${API_URL}/subscribers?status=${status}`
    : `${API_URL}/subscribers`;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const error = text ? JSON.parse(text) : null;
      throw new Error(error?.message || "Failed to fetch subscribers");
    } catch {
      throw new Error(`Failed to fetch subscribers: ${res.status} ${res.statusText}`);
    }
  }

  const text = await res.text();
  if (!text) {
    return []; // Return empty array if no subscribers
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse subscribers response:", text);
    throw new Error("Invalid response from server");
  }
}

// 🔔 Subscribe or Re-subscribe
export async function subscribe(
  payload: SubscribePayload,
): Promise<Subscriber> {
  const res = await fetch(`${API_URL}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Check if response has content before trying to parse JSON
    const text = await res.text();
    try {
      const error = text ? JSON.parse(text) : null;
      throw new Error(error?.message || "Failed to subscribe");
    } catch {
      throw new Error(`Failed to subscribe: ${res.status} ${res.statusText}`);
    }
  }

  // Check if response has content before parsing JSON
  const text = await res.text();
  if (!text) {
    throw new Error("Server returned empty response");
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse subscriber response:", text);
    throw new Error("Invalid response from server");
  }
}

// ❌ Unsubscribe
export async function unsubscribe(payload: EmailPayload): Promise<Subscriber> {
  const res = await fetch(`${API_URL}/subscribers`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const error = text ? JSON.parse(text) : null;
      throw new Error(error?.message || "Failed to unsubscribe");
    } catch {
      throw new Error(`Failed to unsubscribe: ${res.status} ${res.statusText}`);
    }
  }

  const text = await res.text();
  if (!text) {
    throw new Error("Server returned empty response");
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse subscriber response:", text);
    throw new Error("Invalid response from server");
  }
}

// 🔎 Find subscriber
export async function findSubscriber(
  payload: EmailPayload,
): Promise<Subscriber | null> {
  const res = await fetch(`${API_URL}/subscribers/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const error = text ? JSON.parse(text) : null;
      throw new Error(error?.message || "Failed to fetch subscriber");
    } catch {
      // If we can't parse error as JSON, use status text
      throw new Error(`Failed to fetch subscriber: ${res.status} ${res.statusText}`);
    }
  }

  // Check if response has content before parsing JSON
  const text = await res.text();
  
  // If response is empty, return null (subscriber not found)
  if (!text) {
    return null;
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse subscriber response:", text);
    throw new Error("Invalid response from server");
  }
}

// ✅ Check if subscriber exists and is active
export async function checkSubscription(email: string): Promise<{
  exists: boolean;
  isActive: boolean;
  subscriber: Subscriber | null;
}> {
  try {
    const subscriber = await findSubscriber({ email });

    if (!subscriber) {
      return {
        exists: false,
        isActive: false,
        subscriber: null,
      };
    }

    return {
      exists: true,
      isActive: subscriber.status === "active",
      subscriber,
    };
  } catch (error) {
    // Log the actual error for debugging
    console.error("Check subscription error:", error);
    throw new Error(`Failed to check subscription: ${error instanceof Error ? error.message : String(error)}`);
  }
}