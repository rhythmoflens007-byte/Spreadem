import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { CampaignCard, Campaign } from "../components/CampaignCard";
import { Button } from "../components/Buttons";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  ArrowRight, Film, Shirt, UtensilsCrossed, Cpu, Dumbbell,
  Sparkles, Briefcase, Plane, IndianRupee, Users,
  ChevronLeft, ChevronRight,
} from "lucide-react";

/* ── NICHE TILES ── */
const niches = [
  { icon: Film, label: "Media & Entertainment", slug: "media-entertainment" },
  { icon: Shirt, label: "Fashion & Style", slug: "fashion-style" },
  { icon: UtensilsCrossed, label: "Food & Lifestyle", slug: "food-lifestyle" },
  { icon: Cpu, label: "Tech & Gadgets", slug: "tech-gadgets" },
  { icon: Dumbbell, label: "Fitness & Health", slug: "fitness-health" },
  { icon: Sparkles, label: "Beauty & Skincare", slug: "beauty-skincare" },
  { icon: Briefcase, label: "Finance & Business", slug: "finance-business" },
  { icon: Plane, label: "Travel & Adventure", slug: "travel-adventure" },
];

/* ── CAMPAIGN DATA (₹) ── */
const campaigns: Campaign[] = [
  { id: "1", brandName: "Nykaa", brandAvatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Monsoon Skincare Routine — UGC Reels", niche: "Beauty & Skincare", platform: "Instagram", ppvRate: "₹1.20", budget: "₹2,50,000", spotsRemaining: 3, status: "live" },
  { id: "2", brandName: "CureFit", brandAvatar: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "30-Day Transform Challenge — Fitness Creators", niche: "Fitness & Health", platform: "YouTube", ppvRate: "₹1.80", budget: "₹4,00,000", spotsRemaining: 7, status: "escrow" },
  { id: "3", brandName: "boAt", brandAvatar: "https://images.unsplash.com/photo-1660921436563-65ec990056e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", verified: false, title: "Wireless Earbuds Review — Unboxing Reels", niche: "Tech & Gadgets", platform: "Instagram", ppvRate: "₹0.90", budget: "₹1,80,000", spotsRemaining: 12, status: "live" },
  { id: "4", brandName: "Bewakoof", brandAvatar: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Streetwear Haul — OOTD Style Videos", niche: "Fashion & Style", platform: "YouTube", ppvRate: "₹1.50", budget: "₹3,20,000", spotsRemaining: 2, status: "live" },
  { id: "5", brandName: "Mamaearth", brandAvatar: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Clean Beauty Essentials — Creator Collab", niche: "Beauty & Skincare", platform: "YouTube", ppvRate: "₹1.10", budget: "₹2,00,000", spotsRemaining: 9, status: "live" },
  { id: "6", brandName: "Groww", brandAvatar: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080", verified: true, title: "Investing 101 — Finance Explainer Shorts", niche: "Finance & Business", platform: "Instagram", ppvRate: "₹2.00", budget: "₹5,00,000", spotsRemaining: 5, status: "escrow" },
];

/* ── CREATOR SHOWCASE DATA ── */
const creators = [
  { handle: "@priyasharma", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Beauty", platform: "YouTube", earned: "₹48,200" },
  { handle: "@techvivek", name: "Vivek Rao", avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Tech", platform: "Instagram", earned: "₹36,500" },
  { handle: "@ananyafitlife", name: "Ananya Gupta", avatar: "https://images.unsplash.com/photo-1761933808230-9a2e78956daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjM0Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fitness", platform: "YouTube", earned: "₹52,800" },
  { handle: "@rahulcooks", name: "Rahul Menon", avatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Food", platform: "Instagram", earned: "₹29,100" },
  { handle: "@nehastyle", name: "Neha Kapoor", avatar: "https://images.unsplash.com/photo-1641108001784-cdf7d87b353f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcmVhdG9yJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fashion", platform: "YouTube", earned: "₹41,600" },
  { handle: "@priyasharma2", name: "Riya Patel", avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Travel", platform: "Instagram", earned: "₹33,900" },
  { handle: "@arnav_vlogs", name: "Arnav Singh", avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Finance", platform: "YouTube", earned: "₹61,400" },
];

/* ── ANIMATIONS ── */
const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ── NICHE TILE ── */
function NicheTile({ icon: Icon, label, index, onClick }: { icon: React.ElementType; label: string; index: number; onClick?: () => void }) {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      custom={index}
      initial="hidden"
      animate="visible"
      variants={stagger}
      onClick={() => { setActive(!active); onClick?.(); }}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-[10px] border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
        active
          ? "bg-[#1A8A5A] text-white border-[#1A8A5A]"
          : "bg-[#F0F4F2] text-[#4A6358] border-transparent hover:bg-[#E8F5EE] hover:text-[#1A8A5A]"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>{label}</span>
    </motion.button>
  );
}

/* ── CREATOR CARD ── */
function CreatorShowcaseCard({ creator }: { creator: typeof creators[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 min-w-[260px] shrink-0 flex flex-col items-center gap-3"
    >
      <ImageWithFallback src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full object-cover" />
      <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: "#0D1F17" }}>{creator.name}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C" }}>{creator.handle}</span>
      <div className="flex gap-2">
        <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{creator.niche}</span>
        <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{creator.platform}</span>
      </div>
      <div className="mt-1">
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: "#1A8A5A" }}>{creator.earned}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8FA69C", marginLeft: 4 }}>earned</span>
      </div>
    </motion.div>
  );
}

/* ── MAIN PAGE ── */
export function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ═══════ 1. HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F5EE]/60 via-white to-[#F8FAF9]" />
        <div className="max-w-[1280px] mx-auto px-8 w-full relative z-10 text-center py-32 md:pt-40 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            {/* Eyebrow */}
            <span
              className="inline-block mb-6 px-5 py-2 rounded-full bg-[#E8F5EE] border border-[#B3DFC8]"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#0A4D32" }}
            >
              India's first performance-backed creator platform
            </span>

            {/* H1 */}
            <h1 style={{ color: "#0D1F17" }}>
              Connect brands with<br />
              <span style={{ color: "#1A8A5A" }}>verified creators</span> — safely
            </h1>

            {/* Body */}
            <p className="mt-6 mx-auto max-w-xl" style={{ color: "#4A6358" }}>
              SpreadEm is a pay-per-view marketplace where brands secure campaign budgets and
              creators earn transparently — no fake followers, no payment delays.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link to="/signup" className="no-underline"><Button variant="primary">Post a Campaign</Button></Link>
              <Link to="/signup" className="no-underline"><Button variant="outline">Join as Creator</Button></Link>
            </div>

            {/* Micro-copy */}
            <div className="mt-6 flex justify-center gap-6 flex-wrap">
              {["847 campaigns live", "₹2Cr+ paid out", "Free to join"].map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Niche Tiles */}
            <div className="mt-12">
              {/* Desktop: row */}
              <div className="hidden md:flex justify-center gap-3 flex-wrap">
                {niches.map((n, i) => (
                  <NicheTile key={n.label} icon={n.icon} label={n.label} index={i} onClick={() => navigate(`/campaigns?niche=${n.slug}`)} />
                ))}
              </div>
              {/* Mobile: horizontal scroll */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <style>{`.niche-scroll::-webkit-scrollbar { display: none; }`}</style>
                <div className="niche-scroll flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  {niches.map((n, i) => (
                    <NicheTile key={n.label} icon={n.icon} label={n.label} index={i} onClick={() => navigate(`/campaigns?niche=${n.slug}`)} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ 2. TRUST BAR ═══════ */}
      <section className="bg-[#F8FAF9] border-t border-b border-[#E2EAE6]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal}
          className="max-w-[1280px] mx-auto px-8 py-8 flex justify-center gap-8 md:gap-16 flex-wrap"
        >
          {[
            { icon: IndianRupee, value: "₹2Cr+", label: "paid out" },
            { icon: Sparkles, value: "847", label: "live campaigns" },
            { icon: Users, value: "1,000+", label: "verified creators" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#E8F5EE] flex items-center justify-center">
                <s.icon className="w-4 h-4 text-[#1A8A5A]" />
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: "#0D1F17" }}>{s.value}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C", marginLeft: 6 }}>{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════ 3. LIVE CAMPAIGN FEED ═══════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal}>
            <h2 style={{ color: "#0D1F17" }}>Real campaigns. Real money. Live right now.</h2>
            <p className="mt-3 max-w-lg" style={{ fontSize: 14, color: "#4A6358" }}>
              Browse open campaigns from verified Indian brands. Apply, create, and earn per view.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {campaigns.map((c, i) => (
              <motion.div key={c.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <CampaignCard campaign={c} ctaLabel="Join Campaign" onCtaClick={() => navigate("/signup")} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/campaigns"
              className="no-underline inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#1A8A5A" }}
            >
              See all 847 campaigns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ 4. HOW IT WORKS ═══════ */}
      <section className="bg-[#F8FAF9] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal} className="text-center mb-14">
            <h2 style={{ color: "#0D1F17" }}>Simple for brands. Fair for creators.</h2>
            <p className="mt-3 mx-auto max-w-md" style={{ fontSize: 14, color: "#4A6358" }}>
              Two paths, one platform — both designed for trust and transparency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Brand Steps */}
            <div>
              <span
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-[#B3DFC8]"
                style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#0A4D32", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                For Brands
              </span>
              <div className="flex flex-col gap-8">
                {[
                  { n: "1", title: "Create a campaign", desc: "Set your niche, platform, budget, and pay-per-view rate." },
                  { n: "2", title: "Secure your budget", desc: "Secure your performance budget so creators know you're serious." },
                  { n: "3", title: "Review & approve creators", desc: "Browse applications, check profiles, approve the best fits." },
                  { n: "4", title: "Pay only for results", desc: "Verified views trigger automatic, transparent payouts." },
                ].map((s, i) => (
                  <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A8A5A] text-white flex items-center justify-center shrink-0" style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600 }}>
                      {s.n}
                    </div>
                    <div>
                      <h4 style={{ color: "#0D1F17" }}>{s.title}</h4>
                      <p className="mt-1" style={{ fontSize: 14, color: "#4A6358" }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Creator Steps */}
            <div>
              <span
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE]"
                style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                For Creators
              </span>
              <div className="flex flex-col gap-8">
                {[
                  { n: "1", title: "Browse live campaigns", desc: "Filter by niche, platform, and budget to find the right fit." },
                  { n: "2", title: "Apply with your profile", desc: "Submit your creator profile — past work, audience stats, pitch." },
                  { n: "3", title: "Create & submit content", desc: "Produce authentic content and submit it through the platform." },
                  { n: "4", title: "Get paid in 3 days", desc: "Verified views = automatic payout. No chasing invoices." },
                ].map((s, i) => (
                  <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0" style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600 }}>
                      {s.n}
                    </div>
                    <div>
                      <h4 style={{ color: "#0D1F17" }}>{s.title}</h4>
                      <p className="mt-1" style={{ fontSize: 14, color: "#4A6358" }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 5. CREATOR SHOWCASE ═══════ */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal}>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 style={{ color: "#0D1F17" }}>These creators got paid last week.</h2>
                <p className="mt-2" style={{ fontSize: 14, color: "#4A6358" }}>Real earnings from real campaigns — updated weekly.</p>
              </div>
              <div className="hidden md:flex gap-2">
                <button onClick={() => scrollCarousel(-1)} className="w-10 h-10 rounded-full border border-[#E2EAE6] flex items-center justify-center hover:bg-[#F0F4F2] cursor-pointer transition-colors">
                  <ChevronLeft className="w-4 h-4 text-[#4A6358]" />
                </button>
                <button onClick={() => scrollCarousel(1)} className="w-10 h-10 rounded-full border border-[#E2EAE6] flex items-center justify-center hover:bg-[#F0F4F2] cursor-pointer transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#4A6358]" />
                </button>
              </div>
            </div>
          </motion.div>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.creator-carousel::-webkit-scrollbar { display: none; }`}</style>
            {[...creators, ...creators].map((c, i) => (
              <CreatorShowcaseCard key={`${c.handle}-${i}`} creator={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 6. BOTTOM CTA BANNER ═══════ */}
      <section className="bg-[#1A8A5A]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal}
          className="max-w-[1280px] mx-auto px-8 py-16 md:py-24 text-center"
        >
          <h2 style={{ color: "white" }}>One platform. Two ways to win.</h2>
          <p className="mt-4 mx-auto max-w-md" style={{ fontSize: 15, color: "#B3DFC8" }}>
            Whether you're a brand looking for reach or a creator looking for income — SpreadEm has you covered.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to="/signup" className="no-underline">
              <Button variant="primary" className="!bg-white !text-[#1A8A5A] hover:!bg-[#E8F5EE]">
                Post a Campaign <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/signup" className="no-underline">
              <Button variant="outline" className="!border-white !text-white hover:!bg-white/10">
                Start Earning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}