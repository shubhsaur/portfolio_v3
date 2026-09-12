"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "info";
}

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-60 flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/90 px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <Info className="h-5 w-5 text-[var(--ln-accent-gold)]" />
          )}
          <span className="text-sm font-medium text-zinc-100">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
