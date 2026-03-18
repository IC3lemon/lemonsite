import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SketchyButton from "./SketchyButton";

const projects = [
  {
    title: "Nitefuscator",
    description: "Native binary/code obfuscator, uses llvm transforms and binary 2 binary transforms. Also has features such as anti-debugging, mixed boolean arithemetic, code virtualisation and more.",
    tags: ["C", "x86", "Python", "Linux", "Windows", "LLVM", "CMake"],
    address: "0x0001",
    category: "cybersec" as const,
  },
  {
    title: "Inkspire [ongoing]",
    description: "Online animation software, built with webGPU to render on the browser.",
    tags: ["Typescript", "Java", "WebGPU", "GLSL"],
    address: "0x0002",
    category: "animation" as const,
  },
  {
    title: "Wishcode [ongoing]",
    description: "C/C++ to position independent Windows executable shellcode translator.",
    tags: ["C++", "Python", "C", "x86 asm", "Windows", "WinAPI"],
    address: "0x0003",
    category: "low-level" as const,
  },
  {
    title: "Graphics Engine on the web [ongoing]",
    description: "A graphics engine built to help with building games.",
    tags: ["C++", "OpenGL", "wasm", "CMake"],
    address: "0x0004",
    category: "low-level" as const,
  },
  {
    title: "Bargue Plates [ongoing]",
    description: "My attempt to grind the unc plates (https://shorturl.at/lvOCL) to improve my drawing and animating skills.",
    tags: ["Krita", "Barque Plates", "Sketching"],
    address: "0x0005",
    category: "animation" as const,
  },
  {
    title: "Fuzzez",
    description: "A wrapper over syzkaller built for a hackathon. Enables parallel and faster fuzzing by targeting kernel modules.",
    tags: ["syzkaller", "C++", "Python", "Linux", "kernel"],
    address: "0x0006",
    category: "low-level" as const,
  },
  {
    title: "Cryptobible",
    description: "Repository made as a culmination of cryptographic attacks, algorithms I've encountered / learnt. (custom python package in dev).",
    tags: ["Python", "Sagemath"],
    address: "0x0007",
    category: "cybersec" as const,
  },
  
];

type Filter = "all" | "low-level" | "animation" | "cybersec" | "gamedev";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tighter mb-2">
        Projects <span className="font-hand text-accent text-2xl">// the work</span>
      </h2>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        {">>>"} trust imma finish all of these soon (and more).
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {(["all", "low-level", "animation", "cybersec", "gamedev"] as Filter[]).map((f) => (
          <SketchyButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </SketchyButton>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
