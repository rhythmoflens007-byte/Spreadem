import React from "react";
import { motion } from "motion/react";
import { StatusBadge } from "./Badges";
import { Button } from "./Buttons";
import { CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Campaign {
  id: string;
  brandName: string;
  brandAvatar: string;
  verified: boolean;
  title: string;
  niche: string;
  platform: string;
  ppvRate: string;
  budget: string;
  spotsRemaining: number;
  status: "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";
}

export function CampaignCard({ campaign, ctaLabel = "Apply", onCtaClick }: { campaign: Campaign; ctaLabel?: string; onCtaClick?: () => void }) {
  const spotsLow = campaign.spotsRemaining < 5;

  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 relative flex flex-col gap-4 cursor-pointer"
    >
      <div className="absolute top-4 right-4">
        <StatusBadge variant={campaign.status} />
      </div>

      <div className="flex items-center gap-3">
        <ImageWithFallback
          src={campaign.brandAvatar}
          alt={campaign.brandName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#0D1F17" }}>
            {campaign.brandName}
          </span>
          {campaign.verified && <CheckCircle className="w-3.5 h-3.5 text-[#1A8A5A]" />}
        </div>
      </div>

      <h4 className="pr-24" style={{ color: "#0D1F17" }}>{campaign.title}</h4>

      <div className="flex gap-2 flex-wrap">
        <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-[10px]" style={{ fontSize: 13, fontWeight: 500 }}>
          {campaign.niche}
        </span>
        <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-[10px]" style={{ fontSize: 13, fontWeight: 500 }}>
          {campaign.platform}
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div>
          <span style={{ fontSize: 14, color: "#8FA69C" }}>PPV </span>
          <span style={{ fontSize: 14, color: "#0D1F17", fontWeight: 500 }}>{campaign.ppvRate}</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#1A8A5A", fontFamily: "var(--font-heading)" }}>
          {campaign.budget}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span style={{ fontSize: 14, color: spotsLow ? "#D97706" : "#8FA69C", fontWeight: spotsLow ? 500 : 400 }}>
          {campaign.spotsRemaining} spots left
        </span>
        <Button variant="primary" size="small" onClick={(e) => { e.stopPropagation(); onCtaClick?.(); }}>{ctaLabel}</Button>
      </div>
    </motion.div>
  );
}