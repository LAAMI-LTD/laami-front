/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { CreateBlogForm, ContentBlock } from "../types";
import { generateSlug } from "../utils/slugGenerator";
import { BLOCK_TEMPLATES } from "../constants";

export function useBlogForm() {
  const [form, setForm] = useState<CreateBlogForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: [],
    coverImage: "",
    tags: "",
    author: "",
    published: true,
    publishedAt: null,
  });

  useEffect(() => {
    if (form.title && !form.slug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, form.slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      order: form.content.length,
      data: BLOCK_TEMPLATES[type] || {},
    };
    setForm((prev) => ({
      ...prev,
      content: [...prev.content, newBlock],
    }));
  };

  const updateBlock = (index: number, field: string, value: any) => {
    setForm((prev) => {
      const updatedContent = [...prev.content];
      const block = { ...updatedContent[index] };

      if (field.includes(".")) {
        const [first, second] = field.split(".");
        if (first === "data") {
          block.data = { ...block.data, [second]: value };
        }
      } else {
        (block as any)[field] = value;
      }

      updatedContent[index] = block;
      return { ...prev, content: updatedContent };
    });
  };

  const removeBlock = (index: number) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const setBlocks = (blocks: ContentBlock[]) => {
    setForm((prev) => ({ ...prev, content: blocks }));
  };

  const setAuthor = (authorId: string) => {
    setForm((prev) => ({ ...prev, author: authorId }));
  };

  const setPublished = (published: boolean) => {
    setForm((prev) => ({ ...prev, published }));
  };

  const setCoverImage = (url: string) => {
    setForm((prev) => ({ ...prev, coverImage: url }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: [],
      coverImage: "",
      tags: "",
      author: "",
      published: false,
      publishedAt: null,
    });
  };

  // New method to populate form with existing blog data
  // New method to populate form with existing blog data
  const setFormFromBlog = (blogData: {
    title: string;
    slug: string;
    excerpt?: string;
    content: ContentBlock[];
    author: string;
    tags?: string;
    published: boolean;
    coverImage?: string;
    publishedAt?: string | null;
  }) => {
    setForm({
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt || "",
      content: blogData.content.map((block) => ({
        ...block,
        id: block.id || Math.random().toString(36).substring(2, 9),
      })),
      author: blogData.author,
      tags: blogData.tags || "",
      published: blogData.published,
      coverImage: blogData.coverImage || "",
      // Convert string to Date object if it exists, otherwise null
      publishedAt: blogData.publishedAt ? new Date(blogData.publishedAt) : null,
    });
  };

  return {
    form,
    handleChange,
    addBlock,
    updateBlock,
    removeBlock,
    setBlocks,
    setAuthor,
    setPublished,
    setCoverImage,
    setFormFromBlog, // Added this function
    resetForm,
  };
}
