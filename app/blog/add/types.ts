/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from "lucide-react";

export type BlockIconsType = {
  [key in ContentBlock["type"]]: LucideIcon;
};


export interface ContentBlock {
  type: "heading" | "paragraph" | "image" | "list" | "quote" | "code" | "embed";
  data: any;
  id: string;
  order?: number;
}

export interface Author {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface CreateBlogForm {
  title: string;
  slug: string;
  excerpt?: string;
  content: ContentBlock[];
  coverImage?: string;
  tags: string;
  author: string;
  published: boolean;
  publishedAt?: Date | null;
}

export interface NewAuthorForm {
  name: string;
  avatar: string;
  bio: string;
}

export type ContentMode = "blocks" | "html";
export type ViewMode = "editor" | "preview" | "split";