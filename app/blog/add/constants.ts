import {
  Type,
  Image as ImageIcon,
  Terminal,
  Quote,
  List,
  FileCode,
  Link,
} from "lucide-react";
import { BlockIconsType } from "./types";

export const BLOCK_ICONS: BlockIconsType = {
  paragraph: Type,
  heading: Type,
  image: ImageIcon,
  code: Terminal,
  quote: Quote,
  list: List,
  embed: FileCode,
  link: Link,
};

export const BLOCK_TEMPLATES = {
  paragraph: { text: "" },
  heading: { text: "", level: 2 },
  image: { url: "", caption: "", alt: "" },
  code: { code: "", language: "javascript" },
  quote: { text: "", author: "" },
  list: { items: [""], style: "unordered" },
  embed: { provider: "youtube", url: "" },
} as const;

export const EXAMPLE_HTML = `<h1>My Blog Post</h1>
<p>This is an introduction paragraph that explains what this blog post is about.</p>

<h2>Getting Started</h2>
<p>Let's dive into the details with some <strong>bold text</strong> and <em>italic emphasis</em>.</p>

<blockquote>
  <p>The only way to do great work is to love what you do.</p>
  <footer>— Steve Jobs</footer>
</blockquote>

<img src="https://images.unsplash.com/photo-1545235617-9465d2a55698" alt="Beautiful sunset" data-caption="Sunset over mountains">

<pre><code class="language-javascript">function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to my blog, \${name}!\`;
}</code></pre>

<h3>Key Points</h3>
<ul>
  <li>First important point</li>
  <li>Second key takeaway</li>
  <li>Third valuable insight</li>
</ul>`;