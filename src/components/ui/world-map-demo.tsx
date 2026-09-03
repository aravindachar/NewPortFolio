import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  const headingText = "Global Collaboration & Distributed Reach";

  return (
    <section className="w-full pt-16 sm:pt-20 border-t border-black/[0.08] dark:border-[#262626] transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
        {/* Apple-style Frosted Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#1d1d1f] dark:text-[#E4E4E7] bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-md shadow-xs select-none mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Worldwide Remote Availability</span>
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
          Based in <span className="text-[#1d1d1f] dark:text-white font-medium">Bengaluru, IN</span> — engineered to build, collaborate, and deliver production features with distributed teams worldwide.
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
      </div>
    </section>
  );
}

export default WorldMapDemo;
