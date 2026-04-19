import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CampaignCard, Campaign } from "../components/CampaignCard";
import { Button } from "../components/Buttons";
import { Link, useSearchParams } from "react-router";
import { Search, X, ArrowRight, SearchX, ChevronDown } from "lucide-react";

/* ── MOCK DATA (₹ Indian Rupee, Indian comma format) ── */
const allCampaigns: Campaign[] = [
  { id: "1", brandName: "Nykaa", brandAvatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Monsoon Skincare Routine — UGC Reels", niche: "Beauty & Skincare", platform: "Instagram", ppvRate: "₹1.20", budget: "₹2,50,000", spotsRemaining: 3, status: "live" },
  { id: "2", brandName: "CureFit", brandAvatar: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "30-Day Transform Challenge — Fitness Creators", niche: "Fitness & Health", platform: "YouTube", ppvRate: "₹1.80", budget: "₹4,00,000", spotsRemaining: 7, status: "escrow" },
  { id: "3", brandName: "boAt", brandAvatar: "https://images.unsplash.com/photo-1660921436563-65ec990056e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", verified: false, title: "Wireless Earbuds Review — Unboxing Reels", niche: "Tech & Gadgets", platform: "Instagram", ppvRate: "₹0.90", budget: "₹1,80,000", spotsRemaining: 12, status: "live" },
  { id: "4", brandName: "Bewakoof", brandAvatar: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Streetwear Haul — OOTD Style Videos", niche: "Fashion & Style", platform: "YouTube", ppvRate: "₹1.50", budget: "₹3,20,000", spotsRemaining: 2, status: "live" },
  { id: "5", brandName: "Mamaearth", brandAvatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Clean Beauty Essentials — Creator Collab", niche: "Beauty & Skincare", platform: "YouTube", ppvRate: "₹1.10", budget: "₹2,00,000", spotsRemaining: 9, status: "live" },
  { id: "6", brandName: "Groww", brandAvatar: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Investing 101 — Finance Explainer Shorts", niche: "Finance & Business", platform: "Instagram", ppvRate: "₹2.00", budget: "₹5,00,000", spotsRemaining: 5, status: "escrow" },
  { id: "7", brandName: "Zomato", brandAvatar: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Midnight Cravings — Foodie Reel Series", niche: "Food & Lifestyle", platform: "Instagram", ppvRate: "₹0.80", budget: "₹1,50,000", spotsRemaining: 18, status: "live" },
  { id: "8", brandName: "MakeMyTrip", brandAvatar: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Hidden Gems of India — Travel Vlog Series", niche: "Travel & Adventure", platform: "YouTube", ppvRate: "₹1.60", budget: "₹3,50,000", spotsRemaining: 6, status: "live" },
  { id: "9", brandName: "Sugar Cosmetics", brandAvatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Festival Glam Look — GRWM Tutorials", niche: "Beauty & Skincare", platform: "Instagram", ppvRate: "₹1.40", budget: "₹2,80,000", spotsRemaining: 4, status: "live" },
];

/* ── FILTER OPTIONS ── */
const platforms = ["All Platforms", "Instagram", "YouTube", "Twitter"];
const nicheOptions = ["All Niches", "Beauty & Skincare", "Fitness & Health", "Tech & Gadgets", "Fashion & Style", "Finance & Business", "Food & Lifestyle", "Travel & Adventure", "Media & Entertainment"];
const sortOptions = ["Newest first", "Budget: High to Low", "Budget: Low to High", "Most spots"];

/* ── HELPERS ── */
function parseBudget(b: string): number {
  return parseInt(b.replace(/[₹,]/g, ""), 10) || 0;
}

/* ── SELECT COMPONENT ── */
function FilterSelect({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <div className="relative flex-1 min-w-[160px]">
      <label
        style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}
        className="block mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 pr-10 appearance-none cursor-pointer hover:border-[#B3DFC8] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all outline-none"
          style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
      </div>
    </div>
  );
}

/* ── RANGE SLIDER ── */
function BudgetSlider({ min, max, value, onChange }: { min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void }) {
  const pctMin = ((value[0] - min) / (max - min)) * 100;
  const pctMax = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="flex-1 min-w-[200px]">
      <label
        style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}
        className="block mb-1.5"
      >
        Budget range
      </label>
      <div className="flex items-center gap-3">
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#4A6358", whiteSpace: "nowrap" }}>
          ₹{(value[0] / 100000).toFixed(1)}L
        </span>
        <div className="relative flex-1 h-11 flex items-center">
          <div className="absolute w-full h-1.5 rounded-full bg-[#E2EAE6]" />
          <div
            className="absolute h-1.5 rounded-full bg-[#1A8A5A]"
            style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
          />
          <input
            type="range" min={min} max={max} step={50000} value={value[0]}
            onChange={(e) => onChange([Math.min(+e.target.value, value[1] - 50000), value[1]])}
            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A8A5A] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1A8A5A] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
            style={{ height: "100%" }}
          />
          <input
            type="range" min={min} max={max} step={50000} value={value[1]}
            onChange={(e) => onChange([value[0], Math.max(+e.target.value, value[0] + 50000)])}
            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A8A5A] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1A8A5A] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
            style={{ height: "100%" }}
          />
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#4A6358", whiteSpace: "nowrap" }}>
          ₹{(value[1] / 100000).toFixed(1)}L
        </span>
      </div>
    </div>
  );
}

/* ── AUTH MODAL ── */
function AuthPromptModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-[20px] w-[90vw] max-w-[440px] p-8 md:p-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#F0F4F2] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 text-[#8FA69C]" />
            </button>

            <div className="flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#1A8A5A"/>
                </svg>
              </div>

              <h3 style={{ color: "#0D1F17" }}>Join this campaign</h3>
              <p style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                Create a free creator account to join this campaign and start earning per view.
              </p>

              <Link to="/signup" className="no-underline w-full">
                <Button variant="primary" className="w-full">
                  Sign up as creator <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <p style={{ fontSize: 13, color: "#8FA69C" }}>
                Already have an account?{" "}
                <Link to="/signin" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>Sign in</Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── EMPTY STATE ── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center py-20 md:py-28"
    >
      <div className="w-20 h-20 rounded-full bg-[#F0F4F2] flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-[#8FA69C]" />
      </div>
      <h3 style={{ color: "#0D1F17" }}>No matching campaigns</h3>
      <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
        No campaigns match that filter right now — new ones go live every morning.
      </p>
      <p className="mt-1" style={{ fontSize: 13, color: "#8FA69C" }}>
        Try adjusting your filters or check back tomorrow.
      </p>
    </motion.div>
  );
}

/* ── STAGGER ── */
const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

/* ── Niche Slug Map ── */
const nicheSlugMap: Record<string, string> = {
  "media-entertainment": "Media & Entertainment",
  "fashion-style": "Fashion & Style",
  "food-lifestyle": "Food & Lifestyle",
  "tech-gadgets": "Tech & Gadgets",
  "fitness-health": "Fitness & Health",
  "beauty-skincare": "Beauty & Skincare",
  "finance-business": "Finance & Business",
  "travel-adventure": "Travel & Adventure",
};

/* ════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════ */
/*
  ⚠ AUTH GUARD REQUIRED ON MOUNT:
  If user is authenticated as brand → redirect to /brand/campaigns
  If user is authenticated as creator → redirect to /creator/campaigns
  If not authenticated → render this page normally.
  This page must NEVER clear or interfere with an existing auth session.
  Current bug: authenticated brand users landing here are signed out.
*/

export function Campaigns() {
  const [searchParams] = useSearchParams();
  const nicheFromUrl = searchParams.get("niche");
  const initialNiche = nicheFromUrl && nicheSlugMap[nicheFromUrl] ? nicheSlugMap[nicheFromUrl] : "All Niches";

  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All Platforms");
  const [niche, setNiche] = useState(initialNiche);
  const [sort, setSort] = useState("Newest first");
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 600000]);
  const [authOpen, setAuthOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allCampaigns];

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.brandName.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q)
      );
    }

    // Platform
    if (platform !== "All Platforms") {
      list = list.filter((c) => c.platform === platform);
    }

    // Niche
    if (niche !== "All Niches") {
      list = list.filter((c) => c.niche === niche);
    }

    // Budget range
    list = list.filter((c) => {
      const b = parseBudget(c.budget);
      return b >= budgetRange[0] && b <= budgetRange[1];
    });

    // Sort
    if (sort === "Budget: High to Low") {
      list.sort((a, b) => parseBudget(b.budget) - parseBudget(a.budget));
    } else if (sort === "Budget: Low to High") {
      list.sort((a, b) => parseBudget(a.budget) - parseBudget(b.budget));
    } else if (sort === "Most spots") {
      list.sort((a, b) => b.spotsRemaining - a.spotsRemaining);
    }

    return list;
  }, [query, platform, niche, sort, budgetRange]);

  const activeFilterCount = [
    platform !== "All Platforms",
    niche !== "All Niches",
    budgetRange[0] > 0 || budgetRange[1] < 600000,
    query.trim().length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setPlatform("All Platforms");
    setNiche("All Niches");
    setSort("Newest first");
    setBudgetRange([0, 600000]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-28 pb-16 md:pt-32 md:pb-24"
      >
        <div className="max-w-[1280px] mx-auto px-8">
          {/* ── Header ── */}
          <div className="mb-8">
            <h1 style={{ color: "#0D1F17" }}>Live campaigns</h1>
            <p className="mt-3 max-w-lg" style={{ color: "#4A6358" }}>
              Browse real campaigns from verified brands. Apply, create content, and earn per view.
            </p>
          </div>

          {/* ── Search Bar (full-width) ── */}
          <div className="mb-6">
            <div className="h-[52px] rounded-[12px] border border-[#E2EAE6] flex items-center px-4 gap-3 bg-white focus-within:border-[#1A8A5A] focus-within:shadow-[0_0_0_3px_#E8F5EE] transition-all">
              <Search className="w-5 h-5 text-[#8FA69C] shrink-0" />
              <input
                type="text"
                placeholder="Search campaigns, brands, niches..."
                className="flex-1 bg-transparent outline-none"
                style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-1 rounded-full hover:bg-[#F0F4F2] cursor-pointer transition-colors">
                  <X className="w-4 h-4 text-[#8FA69C]" />
                </button>
              )}
            </div>
          </div>

          {/* ── Filter Row ── */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-end mb-8">
            <FilterSelect label="Platform" value={platform} onChange={setPlatform} options={platforms} />
            <FilterSelect label="Niche" value={niche} onChange={setNiche} options={nicheOptions} />
            <BudgetSlider min={0} max={600000} value={budgetRange} onChange={setBudgetRange} />
            <FilterSelect label="Sort by" value={sort} onChange={setSort} options={sortOptions} />
          </div>

          {/* ── Active filter count + clear ── */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#4A6358" }}>
                {filtered.length} campaign{filtered.length !== 1 ? "s" : ""} found
              </span>
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2EAE6] hover:bg-[#F0F4F2] cursor-pointer transition-colors"
                style={{ fontSize: 13, fontWeight: 500, color: "#4A6358" }}
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            </div>
          )}

          {/* ── Grid or Empty ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  <CampaignCard
                    campaign={c}
                    ctaLabel="Join Campaign"
                    onCtaClick={() => setAuthOpen(true)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </motion.div>

      {/* ── Auth Prompt Modal ── */}
      <AuthPromptModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}