import { ContentBlock } from "../types";

export function blocksToHtml(blocks: ContentBlock[]): string {
  if (blocks.length === 0) return "";

  const htmlParts: string[] = [];

  blocks.forEach((block) => {
    switch (block.type) {
      case "paragraph":
        htmlParts.push(`<p>${block.data.text || ""}</p>`);
        break;

      case "heading":
        htmlParts.push(
          `<h${block.data.level}>${block.data.text || ""}</h${block.data.level}>`,
        );
        break;

      case "image":
        htmlParts.push(
          `<img src="${block.data.url || ""}" alt="${block.data.alt || block.data.caption || ""}" ${block.data.caption ? `data-caption="${block.data.caption}"` : ""} />`,
        );
        break;

      case "code":
        htmlParts.push(
          `<pre><code class="language-${block.data.language || "javascript"}">${block.data.code || ""}</code></pre>`,
        );
        break;

      case "quote":
        const authorPart = block.data.author
          ? `<footer>— ${block.data.author}</footer>`
          : "";
        htmlParts.push(
          `<blockquote><p>${block.data.text || ""}</p>${authorPart}</blockquote>`,
        );
        break;

      case "list":
        const tag = block.data.style === "ordered" ? "ol" : "ul";
        const items =
          block.data.items
            ?.map((item: string) => `<li>${item || ""}</li>`)
            .join("") || "";
        htmlParts.push(`<${tag}>${items}</${tag}>`);
        break;

      case "embed":
        htmlParts.push(
          `<div class="embed" data-provider="${block.data.provider}">
            <iframe src="${block.data.url}" frameborder="0"></iframe>
          </div>`,
        );
        break;
    }
  });

  return htmlParts.join("\n");
}

export function htmlToBlocksConverter(htmlContent: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let tempId = 1;
  let order = 0;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      if (/^h[1-6]$/i.test(element.tagName)) {
        const level = parseInt(element.tagName.charAt(1));
        blocks.push({
          id: `block-${tempId++}`,
          type: "heading",
          order: order++,
          data: {
            text: element.textContent || "",
            level: Math.min(Math.max(level, 1), 6),
          },
        });
      } else if (element.tagName === "P") {
        blocks.push({
          id: `block-${tempId++}`,
          type: "paragraph",
          order: order++,
          data: { text: element.innerHTML || element.textContent || "" },
        });
      } else if (element.tagName === "IMG") {
        const img = element as HTMLImageElement;
        blocks.push({
          id: `block-${tempId++}`,
          type: "image",
          order: order++,
          data: {
            url: img.src || "",
            caption: img.getAttribute("data-caption") || "",
            alt: img.alt || "",
          },
        });
      } else if (element.tagName === "PRE" && element.querySelector("code")) {
        const codeElement = element.querySelector("code");
        const language =
          codeElement?.className.match(/language-(\w+)/)?.[1] || "javascript";

        blocks.push({
          id: `block-${tempId++}`,
          type: "code",
          order: order++,
          data: {
            code: codeElement?.textContent || element.textContent || "",
            language: language,
          },
        });
      } else if (element.tagName === "BLOCKQUOTE") {
        const author =
          element
            .querySelector("footer")
            ?.textContent?.replace("—", "")
            .trim() || "";
        const text =
          element.querySelector("p")?.innerHTML ||
          element.textContent?.replace(author, "").trim() ||
          "";

        blocks.push({
          id: `block-${tempId++}`,
          type: "quote",
          order: order++,
          data: {
            text: text,
            author: author,
          },
        });
      } else if (element.tagName === "UL" || element.tagName === "OL") {
        const items: string[] = [];
        element.querySelectorAll("li").forEach((li) => {
          items.push(li.innerHTML || li.textContent || "");
        });

        blocks.push({
          id: `block-${tempId++}`,
          type: "list",
          order: order++,
          data: {
            items: items,
            style: element.tagName === "OL" ? "ordered" : "unordered",
          },
        });
      } else if (element.tagName === "TABLE") {
        // Handle table gracefully by converting to formatted paragraphs
        const tableText = convertTableToText(element as HTMLTableElement);
        blocks.push({
          id: `block-${tempId++}`,
          type: "paragraph",
          order: order++,
          data: { text: tableText },
        });
      } else if (
        element.tagName === "IFRAME" ||
        element.classList.contains("embed")
      ) {
        let embedUrl = "";
        let embedProvider = "embed";

        if (element.tagName === "IFRAME") {
          embedUrl = (element as HTMLIFrameElement).src || "";
        } else {
          const iframe = element.querySelector("iframe");
          if (iframe) embedUrl = iframe.src || "";
          embedProvider = element.getAttribute("data-provider") || "embed";
        }

        if (embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be")) {
          embedProvider = "youtube";
        } else if (embedUrl.includes("vimeo.com")) {
          embedProvider = "vimeo";
        }

        blocks.push({
          id: `block-${tempId++}`,
          type: "embed",
          order: order++,
          data: {
            provider: embedProvider,
            url: embedUrl,
          },
        });
      }
    }
  });

  return blocks;
}

// Helper function to convert table to readable text format
function convertTableToText(table: HTMLTableElement): string {
  let text = "<strong>Summary Checklist</strong><br/><br/>";
  
  // Get headers
  const headers: string[] = [];
  const headerRow = table.querySelector("thead tr");
  if (headerRow) {
    headerRow.querySelectorAll("th").forEach(th => {
      headers.push(th.textContent?.trim() || "");
    });
  }
  
  // Add header row
  if (headers.length > 0) {
    text += headers.join(" | ") + "<br/>";
    text += headers.map(() => "---").join(" | ") + "<br/>";
  }
  
  // Get body rows
  const bodyRows = table.querySelectorAll("tbody tr");
  bodyRows.forEach(row => {
    const cells: string[] = [];
    row.querySelectorAll("td").forEach(td => {
      cells.push(td.textContent?.trim() || "");
    });
    text += cells.join(" | ") + "<br/>";
  });
  
  return text;
}