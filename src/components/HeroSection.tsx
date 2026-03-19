import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const lastUpdated = new Date("2026-03-19T16:48:30"); // update this when you deploy
  const FPS = 16;
  const NOW_PLAYING = "\"Guy with bouquet\"";

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(lastUpdated));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastUpdated));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.5, 0, 0.5, 1] }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tighter leading-none">
          MADHAV{" "}
          <span className="font-hand italic text-accent not-italic">
            MENON
          </span>
        </h1>

        {/* Terminal line */}
        <div className="mt-6 flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-accent"
          >
            &gt;&gt;&gt;
          </motion.span>
          <span>I like bread and all things tech.</span>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
          {[
            "cybersecurity",
            "2d animation",
            "game dev",
            "reverse engineering",
            "low-level",
            "cryptography"
          ].map((tag) => (
            <motion.span
              key={tag}
              className="border border-foreground px-3 py-1.5 relative"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              style={{ boxShadow: "2px 2px 0px 0px hsl(var(--border))" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* System stats */}
        <div className="mt-10 font-mono text-xs text-muted-foreground flex flex-wrap gap-6">
          <span>
            Last Update:{" "}
            <span className="text-foreground">{timeAgo}</span>
          </span>

          {/* <span>
            FPS:{" "}
            <span className="text-foreground">{FPS} </span>
          </span> */}

          <span>
            In the bg:{" "}
            <span className="text-foreground italic">{NOW_PLAYING}</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;