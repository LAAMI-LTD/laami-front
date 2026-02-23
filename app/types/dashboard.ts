// types/dashboard.ts
export interface BackendUser {
  _id: string;
  firebaseUid?: string;
  name: string;
  email: string;
  role: "regular" | "writer" | "admin";
  avatar?: string;
  bio?: string;
  isActive: boolean;
  lastLoginAt?: string;
  author?: {
    _id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  status: "active" | "UNSUBSCRIBED";
  subscribedAt: string;
  unsubscribedAt?: string;
}

export type SubscriptionStatus = "active" | "inactive" | "not_found" | "checking";
export type ActiveTab = "profile" | "users" | "subscribers";