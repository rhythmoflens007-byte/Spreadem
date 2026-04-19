import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Search, Users, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/Buttons";
import { Link } from "react-router";

/* ── DATA ── */
interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  followers: string;
  followersNum: number;
  platform: string;
  verified: boolean;
  completedCampaigns: number;
  lastActive: string;
}

const creators: Creator[] = [
  { id: "1", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Beauty & Skincare", followers: "124K", followersNum: 124000, platform: "YouTube", verified: true, completedCampaigns: 18, lastActive: "2026-04-18" },
  { id: "2", name: "Vivek Rao", avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Tech & Gadgets", followers: "89K", followersNum: 89000, platform: "Instagram", verified: true, completedCampaigns: 12, lastActive: "2026-04-17" },
  { id: "3", name: "Ananya Gupta", avatar: "https://images.unsplash.com/photo-1761933808230-9a2e78956daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjM0Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fitness & Health", followers: "210K", followersNum: 210000, platform: "YouTube", verified: true, completedCampaigns: 24, lastActive: "2026-04-18" },
  { id: "4", name: "Rahul Menon", avatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Food & Lifestyle", followers: "340K", followersNum: 340000, platform: "YouTube", verified: false, completedCampaigns: 9, lastActive: "2026-04-15" },
  { id: "5", name: "Neha Kapoor", avatar: "https://images.unsplash.com/photo-1641108001784-cdf7d87b353f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcmVhdG9yJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fashion & Style", followers: "67K", followersNum: 67000, platform: "Instagram", verified: true, completedCampaigns: 15, lastActive: "2026-04-16" },
  { id: "6", name: "Arnav Singh", avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Finance & Business", followers: "156K", followersNum: 156000, platform: "LinkedIn", verified: true, completedCampaigns: 21, lastActive: "2026-04-18" },
  { id: "7", name: "Riya Patel", avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Travel & Adventure", followers: "45K", followersNum: 45000, platform: "Instagram", verified: true, completedCampaigns: 8, lastActive: "2026-04-14" },
  { id: "8", name: "Kiran Desai", avatar: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Media & Entertainment", followers: "520K", followersNum: 520000, platform: "YouTube", verified: true, completedCampaigns: 32, lastActive: "2026-04-18" },
  { id: "9", name: "Sneha Iyer", avatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Beauty & Skincare", followers: "8K", followersNum: 8000, platform: "Instagram", verified: false, completedCampaigns: 3, lastActive: "2026-04-12" },
];

/* ── FILTER OPTIONS ── */
const nicheOptions = ["All Niches", "Media & Entertainment", "Fashion & Style", "Food & Lifestyle", "Tech & Gadgets", "Fitness & Health", "Beauty & Skincare", "Finance & Business", "Travel & Adventure"];
const platformOptions = ["All Platforms", "Instagram", "YouTube", "Twitter/X", "LinkedIn"];
const followerOptions = ["All Followers", "1K–10K", "10K–100K", "100K–500K", "500K+"];
const sortOptions = ["Most Followers", "Most Submissions", "Recently Active"];

function followerRange(label: string): [number, number] {
  switch (label) {
    case "1K–10K": return [1000, 10000];
    case "10K–100K": return [10000, 100000];
    case "100K–500K": return [100000, 500000];
    case "500K+": return [500000, Infinity];
    default: return [0, Infinity];
  }
}

/* ── SELECT COMPONENT ── */
function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-[8px] border border-[#E2EAE6] bg-[#F8FAF9] pl-3.5 pr-9 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all appearance-none cursor-pointer"
        style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: value === options[0] ? "#8FA69C" : "#0D1F17" }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8FA69C] pointer-events-none" />
    </div>
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

/* ── MAIN ── */
export function Creators() {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState("All Niches");
  const [platform, setPlatform] = useState("All Platforms");
  const [followers, setFollowers] = useState("All Followers");
  const [sort, setSort] = useState("Most Followers");

  const filtered = useMemo(() => {
    let list = [...creators];

    /* Search */
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q));
    }

    /* Niche */
    if (niche !== "All Niches") {
      list = list.filter((c) => c.niche === niche);
    }

    /* Platform */
    if (platform !== "All Platforms") {
      list = list.filter((c) => c.platform === platform);
    }

    /* Followers */
    if (followers !== "All Followers") {
      const [min, max] = followerRange(followers);
      list = list.filter((c) => c.followersNum >= min && c.followersNum <= max);
    }

    /* Sort */
    if (sort === "Most Followers") list.sort((a, b) => b.followersNum - a.followersNum);
    else if (sort === "Most Submissions") list.sort((a, b) => b.completedCampaigns - a.completedCampaigns);
    else if (sort === "Recently Active") list.sort((a, b) => b.lastActive.localeCompare(a.lastActive));

    return list;
  }, [query, niche, platform, followers, sort]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 style={{ color: "#0D1F17" }}>Top Creators</h1>
          <p className="mt-3" style={{ color: "#4A6358", fontSize: 15 }}>Discover verified creators ready to amplify your brand.</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8FA69C]" />
            <input
              type="text"
              placeholder="Search creators by name or niche..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white pl-11 pr-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
            />
          </div>
        </motion.div>

        {/* Filter Row — [BE:API] GET /api/creators?niche={slug}&platform={p}&followers_min={n}&followers_max={n}&sort={s} */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-4 flex flex-wrap gap-3"
        >
          <FilterSelect value={niche} onChange={setNiche} options={nicheOptions} />
          <FilterSelect value={platform} onChange={setPlatform} options={platformOptions} />
          <FilterSelect value={followers} onChange={setFollowers} options={followerOptions} />
          <FilterSelect value={sort} onChange={setSort} options={sortOptions} />
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${niche}-${platform}-${followers}-${sort}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filtered.map((c, i) => (
                  <motion.div
                    key={c.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 flex flex-col items-center text-center gap-4"
                  >
                    <ImageWithFallback src={c.avatar} alt={c.name} className="w-20 h-20 rounded-full object-cover" />
                    <div className="flex items-center gap-1.5">
                      <h4 style={{ color: "#0D1F17" }}>{c.name}</h4>
                      {c.verified && <CheckCircle className="w-4 h-4 text-[#1A8A5A]" />}
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{c.niche}</span>
                      <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{c.platform}</span>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <p style={{ fontSize: 18, fontWeight: 600, color: "#0D1F17", fontFamily: "var(--font-heading)" }}>{c.followers}</p>
                        <span style={{ fontSize: 12, color: "#8FA69C" }}>Followers</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 18, fontWeight: 600, color: "#0D1F17", fontFamily: "var(--font-heading)" }}>{c.completedCampaigns}</p>
                        <span style={{ fontSize: 12, color: "#8FA69C" }}>Campaigns</span>
                      </div>
                    </div>
                    <Link to={`/creators/${c.id}`} className="no-underline">
                      <Button variant="outline" size="small">View Profile</Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#F0F4F2] flex items-center justify-center mb-6">
                  <Users className="w-9 h-9 text-[#8FA69C]" />
                </div>
                <h3 style={{ color: "#0D1F17" }}>No creators match those filters.</h3>
                <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                  Try broadening your search or adjusting your filters.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}