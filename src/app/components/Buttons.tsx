import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "default" | "small";
  loading?: boolean;
  children: React.ReactNode;
}

const styles = {
  primary: "bg-[#1A8A5A] text-white hover:bg-[#0F6B45]",
  outline: "border-[1.5px] border-[#1A8A5A] text-[#1A8A5A] hover:bg-[#E8F5EE]",
  ghost: "text-[#4A6358] hover:bg-[#F0F4F2]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
};

export function Button({ variant = "primary", size = "default", loading, children, className = "", ...props }: ButtonProps) {
  const h = size === "small" ? "h-9" : "h-11";
  const px = size === "small" ? "px-4" : "px-5";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`${styles[variant]} ${h} ${px} rounded-[10px] min-w-[120px] inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${className}`}
      disabled={loading || props.disabled}
      {...(props as any)}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </motion.button>
  );
}
