import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SketchyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const SketchyButton = ({ children, onClick, active, className = "" }: SketchyButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-4 py-2 border-2 border-foreground font-mono text-sm tracking-tight
        transition-all cursor-pointer select-none
        ${active ? "bg-foreground text-primary-foreground" : "bg-transparent text-foreground"}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{
        boxShadow: active ? "none" : "3px 3px 0px 0px hsl(var(--border))",
        transform: active ? "translate(2px, 2px)" : undefined,
      }}
    >
      {children}
    </motion.button>
  );
};

export default SketchyButton;
