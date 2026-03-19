import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import TabNav from "@/components/TabNav";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import AsciiBackground from "@/components/AsciiBackground";
import bgVideo from "@/assets/gehahahah.mp4";
// import bgVideo from "@/assets/chainsaw.mp4";
// import bgImage from "@/assets/d4b5703ff0b80ef2b9e7e2ab024b4809.jpg"
// import bgImage from "@/assets/IC3lemon.png"
// import bgImage from "@/assets/46c317ed3ce7c0d1d040a7f1e8337ed5.jpg"
// import bgImage from "@/assets/3bcd40b870532fede99ca01fb61d34f3.jpg"
import bgImage from "@/assets/foru.jpg"
import resumeUrl from "@/assets/resume.pdf?url"


// import bgImage from "@/assets/banner.jpg"

const sections: Record<string, React.ReactNode> = {
  home: <HeroSection />,
  projects: <ProjectsSection />,
  blog: <BlogSection />,
  about: <AboutSection />,
  contact: <ContactSection />,
};

const VALID_SECTIONS = ["home", "projects", "blog", "about", "contact"];

const parseCommand = (input: string): { tab?: string; error?: string; download?: boolean } => {
  const trimmed = input.trim().toLowerCase();

  const normalMatch = trimmed.match(/^cd\s+\/([a-z]*)$/);
  if (normalMatch) {
    const target = normalMatch[1];
    if (VALID_SECTIONS.includes(target)) return { tab: target };
    return { error: `cd: ${normalMatch[1]}: nuh uh, can't go there. try \`ls ~\`` };
  }

  const tildeMatch = trimmed.match(/^cd\s+~\/([a-z]*)$/);
  if (tildeMatch) {
    const target = tildeMatch[1] || "home";
    if (VALID_SECTIONS.includes(target)) return { tab: target };
    return { error: `cd: ${tildeMatch[1]}: nuh uh, can't go there. try \`ls ~\`` };
  }

  const dotdotMatch = trimmed.match(/^cd\s+\.\.\/([a-z]+)$/);
  if (dotdotMatch) {
    const target = dotdotMatch[1];
    if (VALID_SECTIONS.includes(target)) return { tab: target };
    return { error: `cd: ${dotdotMatch[1]}: nuh uh, can't go there. try \`ls ~\`` };
  }

  // cd .. → go home
  if (trimmed === "cd ..") return { tab: "home" };

  // cd alone → go home
  if (trimmed === "cd") return { tab: "home" };

  // ls → list sections
  if (trimmed === "ls ~") {
    return { error: `home  projects  blog  about  contact` };
  }

  if (trimmed === "ls") {
    return { error: `uhh, try \`ls ~\` instead` };
  }

  // get resume
  if (trimmed === "get resume") return { download: true };

  // unknown command
  const cmd = trimmed.split(" ")[0];
  if (cmd === "cd") return {error: `cd: ${trimmed.split(" ")[1]}: nuh uh, can't go there. try \`ls ~\``}
  return { error: `${cmd}: command not found` };
};

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const state = location.state as { tab?: string } | null;
    if (state?.tab && VALID_SECTIONS.includes(state.tab)) {
      setActiveTab(state.tab);
      // Clear the state so refreshing doesn't re-trigger
      window.history.replaceState({}, "");
    }
  }, [location.state]);
  
  // Clear error after 2.5s
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 2500);
    return () => clearTimeout(t);
  }, [errorMsg]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = parseCommand(inputValue);
      if (result.download) {
        const a = document.createElement("a");
        a.href = resumeUrl;
        a.download = "madhav_menon_resume.pdf";
        a.click();
        setErrorMsg("downloading resume...");
      } else if (result.tab) {
        setActiveTab(result.tab);
        setErrorMsg(null);
      } else if (result.error) {
        setErrorMsg(result.error);
      }
      setInputValue("");
    }
    if (e.key === "Escape") {
      setInputValue("");
      setErrorMsg(null);
      inputRef.current?.blur();
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="min-h-screen">
      <AsciiBackground imageUrl={bgImage} opacity={0.7} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="pt-8 pb-6 border-b-2 border-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Terminal prompt */}
            <div
              className="font-mono text-xs text-muted-foreground cursor-text flex flex-col gap-0.5"
              onClick={focusInput}
            >
              <div className="flex items-center">
                <span className="text-foreground font-bold text-sm">madhav@lemonsite</span>
                <span className="text-accent">:</span>
                <span>~/{activeTab}</span>
                <span className="text-accent mx-1">$</span>

                {/* Invisible but real input */}
                <span className="relative flex items-center">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setErrorMsg(null);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="absolute inset-0 w-full opacity-0 cursor-text"
                    style={{ width: `${Math.max(inputValue.length, 1)}ch` }}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    aria-label="terminal input"
                  />
                  {/* Visual display of typed text */}
                  <span className="text-foreground">{inputValue}</span>
                  {/* Blinking cursor */}
                  {isFocused
                    ? <span className="animate-cursor-blink ml-0.5 text-foreground">▌</span>
                    : inputValue === "" && <span className="animate-cursor-blink ml-0.5">▌</span>
                  }
                </span>
              </div>

              {/* Error / output line */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-destructive ml-0"
                  >
                    {errorMsg}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </header>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.5, 0, 0.5, 1] }}
          >
            {sections[activeTab]}
          </motion.main>
        </AnimatePresence>

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

export default Index;