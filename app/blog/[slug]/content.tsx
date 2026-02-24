/* eslint-disable @typescript-eslint/no-explicit-any */
// components/blog/BlogContentRenderer.tsx - MINIMALIST REDESIGN with Poppins

'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import { 
  Copy, 
  Check, 
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';

// Initialize Poppins font
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'image' | 'code' | 'quote' | 'list' | 'embed' | 'link'; // Add 'link' here
  data: any;
  order?: number;
}

interface BlogContentRendererProps {
  content: ContentBlock[];
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [content]);

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderHeading = (data: any, index: number) => {
    const HeadingTag = `h${data.level}` as keyof JSX.IntrinsicElements;
    const headingId = data.text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const getHeadingStyles = () => {
      // Using Poppins with appropriate weights
      switch (data.level) {
        case 1:
          return 'text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mt-16 mb-8';
        case 2:
          return 'text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12 mb-6';
        case 3:
          return 'text-2xl font-medium text-gray-900 dark:text-white mt-10 mb-5';
        case 4:
          return 'text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4';
        default:
          return 'text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3';
      }
    };
    
    return (
      <HeadingTag
        id={headingId}
        className={`group relative scroll-mt-24 ${poppins.className} ${getHeadingStyles()}`}
      >
        {data.level <= 3 && (
          <Link 
            href={`#${headingId}`} 
            className="absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#8a0038] dark:hover:text-[#ff6b9d]"
          >
            <LinkIcon className="w-4 h-4" />
          </Link>
        )}
        {data.text}
      </HeadingTag>
    );
  };

  const renderParagraph = (data: any) => {
    let enhancedText = data.text;
    
    // Markdown links
    enhancedText = enhancedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#8a0038] dark:text-[#ff6b9d] hover:underline underline-offset-2">$1</a>'
    );
    
    // Bold
    enhancedText = enhancedText.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>'
    );
    
    // Italic
    enhancedText = enhancedText.replace(
      /\*([^*]+)\*/g,
      '<em class="italic">$1</em>'
    );
    
    return (
      <p 
        className={`${poppins.className} text-gray-700 dark:text-gray-300 leading-relaxed my-6`}
        dangerouslySetInnerHTML={{ __html: enhancedText }} 
      />
    );
  };

  const renderImage = (data: any, index: number) => {
    return (
      <figure className="my-12">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={data.url}
            alt={data.alt || data.caption || 'Blog image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>
        {data.caption && (
          <figcaption className={`${poppins.className} mt-3 text-sm text-gray-600 dark:text-gray-400 text-center`}>
            {data.caption}
          </figcaption>
        )}
      </figure>
    );
  };

  const renderCode = (data: any, index: number) => {
    const codeId = `code-${index}`;
    const isCopied = copiedCode === codeId;
    const isEven = index % 2 === 0;
    const accentColor = isEven ? '#8a0038' : '#004d98';

    return (
      <div className="my-8">
        <div 
          className="flex justify-between items-center px-4 py-3 text-sm rounded-t-lg"
          style={{ backgroundColor: accentColor }}
        >
          <span className={`${poppins.className} text-white font-medium`}>
            {data.language || 'code'}
          </span>
          <button
            onClick={() => copyToClipboard(data.code, codeId)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span className={`${poppins.className} text-xs`}>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className={`${poppins.className} text-xs`}>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="!mt-0 rounded-t-none rounded-b-lg !bg-gray-900 dark:!bg-black">
          <code className={`language-${data.language || 'plaintext'}`}>
            {data.code}
          </code>
        </pre>
      </div>
    );
  };

  const renderQuote = (data: any, index: number) => {
    const isEven = index % 2 === 0;
    const borderColor = isEven ? 'border-[#8a0038]' : 'border-[#004d98]';
    
    return (
      <figure className="my-10">
        <blockquote className={`pl-6 py-4 border-l-4 ${borderColor} bg-gray-50 dark:bg-gray-900 rounded-r-lg`}>
          <p className={`${poppins.className} text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed font-light`}>
            {data.text}
          </p>
          {data.author && (
            <footer className={`${poppins.className} mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium`}>
              — {data.author}
            </footer>
          )}
        </blockquote>
      </figure>
    );
  };

  const renderList = (data: any, index: number) => {
    const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
    const isEven = index % 2 === 0;
    const markerColor = isEven ? 'text-[#8a0038]' : 'text-[#004d98]';
    
    return (
      <ListTag className={`${poppins.className} my-6 space-y-2 ${data.style === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside ${markerColor}`}>
        {data.items.map((item: string, idx: number) => (
          <li key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ListTag>
    );
  };

  const renderEmbed = (data: any, index: number) => {
    // YouTube
    if (data.provider === 'youtube' || data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
      let videoId = '';
      
      if (data.url.includes('youtube.com')) {
        videoId = new URL(data.url).searchParams.get('v') || '';
      } else if (data.url.includes('youtu.be')) {
        videoId = data.url.split('/').pop() || '';
      }

      return (
        <div className="my-10">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    // Twitter
    if (data.provider === 'twitter' || data.url.includes('twitter.com') || data.url.includes('x.com')) {
      return (
        <div className="my-8 flex justify-center">
          <Link
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${poppins.className} inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.82-12.682c.88-.62 1.7-1.37 2.33-2.23z" />
            </svg>
            View on Twitter
          </Link>
        </div>
      );
    }

    // Generic embed
    return (
      <div className="my-10">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
          <iframe
            src={data.url}
            title="Embedded content"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  // New renderLink function
  const renderLink = (data: any, index: number) => {
    const isEven = index % 2 === 0;
    const accentColor = isEven ? '#8a0038' : '#004d98';
    const isExternal = data.target === '_blank' || data.url.startsWith('http');
    
    return (
      <div className="my-6">
        <Link
          href={data.url}
          target={data.target || '_self'}
          rel={data.rel || (data.target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={`${poppins.className} inline-flex items-center gap-2 group`}
          style={{ color: accentColor }}
        >
          <span className="font-medium text-lg hover:underline underline-offset-4 decoration-2 transition-all">
            {data.text || data.url}
          </span>
          {isExternal ? (
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          ) : (
            <LinkIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          )}
        </Link>
        
        {/* Show URL as metadata for external links */}
        {isExternal && data.url && (
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
            {data.url.replace(/^https?:\/\//, '')}
          </div>
        )}
      </div>
    );
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return renderHeading(block.data, index);
      case 'paragraph':
        return renderParagraph(block.data);
      case 'image':
        return renderImage(block.data, index);
      case 'code':
        return renderCode(block.data, index);
      case 'quote':
        return renderQuote(block.data, index);
      case 'list':
        return renderList(block.data, index);
      case 'embed':
        return renderEmbed(block.data, index);
      case 'link': // Add link case
        return renderLink(block.data, index);
      default:
        return null;
    }
  };

  const sortedContent = [...content].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

  return (
    <div ref={contentRef} className={poppins.variable}>
      {sortedContent.map((block, index) => (
        <div key={index}>
          {renderBlock(block, index)}
        </div>
      ))}
    </div>
  );
}