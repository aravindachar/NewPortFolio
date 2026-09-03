import { useRef, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "@/context/ThemeContext";

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface MapConnection {
  start: MapPoint;
  end: MapPoint;
}

interface MapProps {
  dots?: MapConnection[];
  lineColor?: string;
  className?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#ec4899",
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { isDark } = useTheme();

  const svgMap = useMemo(() => {
    // @ts-expect-error dotted-map constructor
    const map = new (DottedMap.default || DottedMap)({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFFFF35" : "#00000028",
      shape: "circle",
      backgroundColor: isDark ? "black" : "white",
    });
  }, [isDark]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`w-full aspect-[2/1] dark:bg-black/60 bg-white/60 rounded-2xl relative font-sans overflow-hidden border border-black/[0.08] dark:border-white/10 backdrop-blur-md shadow-xs ${className}`}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
        alt="world map"
        height="400"
        width="800"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={`url(#path-gradient-${i})`}
                strokeWidth="1.5"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.3 * i,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 2.5
                }}
              />
            </g>
          );
        })}

        <defs>
          {dots.map((_, i) => (
            <linearGradient id={`path-gradient-${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
              <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          ))}
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              {/* Origin Node (Bengaluru) */}
              <g key={`start-${i}`}>
                <circle
                  cx={start.x}
                  cy={start.y}
                  r="2.5"
                  fill={lineColor}
                />
                <circle
                  cx={start.x}
                  cy={start.y}
                  r="2.5"
                  fill={lineColor}
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    from="2.5"
                    to="10"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Destination Node */}
              <g key={`end-${i}`}>
                <circle
                  cx={end.x}
                  cy={end.y}
                  r="2"
                  fill="#a855f7"
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r="2"
                  fill="#a855f7"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.8s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.8s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WorldMap;
