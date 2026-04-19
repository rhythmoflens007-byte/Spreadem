import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link } from "react-router";
import { Search, CheckCircle, ArrowRight, Users, X, Check } from "lucide-react";

interface Creator {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  niche: string;
  platform: string;
  followers: string;
  followersNum: number;
  verified: boolean;
}

const creators: Creator[] = [
  { id: "c1", handle: "@snehavibes", name: "Sneha Kapoor", avatar: "S", niche: "Beauty & Skincare", platform: "Instagram", followers: "48.2K", followersNum: 48200, verified: true },
  { id: "c2", handle: "@fitpramod", name: "Pramod Sharma", avatar: "P", niche: "Fitness & Health", platform: "YouTube", followers: "1.2L", followersNum: 120000, verified: true },
  { id: "c3", handle: "@techrajan", name: "Rajan Patel", avatar: "R", niche: "Tech & Gadgets", platform: "YouTube", followers: "3.5L", followersNum: 350000, verified: true },
  { id: "c4", handle: "@foodieanaya", name: "Anaya Reddy", avatar: "A", niche: "Food & Lifestyle", platform: "Instagram", followers: "22.8K", followersNum: 22800, verified: false },
  { id: "c5", handle: "@stylenisha", name: "Nisha Gupta", avatar: "N", niche: "Fashion & Style", platform: "Instagram", followers: "67.5K", followersNum: 67500, verified: true },
  { id: "c6", handle: "@gamervivek", name: "Vivek Joshi", avatar: "V", niche: "Gaming", platform: "YouTube", followers: "5.1L", followersNum: 510000, verified: false },
  { id: "c7", handle: "@artpriya", name: "Priya Menon", avatar: "P", niche: "Art & Design", platform: "Instagram", followers: "15.3K", followersNum: 15300, verified: false },
  { id: "c8", handle: "@edusandeep", name: "Sandeep Kumar", avatar: "S", niche: "Education", platform: "YouTube", followers: "2.8L", followersNum: 280000, verified: true },
  { id: "c9", handle: "@lifestyledk", name: "Deepika Krishnan", avatar: "D", niche: "Lifestyle", platform: "Twitter", followers: "31.0K", followersNum: 31000, verified: true },
];

const platformOpts = ["All", "Instagram", "YouTube", "Twitter", "LinkedIn"];
const nicheOpts = ["All", "Beauty & Skincare", "Fitness & Health", "Tech & Gadgets", "Food & Lifestyle", "Fashion & Style", "Gaming", "Art & Design", "Education", "Lifestyle"];

const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" };

/* ── Invite Modal ── */
const mockCampaigns = [
  { id: "1", name: "Summer Glow Reels", status: "live" },
  { id: "2", name: "Monsoon Skincare Launch", status: "escrow" },
  { id: "5", name: "Spring Collection Teaser", status: "pending" },
];

function InviteModal({ open, onClose, creatorHandle }: { open: boolean; onClose: () => void; creatorHandle: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { setSent(false); setSelected(null); onClose(); }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-[20px] w-[90vw] max-w-[440px] p-8 shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#F0F4F2] flex items-center justify-center cursor-pointer transition-colors">
              <X className="w-4 h-4 text-[#8FA69C]" />
            </button>

            {!sent ? (
              <>
                <h3 style={{ color: "#0D1F17" }}>Invite {creatorHandle}</h3>
                <p className="mt-2 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.6 }}>
                  Select a campaign to invite this creator to:
                </p>

                <div className="flex flex-col gap-2.5">
                  {mockCampaigns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelected(c.id)}
                      className={`flex items-center justify-between p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
                        selected === c.id ? "border-[#1A8A5A] bg-[#E8F5EE]" : "border-[#E2EAE6] bg-white hover:border-[#B3DFC8]"
                      }`}
                    >
                      <div className="text-left">
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{c.name}</span>
                        <span className="ml-2 px-2 py-0.5 rounded-full text-[11px]" style={{ backgroundColor: c.status === "live" ? "#F0FDF4" : "#FFFBEB", color: c.status === "live" ? "#16A34A" : "#D97706", fontWeight: 500 }}>
                          {c.status}
                        </span>
                      </div>
                      {selected === c.id && <Check className="w-4 h-4 text-[#1A8A5A]" />}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <Button variant="primary" className="w-full" disabled={!selected} onClick={handleSend}>
                    Send Invite <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-[#1A8A5A]" />
                </div>
                <h3 style={{ color: "#0D1F17" }}>Invite sent!</h3>
                <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>
                  {creatorHandle} will be notified about your campaign.
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function BrandCreators() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");
  const [niche, setNiche] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [followerRange, setFollowerRange] = useState(1000000);

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      if (query && !c.handle.toLowerCase().includes(query.toLowerCase()) && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (platform !== "All" && c.platform !== platform) return false;
      if (niche !== "All" && c.niche !== niche) return false;
      if (verifiedOnly && !c.verified) return false;
      if (c.followersNum > followerRange) return false;
      return true;
    });
  }, [query, platform, niche, verifiedOnly, followerRange]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCreatorHandle, setSelectedCreatorHandle] = useState("");

  const handleInvite = (handle: string) => {
    setSelectedCreatorHandle(handle);
    setInviteModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <h2 style={{ color: "#0D1F17" }}>Find Creators</h2>
      <p className="mt-2 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A6358" }}>
        Discover top creators across platforms and invite them to your campaigns.
      </p>

      {/* Search + Filters */}
      <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by handle or name..."
              className="w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white pl-10 pr-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C]" />
          </div>

          {/* Platform */}
          <div>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 pr-8 outline-none focus:border-[#1A8A5A] cursor-pointer appearance-none"
              style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}
            >
              {platformOpts.map((p) => <option key={p} value={p}>{p === "All" ? "All Platforms" : p}</option>)}
            </select>
          </div>

          {/* Niche */}
          <div>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 pr-8 outline-none focus:border-[#1A8A5A] cursor-pointer appearance-none"
              style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}
            >
              {nicheOpts.map((n) => <option key={n} value={n}>{n === "All" ? "All Niches" : n}</option>)}
            </select>
          </div>
        </div>

        {/* Second row: range + verified */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-5">
          <div className="flex-1 max-w-xs">
            <span style={labelStyle} className="mb-2 block">Max Followers: {followerRange >= 1000000 ? "Any" : followerRange >= 100000 ? `${(followerRange / 100000).toFixed(1)}L` : `${(followerRange / 1000).toFixed(0)}K`}</span>
            <input
              type="range"
              min={1000}
              max={1000000}
              step={5000}
              value={followerRange}
              onChange={(e) => setFollowerRange(Number(e.target.value))}
              className="w-full accent-[#1A8A5A] cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${verifiedOnly ? "bg-[#1A8A5A]" : "bg-[#E2EAE6]"}`}
            >
              <motion.div
                animate={{ x: verifiedOnly ? 20 : 0 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-5 rounded-full bg-white shadow-sm"
              />
            </button>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>Verified only</span>
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 flex flex-col gap-4 transition-shadow"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: "#1A8A5A" }}>{c.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="truncate" style={{ color: "#0D1F17" }}>{c.handle}</h4>
                    {c.verified && <CheckCircle className="w-4 h-4 text-[#1A8A5A] shrink-0" />}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C", marginTop: 2 }}>{c.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center border border-[#E2EAE6] px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#4A6358" }}>{c.niche}</span>
                <span className="inline-flex items-center border border-[#B3DFC8] bg-[#E8F5EE] px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#0A4D32" }}>{c.platform}</span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{c.followers} followers</span>
                <div className="flex gap-2">
                  <Link to={`/brand/creators/${c.id}`} className="no-underline">
                    <Button variant="ghost" size="small">View Profile</Button>
                  </Link>
                  <Button variant="outline" size="small" onClick={() => handleInvite(c.handle)}>Invite <ArrowRight className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#F0F4F2] flex items-center justify-center mb-6">
            <Users className="w-9 h-9 text-[#8FA69C]" />
          </div>
          <h3 style={{ color: "#0D1F17" }}>No creators match that filter.</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Try broadening your search or adjusting the follower range.
          </p>
        </motion.div>
      )}

      {/* Invite Modal */}
      <InviteModal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} creatorHandle={selectedCreatorHandle} />
    </motion.div>
  );
}