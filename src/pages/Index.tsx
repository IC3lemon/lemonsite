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
import type { BgOverride } from "@/App";
import bgImage from "@/assets/foru.jpg";
import resumeUrl from "@/assets/resume.pdf?url";

const makeSections = (nowPlaying: string): Record<string, React.ReactNode> => ({
  home: <HeroSection nowPlaying={nowPlaying} />,
  projects: <ProjectsSection />,
  blog: <BlogSection />,
  about: <AboutSection />,
  contact: <ContactSection />,
});

const VALID_SECTIONS = ["home", "projects", "blog", "about", "contact"];

type CommandResult = {
  tab?: string;
  error?: string;
  download?: boolean;
  play?: string;
  stop?: boolean;
  opacity?: number;
};

const parseCommand = (input: string): CommandResult => {
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

  if (trimmed === "cd ..") return { tab: "home" };
  if (trimmed === "cd") return { tab: "home" };

  if (trimmed === "ls ~") return { error: "home  projects  blog  about  contact" };
  if (trimmed === "ls") return { error: "uhh, try `ls ~` instead" };

  if (trimmed === "get resume") return { download: true };

  const playMatch = trimmed.match(/^play\s+((?:https?:\/\/|\/)\S+)$/);
  if (playMatch) return { play: playMatch[1] };

  if (trimmed === "stop") return { stop: true };

  const opacityMatch = trimmed.match(/^opacity\s+([0-9]*\.?[0-9]+)$/);
  if (opacityMatch) {
    const val = parseFloat(opacityMatch[1]);
    if (val < 0 || val > 1) return { error: "opacity: value must be between 0 and 1" };
    return { opacity: val };
  }

  const cmd = trimmed.split(" ")[0];
  if (cmd === "cd") return { error: `cd: ${trimmed.split(" ")[1]}: nuh uh, can't go there. try \`ls ~\`` };
  return { error: `${cmd}: command not found` };
};

const CORS_BLOCKED = /pinterest\.|instagram\.|facebook\.|gstatic\.com|imgur\.com/i;

interface IndexProps {
  bgOverride: BgOverride;
  setBgOverride: (v: BgOverride) => void;
  bgOpacity: number;
  setBgOpacity: (v: number) => void;
}

const Index = ({ bgOverride, setBgOverride, bgOpacity, setBgOpacity }: IndexProps) => {
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
      window.history.replaceState({}, "");
    }
  }, [location.state]);

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

      } else if (result.stop) {
        setBgOverride(null);
        setErrorMsg("background reset");

      } else if (result.play) {
        const url = result.play;
        const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
        const isLocal = url.startsWith("/");
        if (!isLocal && CORS_BLOCKED.test(url)) {
          setErrorMsg("err: that host blocks cross-origin. use /public paths e.g. play /cat.jpg");
        } else {
          setBgOverride({ url, type: isVideo ? "video" : "image" });
          setErrorMsg(`playing ${isVideo ? "video" : "image"}...`);
        }

      } else if (result.opacity !== undefined) {
        setBgOpacity(result.opacity);
        setErrorMsg(`opacity set to ${result.opacity}`);

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

  const nowPlaying = bgOverride
    ? `"${bgOverride.url.split("/").pop() ?? bgOverride.url}"`
    : '"penguin"';

  const sections = makeSections(nowPlaying);

  const asciiBgImage = bgOverride?.type === "image" ? bgOverride.url : bgOverride ? undefined : bgImage;
  const asciiBgVideo = bgOverride?.type === "video" ? bgOverride.url : undefined;

  return (
    <div className="min-h-screen">
      <AsciiBackground
        imageUrl={asciiBgImage}
        videoUrl={asciiBgVideo}
        opacity={bgOpacity}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <header className="pt-8 pb-6 border-b-2 border-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div
              className="font-mono text-xs text-muted-foreground cursor-text flex flex-col gap-0.5"
              onClick={focusInput}
            >
              <div className="flex items-center">
                <span className="text-foreground font-bold text-sm">madhav@lemonsite</span>
                <span className="text-accent">:</span>
                <span>~/{activeTab}</span>
                <span className="text-accent mx-1">$</span>

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
                  <span className="text-foreground">{inputValue}</span>
                  {isFocused
                    ? <span className="animate-cursor-blink ml-0.5 text-foreground">▌</span>
                    : inputValue === "" && <span className="animate-cursor-blink ml-0.5">▌</span>
                  }
                </span>
              </div>

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