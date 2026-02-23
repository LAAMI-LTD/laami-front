"use client";

import { EditButton } from "./editButton";

interface EditButtonWrapperProps {
  slug: string;
  authorId: string;
}

export function EditButtonWrapper({ slug, authorId }: EditButtonWrapperProps) {
  let canEdit = false;

  try {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);

        const userRole = user?.role?.toLowerCase?.();
        const isAdmin = userRole === "admin";
        const isAuthor = user?.author?._id === authorId;

        canEdit = Boolean(isAdmin || isAuthor);
      }
    }
  } catch (error) {
    console.error("Error checking edit permissions:", error);
  }

  if (!canEdit) return null;

  return <EditButton slug={slug} />;
}
