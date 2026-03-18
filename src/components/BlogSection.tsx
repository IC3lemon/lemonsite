import { motion } from "framer-motion";

const posts = [
  {
    title: "Windows shellcoding",
    date: "2026-03-19",
    excerpt: "So much more of a pain than linux shellcoding. Also not frequently documented sadly.",
    tags: ["cybersecurity", "reverse engineering"],
  },
  {
    title: "Anti-debugging with nanomites, and lotta other stuff",
    date: "2026-02-22",
    excerpt: "Implementation and testing of various anti debugging techniques, including a lot from https://anti-debug.checkpoint.com/.",
    tags: ["cybersecurity", "reverse engineering"],
  },
  {
    title: "OpenGL",
    date: "2026-03-15",
    excerpt: "Learning and hating how to draw the same goddamn triangle.",
    tags: ["graphics","OpenGL", "GLSL", "C++"],
  },
  {
    title: "LLL",
    date: "2026-01-15",
    excerpt: "Lattice reduction, more like black magic tbh.",
    tags: ["sagemath", "Python"],
  }
];

const BlogSection = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tighter mb-2">
        Blog <span className="font-hand text-accent text-2xl">// yap yap yap</span>
      </h2>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        {">>>"} mostly CTF writeups, and me yapping bullshit.
      </p>

      <div className="space-y-0">
        {posts.map((post, index) => (
          <motion.article
            key={post.title}
            className="border-b-2 border-foreground py-6 group cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-mono font-bold tracking-tight group-hover:sketchy-underline transition-all">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-body max-w-2xl">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground shrink-0 md:text-right">
                <span className="font-hand text-accent text-sm block">{post.date}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
