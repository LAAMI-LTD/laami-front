"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bookmark, ImageOff, ArrowLeft } from "lucide-react";
import { Blog } from "../types/blog.types";
import {
  formatDate,
  getFirstParagraph,
  calculateReadTime,
  getLongerParagraph,
} from "../utils/blog.utils";
import { useState } from "react";

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGridBentoEnhanced({ blogs }: BlogGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Take first 10 blogs for the bento grid
  const displayBlogs = blogs.slice(0, 10);

  // Handle image error
  const handleImageError = (slug: string) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // Layout for 10 cards in a 3-column grid
  const getCardLayout = (index: number) => {
    const layouts = [
      { span: "md:col-span-2 md:row-span-2", size: "featured" }, // 0
      { span: "md:col-span-1 md:row-span-1", size: "sports" }, // 1
      { span: "md:col-span-1 md:row-span-2", size: "tall" }, // 2
      { span: "md:col-span-1 md:row-span-1", size: "square" }, // 3
      { span: "md:col-span-1 md:row-span-1", size: "square" }, // 4 - Sports card
      { span: "md:col-span-1 md:row-span-1", size: "square" }, // 5
      { span: "md:col-span-1 md:row-span-1", size: "square" }, // 6
      { span: "md:col-span-1 md:row-span-1", size: "sports" }, // 7
      { span: "md:col-span-2 md:row-span-1", size: "wide" }, // 8
      { span: "md:col-span-1 md:row-span-1", size: "square" }, // 9
    ];
    return layouts[index] || layouts[1];
  };

  // Background colors for the cards (alternating)
  const getCardColor = (index: number) => {
    const colors = [
      "from-[#004d98] to-[#004d98]",
      "from-[#a50044] to-[#a50044]",
      "from-[#004d98] to-[#004d98]",
      "from-[#a50044] to-[#a50044]",
      "from-[#004d98] to-[#004d98]",
      "from-[#a50044] to-[#a50044]",
      "from-[#004d98] to-[#004d98]",
      "from-[#a50044] to-[#a50044]",
      "from-[#004d98] to-[#004d98]",
      "from-[#a50044] to-[#a50044]",
    ];
    return colors[index] || colors[0];
  };

  // Get solid color for hover state
  const getSolidColor = (index: number) => {
    const colors = [
      "bg-[#004d98]",
      "bg-[#a50044]",
      "bg-[#004d98]",
      "bg-[#a50044]",
      "bg-[#004d98]",
      "bg-[#a50044]",
      "bg-[#004d98]",
      "bg-[#a50044]",
      "bg-[#004d98]",
      "bg-[#a50044]",
    ];
    return colors[index] || colors[0];
  };

  // Get pattern background for cards with missing images
  const getPatternStyle = (index: number) => {
    const patterns = [
      "radial-gradient(circle at 30px 30px, rgba(255,255,255,0.1) 2px, transparent 2px)",
      "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%)",
    ];
    return {
      backgroundImage: patterns[index % patterns.length],
      backgroundSize: index % 2 === 0 ? "60px 60px" : "40px 40px",
    };
  };

  const renderFeaturedCard = (blog: Blog, index: number, gradient: string) => {
    const isHovered = hoveredCard === blog.slug;
    const solidColor = getSolidColor(index);
    const hasImageError = imageErrors[blog.slug];

    return (
      <div
        className={`relative h-full overflow-hidden group rounded-sm bg-gradient-to-b ${gradient}`}
      >
        {/* Cover Image or Fallback */}
        {blog.coverImage && !hasImageError ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 66vw"
            onError={() => handleImageError(blog.slug)}
          />
        ) : (
          <div className="absolute inset-0" style={getPatternStyle(index)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-white/30" />
            </div>
          </div>
        )}

        {/* Content Overlay - Transitions from gradient to solid */}
        <div
          className={`absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 ease-in-out ${
            isHovered
              ? solidColor
              : `bg-gradient-to-t from-[${index % 2 === 0 ? "#004d98" : "#a50044"}] via-[${index % 2 === 0 ? "#004d98" : "#a50044"}]/40 to-transparent`
          }`}
        >
          <div className="absolute top-8 left-8 right-8 flex items-start justify-between">
            <span className="px-4 py-1.5 bg-white/90 text-black text-sm font-semibold font-['Roboto'] rounded-full">
              ✦ Featured
            </span>
            <button className="p-2.5 rounded-full bg-black/20 border border-white/20 hover:bg-white/20 transition-colors">
              <Bookmark className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white text-xs font-medium font-['Roboto'] rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white font-['Roboto']">
                {calculateReadTime(blog.content)} mins read time
                <br />
                {blog.author.name} • {formatDate(blog.createdAt)}
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-['Roboto'] leading-tight line-clamp-2">
              {blog.title}
            </h3>

            {/* Hide on mobile */}
            <p className="hidden md:block text-base text-white/80 font-['Roboto'] line-clamp-2">
              {getLongerParagraph(blog)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSportsCard = (blog: Blog, index: number, gradient: string) => {
    const isHovered = hoveredCard === blog.slug;
    const solidColor = getSolidColor(index);
    const hasImageError = imageErrors[blog.slug];

    return (
      <div
        className={`relative h-full overflow-hidden group rounded-sm ${solidColor} transition-all duration-300 hover:shadow-xl ${
          isHovered ? "scale-[1.02]" : ""
        }`}
      >
        <div className="flex flex-col h-full ">
          {/* Image - Not in background, separate container */}
          <div className="relative w-full h-36 mb-4 rounded-sm overflow-hidden">
            {blog.coverImage && !hasImageError ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
                onError={() => handleImageError(blog.slug)}
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-white/30" />
              </div>
            )}

            {/* Optional overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1 px-2 pb-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white font-['Roboto']">
                {calculateReadTime(blog.content)} mins read time
                <br />
                {blog.author.name} • {formatDate(blog.createdAt)}
              </p>
            </div>

            <h3 className="text-white text-lg font-bold font-['Roboto'] line-clamp-2 leading-snug">
              {blog.title}
            </h3>

            <p className="text-white/70 text-sm font-normal font-['Roboto'] line-clamp-2">
              {getFirstParagraph(blog)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTallCard = (blog: Blog, index: number, gradient: string) => {
    const isHovered = hoveredCard === blog.slug;
    const solidColor = getSolidColor(index);
    const hasImageError = imageErrors[blog.slug];

    return (
      <div
        className={`relative h-full overflow-hidden group rounded-sm bg-linear-to-br ${gradient}`}
      >
        <div className="relative h-full flex flex-col justify-end">
          {/* Cover Image or Fallback */}
          {blog.coverImage && !hasImageError ? (
            <div className="absolute inset-0 rounded-sm overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                onError={() => handleImageError(blog.slug)}
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={getPatternStyle(index + 1)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageOff className="w-10 h-10 text-white/30" />
              </div>
            </div>
          )}

          <div
            className={`relative z-10 px-6 pb-6 pt-4 transition-all duration-500 ease-in-out ${
              isHovered
                ? solidColor
                : `bg-linear-to-t from-[${index % 2 === 0 ? "#004d98" : "#a50044"}] via-[${index % 2 === 0 ? "#004d98" : "#a50044"}]/90 to-[${index % 2 === 0 ? "#004d98" : "#a50044"}]/80`
            }`}
          >
            <span className="inline-block w-fit px-3 py-1 bg-white/10 text-white text-xs font-medium font-['Roboto'] rounded-full border border-white/20 mb-3">
              {blog.tags?.[0] || "Article"}
            </span>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white font-['Roboto']">
                {calculateReadTime(blog.content)} mins read time
                <br />
                {blog.author.name} • {formatDate(blog.createdAt)}
              </p>
            </div>
            <h3 className="text-xl font-bold text-white font-['Roboto'] leading-snug line-clamp-3 mb-3">
              {blog.title}
            </h3>

            {/* Hide on mobile */}
            <p className="hidden md:block text-sm text-white/70 font-['Roboto'] line-clamp-2 mb-4">
              {getFirstParagraph(blog)}
            </p>

            <div
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                isHovered ? "bg-white" : "bg-white/10"
              }`}
            >
              <span
                className={`text-sm font-medium font-['Roboto'] transition-colors duration-300 ${
                  isHovered ? "text-black" : "text-white"
                }`}
              >
                Read Article
              </span>
              <ArrowRight
                className={`w-5 h-5 transition-all duration-300 ${
                  isHovered ? "translate-x-1 text-black" : "text-white"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWideCard = (blog: Blog, index: number, gradient: string) => {
    const isHovered = hoveredCard === blog.slug;
    const solidColor = getSolidColor(index);
    const hasImageError = imageErrors[blog.slug];

    return (
      <div
        className={`relative h-full overflow-hidden group rounded-sm bg-linear-to-br ${gradient}`}
      >
        <div className="relative h-full flex items-end">
          {/* Cover Image or Fallback */}
          {blog.coverImage && !hasImageError ? (
            <div className="absolute inset-0 rounded-sm overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
                onError={() => handleImageError(blog.slug)}
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={getPatternStyle(index + 2)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageOff className="w-12 h-12 text-white/30" />
              </div>
            </div>
          )}

          <div
            className={`relative z-10 w-full p-6 transition-all duration-500 ease-in-out ${
              solidColor
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white font-['Roboto']">
                {calculateReadTime(blog.content)} mins read time
                <br />
                {blog.author.name} • {formatDate(blog.createdAt)}
              </p>
            </div>

            <h3 className="text-xl font-bold text-white font-['Roboto'] leading-snug line-clamp-2 mb-3">
              {blog.title}
            </h3>

            {/* Hide on mobile */}
            <p className="hidden md:block text-sm text-white/70 font-['Roboto'] line-clamp-2 mb-4">
              {getFirstParagraph(blog)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderSquareCard = (blog: Blog, index: number, gradient: string) => {
    const isHovered = hoveredCard === blog.slug;
    const solidColor = getSolidColor(index);
    const hasImageError = imageErrors[blog.slug];

    return (
      <div
        className={`relative h-full overflow-hidden group rounded-sm bg-linear-to-br ${gradient}`}
      >
        {/* Cover Image or Fallback */}
        {blog.coverImage && !hasImageError ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
            onError={() => handleImageError(blog.slug)}
          />
        ) : (
          <div className="absolute inset-0" style={getPatternStyle(index + 3)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageOff className="w-8 h-8 text-white/30" />
            </div>
          </div>
        )}

        <div
          className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ease-in-out ${
            isHovered
              ? solidColor
              : `bg-linear-to-t from-[${index % 2 === 0 ? "#004d98" : "#a50044"}] via-[${index % 2 === 0 ? "#004d98" : "#a50044"}]/40 to-transparent`
          }`}
        >
          <div className="absolute top-6 right-6">
            <button className="p-2 rounded-full bg-black/20 border border-white/20 hover:bg-white/20 transition-colors">
              <Bookmark className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-medium font-['Roboto'] rounded-full border border-white/20">
              {blog.tags?.[0] || "Article"}
            </span>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white font-['Roboto']">
                {calculateReadTime(blog.content)} mins read time
                <br />
                {blog.author.name} • {formatDate(blog.createdAt)}
              </p>
            </div>
            <h3 className="text-lg font-bold text-white font-['Roboto'] leading-snug line-clamp-2">
              {blog.title}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (blog: Blog, index: number) => {
    const layout = getCardLayout(index);
    const gradient = getCardColor(index);

    let content;
    switch (layout.size) {
      case "featured":
        content = renderFeaturedCard(blog, index, gradient);
        break;
      case "tall":
        content = renderTallCard(blog, index, gradient);
        break;
      case "wide":
        content = renderWideCard(blog, index, gradient);
        break;
      case "sports":
        content = renderSportsCard(blog, index, gradient);
        break;
      default:
        content = renderSquareCard(blog, index, gradient);
    }

    return (
      <Link
        key={blog.slug}
        href={`/blog/${blog.slug}`}
        className={`${layout.span} min-h-65 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 relative`}
        onMouseEnter={() => setHoveredCard(blog.slug)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {content}
      </Link>
    );
  };

  return (
    <div className="w-full mx-auto md:px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
        {displayBlogs.map((blog, index) => renderCard(blog, index))}
      </div>

      {blogs.length > 10 && (
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a50044] to-[#004d98] text-white font-semibold font-['Roboto'] rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
