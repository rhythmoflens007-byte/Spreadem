import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft, ExternalLink, CheckCircle, XCircle } from "lucide-react";

type Status = "pending" | "live" | "completed" | "rejected" | "paidout" | "escrow";

/* Campaign title lookup — keyed by campaign ID from URL param */
const campaignTitles: Record<string, string> = {
  "1": "Summer Glow Reels",
  "2": "Monsoon Skincare Launch",
  "3": "Diwali Gift Box Unboxing",
  "4": "New Year Influencer Push",
  "5": "Spring Collection Teaser",
  "6": "Valentine's Day Special",
};

export function SubmissionReview() {
  const { id, submissionId } = useParams();
  const [status, setStatus] = useState<Status>("pending");
  const [modal, setModal] = useState<"approve" | "reject" | null>(null);
  const [toast, setToast] = useState("");

  const campaignTitle = campaignTitles[id || ""] || "Campaign";

  const handleAction = (action: "approve" | "reject") => {
    setModal(null);
    const newStatus: Status = action === "approve" ? "live" : "rejected";
    setStatus(newStatus);
    setToast(action === "approve" ? "Submission approved successfully." : "Submission rejected.");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <Link to={`/brand/campaigns/${id}`} className="no-underline inline-flex items-center gap-2 mb-6" style={{ fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}>
        <ArrowLeft className="w-4 h-4" /> Back to {campaignTitle}
      </Link>

      <h2 style={{ color: "#0D1F17" }}>Submission Review</h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 mt-8">
        {/* LEFT: Creator Info */}
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Creator"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 style={{ color: "#0D1F17" }}>@priyasharma</h4>
              <div className="flex gap-2 mt-1">
                <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-0.5 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>Beauty</span>
                <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-0.5 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>YouTube</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>124K followers</span>
          </div>

          <div className="mb-4">
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8FA69C", textTransform: "uppercase", letterSpacing: "0.06em" }}>Content Link</span>
            <a
              href="https://youtube.com/watch?v=example"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2 no-underline"
              style={{ fontSize: 14, color: "#1A8A5A", fontWeight: 500 }}
            >
              https://youtube.com/watch?v=ex... <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-[#F8FAF9] rounded-[16px] p-5">
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8FA69C", textTransform: "uppercase", letterSpacing: "0.06em" }}>Creator Notes</span>
            <p className="mt-2" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
              Hey GlowSkin! I created a 60-second reel showing my monsoon skincare routine using your products. Filmed in natural lighting with a focus on texture and application. Let me know if you need any edits!
            </p>
          </div>
        </div>

        {/* RIGHT: Review Panel */}
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 md:p-8">
          <div className="mb-6">
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8FA69C", textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</span>
            <div className="mt-2"><StatusBadge variant={status} /></div>
          </div>

          <div className="mb-6">
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8FA69C", textTransform: "uppercase", letterSpacing: "0.06em" }}>Verified Views</span>
            <h3 className="mt-1" style={{ color: "#1A8A5A" }}>12,450</h3>
          </div>

          <div className="mb-8">
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8FA69C", textTransform: "uppercase", letterSpacing: "0.06em" }}>Earnings</span>
            <h4 className="mt-1" style={{ color: "#0D1F17" }}>₹14,940 owed</h4>
          </div>

          {status === "pending" && (
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full" onClick={() => setModal("approve")}>
                Approve Submission <CheckCircle className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full !text-[#DC2626] !border-[#DC2626] hover:!bg-[#FEF2F2]" onClick={() => setModal("reject")}>
                Reject Submission <XCircle className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-[20px] w-[90vw] max-w-[400px] p-8 shadow-2xl text-center"
            >
              <h3 style={{ color: "#0D1F17" }}>{modal === "approve" ? "Approve this submission?" : "Reject this submission?"}</h3>
              <p className="mt-3" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                {modal === "approve" ? "Views will be tracked and the creator will be eligible for payout." : "The creator will be notified that their submission was not approved."}
              </p>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setModal(null)}>Cancel</Button>
                <Button
                  variant={modal === "approve" ? "primary" : "primary"}
                  className={`flex-1 ${modal === "reject" ? "!bg-[#DC2626] hover:!bg-[#B91C1C]" : ""}`}
                  onClick={() => handleAction(modal)}
                >
                  {modal === "approve" ? "Approve" : "Reject"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-[12px] border border-[#E2EAE6] shadow-lg px-5 py-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-[#16A34A]" />
            <span style={{ fontSize: 14, color: "#0D1F17" }}>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}