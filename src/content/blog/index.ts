export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}
// Registry of all blog posts — add new entries here
export const blogPosts: BlogPost[] = [
  {
    slug: "gam3d",
    title: "Actually making a game",
    date: "2026-04-17",
    excerpt: "A self test of sorts. Trying to build a shooter game, using raylib, cpp and trust. No proprietary game engines or ai.",
    tags: ["game dev"],
  },
  {
    slug: "windows-shellcoding",
    title: "Windows shellcoding",
    date: "2026-03-19",
    excerpt: "So much more of a pain than linux shellcoding. Also not frequently documented sadly.",
    tags: ["cybersecurity", "reverse engineering"],
  },
  // {
  //   slug: "anti-debugging",
  //   title: "Anti-debugging with nanomites, and lotta other stuff",
  //   date: "2026-02-22",
  //   excerpt: "Implementation and testing of various anti debugging techniques, including a lot from https://anti-debug.checkpoint.com/.",
  //   tags: ["cybersecurity", "reverse engineering"],
  // },
  // {
  //   slug: "opengl",
  //   title: "OpenGL",
  //   date: "2026-03-15",
  //   excerpt: "Learning and hating how to draw the same goddamn triangle.",
  //   tags: ["graphics", "OpenGL", "GLSL", "C++"],
  // },
  // {
  //   slug: "lattices",
  //   title: "LLL",
  //   date: "2026-01-15",
  //   excerpt: "Lattice reduction, more like black magic tbh.",
  //   tags: ["sagemath", "Python"],
  // },
];
// Lazy-load markdown content by slug
const markdownModules = import.meta.glob("./*.md", {
  query: "?raw",
  import: "default",
});

export async function loadPostContent(slug: string): Promise<string | null> {
  const path = `./${slug}.md`;
  const loader = markdownModules[path];
  if (!loader) return null;
  return (await loader()) as string;
}
