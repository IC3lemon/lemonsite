import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BlogPostPage from "./pages/BlogPost.tsx";

const queryClient = new QueryClient();

export type BgOverride = { url: string; type: "image" | "video" } | null;

const App = () => {
  const [bgOverride, setBgOverride] = useState<BgOverride>(null);
  const [bgOpacity, setBgOpacity] = useState(0.5);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route
              path="/"
              element={
                <Index
                  bgOverride={bgOverride}
                  setBgOverride={setBgOverride}
                  bgOpacity={bgOpacity}
                  setBgOpacity={setBgOpacity}
                />
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <BlogPostPage
                  bgOverride={bgOverride}
                  bgOpacity={bgOpacity}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;