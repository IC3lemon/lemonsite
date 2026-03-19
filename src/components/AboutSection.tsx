import { motion } from "framer-motion";
import myPhoto from "@/assets/IC3lemon.png"
// const myPhoto = "https://placehold.co/400x500/1a1a1a/f5f5f5?text=madhav"; // swap with: import myPhoto from "@/assets/your-photo.jpg"

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.5, 0, 0.5, 1] as [number, number, number, number] } },
};

const achievements = [
  {
    date: "2025-12",
    title: "Finalist - Smart India Hackathon 2025",
    desc: "Selected to participate for onsite finals of SIH '25 @ IIT Jammu. Lead a team of six members to build an LLVM based binary obfuscator for PS-25236.",
  },
  {
    date: "2025-01",
    title: "1st Place - Craw CTF 2025",
    desc: "Won INR 25,000 for securing first place for cybersecurity capture the flag competition, held at IIT Jodhpur.",
  },
  {
    date: "2024-06",
    title: "1st Place - ShunyaCTF 2024",
    desc: "Won INR 40,000 for securing first place for Shunya CTF hosted and held @ MIT-ADT University, Pune, as part of team Cryptonite.",
  },
  {
    date: "2024-01",
    title: "Finalist - Cython 2024",
    desc: "Selected for onsite finals of Cython '24 @ IIT Delhi, hosted by FITT x NTRO. Built a paralellised linux kernel fuzzer.",
  },
  
];

const AboutSection = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tighter mb-2">
        About <span className="font-hand text-accent text-2xl">// whoami</span>
      </h2>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        {">>>"} I like bread a lot.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">

        {/* ── LEFT COLUMN ── */}
        <motion.div className="space-y-4" variants={stagger} initial="initial" animate="animate">

          {/* README */}
          <motion.div
            variants={fadeUp}
            className="border-2 border-foreground p-6 relative bg-background"
            style={{ boxShadow: "4px 4px 0px 0px hsl(var(--border))" }}
          >
            <div
              className="absolute -top-3 -left-2 bg-accent text-accent-foreground px-2 py-1 text-xs font-mono"
              style={{ transform: "rotate(-1deg)" }}
            >
              README.md
            </div>
            <p className="font-body text-base leading-relaxed mt-2">
              I'm <strong className="font-mono">Madhav Menon</strong>. Third year pursuing B.Tech CCE at MIT Manipal.
              I play CTFs with <strong className="font-mono" style={{ color: "#22c55e" }}>
  <a href="https://cryptonitemit.in/" target="_blank" rel="noopener noreferrer">team Cryptonite</a>
</strong>. Currently head of cryptography at the same.
            </p>
            <p className="font-body text-base leading-relaxed mt-4">
              I'm into reverse engineering, cryptography (post-quantum mostly), game reversing, maldev and obfuscation.
              The idea of knowing how things work at the lowest level possible, and then making them do things they shouldn't, is kinda cool.
            </p>
            <p className="font-body text-base leading-relaxed mt-4">
              Also into 2D animation, art and sketching. Big chainsaw man fan. Watch football. I also eat bread.
            </p>
          </motion.div>

          {/* Skills + Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={fadeUp}
              className="border-2 border-foreground p-4 bg-background"
              style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
            >
              <h3 className="font-mono text-sm font-bold mb-3 tracking-tight">
                <span className="text-accent font-hand text-base mr-1">&gt;</span> skills
              </h3>
              <ul className="font-mono text-xs space-y-1.5 text-muted-foreground">
                <li>C / C++ / Python / x86 ASM / Operating Systems</li>
                <li>WebGPU / wasm / OpenGL / SDL2 / Cryptography</li>
                <li>Sagemath / Reverse Engineering / Ghidra / GDB</li>
                <li>Krita / Blender / TypeScript / Javascript</li>
                <li>Linux Kernel / Networking / Frida / WinAPI</li>
                <li>Git / Docker / Flask / Ollama / Unity / C#</li>
                <li>Godot / IDA / pwntools / SQL / Bash / LLVM</li>
                <li>x64dbg / dnSpy / Android Studio</li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="border-2 border-foreground p-4 bg-background"
              style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
            >
              <h3 className="font-mono text-sm font-bold mb-3 tracking-tight">
                <span className="text-accent font-hand text-base mr-1">&gt;</span> interests
              </h3>
              <ul className="font-mono text-xs space-y-1.5 text-muted-foreground">
                <li>Post Quantum Cryptography</li>
                <li>Malware Development & Obfuscation</li>
                <li>Game Engine Architecture</li>
                <li>GPU Programming & Compute Shaders</li>
                <li>CTFs and Cybersec</li>
                <li>Frame-by-Frame 2D Animation</li>
                <li>Chainsaw Man</li>
                <li>Badminton & Football</li>
              </ul>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            variants={fadeUp}
            className="border-2 border-foreground p-4 bg-background"
            style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
          >
            <h3 className="font-mono text-sm font-bold mb-4 tracking-tight">
              <span className="text-accent font-hand text-base mr-1">&gt;</span> achievements
            </h3>
            <div>
              {achievements.map(({ date, title, desc }, i) => (
                <div key={title} className="relative flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 border-2 border-foreground bg-accent mt-1 shrink-0" />
                    {i < achievements.length - 1 && (
                      <div className="w-px grow bg-foreground/20 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={i < achievements.length - 1 ? "pb-4" : ""}>
                    <span className="font-mono text-xs text-muted-foreground">{date}</span>
                    <p className="font-mono text-xs font-bold text-foreground mt-0.5">{title}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.5, 0, 0.5, 1] as [number, number, number, number] }}
        >
          {/* Photo */}
          <div
            className="border-2 border-foreground bg-background relative"
            style={{ boxShadow: "5px 5px 0px 0px hsl(var(--border))" }}
          >
            <div
              className="absolute -top-3 -right-2 bg-background border-2 border-foreground px-2 py-0.5 text-xs font-mono z-10"
              style={{ transform: "rotate(1.5deg)" }}
            >
              madhav.jpg
            </div>
            <img
              src={myPhoto}
              alt="Madhav Menon"
              className="w-full block grayscale hover:grayscale-0 transition-all duration-500"
              style={{ aspectRatio: "4/5", objectFit: "cover" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
              }}
            />
          </div>

          {/* Experience */}
          <div
            className="border-2 border-foreground p-4 bg-background"
            style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
          >
            <h3 className="font-mono text-xs font-bold mb-4 tracking-tight">
              <span className="text-accent font-hand text-base mr-1">&gt;</span> experience
            </h3>
            <div>
              {[
                // {
                //   date: "May 2026 — Aug 2026",
                //   title: "Upcoming Research Intern",
                //   org: "NTRO (National Technical Research Organisation)",
                //   desc: "",
                // },
                {
                  date: "Aug 2025 — May 2026",
                  title: "Cryptography Head x Executive Board",
                  org: "Cryptonite",
                  desc: "",
                },
                {
                  date: "Jan 2025 - Aug 2025",
                  title: "Senior Team Member",
                  org: "Cryptonite",
                  desc: "Continued to play CTFs, team finished 3rd nationally on CTFtime, trained junior members.",
                },
                {
                  date: "Jan 2024 - Jan 2025",
                  title: "Junior Team Member",
                  org: "Cryptonite",
                  desc: "Extensively played CTFs under reverse engineering and cryptography domains, learned a ton.",
                },
              ].map(({ date, title, org, desc }, i, arr) => (
                <div key={`${org}-${i}`} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 border-2 border-foreground mt-1 shrink-0" style={{ backgroundColor: "#57f08f" }} />
                    {i < arr.length - 1 && (
                      <div className="w-px grow bg-foreground/20 my-1" />
                    )}
                  </div>
                  <div className={i < arr.length - 1 ? "pb-4" : ""}>
                    <span className="font-mono text-xs text-muted-foreground">{date}</span>
                    <p className="font-mono text-xs font-bold text-foreground mt-0.5">{title}</p>
                    <p className="font-mono text-xs text-accent mt-0.5">{org}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;