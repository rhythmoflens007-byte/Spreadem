import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const brandSteps = [
  { n: "1", title: "Post your campaign", desc: "Set your brief, PPV rate, and total budget" },
  { n: "2", title: "Creators apply", desc: "Verified creators submit their content links" },
  { n: "3", title: "You approve", desc: "Only approve content that meets your brief" },
  { n: "4", title: "Pay for results", desc: "Budget releases only for verified views" },
];

const creatorSteps = [
  { n: "1", title: "Browse campaigns", desc: "Discover live campaigns from verified brands" },
  { n: "2", title: "Submit your content", desc: "Share your content link directly with the brand" },
  { n: "3", title: "Get approved", desc: "Brand reviews your submission within 48 hours" },
  { n: "4", title: "Earn per view", desc: "Get paid for every verified view your content generates" },
];

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#1A8A5A",
};

export function HowItWorks() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
          <h1 style={{ color: "#0D1F17" }}>How SpreadEm Works</h1>
          <p className="mt-4" style={{ color: "#4A6358" }}>
            A transparent, performance-driven system that aligns brand goals with creator incentives.
          </p>
        </motion.div>

        {/* 50/50 Two Columns */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* FOR BRANDS */}
          <div>
            <span style={labelStyle}>For Brands</span>
            <div className="flex flex-col gap-8 mt-6">
              {brandSteps.map((s, i) => (
                <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1A8A5A] text-white flex items-center justify-center shrink-0" style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 500 }}>
                    {s.n}
                  </div>
                  <div>
                    <h4 style={{ color: "#0D1F17" }}>{s.title}</h4>
                    <p className="mt-1" style={{ fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FOR CREATORS */}
          <div>
            <span style={labelStyle}>For Creators</span>
            <div className="flex flex-col gap-8 mt-6">
              {creatorSteps.map((s, i) => (
                <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1A8A5A] text-white flex items-center justify-center shrink-0" style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 500 }}>
                    {s.n}
                  </div>
                  <div>
                    <h4 style={{ color: "#0D1F17" }}>{s.title}</h4>
                    <p className="mt-1" style={{ fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/signup" className="no-underline">
            <Button variant="primary">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
