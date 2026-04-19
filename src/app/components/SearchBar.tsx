import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Camera, Gamepad2, Utensils, Dumbbell, Palette, Music, BookOpen, Sparkles } from "lucide-react";

const niches = [
  { icon: Camera, label: "Photography" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Utensils, label: "Food & Drink" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Palette, label: "Art & Design" },
  { icon: Music, label: "Music" },
  { icon: BookOpen, label: "Education" },
  { icon: Sparkles, label: "Lifestyle" },
];

export function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div
        className={`h-[52px] rounded-[12px] border flex items-center px-4 gap-3 transition-all ${
          open ? "border-[#1A8A5A] shadow-[0_0_0_3px_#E8F5EE]" : "border-[#E2EAE6]"
        } bg-white`}
      >
        <input
          type="text"
          placeholder="Search campaigns, niches, brands..."
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: "var(--font-body)", fontSize: 15 }}
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
          onFocus={() => setOpen(true)}
        />
        <Search className="w-5 h-5 text-[#8FA69C]" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white rounded-[8px] shadow-lg border border-[#E2EAE6] p-4 z-50"
          >
            <div className="grid grid-cols-4 gap-2">
              {niches.map((n) => (
                <button
                  key={n.label}
                  onClick={() => { setQuery(n.label); setOpen(false); onSearch?.(n.label); }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] hover:bg-[#E8F5EE] transition-colors cursor-pointer"
                >
                  <n.icon className="w-4 h-4 text-[#4A6358]" />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#0D1F17", fontFamily: "var(--font-body)" }}>{n.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
