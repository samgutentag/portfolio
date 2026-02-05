"use client";

import { motion } from "framer-motion";

/**
 * Wraps any content in a subtle fade-in-up animation on page load.
 *
 * Why a separate component? The homepage is a Server Component (it fetches
 * blog posts at build time). framer-motion's `motion` requires the client.
 * By isolating the animation into its own "use client" component, the rest
 * of the page stays server-rendered — better performance, same DX.
 *
 * `delay` staggers each section so they don't all appear at once.
 */
export function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
