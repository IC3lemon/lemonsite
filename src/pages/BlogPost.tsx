import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";
import { blogPosts, loadPostContent } from "@/content/blog";
import AsciiBackground from "@/components/AsciiBackground";
import type { BgOverride } from "@/App";
import bgImage from "@/assets/foru.jpg";

// Eagerly import all images from the blog content folder
const imageModules = import.meta.glob("@/content/blog/*.{png,jpg,jpeg,gif,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveImage(src: string): string {
  const filename = src.split("/").pop();
  const match = Object.entries(imageModules).find(([key]) => key.endsWith(`/${filename}`));
  return match ? match[1] : src;
}

// Sketchy light theme matching your site palette
const sketchyTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: "#1a1a1a",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
    lineHeight: "1.6",
    background: "none",
  },
  'pre[class*="language-"]': {
    background: "none",
    margin: 0,
    padding: 0,
    overflow: "auto",
  },
  comment:    { color: "#888888", fontStyle: "italic" },
  prolog:     { color: "#888888" },
  doctype:    { color: "#888888" },
  cdata:      { color: "#888888" },
  punctuation:{ color: "#555555" },
  property:   { color: "#0070f3" },
  tag:        { color: "#0070f3" },
  boolean:    { color: "#0070f3" },
  number:     { color: "#0070f3" },
  constant:   { color: "#0070f3" },
  symbol:     { color: "#0070f3" },
  deleted:    { color: "#e00000" },
  selector:   { color: "#22863a" },
  "attr-name":{ color: "#22863a" },
  string:     { color: "#22863a" },
  char:       { color: "#22863a" },
  builtin:    { color: "#22863a" },
  inserted:   { color: "#22863a" },
  operator:   { color: "#555555" },
  entity:     { color: "#555555" },
  url:        { color: "#0070f3" },
  keyword:    { color: "#d73a49", fontWeight: "600" },
  atrule:     { color: "#d73a49" },
  "attr-value":{ color: "#22863a" },
  function:   { color: "#6f42c1" },
  "class-name":{ color: "#6f42c1" },
  regex:      { color: "#e36209" },
  important:  { color: "#e36209", fontWeight: "bold" },
  variable:   { color: "#e36209" },
  bold:       { fontWeight: "bold" },
  italic:     { fontStyle: "italic" },
};

function CodeBlock({ language, children }: { language: string; children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="relative group my-6 border-2 border-foreground dithered-bg overflow-x-auto"
      style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
    >
      {/* Language label */}
      {language && (
        <span className="absolute top-2 left-3 font-mono text-xs text-muted-foreground select-none">
          {language}
        </span>
      )}
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 font-mono text-xs text-muted-foreground border border-border px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground hover:border-foreground"
        style={{ background: "hsl(var(--secondary))" }}
      >
        {copied ? "copied!" : "copy"}
      </button>
      <div className={language ? "pt-7 px-4 pb-4" : "p-4"}>
        <SyntaxHighlighter
          language={language || "text"}
          style={sketchyTheme}
          PreTag="div"
          customStyle={{ background: "none", margin: 0, padding: 0 }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

interface BlogPostPageProps {
  bgOverride: BgOverride;
  bgOpacity: number;
}

const BlogPostPage = ({ bgOverride, bgOpacity }: BlogPostPageProps) => {
  const asciiBgImage = bgOverride?.type === "image" ? bgOverride.url : bgOverride ? undefined : bgImage;
  const asciiBgVideo = bgOverride?.type === "video" ? bgOverride.url : undefined;
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    loadPostContent(slug).then((md) => {
      setContent(md);
      setLoading(false);
    });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen">
        <AsciiBackground imageUrl={asciiBgImage} videoUrl={asciiBgVideo} opacity={bgOpacity} />
        <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
          <p className="font-mono text-destructive">404 — post not found</p>
          <button
            onClick={() => navigate("/", { state: { tab: "home" } })}
            className="font-mono text-accent underline mt-4"
          >
            cd ~/home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AsciiBackground imageUrl={asciiBgImage} videoUrl={asciiBgVideo} opacity={bgOpacity} />
      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* Header bar */}
        <header className="pt-8 pb-6 border-b-2 border-foreground">
          <button
            onClick={() => navigate("/", { state: { tab: "blog" } })}
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            ← cd ~/blog
          </button>
        </header>

        <motion.article
          className="py-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Meta */}
          <div className="mb-8">
            <span className="font-hand text-accent text-sm">{post.date}</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <p className="font-mono text-muted-foreground animate-pulse">loading...</p>
          ) : content ? (
            <div className="prose-sketchy">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Code — block or inline
                  code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    if (match) {
                      return <CodeBlock language={match[1]}>{codeString}</CodeBlock>;
                    }
                    // Inline code
                    return (
                      <code className="font-mono text-xs md:text-sm bg-secondary px-1.5 py-0.5 border border-border text-foreground">
                        {children}
                      </code>
                    );
                  },
                  // Suppress default pre wrapper — CodeBlock handles its own
                  pre({ children }) {
                    return <>{children}</>;
                  },
                  // Images with relative path resolution
                  img({ src, alt }) {
                    const resolved = src ? resolveImage(src) : src;
                    return (
                      <img
                        src={resolved}
                        alt={alt ?? ""}
                        className="border-2 border-foreground my-6 max-w-full"
                        style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
                      />
                    );
                  },
                  // Links — accent blue, no underline unless hovered
                  // inline style used to beat CSS specificity
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "hsl(var(--accent))", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                      >
                        {children}
                      </a>
                    );
                  },
                  // Ordered list
                  ol({ children }) {
                    return (
                      <ol className="mb-4 pl-0 list-none space-y-2" style={{ counterReset: "sketchy-ol" }}>
                        {children}
                      </ol>
                    );
                  },
                  // List items
                  li({ children, ordered }: { children?: React.ReactNode; ordered?: boolean }) {
                    if (ordered) {
                      return (
                        <li
                          className="flex gap-3 text-sm md:text-base items-baseline"
                          style={{ counterIncrement: "sketchy-ol" }}
                        >
                          <span
                            className="font-mono font-bold text-xs shrink-0"
                            style={{ color: "hsl(var(--accent))", minWidth: "1.5rem" }}
                          />
                          <span>{children}</span>
                        </li>
                      );
                    }
                    return <li className="mb-1 text-sm md:text-base">{children}</li>;
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="font-mono text-destructive">Failed to load post content.</p>
          )}
        </motion.article>

        {/* Footer */}
        <footer className="border-t-2 border-foreground py-6 mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-mono text-xs text-muted-foreground">
            <span>© 2026 Madhav Menon. Some rights reserved.</span>
            <span>
              Built with <span className="font-hand text-accent text-sm">trust</span> &amp; hope.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostPage;