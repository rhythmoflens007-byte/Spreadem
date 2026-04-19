import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { Megaphone, CheckCircle, IndianRupee, AlertTriangle, Upload, Zap, Flag, BellOff } from "lucide-react";

/*
  ⚠ All connections use campaignId and submissionId from
  notification data object — never hardcoded IDs.
*/

type NotifType = "campaign" | "submission" | "payout" | "budget" | "approval" | "completed";
type FilterTab = "All" | "Unread" | "Submissions" | "Campaigns" | "Payments";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  campaignId: string;
  submissionId?: string;
}

const iconMap: Record<NotifType, { icon: React.ElementType; bg: string; color: string }> = {
  campaign: { icon: Zap, bg: "#E8F5EE", color: "#1A8A5A" },
  submission: { icon: Upload, bg: "#E8F5EE", color: "#1A8A5A" },
  payout: { icon: IndianRupee, bg: "#F0FDF4", color: "#16A34A" },
  budget: { icon: AlertTriangle, bg: "#FFFBEB", color: "#D97706" },
  approval: { icon: CheckCircle, bg: "#F0FDF4", color: "#16A34A" },
  completed: { icon: Flag, bg: "#F0F4F2", color: "#4A6358" },
};

const initialNotifs: Notification[] = [
  { id: "n1", type: "submission", title: "New Submission", body: "@skincarebysneha submitted content for Summer Glow Reels", time: "2 min ago", read: false, campaignId: "1", submissionId: "s1" },
  { id: "n2", type: "budget", title: "Budget Alert", body: "70% of your performance budget for Summer Glow Reels has been utilized.", time: "1 hr ago", read: false, campaignId: "1" },
  { id: "n3", type: "campaign", title: "Campaign Live", body: "Summer Glow Reels is now live and accepting submissions.", time: "3 hr ago", read: false, campaignId: "1" },
  { id: "n4", type: "approval", title: "Submission Approved", body: "You approved @glowwithpriya's submission. Views are being tracked.", time: "5 hr ago", read: true, campaignId: "1", submissionId: "s2" },
  { id: "n5", type: "payout", title: "Payout Processed", body: "₹14,940 paid out to 3 creators for Summer Glow Reels.", time: "8 hr ago", read: true, campaignId: "1" },
  { id: "n6", type: "completed", title: "Campaign Completed", body: "Diwali Gift Box Unboxing has ended. View final payout report.", time: "1 day ago", read: true, campaignId: "3" },
  { id: "n7", type: "submission", title: "New Submission", body: "@beautybyarjun submitted content for Summer Glow Reels", time: "2 days ago", read: true, campaignId: "1", submissionId: "s3" },
];

/* Creator-specific notifications use c1–c6 IDs to match creator mock data */
const initialCreatorNotifs: Notification[] = [
  { id: "cn1", type: "approval", title: "Submission Approved", body: "GlowSkin approved your submission for Summer Glow Reels. Views are now being tracked.", time: "2 min ago", read: false, campaignId: "c1", submissionId: "s1" },
  { id: "cn2", type: "payout", title: "Payout Released", body: "₹5,472 has been credited to your account for Diwali Gift Box Unboxing.", time: "1 hr ago", read: false, campaignId: "c4" },
  { id: "cn3", type: "budget", title: "Budget Update", body: "Your earnings for Summer Glow Reels have crossed ₹1,000.", time: "3 hr ago", read: false, campaignId: "c1" },
  { id: "cn4", type: "campaign", title: "New Campaign Match", body: "Monsoon Skincare Routine matches your niche — Beauty & Skincare.", time: "5 hr ago", read: true, campaignId: "c6" },
  { id: "cn5", type: "submission", title: "Submission Received", body: "Your content for Fitness Tracker Review is under brand review.", time: "8 hr ago", read: true, campaignId: "c2", submissionId: "s1" },
  { id: "cn6", type: "completed", title: "Campaign Completed", body: "Diwali Gift Box Unboxing has ended. Your final payout is ready.", time: "1 day ago", read: true, campaignId: "c4" },
];

const filterTabs: FilterTab[] = ["All", "Unread", "Submissions", "Campaigns", "Payments"];

export function Notifications() {
  const location = useLocation();
  const isBrandView = location.pathname.startsWith("/brand");

  const [notifs, setNotifs] = useState(isBrandView ? initialNotifs : initialCreatorNotifs);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const navigate = useNavigate();

  const filtered = notifs.filter((n) => {
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Submissions") return n.type === "submission" || n.type === "approval";
    if (activeTab === "Campaigns") return n.type === "campaign" || n.type === "completed";
    if (activeTab === "Payments") return n.type === "payout" || n.type === "budget";
    return true;
  });

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const unreadCount = notifs.filter((n) => !n.read).length;

  const getDestination = (n: Notification): string => {
    const basePath = isBrandView ? "/brand" : "/creator";
    // submission/approval: brand → review page; creator → campaign detail (no submission review route for creator)
    if ((n.type === "submission" || n.type === "approval") && n.submissionId) {
      if (isBrandView) {
        return `/brand/campaigns/${n.campaignId}/submissions/${n.submissionId}`;
      }
      return `/creator/campaigns/${n.campaignId}`;
    }
    if (n.type === "campaign" || n.type === "completed") {
      return `${basePath}/campaigns/${n.campaignId}`;
    }
    if (n.type === "budget") {
      // budget alerts: brand → payment, creator → earnings
      return isBrandView ? "/brand/payment/select-method" : "/creator/earnings";
    }
    if (n.type === "payout") {
      return `${basePath}/campaigns/${n.campaignId}`;
    }
    return `${basePath}/dashboard`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ color: "#0D1F17" }}>Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="cursor-pointer bg-transparent border-none"
            style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mt-6 mb-8 overflow-x-auto">
        {filterTabs.map((t) => {
          const active = activeTab === t;
          return (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="h-9 px-5 rounded-full cursor-pointer transition-all border-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: active ? "#1A8A5A" : "#F0F4F2",
                color: active ? "#fff" : "#4A6358",
              }}
            >
              {t}{t === "Unread" && unreadCount > 0 ? ` (${unreadCount})` : ""}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          {filtered.map((n, i) => {
            const { icon: Icon, bg, color } = iconMap[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => { markRead(n.id); navigate(getDestination(n)); }}
                className={`flex items-start gap-4 px-6 py-5 transition-colors cursor-pointer border-b border-[#E2EAE6] last:border-b-0 ${
                  !n.read ? "bg-[#E8F5EE] border-l-[3px] border-l-[#1A8A5A]" : "hover:bg-[#F8FAF9]"
                }`}
                style={{ minHeight: 68 }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                  <Icon className="w-[18px] h-[18px]" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{n.title}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-[#1A8A5A] shrink-0" />}
                  </div>
                  <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.6 }}>{n.body}</p>
                </div>
                <span className="shrink-0 mt-0.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8FA69C", whiteSpace: "nowrap" }}>{n.time}</span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#F0F4F2] flex items-center justify-center mb-6">
            <BellOff className="w-9 h-9 text-[#8FA69C]" />
          </div>
          <h3 style={{ color: "#0D1F17" }}>You're all caught up</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            No new notifications right now. We'll let you know when something needs your attention.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}