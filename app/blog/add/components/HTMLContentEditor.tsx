"use client";

import { useState } from "react";
import { 
  Code2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Image, 
  List, 
  Quote, 
  Heading1,
  Braces,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

interface HTMLContentEditorProps {
  htmlContent: string;
  onHtmlChange: (html: string) => void;
  onLoadExample: () => void;
  onConvertToBlocks: () => void;
}

export default function HTMLContentEditor({
  htmlContent,
  onHtmlChange,
  onLoadExample,
  onConvertToBlocks,
}: HTMLContentEditorProps) {
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Simple HTML validation
  const validateHtml = (html: string) => {
    const errors: string[] = [];
    
    const tagStack: string[] = [];
    const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    let match;
    
    while ((match = tagRegex.exec(html)) !== null) {
      const tag = match[1].toLowerCase();
      if (match[0].startsWith('</')) {
        if (tagStack.length === 0 || tagStack[tagStack.length - 1] !== tag) {
          errors.push(`Mismatched or unclosed tag: <${tag}>`);
        } else {
          tagStack.pop();
        }
      } else if (!match[0].endsWith('/>')) {
        tagStack.push(tag);
      }
    }
    
    if (tagStack.length > 0) {
      errors.push(`Unclosed tags: ${tagStack.map(t => `<${t}>`).join(', ')}`);
    }
    
    setValidationErrors(errors);
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    onHtmlChange(newHtml);
    validateHtml(newHtml);
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const supportedElements = [
    { name: "Headings", tag: "h1-h6", icon: Heading1, color: "#8a0038" },
    { name: "Paragraphs", tag: "p", icon: FileText, color: "#004d98" },
    { name: "Images", tag: "img", icon: Image, color: "#8a0038" },
    { name: "Code Blocks", tag: "pre/code", icon: Braces, color: "#004d98" },
    { name: "Quotes", tag: "blockquote", icon: Quote, color: "#8a0038" },
    { name: "Lists", tag: "ul/ol", icon: List, color: "#004d98" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8a0038] rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              HTML Content Editor
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transform HTML into structured blocks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors"
            title="Copy HTML"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <button
            onClick={onLoadExample}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#8a0038]" />
            <span className="text-gray-700 dark:text-gray-200">Load Example</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative">
        <div className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          {/* Line Numbers */}
          <div className="flex-none w-10 py-3 bg-gray-800 border-r border-gray-700">
            {Array.from({ length: htmlContent.split('\n').length || 8 }, (_, i) => (
              <div key={i} className="text-xs text-gray-500 text-center leading-6">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Textarea */}
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            rows={16}
            className="flex-1 bg-transparent px-3 py-3 font-mono text-sm text-green-400 focus:outline-none resize-none"
            placeholder={`<!-- Write your HTML here -->
<h1>Blog Title</h1>
<p>Paragraph text</p>
<img src="image.jpg" alt="description" />
<blockquote>Quote</blockquote>`}
            spellCheck={false}
          />
        </div>

        {/* Validation Status */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 px-2 py-1 bg-gray-800 rounded border border-gray-700">
          {validationErrors.length === 0 ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">Valid</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">{validationErrors.length}</span>
            </>
          )}
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                HTML Issues
              </h4>
              <ul className="space-y-0.5">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-xs text-yellow-700 dark:text-yellow-300 font-mono">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Supported Elements - Minimalist Responsive List */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Supported Elements
        </h3>
        <div className="space-y-2">
          {supportedElements.map((element) => {
            const Icon = element.icon;
            return (
              <div
                key={element.tag}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                    style={{ backgroundColor: element.color + '15' }}
                  >
                    <Icon 
                      className="w-4 h-4 transition-colors" 
                      style={{ color: element.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {element.name}
                  </span>
                </div>
                <code 
                  className="text-xs px-2 py-1 rounded font-mono transition-colors"
                  style={{ 
                    backgroundColor: element.color + '10',
                    color: element.color
                  }}
                >
                  {element.tag}
                </code>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{htmlContent.length} chars</span>
          <span>•</span>
          <span>{htmlContent.split('\n').length} lines</span>
        </div>

        <button
          onClick={onConvertToBlocks}
          disabled={!htmlContent.trim()}
          className="px-5 py-2 bg-[#004d98] hover:bg-[#003d7a] disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Convert to Blocks
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}