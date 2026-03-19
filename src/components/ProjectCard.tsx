import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  address: string;
  category: "low-level" | "animation" | "cybersec" | "gamedev";
  url?: string;
}

const ProjectCard = ({ title, description, tags, address, category, url }: ProjectCardProps) => {
  const categoryColors: Record<string, string> = {
    "low-level": "bg-foreground text-primary-foreground",
    animation: "bg-accent text-accent-foreground",
    cybersec: "bg-foreground text-primary-foreground",
    gamedev: "bg-accent text-accent-foreground",
  };

  return (
    <motion.div
      className={`relative p-6 border-2 border-foreground bg-card group ${url ? "cursor-pointer" : "cursor-default"}`}
      style={{ boxShadow: "4px 4px 0px 0px hsl(var(--border))" }}
      whileHover={{
        boxShadow: "0px 0px 0px 0px hsl(var(--border))",
        x: 2,
        y: 2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={() => url && window.open(url, "_blank", "noopener,noreferrer")}
    >
      <div
        className={`absolute -top-3 -left-2 px-2 py-1 text-xs font-mono ${categoryColors[category]}`}
        style={{ transform: "rotate(-2deg)" }}
      >
        {address}
      </div>
      {url && (
        <span className="absolute top-3 right-4 font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          ↗ github
        </span>
      )}
      <h3 className="text-xl font-mono font-bold mt-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 font-body">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs border border-muted px-2 py-0.5 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;