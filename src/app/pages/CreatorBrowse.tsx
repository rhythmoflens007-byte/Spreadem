import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { SearchBar } from "../components/SearchBar";
import { CampaignCard, Campaign } from "../components/CampaignCard";
import { ChevronDown, Search, Sparkles } from "lucide-react";

const campaigns: Campaign[] = [
  { id: "c1", brandName: "GlowSkin", brandAvatar: "", verified: true, title: "Summer Glow Reels", niche: "Beauty & Skincare", platform: "Instagram", ppvRate: "₹2/1K", budget: "₹1,50,000", spotsRemaining: 8, status: "live" },
  { id: "c2", brandName: "FitBuddy", brandAvatar: "", verified: true, title: "Fitness Tracker Review", niche: "Fitness & Health", platform: "YouTube", ppvRate: "₹5/1K", budget: "₹75,000", spotsRemaining: 3, status: "live" },
  { id: "c3", brandName: "NutriBlend", brandAvatar: "", verified: false, title: "Protein Shake Challenge", niche: "Fitness & Health", platform: "Instagram", ppvRate: "₹3/1K", budget: "₹50,000", spotsRemaining: 12, status: "live" },
  { id: "c4", brandName: "TechNova", brandAvatar: "", verified: true, title: "Smartwatch Unboxing Series", niche: "Tech & Gadgets", platform: "YouTube", ppvRate: "₹4/1K", budget: "₹2,00,000", spotsRemaining: 5, status: "live" },
  { id: "c5", brandName: "StyleCraft", brandAvatar: "", verified: false, title: "Monsoon Fashion Lookbook", niche: "Fashion & Style", platform: "Instagram", ppvRate: "₹2/1K", budget: "₹80,000", spotsRemaining: 10, status: "live" },
  { id: "c6", brandName: "DermaFix", brandAvatar: "", verified: true, title: "Monsoon Skincare Routine", niche: "Beauty & Skincare", platform: "YouTube", ppvRate: "₹3/1K", budget: "₹1,20,000", spotsRemaining: 2, status: "live" },
];

const platformOptions = ["All Platforms", "Instagram", "YouTube", "Twitter", "LinkedIn"];
const nicheOptions = ["All Niches", "Beauty & Skincare", "Fitness & Health", "Tech & Gadgets", "Fashion & Style", "Food & Lifestyle"];
const budgetOptions = ["Any Budget", "Under ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000"];
const sortOptions = ["Newest First", "Highest Budget", "Highest PPV"];

function FilterSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-full border border-[#E2EAE6] bg-white pl-3.5 pr-8 appearance-none cursor-pointer outline-none focus:border-[#1A8A5A] transition-colors"
        style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#4A6358" }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8FA69C] pointer-events-none" />
    </div>
  );
}

export function CreatorBrowse() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All Platforms");
  const [niche, setNiche] = useState("All Niches");
  const [budget, setBudget] = useState("Any Budget");
  const [sort, setSort] = useState("Newest First");

  const filtered = useMemo(() => {
    let r = [...campaigns];
    if (query) r = r.filter((c) => `${c.title} ${c.brandName} ${c.niche}`.toLowerCase().includes(query.toLowerCase()));
    if (platform !== "All Platforms") r = r.filter((c) => c.platform === platform);
    if (niche !== "All Niches") r = r.filter((c) => c.niche === niche);
    if (budget === "Under ₹50,000") r = r.filter((c) => parseBudget(c.budget) < 50000);
    else if (budget === "₹50,000 – ₹1,00,000") r = r.filter((c) => { const b = parseBudget(c.budget); return b >= 50000 && b <= 100000; });
    else if (budget === "Above ₹1,00,000") r = r.filter((c) => parseBudget(c.budget) > 100000);
    if (sort === "Highest Budget") r.sort((a, b) => parseBudget(b.budget) - parseBudget(a.budget));
    else if (sort === "Highest PPV") r.sort((a, b) => parsePPV(b.ppvRate) - parsePPV(a.ppvRate));
    return r;
  }, [query, platform, niche, budget, sort]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <h2 style={{ color: "#0D1F17" }}>Brands are waiting for creators like you</h2>
      <p className="mt-2 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A6358" }}>
        Browse live campaigns and start earning based on real views.
      </p>

      <SearchBar onSearch={setQuery} />

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 mt-5">
        <FilterSelect value={platform} options={platformOptions} onChange={setPlatform} />
        <FilterSelect value={niche} options={nicheOptions} onChange={setNiche} />
        <FilterSelect value={budget} options={budgetOptions} onChange={setBudget} />
        <FilterSelect value={sort} options={sortOptions} onChange={setSort} />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
            >
              <CampaignCard
                campaign={c}
                ctaLabel="View Brief →"
                onCtaClick={() => navigate(`/creator/campaigns/${c.id}`)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center mt-8"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-6"
          >
            <Search className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>No campaigns match your filters</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Try adjusting your filters or check back soon — new campaigns are added daily.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function parseBudget(s: string): number {
  return Number(s.replace(/[₹,]/g, "")) || 0;
}
function parsePPV(s: string): number {
  return Number(s.replace(/[₹/1K]/g, "").trim()) || 0;
}
