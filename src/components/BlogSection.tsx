import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "@/content/blog";


const BlogSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tighter mb-2">
        Blog <span className="font-hand text-accent text-2xl">// yap yap yap</span>
      </h2>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        {">>>"} mostly CTF writeups, and me yapping bullshit.
      </p>

      <div className="space-y-0">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            className="border-b-2 border-foreground py-6 group cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => navigate(`/blog/${post.slug}`)}
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
