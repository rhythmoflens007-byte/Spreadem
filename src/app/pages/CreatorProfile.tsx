import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router";
import { Button } from "../components/Buttons";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  ArrowLeft, CheckCircle, MapPin, Star, Eye, Play,
  Youtube, Instagram, MessageCircle, Lock, AlertTriangle,
} from "lucide-react";

/* ── TYPES ── */
type Variant = "brand-loggedin" | "public-guest" | "loading-skeleton" | "error-not-found";

interface CreatorData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  location: string;
  niches: string[];
  stats: { campaignsCompleted: number; avgEngagement: string; followers: string; rating: number };
  content: { id: string; thumbnail: string; platform: "YouTube" | "Instagram"; views: string; campaign: string }[];
  brands: { name: string; logo: string }[];
}

/* ── MOCK DATA — keyed by creator ID so each profile is unique ── */
const mockCreators: Record<string, CreatorData> = {
  default: {
    id: "1",
    name: "Priya Sharma",
    handle: "@priyasharma",
    avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    location: "Mumbai, India",
    niches: ["Beauty & Skincare", "Lifestyle"],
    stats: { campaignsCompleted: 18, avgEngagement: "4.8%", followers: "124K", rating: 4.7 },
    content: [
      { id: "v1", thumbnail: "https://images.unsplash.com/photo-1518704688564-258968ed24fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdmlkZW8lMjB0aHVtYm5haWwlMjBiZWF1dHklMjB0dXRvcmlhbHxlbnwxfHx8fDE3NzY1MjA4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "48.2K", campaign: "Summer Glow Reels" },
      { id: "v2", thumbnail: "https://images.unsplash.com/photo-1567120598293-4a0a41a2ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbiUyMHZpZGVvJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc3NjUyMDgwNnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "22.1K", campaign: "Monsoon Skincare" },
      { id: "v3", thumbnail: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "35.7K", campaign: "Clean Beauty Essentials" },
      { id: "v4", thumbnail: "https://images.unsplash.com/photo-1660921436563-65ec990056e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "18.9K", campaign: "Festival Glam Look" },
      { id: "v5", thumbnail: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "52.3K", campaign: "Diwali Gift Box" },
      { id: "v6", thumbnail: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "14.6K", campaign: "Streetwear Haul" },
    ],
    brands: [{ name: "Nykaa", logo: "N" }, { name: "CureFit", logo: "C" }, { name: "Mamaearth", logo: "M" }, { name: "Sugar Cosmetics", logo: "S" }, { name: "GlowSkin", logo: "G" }],
  },
  c2: {
    id: "c2",
    name: "Vivek Rao",
    handle: "@techvivek",
    avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    location: "Bengaluru, India",
    niches: ["Tech & Gadgets", "Finance & Business"],
    stats: { campaignsCompleted: 9, avgEngagement: "3.2%", followers: "89K", rating: 4.4 },
    content: [
      { id: "v1", thumbnail: "https://images.unsplash.com/photo-1660921436563-65ec990056e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "120K", campaign: "Wireless Earbuds Review" },
      { id: "v2", thumbnail: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "45K", campaign: "Finance Explainer" },
      { id: "v3", thumbnail: "https://images.unsplash.com/photo-1518704688564-258968ed24fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdmlkZW8lMjB0aHVtYm5haWwlMjBiZWF1dHklMjB0dXRvcmlhbHxlbnwxfHx8fDE3NzY1MjA4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "88K", campaign: "Smartwatch Unboxing" },
    ],
    brands: [{ name: "boAt", logo: "B" }, { name: "Groww", logo: "G" }, { name: "TechNova", logo: "T" }],
  },
  c3: {
    id: "c3",
    name: "Ananya Gupta",
    handle: "@ananyafitlife",
    avatar: "https://images.unsplash.com/photo-1761933808230-9a2e78956daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjM0Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    location: "Hyderabad, India",
    niches: ["Fitness & Health", "Lifestyle"],
    stats: { campaignsCompleted: 22, avgEngagement: "5.1%", followers: "210K", rating: 4.9 },
    content: [
      { id: "v1", thumbnail: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "210K", campaign: "30-Day Transform Challenge" },
      { id: "v2", thumbnail: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "95K", campaign: "Protein Shake Challenge" },
      { id: "v3", thumbnail: "https://images.unsplash.com/photo-1567120598293-4a0a41a2ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbiUyMHZpZGVvJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc3NjUyMDgwNnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "180K", campaign: "Fitness Tracker Review" },
    ],
    brands: [{ name: "CureFit", logo: "C" }, { name: "NutriBlend", logo: "N" }, { name: "FitBuddy", logo: "F" }],
  },
  c4: {
    id: "c4",
    name: "Rahul Menon",
    handle: "@rahulcooks",
    avatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    verified: false,
    location: "Chennai, India",
    niches: ["Food & Lifestyle", "Travel & Adventure"],
    stats: { campaignsCompleted: 14, avgEngagement: "3.8%", followers: "340K", rating: 4.5 },
    content: [
      { id: "v1", thumbnail: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "320K", campaign: "Streetwear Haul" },
      { id: "v2", thumbnail: "https://images.unsplash.com/photo-1518704688564-258968ed24fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdmlkZW8lMjB0aHVtYm5haWwlMjBiZWF1dHklMjB0dXRvcmlhbHxlbnwxfHx8fDE3NzY1MjA4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "78K", campaign: "Diwali Gift Box Unboxing" },
      { id: "v3", thumbnail: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "140K", campaign: "Travel Series" },
    ],
    brands: [{ name: "Bewakoof", logo: "B" }, { name: "GiftKaro", logo: "G" }, { name: "MakeMyTrip", logo: "M" }],
  },
  c5: {
    id: "c5",
    name: "Neha Kapoor",
    handle: "@nehastyle",
    avatar: "https://images.unsplash.com/photo-1641108001784-cdf7d87b353f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcmVhdG9yJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    location: "Delhi, India",
    niches: ["Fashion & Style", "Beauty & Skincare"],
    stats: { campaignsCompleted: 11, avgEngagement: "4.2%", followers: "67K", rating: 4.6 },
    content: [
      { id: "v1", thumbnail: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "58K", campaign: "Monsoon Fashion Lookbook" },
      { id: "v2", thumbnail: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", platform: "YouTube", views: "41K", campaign: "Summer Glow Reels" },
      { id: "v3", thumbnail: "https://images.unsplash.com/photo-1567120598293-4a0a41a2ac20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbiUyMHZpZGVvJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc3NjUyMDgwNnww&ixlib=rb-4.1.0&q=80&w=1080", platform: "Instagram", views: "29K", campaign: "Valentine's Day Special" },
    ],
    brands: [{ name: "StyleCraft", logo: "S" }, { name: "Nykaa", logo: "N" }, { name: "Bewakoof", logo: "B" }],
  },
};

/* Remaining IDs (c6-c9 from BrandCreators) fall back to default mock */
// ... existing code ...
export function CreatorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useUserRole();
  const [variant, setVariant] = useState<Variant>("loading-skeleton");
  const [creator, setCreator] = useState<CreatorData | null>(null);

  useEffect(() => {
    /* [BE:API] GET /api/creators/:id */
    const timer = setTimeout(() => {
      if (id === "404" || id === "not-found") {
        setVariant("error-not-found");
      } else {
        /* Resolve creator by ID — fall back to default mock if ID not in map */
        const resolved = (id && mockCreators[id]) ? mockCreators[id] : mockCreators["default"];
        setCreator(resolved);
        setVariant(role === "brand" ? "brand-loggedin" : "public-guest");
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [id, role]);

  if (variant === "loading-skeleton") return <LoadingSkeleton />;
  if (variant === "error-not-found") return <ErrorNotFound />;
  if (!creator) return null;

  const isBrand = variant === "brand-loggedin";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 cursor-pointer bg-transparent border-none p-0"
          style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#6366F1" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Creators
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── MAIN COLUMN ── */}
          <div className="flex-1 min-w-0">
            {/* Hero Band */}
            <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-8 mb-8">
              <div className="flex items-center gap-6 flex-wrap">
                <ImageWithFallback
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 style={{ fontFamily: "var(--font-heading)", color: "#0A0A0A" }}>{creator.name}</h2>
                    {creator.verified && (
                      <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#6B7280" }}>{creator.handle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280" }}>{creator.location}</span>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {creator.niches.map((n) => (
                      <span
                        key={n}
                        className="px-3 py-1 rounded-full border border-[#E5E7EB]"
                        style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#374151", backgroundColor: "#F9FAFB" }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <ProfileStat label="Campaigns Completed" value={creator.stats.campaignsCompleted} />
              <ProfileStat label="Avg Engagement Rate" value={creator.stats.avgEngagement} />
              <ProfileStat label="Follower Count" value={creator.stats.followers} />
              <ProfileStat label="Rating" value={`${creator.stats.rating} / 5`} />
            </div>

            {/* Content Showcase */}
            <div className="mb-10">
              <h3 style={{ fontFamily: "var(--font-heading)", color: "#0A0A0A" }}>Content Showcase</h3>
              <p className="mt-1 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6B7280" }}>
                Recent content from verified campaigns
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {creator.content.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <ContentCard item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Past Brand Collaborations */}
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", color: "#0A0A0A" }}>Past Brand Collaborations</h3>
              <div className="flex gap-4 mt-5 flex-wrap">
                {creator.brands.map((b) => (
                  <motion.div
                    key={b.name}
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-[12px] bg-white border border-[#E2EAE6] flex items-center justify-center"
                    title={b.name}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#0A0A0A" }}>
                      {b.logo}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── STICKY SIDEBAR ── */}
          <div className="lg:w-[320px] shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6">
                {isBrand ? (
                  <>
                    {/* Brand logged in */}
                    <Link to="/brand/campaigns/new" className="no-underline w-full block">
                      <Button variant="primary" className="w-full !bg-[#6366F1] hover:!bg-[#4F46E5] !rounded-[10px]">
                        Propose Campaign
                      </Button>
                    </Link>

                    <div className="mt-3 relative">
                      <Button variant="outline" className="w-full !rounded-[10px] !cursor-not-allowed !opacity-60" disabled>
                        <MessageCircle className="w-4 h-4" /> Message Creator
                      </Button>
                      <span
                        className="block text-center mt-2"
                        style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9CA3AF" }}
                      >
                        Coming soon
                      </span>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#E2EAE6]">
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
                        <Star className="w-3.5 h-3.5 text-[#F59E0B] inline -mt-0.5 mr-1" />
                        {creator.stats.rating}/5 average rating from {creator.stats.campaignsCompleted} campaigns
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Public guest */}
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-[#9CA3AF]" />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6B7280" }}>
                        Sign in to collaborate
                      </span>
                    </div>
                    <Link to="/signin" className="no-underline w-full block">
                      <Button variant="primary" className="w-full !bg-[#6366F1] hover:!bg-[#4F46E5] !rounded-[10px]">
                        Sign in to collaborate
                      </Button>
                    </Link>
                    <p className="mt-4 text-center" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#9CA3AF" }}>
                      New to SpreadEm?{" "}
                      <Link to="/signup" className="no-underline" style={{ color: "#6366F1", fontWeight: 500 }}>Create an account</Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}