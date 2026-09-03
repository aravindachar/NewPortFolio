import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  const headingText = "Global Collaboration & Distributed Reach";

  return (
    <section className="w-full pt-16 sm:pt-20 border-t border-black/[0.08] dark:border-[#262626] transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-2xs font-mono font-semibold uppercase tracking-wider text-pink-500 bg-pink-500/10 border border-pink-500/20 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          Worldwide Remote Availability
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white">
          {headingText.split(" ").map((word, idx) => (
            <motion.span
              key={idx}
              className="inline-block mr-2"
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <p className="text-xs sm:text-sm lg:text-base text-[#86868b] dark:text-[#8E8E93] max-w-2xl mx-auto leading-relaxed">
          Based in <span className="text-[#1d1d1f] dark:text-white font-medium">Bengaluru, IN</span> — comfortable operating in asynchronous distributed engineering workflows and delivering features across multiple time zones.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <WorldMap
          lineColor="#ec4899"
          dots={[
            {
              // Bengaluru -> San Francisco / Silicon Valley
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 37.7749, lng: -122.4194, label: "San Francisco, USA" },
            },
            {
              // Bengaluru -> New York City
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 40.7128, lng: -74.0060, label: "New York, USA" },
            },
            {
              // Bengaluru -> London
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
            },
            {
              // Bengaluru -> Berlin
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 52.5200, lng: 13.4050, label: "Berlin, DE" },
            },
            {
              // Bengaluru -> Tokyo
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 35.6762, lng: 139.6503, label: "Tokyo, JP" },
            },
            {
              // Bengaluru -> Singapore
              start: { lat: 12.9716, lng: 77.5946, label: "Bengaluru, IN" },
              end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
            },
          ]}
        />

        {/* Global Hubs Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6 text-2xs sm:text-xs font-mono text-[#86868b] dark:text-[#8E8E93]">
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            📍 Bengaluru (UTC+5:30)
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            ⚡ Silicon Valley (PST)
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            ⚡ London (GMT/BST)
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            ⚡ Tokyo (JST)
          </span>
          <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            ⚡ Singapore (SGT)
          </span>
        </div>
      </div>
    </section>
  );
}

export default WorldMapDemo;
