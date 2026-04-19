import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function FAB() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  /* Only render on Brand Dashboard */
  const isDashboard = location.pathname === "/brand/dashboard";

  useEffect(() => {
    if (!isDashboard) {
      setVisible(false);
      return;
    }
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    /* Check initial state */
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [isDashboard]);

  if (!isDashboard) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.02, backgroundColor: "#0F6B45" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/brand/campaigns/new")}
          className="fixed bottom-6 right-6 z-50 h-12 px-5 bg-[#1A8A5A] text-white rounded-full flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500 }}>Start a Campaign</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
