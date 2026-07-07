"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Clock,
  Calendar,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Gauge,
  Activity,
  Laptop,
  Moon,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  CloudRain,
  CloudSun,
  CloudFog,
  CloudLightning,
  Thermometer,
  Wind,
  Droplets,
  Navigation,
  ArrowRight,
  FileText,
  X
} from "lucide-react";

interface SystemInfo {
  os: string;
  browser: string;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
  supported: boolean;
}

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  city: string;
  loading: boolean;
  error: boolean;
}

function AnimatedWeatherIcon({ code, isDay }: { code: number; isDay: boolean }) {
  if (code === 0) {
    return (
      <div className="relative w-10 h-10 flex items-center justify-center">
        {isDay ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="text-amber-500"
          >
            <Sun className="w-8 h-8" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-amber-200 dark:text-amber-100"
          >
            <Moon className="w-8 h-8 fill-amber-200/10 dark:fill-amber-100/10" />
          </motion.div>
        )}
      </div>
    );
  }

  if (code === 1 || code === 2 || code === 3) {
    return (
      <div className="relative w-10 h-10">
        <motion.div
          animate={{ y: [0, -1.2, 0], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-0.5 left-0.5 text-amber-450"
        >
          <Sun className="w-5 h-5" />
        </motion.div>
        <motion.div
          animate={{ x: [-1.2, 1.2, -1.2], y: [0, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-0.5 right-0.5 text-zinc-400 dark:text-zinc-300"
        >
          <Cloud className="w-7 h-7 fill-zinc-400/10" />
        </motion.div>
      </div>
    );
  }

  if (code === 45 || code === 48) {
    return (
      <div className="relative w-10 h-10 flex flex-col items-center justify-center gap-1">
        <motion.div
          animate={{ x: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-6 h-0.5 bg-zinc-300 dark:bg-zinc-600 rounded-full"
        />
        <motion.div
          animate={{ x: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="w-8 h-0.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
        />
        <motion.div
          animate={{ x: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="w-5 h-0.5 bg-zinc-300 dark:bg-zinc-600 rounded-full"
        />
      </div>
    );
  }

  if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
    const isHeavy = code === 80 || code === 81 || code === 82 || code === 65;
    return (
      <div className="relative w-10 h-10 flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -0.8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-zinc-400 dark:text-zinc-300 z-10"
        >
          <Cloud className="w-7 h-7 fill-zinc-400/10" />
        </motion.div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 justify-center z-0">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 6, opacity: [0, 1, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: isHeavy ? 0.7 + i * 0.1 : 1.2 + i * 0.15,
                delay: i * 0.25,
                ease: "easeIn",
              }}
              className="w-0.5 h-1.5 bg-sky-450 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (code >= 95 && code <= 99) {
    return (
      <div className="relative w-10 h-10 flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -0.8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-zinc-500 dark:text-zinc-400 z-10"
        >
          <Cloud className="w-7 h-7 fill-zinc-500/20" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            times: [0, 0.04, 0.06, 0.1, 0.14, 1],
            ease: "easeInOut",
          }}
          className="absolute bottom-0 text-yellow-455 z-0"
        >
          <CloudLightning className="w-4.5 h-4.5" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ y: [0, -0.8, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="text-zinc-400 dark:text-zinc-300"
    >
      <Cloud className="w-8 h-8 fill-zinc-400/10" />
    </motion.div>
  );
}

// Deterministic static structures for animated elements to prevent Math.random() resets during Clock re-renders
const CARD_RAIN_DROPS = Array.from({ length: 24 }).map((_, i) => ({
  left: `${4 + i * 4}%`,
  top: `-${10 + (i % 5) * 5}px`,
  delay: `${(i % 6) * 0.18}s`,
  duration: `${0.85 + (i % 3) * 0.12}s`,
}));

const PAGE_RAIN_DROPS = Array.from({ length: 65 }).map((_, i) => ({
  left: `${(i / 65) * 100}%`,
  delay: (i % 13) * 0.22,
  duration: 0.8 + (i % 5) * 0.12,
}));

const PAGE_STORM_DROPS = Array.from({ length: 80 }).map((_, i) => ({
  left: `${(i / 80) * 100}%`,
  delay: (i % 16) * 0.18,
  duration: 0.6 + (i % 4) * 0.1,
}));

const PAGE_SUNBEAMS = Array.from({ length: 30 }).map((_, i) => ({
  left: `${5 + (i * 3.1) % 90}%`,
  delay: (i % 10) * 0.45,
  duration: 8 + (i % 6) * 1.1,
}));

const PAGE_CLOUDS_DELAYS = Array.from({ length: 8 }).map((_, i) => (i % 4) * 1.5);

export function StatusSection() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [speedResult, setSpeedResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState<number | null>(null);
  const [activeWeatherEffect, setActiveWeatherEffect] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<"atmosphere" | "system" | "network" | null>(null);
  
  const [system, setSystem] = useState<SystemInfo>({ os: "Detecting...", browser: "Detecting..." });
  const [battery, setBattery] = useState<BatteryInfo>({ level: 100, charging: false, supported: false });
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
    weatherCode: 0,
    isDay: true,
    city: "Jakarta",
    loading: true,
    error: false,
  });

  const [screenSize, setScreenSize] = useState("1920 x 1080");
  const [userAgentStr, setUserAgentStr] = useState("");
  const [ramUsage, setRamUsage] = useState(4.6);

  const getWeatherGroup = (code: number) => {
    if (code === 0) return "clear";
    if (code === 1 || code === 2 || code === 3) return "cloudy";
    if (code === 45 || code === 48) return "fog";
    if (code >= 95 && code <= 99) return "thunderstorm";
    if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return "rain";
    return "cloudy";
  };

  const getWeatherDesc = (code: number) => {
    switch (code) {
      case 0:
        return "Clear";
      case 1:
      case 2:
      case 3:
        return "Cloudy";
      case 45:
      case 48:
        return "Fog";
      case 51:
      case 53:
      case 55:
        return "Drizzle";
      case 61:
      case 63:
      case 65:
        return "Rain";
      case 80:
      case 81:
      case 82:
        return "Heavy Rain";
      case 95:
      case 96:
      case 99:
        return "Thunderstorm";
      default:
        return "Cloudy";
    }
  };

  const getTimeOfDay = () => {
    if (!currentTime) return "night";
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 11) return "morning";
    if (hours >= 11 && hours < 16) return "day";
    if (hours >= 16 && hours < 19) return "sunset";
    return "night";
  };

  const timeOfDay = getTimeOfDay();

  const getClockHands = () => {
    if (!currentTime) return { hr: 0, min: 0, sec: 0 };
    const hrs = currentTime.getHours();
    const mins = currentTime.getMinutes();
    const secs = currentTime.getSeconds();
    const ms = currentTime.getMilliseconds();
    
    // Smooth sweeping rotation angles
    const secondsAngle = secs * 6 + ms * 0.006;
    const minutesAngle = mins * 6 + secs * 0.1;
    const hoursAngle = (hrs % 12) * 30 + mins * 0.5;
    
    return {
      hr: hoursAngle,
      min: minutesAngle,
      sec: secondsAngle,
    };
  };

  const hands = getClockHands();

  // Dynamic 3D Atmosphere configurations based on Time AND Weather conditions
  const getAtmosphereConfig = () => {
    const weatherGroup = getWeatherGroup(weather.weatherCode);
    
    // NIGHT conditions
    if (timeOfDay === "night") {
      if (weatherGroup === "rain") {
        return {
          card: "bg-gradient-to-br from-[#03030a] via-[#070a1e] to-[#0e162d] border-t-white/10 border-l-white/5 border-b-black/60 border-r-black/50 text-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.55),_inset_0_1px_2px_rgba(255,255,255,0.15),_inset_0_-3px_5px_rgba(0,0,0,0.5)]",
          label: "text-slate-400 font-black",
          value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]",
          subtext: "text-slate-300 font-bold",
          barBg: "bg-black/45 border-zinc-900/60",
          barFill: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
          barFillHumidity: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
          barFillAirQuality: "bg-emerald-450 shadow-[0_0_8px_#34d399]",
          airQualityText: "text-emerald-400 font-black",
          analog: "border-zinc-800 bg-zinc-950/45 text-slate-100",
          handHour: "bg-slate-200",
          handMin: "bg-slate-400",
          worldBox: "bg-zinc-950/20 border-zinc-800/70 text-slate-300",
          divide: "border-white/10",
          badge: "text-slate-300 bg-black/35 border-slate-800/80",
          humidityText: "text-slate-200 font-extrabold",
          rain: true,
          stars: true, // show a few stars
          starCount: 2,
          moon: true,
          clouds: false,
          sun: false,
          lightning: false
        };
      }
      if (weatherGroup === "thunderstorm") {
        return {
          card: "bg-gradient-to-br from-[#0c051a] via-[#090822] to-[#03030c] border-t-white/10 border-l-white/5 border-b-black/70 border-r-black/60 text-slate-100 shadow-[0_25px_45px_rgba(0,0,0,0.6),_inset_0_1px_2px_rgba(255,255,255,0.15),_inset_0_-3px_5px_rgba(0,0,0,0.6)]",
          label: "text-purple-300 font-black",
          value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
          subtext: "text-purple-200/90 font-bold",
          barBg: "bg-black/50 border-purple-900/40",
          barFill: "bg-purple-500 shadow-[0_0_8px_#a855f7]",
          barFillHumidity: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
          barFillAirQuality: "bg-purple-500 shadow-[0_0_8px_#a855f7]",
          airQualityText: "text-purple-300 font-black",
          analog: "border-purple-900/40 bg-zinc-950/45 text-slate-100",
          handHour: "bg-slate-200",
          handMin: "bg-slate-400",
          worldBox: "bg-black/30 border-purple-900/30 text-purple-300",
          divide: "border-white/10",
          badge: "text-purple-300 bg-black/40 border-purple-900/50",
          humidityText: "text-purple-200 font-extrabold",
          rain: true,
          stars: false,
          moon: false,
          clouds: true,
          sun: false,
          lightning: true
        };
      }
      if (weatherGroup === "cloudy" || weatherGroup === "fog") {
        return {
          card: "bg-gradient-to-br from-[#090b14] via-[#121624] to-[#1e2436] border-t-white/10 border-l-white/5 border-b-black/50 border-r-black/40 text-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.15),_inset_0_-3px_5px_rgba(0,0,0,0.5)]",
          label: "text-slate-400 font-black",
          value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
          subtext: "text-slate-300 font-bold",
          barBg: "bg-black/40 border-zinc-900/50",
          barFill: "bg-sky-500",
          barFillHumidity: "bg-sky-500",
          barFillAirQuality: "bg-emerald-500",
          airQualityText: "text-emerald-400 font-black",
          analog: "border-zinc-800 bg-zinc-950/45 text-slate-100",
          handHour: "bg-slate-205",
          handMin: "bg-slate-400",
          worldBox: "bg-zinc-950/20 border-zinc-800/70 text-slate-300",
          divide: "border-white/10",
          badge: "text-slate-300 bg-black/30 border-slate-800/80",
          humidityText: "text-slate-200 font-extrabold",
          rain: false,
          stars: false,
          moon: true,
          clouds: true,
          sun: false,
          lightning: false
        };
      }
      // Default / Clear Night
      return {
        card: "bg-gradient-to-br from-[#060614] via-[#0b0c24] to-[#15173c] border-t-white/10 border-l-white/5 border-b-black/60 border-r-black/50 text-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.55),_inset_0_1px_2px_rgba(255,255,255,0.15),_inset_0_-3px_5px_rgba(0,0,0,0.5)]",
        label: "text-slate-400 font-black",
        value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
        subtext: "text-slate-300 font-bold",
        barBg: "bg-black/45 border-zinc-900/60",
        barFill: "bg-primary shadow-[0_0_8px_var(--color-primary)]",
        barFillHumidity: "bg-sky-500",
        barFillAirQuality: "bg-emerald-500",
        airQualityText: "text-emerald-400 font-black",
        analog: "border-zinc-800 bg-zinc-950/45 text-slate-100",
        handHour: "bg-slate-205",
        handMin: "bg-slate-400",
        worldBox: "bg-zinc-950/20 border-zinc-800/70 text-slate-300",
        divide: "border-white/10",
        badge: "text-slate-300 bg-black/30 border-slate-800/80",
        humidityText: "text-slate-200 font-extrabold",
        rain: false,
        stars: true,
        starCount: 4,
        moon: true,
        clouds: false,
        sun: false,
        lightning: false
      };
    }

    // DAY conditions
    if (timeOfDay === "day") {
      if (weatherGroup === "rain") {
        return {
          card: "bg-gradient-to-br from-[#3b4b5e] via-[#4d5f73] to-[#62768c] border-t-white/35 border-l-white/25 border-b-black/25 border-r-black/20 text-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.25),_inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-2px_4px_rgba(0,0,0,0.15)]",
          label: "text-slate-300 font-black",
          value: "text-white font-black tracking-tight drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.25)]",
          subtext: "text-slate-200 font-bold",
          barBg: "bg-black/35 border-slate-900/40",
          barFill: "bg-sky-400 shadow-[0_0_6px_#38bdf8]",
          barFillHumidity: "bg-sky-400 shadow-[0_0_6px_#38bdf8]",
          barFillAirQuality: "bg-emerald-400 shadow-[0_0_6px_#34d399]",
          airQualityText: "text-emerald-400 font-black",
          analog: "border-slate-800/35 bg-black/20 text-slate-100",
          handHour: "bg-slate-205",
          handMin: "bg-slate-400",
          worldBox: "bg-black/20 border-white/10 text-slate-200",
          divide: "border-white/10",
          badge: "text-slate-200 bg-black/20 border-slate-800/45",
          humidityText: "text-slate-150 font-extrabold",
          rain: true,
          stars: false,
          moon: false,
          clouds: true,
          sun: false,
          lightning: false
        };
      }
      if (weatherGroup === "thunderstorm") {
        return {
          card: "bg-gradient-to-br from-[#242530] via-[#1a1c24] to-[#13141a] border-t-white/25 border-l-white/15 border-b-black/45 border-r-black/35 text-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.45),_inset_0_1.5px_3px_rgba(255,255,255,0.25),_inset_0_-3px_5px_rgba(0,0,0,0.4)]",
          label: "text-purple-300 font-black",
          value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]",
          subtext: "text-purple-200/90 font-bold",
          barBg: "bg-black/55 border-purple-900/45",
          barFill: "bg-purple-500 shadow-[0_0_6px_#a855f7]",
          barFillHumidity: "bg-sky-400 shadow-[0_0_6px_#38bdf8]",
          barFillAirQuality: "bg-purple-500 shadow-[0_0_6px_#a855f7]",
          airQualityText: "text-purple-300 font-black",
          analog: "border-purple-900/40 bg-zinc-950/40 text-slate-100",
          handHour: "bg-slate-205",
          handMin: "bg-slate-400",
          worldBox: "bg-black/30 border-purple-900/30 text-purple-300",
          divide: "border-white/10",
          badge: "text-purple-300 bg-black/40 border-purple-900/50",
          humidityText: "text-purple-200 font-extrabold",
          rain: true,
          stars: false,
          moon: false,
          clouds: true,
          sun: false,
          lightning: true
        };
      }
      if (weatherGroup === "cloudy" || weatherGroup === "fog") {
        return {
          card: "bg-gradient-to-br from-[#6b7c96] via-[#8fa3bd] to-[#abbfd9] border-t-white/45 border-l-white/35 border-b-black/20 border-r-black/15 text-[#0a182c] shadow-[0_15px_30px_rgba(0,0,0,0.15),_inset_0_2px_4px_rgba(255,255,255,0.5),_inset_0_-2px_4px_rgba(0,0,0,0.1)]",
          label: "text-[#0a182c]/85 font-black",
          value: "text-[#06101f] font-black tracking-tight",
          subtext: "text-[#0a182c]/90 font-bold",
          barBg: "bg-[#0a182c]/15 border-[#0a182c]/10",
          barFill: "bg-[#0a182c]",
          barFillHumidity: "bg-blue-950",
          barFillAirQuality: "bg-emerald-950",
          airQualityText: "text-emerald-900 font-black",
          analog: "border-[#0a182c]/30 bg-white/40 text-[#06101f]",
          handHour: "bg-[#06101f]",
          handMin: "bg-[#0a182c]",
          worldBox: "bg-white/20 border-white/45 text-[#0a182c]",
          divide: "border-blue-950/15",
          badge: "text-[#0a182c] bg-white/40 border-white/50",
          humidityText: "text-[#0a182c] font-extrabold",
          rain: false,
          stars: false,
          moon: false,
          clouds: true,
          sun: true, // weak sun behind clouds
          lightning: false
        };
      }
      // Default / Clear Day
      return {
        card: "bg-gradient-to-br from-[#40a3ff] via-[#7ec6ff] to-[#a6d7ff] border-t-white/55 border-l-white/45 border-b-black/25 border-r-black/20 text-[#021830] shadow-[0_15px_30px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.6),_inset_0_-2px_4px_rgba(0,0,0,0.15)]",
        label: "text-[#021830]/85 font-black",
        value: "text-[#010e1d] font-black tracking-tight",
        subtext: "text-[#021830]/90 font-bold",
        barBg: "bg-[#021830]/15 border-[#021830]/10",
        barFill: "bg-[#021830]",
        barFillHumidity: "bg-blue-950",
        barFillAirQuality: "bg-emerald-950",
        airQualityText: "text-emerald-950 font-black",
        analog: "border-[#021830]/35 bg-white/45 text-[#010e1d]",
        handHour: "bg-[#010e1d]",
        handMin: "bg-[#021830]",
        worldBox: "bg-white/25 border-white/40 text-[#021830]",
        divide: "border-blue-955/15",
        badge: "text-[#021830] bg-white/45 border-white/60",
        humidityText: "text-[#021830] font-extrabold",
        rain: false,
        stars: false,
        moon: false,
        clouds: true,
        sun: true,
        lightning: false
      };
    }

    // MORNING conditions
    if (timeOfDay === "morning") {
      const isWet = weatherGroup === "rain" || weatherGroup === "thunderstorm";
      return {
        card: isWet 
          ? "bg-gradient-to-br from-[#b07b80] via-[#cfa0a3] to-[#9cb2cc] border-t-white/40 border-l-white/30 border-b-black/20 border-r-black/25 text-slate-900 shadow-[0_15px_30px_rgba(0,0,0,0.12),_inset_0_2px_4px_rgba(255,255,255,0.5),_inset_0_-2px_4px_rgba(0,0,0,0.12)]"
          : "bg-gradient-to-br from-[#ff8e75] via-[#ffd099] to-[#82c5ff] border-t-white/50 border-l-white/40 border-b-black/20 border-r-black/20 text-slate-900 shadow-[0_15px_30px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.6),_inset_0_-2px_4px_rgba(0,0,0,0.15)]",
        label: "text-slate-900/85 font-black",
        value: "text-slate-950 font-black tracking-tight",
        subtext: "text-slate-900/90 font-bold",
        barBg: "bg-slate-950/15 border-slate-950/10",
        barFill: "bg-slate-900",
        barFillHumidity: "bg-slate-900",
        barFillAirQuality: "bg-emerald-900",
        airQualityText: "text-emerald-950 font-black",
        analog: "border-slate-850/30 bg-white/40 text-slate-900",
        handHour: "bg-slate-900",
        handMin: "bg-slate-700",
        worldBox: "bg-white/20 border-white/40 text-slate-900",
        divide: "border-slate-950/10",
        badge: "text-slate-900 bg-white/40 border-white/50",
        humidityText: "text-slate-955 font-extrabold",
        rain: isWet,
        stars: false,
        moon: false,
        clouds: weatherGroup !== "clear",
        sun: weatherGroup === "clear",
        lightning: weatherGroup === "thunderstorm"
      };
    }

    // SUNSET conditions
    const isWet = weatherGroup === "rain" || weatherGroup === "thunderstorm";
    return {
      card: isWet
        ? "bg-gradient-to-br from-[#211438] via-[#4a183d] to-[#7c3021] border-t-white/15 border-l-white/10 border-b-black/40 border-r-black/35 text-amber-50 shadow-[0_20px_40px_rgba(0,0,0,0.45),_inset_0_1.5px_3px_rgba(255,255,255,0.25),_inset_0_-3px_5px_rgba(0,0,0,0.45)]"
        : "bg-gradient-to-br from-[#30165e] via-[#7d1c67] to-[#d64720] border-t-white/25 border-l-white/15 border-b-black/35 border-r-black/30 text-amber-50 shadow-[0_20px_40px_rgba(0,0,0,0.4),_inset_0_1.5px_3px_rgba(255,255,255,0.3),_inset_0_-3px_5px_rgba(0,0,0,0.4)]",
      label: "text-amber-200/90 font-black",
      value: "text-white font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
      subtext: "text-amber-100/95 font-bold",
      barBg: "bg-black/35 border-black/40",
      barFill: "bg-amber-400",
      barFillHumidity: "bg-amber-400",
      barFillAirQuality: "bg-emerald-450",
      airQualityText: "text-emerald-400 font-extrabold",
      analog: "border-white/30 bg-black/45 text-white",
      handHour: "bg-slate-100",
      handMin: "bg-slate-300",
      worldBox: "bg-black/20 border-black/40 text-amber-200",
      divide: "border-white/10",
      badge: "text-slate-300 bg-black/30 border-slate-800/80",
      humidityText: "text-amber-200 font-extrabold",
      rain: isWet,
      stars: false,
      moon: false,
      clouds: weatherGroup !== "clear",
      sun: weatherGroup === "clear",
      lightning: weatherGroup === "thunderstorm"
    };
  };

  const atm = getAtmosphereConfig();

  const getBatteryCardClass = () => {
    if (battery.supported) {
      if (battery.charging) {
        return "border-emerald-500/25 dark:border-emerald-500/15 shadow-[inset_0_0_20px_rgba(16,185,129,0.04)]";
      }
      if (battery.level < 20) {
        return "border-rose-500/25 dark:border-rose-500/15 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] animate-pulse";
      }
    }
    return "border-border bg-card hover:border-primary/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]";
  };

  useEffect(() => {
    setCurrentTime(new Date());
    // Update every 100ms for smooth sweeping clock hands
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);

    const pingTimer = setInterval(() => {
      setPing(Math.max(4, Math.min(60, 12 + Math.floor(Math.random() * 15 - 7))));
    }, 4000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(pingTimer);
    };
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const navConn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (navConn) {
      setConnectionInfo({
        downlink: navConn.downlink,
        effectiveType: navConn.effectiveType,
      });
      const updateConn = () => {
        setConnectionInfo({
          downlink: navConn.downlink,
          effectiveType: navConn.effectiveType,
        });
      };
      navConn.addEventListener("change", updateConn);
    }

    if ((navigator as any).getBattery) {
      (navigator as any).getBattery().then((batt: any) => {
        setBattery({
          level: Math.round(batt.level * 100),
          charging: batt.charging,
          supported: true,
        });
        const onLevelChange = () => {
          setBattery((prev) => ({ ...prev, level: Math.round(batt.level * 100) }));
        };
        const onChargingChange = () => {
          setBattery((prev) => ({ ...prev, charging: batt.charging }));
        };
        batt.addEventListener("levelchange", onLevelChange);
        batt.addEventListener("chargingchange", onChargingChange);
      });
    }

    const ua = navigator.userAgent;
    setUserAgentStr(ua);
    let detectedOS = "Unknown";
    let detectedBrowser = "Unknown";
    if (ua.indexOf("Windows") !== -1 || ua.indexOf("Win") !== -1) detectedOS = "Windows";
    else if (ua.indexOf("Android") !== -1) detectedOS = "Android";
    else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1 || ua.indexOf("iPod") !== -1) detectedOS = "iOS";
    else if (ua.indexOf("Mac") !== -1) detectedOS = "macOS";
    else if (ua.indexOf("Linux") !== -1) detectedOS = "Linux";
    else if (ua.indexOf("X11") !== -1) detectedOS = "Unix";

    if (ua.indexOf("Firefox") !== -1) {
      detectedBrowser = "Firefox";
    } else if (ua.indexOf("Edg") !== -1 || ua.indexOf("Edge") !== -1) {
      detectedBrowser = "Microsoft Edge";
    } else if (ua.indexOf("OPR") !== -1 || ua.indexOf("Opera") !== -1) {
      detectedBrowser = "Opera";
    } else if (ua.indexOf("Chrome") !== -1) {
      detectedBrowser = "Chrome";
    } else if (ua.indexOf("Safari") !== -1) {
      detectedBrowser = "Safari";
    }

    setSystem({ os: detectedOS, browser: detectedBrowser });

    const updateScreenSize = () => {
      setScreenSize(`${window.innerWidth} x ${window.innerHeight}`);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let lat = -6.2088;
        let lon = 106.8456;
        let cityName = "Jakarta, ID";
        let tzName = "Asia/Jakarta";

        // Try IP-based geolocation (freeipapi.com as primary, ipapi.co as secondary backup)
        try {
          const geoRes = await fetch("https://freeipapi.com/api/json");
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.latitude && geoData.longitude) {
              lat = geoData.latitude;
              lon = geoData.longitude;
              cityName = geoData.cityName 
                ? `${geoData.cityName}, ${geoData.countryCode || "ID"}` 
                : "Local Area";
              if (geoData.timeZone) {
                tzName = geoData.timeZone;
              }
            }
          } else {
            // Backup: Try ipapi.co
            const backupRes = await fetch("https://ipapi.co/json/");
            if (backupRes.ok) {
              const geoData = await backupRes.json();
              if (geoData.latitude && geoData.longitude) {
                lat = geoData.latitude;
                lon = geoData.longitude;
                cityName = geoData.city 
                  ? `${geoData.city}, ${geoData.country_code || "ID"}` 
                  : "Local Area";
                if (geoData.timezone) {
                  tzName = geoData.timezone;
                }
              }
            }
          }
        } catch (e) {
          console.warn("Primary Geolocation failed, trying backup:", e);
          try {
            const backupRes = await fetch("https://ipapi.co/json/");
            if (backupRes.ok) {
              const geoData = await backupRes.json();
              if (geoData.latitude && geoData.longitude) {
                lat = geoData.latitude;
                lon = geoData.longitude;
                cityName = geoData.city 
                  ? `${geoData.city}, ${geoData.country_code || "ID"}` 
                  : "Local Area";
                if (geoData.timezone) {
                  tzName = geoData.timezone;
                }
              }
            }
          } catch (err) {
            console.warn("All IP Geolocation options failed, using fallback:", err);
          }
        }

        // Fetch using current endpoint to get actual real-time humidity, temperature, is_day, weather_code
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=${encodeURIComponent(tzName)}`
        );
        if (res.ok) {
          const data = await res.json();
          const curr = data.current;
          
          setWeather({
            temp: Math.round(curr.temperature_2m),
            feelsLike: Math.round(curr.apparent_temperature),
            humidity: curr.relative_humidity_2m,
            windSpeed: Math.round(curr.wind_speed_10m),
            weatherCode: curr.weather_code,
            isDay: curr.is_day === 1,
            city: cityName,
            loading: false,
            error: false,
          });

          const group = getWeatherGroup(curr.weather_code);
          setActiveWeatherEffect(group);
        } else {
          setWeather((prev) => ({ ...prev, loading: false, error: true }));
        }
      } catch {
        setWeather((prev) => ({ ...prev, loading: false, error: true }));
      }
    };
    fetchWeather();
  }, []);

  const runSpeedTest = () => {
    setIsTesting(true);
    setProgress(0);
    setSpeedResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          const simulatedSpeed = (35 + Math.random() * 85).toFixed(1);
          setSpeedResult(simulatedSpeed);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const formatVisitorTime = () => {
    if (!currentTime) return "00:00:00";
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatVisitorDate = () => {
    if (!currentTime) return "Loading...";
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getVisitorTimezone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  };

  const getDayProgress = () => {
    if (!currentTime) return "0.0";
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return ((totalSeconds / 86400) * 100).toFixed(1);
  };

  const getSFOTime = () => {
    if (!currentTime) return "00:00";
    const sfoDate = new Date(currentTime.getTime() - 14 * 60 * 60 * 1000);
    return sfoDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getUTCTime = () => {
    if (!currentTime) return "00:00";
    const utcDate = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000);
    return utcDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getTokyoTime = () => {
    if (!currentTime) return "00:00";
    const tyoDate = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
    return tyoDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getLondonTime = () => {
    if (!currentTime) return "00:00";
    const ldnDate = new Date(currentTime.getTime() - 6 * 60 * 60 * 1000);
    return ldnDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getTimePhaseMessage = () => {
    if (!currentTime) return "";
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 11) return "Morning Phase - Great time to outline daily coding objectives.";
    if (hours >= 11 && hours < 16) return "Afternoon Phase - Peak productivity for logic implementation & system designs.";
    if (hours >= 16 && hours < 19) return "Evening Phase - Reviewing pull requests and completing pending tasks.";
    return "Night Phase - Deep focus hours, ideal for refactoring and complex debugging.";
  };

  return (
    <section id="console" className="pt-24 pb-12 md:pt-32 md:pb-24 relative overflow-hidden bg-dot-pattern transition-colors duration-500">
      
      {/* Inject custom card rain/cloud/lightning/twinkle animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cardRain {
          0% { transform: translateY(-20px) rotate(15deg); opacity: 0; }
          45% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(220px) rotate(15deg); opacity: 0; }
        }
        @keyframes cardClouds {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes cardTwinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes cardLightning {
          0%, 94%, 100% { opacity: 0; }
          95%, 97% { opacity: 0.35; }
          96% { opacity: 0.65; }
        }
      `}} />

      {/* Background Weather Simulation Overlay (Viewport Full Page) */}
      <AnimatePresence>
        {activeWeatherEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
          >
            {/* Rain effect */}
            {activeWeatherEffect === "rain" && (
              <div className="absolute inset-0 flex justify-around opacity-45">
                {PAGE_RAIN_DROPS.map((drop, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: "120vh", opacity: [0, 0.7, 0.7, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: drop.duration,
                      delay: drop.delay,
                      ease: "linear",
                    }}
                    style={{ left: drop.left }}
                    className="absolute w-[1.2px] h-14 bg-sky-400/40 dark:bg-sky-400/30"
                  />
                ))}
              </div>
            )}

            {/* Thunderstorm effect */}
            {activeWeatherEffect === "thunderstorm" && (
              <>
                <div className="absolute inset-0 flex justify-around opacity-55">
                  {PAGE_STORM_DROPS.map((drop, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: "120vh", opacity: [0, 0.8, 0.8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: drop.duration,
                        delay: drop.delay,
                        ease: "linear",
                      }}
                      style={{ left: drop.left }}
                      className="absolute w-[1.2px] h-16 bg-sky-300/40 dark:bg-sky-300/30"
                    />
                  ))}
                </div>
                {/* Lightning flashes */}
                <motion.div
                  animate={{ opacity: [0, 0.5, 0, 0.8, 0, 0, 0, 0.4, 0, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.02, 0.04, 0.06, 0.08, 0.5, 0.52, 0.54, 0.56, 1],
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-white/20 dark:bg-white/10"
                />
              </>
            )}

            {/* Clear effect (warm sunbeams floating up) */}
            {activeWeatherEffect === "clear" && (
              <div className="absolute inset-0">
                {PAGE_SUNBEAMS.map((beam, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
                    animate={{ y: "-10vh", opacity: [0, 0.4, 0.4, 0], scale: [0.5, 1.4, 0.8] }}
                    transition={{
                      repeat: Infinity,
                      duration: beam.duration,
                      delay: beam.delay,
                      ease: "easeInOut",
                    }}
                    style={{ left: beam.left }}
                    className="absolute w-5 h-5 rounded-full bg-amber-400/8 dark:bg-amber-400/5 blur-[3px]"
                  />
                ))}
              </div>
            )}

            {/* Cloudy & Fog effect */}
            {(activeWeatherEffect === "cloudy" || activeWeatherEffect === "fog") && (
              <div className="absolute inset-0 opacity-60">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: "-40%", y: `${10 + i * 12}%`, opacity: 0 }}
                    animate={{ x: "120%", opacity: [0, 0.12, 0.12, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 35 + i * 10,
                      delay: PAGE_CLOUDS_DELAYS[i],
                      ease: "linear",
                    }}
                    className="absolute h-20 w-80 rounded-full bg-slate-300/5 dark:bg-zinc-700/5 blur-[30px] z-0"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

        {/* Compact Responsive Grid: 2 columns on mobile, 3 columns on desktop, flowing dense to prevent layout gaps */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 grid-flow-dense">
          
          {/* WIDGET 1: Developer Profile & CTA Card (Takes 2 cols on mobile/desktop) */}
          <div className="col-span-2 md:col-span-2 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-border bg-card/45 backdrop-blur-md hover:border-primary/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[190px] md:min-h-[220px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
            
            {/* Top Row: Avatar & Status Badge */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg md:rounded-xl border border-border bg-muted shrink-0 shadow-inner">
                  <Image
                    src="/semipro_enggal.png"
                    alt="Enggal Bima Sakti"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h1 className="text-sm md:text-lg font-black tracking-tight text-foreground leading-none md:leading-normal">
                    Enggal Bima Sakti
                  </h1>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-semibold mt-0.5 md:mt-0">
                    CS Student @ UI
                  </p>
                </div>
              </div>
              
              <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>
            </div>

            {/* Middle: Short Bio */}
            <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed font-medium my-3 md:my-4">
              I build high-performance backend services, explore AI/ML, and design modern, responsive web applications. Final-year Computer Science student.
            </p>

            {/* Bottom Row: CTAs */}
            <div className="flex flex-wrap items-center gap-2 mt-auto">
              <a
                href="#projects"
                className="group btn-logo-glossy flex items-center justify-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs squircle-sm md:squircle-md text-center shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                Projects
                <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div
                title="Resume coming soon"
                className="flex items-center justify-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-border/40 bg-card/20 text-muted-foreground/50 font-bold text-[10px] md:text-xs squircle-sm md:squircle-md cursor-not-allowed opacity-55 select-none"
              >
                <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground/45" />
                Resume
              </div>
            </div>
          </div>

          {/* WIDGET 2: Truly Merged Time & Weather Card (Takes 2 cols on mobile/desktop, 3D Skeuomorphic) */}
          <div
            onClick={() => setActiveModal("atmosphere")}
            className={cn(
              "col-span-2 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-500 squircle-lg relative overflow-hidden select-none shadow-2xl transform-gpu hover:-translate-y-1.5 hover:shadow-[0_25px_45px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-[0.99] will-change-transform flex flex-col justify-between min-h-[190px] md:min-h-[220px] cursor-pointer",
              atm.card
            )}
          >
            {/* DYNAMIC BACKGROUND 3D ATMOSPHERIC DEPTH LAYERS */}
            {atm.sun && (
              <div className="absolute top-4 right-1/4 w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-455 rounded-full blur-[1.2px] shadow-[0_4px_14px_rgba(245,158,11,0.55),_inset_-1px_-1px_3px_rgba(0,0,0,0.1)] opacity-90 pointer-events-none z-0" />
            )}

            {atm.moon && (
              <div className="absolute top-4 right-1/4 w-8 h-8 rounded-full border-r-2 border-t-2 border-amber-100 shadow-[inset_-3px_0px_6px_rgba(255,255,255,0.1),_0_0_10px_rgba(254,243,199,0.25)] blur-[0.3px] pointer-events-none z-0 animate-pulse" />
            )}

            {atm.stars && (
              <>
                {Array.from({ length: atm.starCount || 3 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      animation: "cardTwinkle 3s ease-in-out infinite",
                      animationDelay: `${i * 0.8}s`,
                      left: `${15 + i * 25}%`,
                      top: `${12 + (i % 2) * 15}%`
                    }}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full pointer-events-none z-0"
                  />
                ))}
              </>
            )}

            {atm.clouds && (
              <>
                <div style={{ animation: "cardClouds 28s linear infinite" }} className="absolute top-8 left-0 w-36 h-8 bg-white/20 rounded-full blur-[0.5px] shadow-[0_6px_12px_rgba(0,0,0,0.06)] pointer-events-none z-0" />
                <div style={{ animation: "cardClouds 38s linear infinite", animationDelay: "-12s" }} className="absolute bottom-6 left-0 w-24 h-6 bg-white/15 rounded-full blur-[0.5px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] pointer-events-none z-0" />
              </>
            )}

            {atm.rain && (
              <>
                <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/35 blur-md pointer-events-none z-0" />
                {CARD_RAIN_DROPS.map((drop, i) => (
                  <div
                    key={i}
                    style={{
                      left: drop.left,
                      top: drop.top,
                      animation: `cardRain ${drop.duration} linear infinite`,
                      animationDelay: drop.delay
                    }}
                    className="absolute w-[0.8px] h-4 bg-sky-300/40 pointer-events-none z-0"
                  />
                ))}
              </>
            )}

            {atm.lightning && (
              <div style={{ animation: "cardLightning 5s infinite" }} className="absolute inset-0 bg-white/25 pointer-events-none z-0" />
            )}

            {/* Header: Unified labels */}
            <div className="flex items-center justify-between w-full z-10">
              <span className={cn("text-[8px] md:text-[9px] uppercase tracking-widest flex items-center gap-1.5", atm.label)}>
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                Atmosphere & Time
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={cn("text-[7px] md:text-[8px] font-black px-1.5 py-0.5 rounded-full border flex items-center gap-1 shrink-0", atm.badge)}>
                  <Navigation className="w-2 h-2 text-sky-400" />
                  {weather.city}
                </span>
              </div>
            </div>

            {/* Main Area: Time and Temp combined */}
            <div className="flex items-center justify-between gap-4 my-2.5 z-10 w-full">
              <div className="flex items-center gap-3 md:gap-5">
                {/* Sweeping Centered Analog Clock */}
                <div className={cn(
                  "relative w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center backdrop-blur-sm shadow-md shrink-0 transition-colors duration-300",
                  atm.analog
                )}>
                  <div
                    style={{ transform: `rotate(${hands.hr}deg)` }}
                    className="absolute inset-0 flex justify-center"
                  >
                    <div className={cn("w-[2px] h-[32%] rounded-full mt-[18%] origin-bottom", atm.handHour)} />
                  </div>
                  <div
                    style={{ transform: `rotate(${hands.min}deg)` }}
                    className="absolute inset-0 flex justify-center"
                  >
                    <div className={cn("w-[1.2px] h-[40%] rounded-full mt-[10%] origin-bottom", atm.handMin)} />
                  </div>
                  <div
                    style={{ transform: `rotate(${hands.sec}deg)` }}
                    className="absolute inset-0 flex justify-center"
                  >
                    <div className="w-[0.8px] h-[45%] bg-amber-500 dark:bg-sky-400 rounded-full mt-[5%] origin-bottom" />
                  </div>
                  <div className="absolute w-1 h-1 rounded-full bg-amber-500 dark:bg-sky-400 z-20" />
                </div>

                <div>
                  <h3 className={cn("text-xl md:text-3xl tabular-nums leading-none", atm.value)}>
                    {formatVisitorTime()}
                  </h3>
                  <p className={cn("text-[8px] md:text-[10px] mt-1 flex items-center gap-1 font-extrabold", atm.subtext)}>
                    <Calendar className="w-3 h-3 opacity-85 shrink-0" />
                    {formatVisitorDate()}
                  </p>
                </div>
              </div>

              {/* Weather Status Integrated */}
              {!weather.loading && !weather.error && (
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <div className="flex items-baseline justify-end gap-0.5">
                      <span className={cn("text-xl md:text-3xl tabular-nums leading-none", atm.value)}>
                        {weather.temp}
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold">&deg;C</span>
                    </div>
                    <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-wider", atm.value)}>
                      {getWeatherDesc(weather.weatherCode)}
                    </p>
                  </div>
                  <div className="p-1.5 bg-background/80 border border-border/40 rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <AnimatedWeatherIcon code={weather.weatherCode} isDay={weather.isDay} />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Unified Submetrics grid */}
            <div className={cn("grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[8px] md:text-[9px] font-black border-t w-full z-10", atm.divide)}>
              <div className="space-y-1">
                <div className={cn("flex justify-between", atm.subtext)}>
                  <span>DAY PROGRESS</span>
                  <span>{getDayProgress()}%</span>
                </div>
                <div className={cn("w-full h-1 border rounded-full overflow-hidden", atm.barBg)}>
                  <div className={cn("h-full rounded-full", atm.barFill)} style={{ width: `${getDayProgress()}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className={cn("flex justify-between", atm.subtext)}>
                  <span>HUMIDITY</span>
                  <span>{weather.humidity}%</span>
                </div>
                <div className={cn("w-full h-1 border rounded-full overflow-hidden", atm.barBg)}>
                  <div className={cn("h-full rounded-full", atm.barFillHumidity)} style={{ width: `${weather.humidity}%` }} />
                </div>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className={cn("flex justify-between", atm.subtext)}>
                  <span>AIR QUALITY</span>
                  <span className={cn(atm.airQualityText)}>42 (Good)</span>
                </div>
                <div className={cn("w-full h-1 border rounded-full overflow-hidden", atm.barBg)}>
                  <div className={cn("h-full rounded-full", atm.barFillAirQuality)} style={{ width: "42%" }} />
                </div>
              </div>

              <div className={cn("flex justify-between items-center px-2 py-1 rounded border", atm.worldBox)}>
                <span>FEELS / WIND</span>
                <span className="tabular-nums font-black">{weather.feelsLike}° • {weather.windSpeed}k/h</span>
              </div>

              <div className={cn("flex justify-between items-center px-2 py-1 rounded border", atm.worldBox)}>
                <span>UV INDEX</span>
                <span className="font-black">2 (Low)</span>
              </div>
            </div>
          </div>

          {/* WIDGET 3: System Monitor Card (Takes 1 col on mobile/desktop, Clickable) */}
          <div
            onClick={() => setActiveModal("system")}
            className={cn(
              "col-span-1 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[190px] md:min-h-[220px] group relative overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] select-none",
              getBatteryCardClass()
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none z-0" />
            
            {/* Header */}
            <span className="text-[8px] md:text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1 z-10">
              <Laptop className="w-3.5 h-3.5 text-primary" />
              System
            </span>

            {/* Content Details */}
            <div className="my-1.5 space-y-2 z-10 w-full text-[8px] md:text-[9px] font-semibold text-muted-foreground">
              <div className="flex justify-between items-center gap-2">
                <span>OS / Browser:</span>
                <span className="font-bold text-foreground truncate max-w-[100px] xs:max-w-[130px] sm:max-w-[160px]">{system.os} • {system.browser}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Viewport:</span>
                <span className="font-bold text-foreground tabular-nums">{screenSize}</span>
              </div>


              {/* Battery */}
              <div className="flex justify-between items-center border-t border-border/40 pt-1.5">
                <span>Battery / AC:</span>
                <span className="font-bold text-foreground">{battery.supported ? `${battery.level}%` : "AC Adapter"}</span>
              </div>
              {battery.supported ? (
                <div className="relative w-full h-1 bg-muted/65 border border-border/40 rounded-full overflow-hidden flex items-center px-0.5 shadow-inner">
                  <motion.div
                    className={cn(
                      "h-0.5 rounded-full",
                      battery.charging 
                        ? "bg-gradient-to-r from-emerald-400 to-teal-500" 
                        : "bg-logo-gradient"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${battery.level}%` }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-0.5 text-[7px] md:text-[8px] text-emerald-500 font-bold bg-emerald-500/5 px-1 py-0.5 rounded border border-emerald-500/10 truncate">
                  <ShieldCheck className="w-2.5 h-2.5 shrink-0" /> Stable AC Power
                </div>
              )}
            </div>
          </div>

          {/* WIDGET 4: Internet Speed Test (Takes 1 col on mobile/desktop, Clickable) */}
          <div
            onClick={() => setActiveModal("network")}
            className="col-span-1 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-border bg-card hover:border-primary/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[190px] md:min-h-[220px] group relative overflow-hidden cursor-pointer hover:scale-[1.01] active:scale-[0.99] select-none"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[8px] md:text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-primary" />
                Network
              </span>
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[7px] md:text-[8px] font-bold border ${
                isOnline 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}>
                {isOnline ? "On" : "Off"}
              </span>
            </div>

            <div className="space-y-1.5 my-1.5 w-full text-[8px] md:text-[9px] font-semibold text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Ping:</span>
                <span className="font-bold text-foreground tabular-nums">{ping !== null ? `${ping} ms` : "--"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Downlink:</span>
                <span className="font-bold text-foreground tabular-nums">{connectionInfo?.downlink ? `${connectionInfo.downlink}M` : "--"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Type:</span>
                <span className="font-bold text-foreground uppercase truncate max-w-[50px]">{connectionInfo?.effectiveType || "Wifi/LAN"}</span>
              </div>
            </div>

            {/* Test speed button */}
            <div className="w-full">
              {isTesting ? (
                <div className="space-y-0.5">
                  <div className="flex justify-between items-center text-[7px] md:text-[9px] font-bold text-muted-foreground">
                    <span>Testing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden border border-border/40">
                    <motion.div
                      className="h-full bg-logo-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      runSpeedTest();
                    }}
                    disabled={!isOnline}
                    className="flex-1 btn-logo-glossy py-1 md:py-1.5 rounded-lg md:rounded-xl font-bold text-[9px] md:text-[10px] disabled:opacity-50 disabled:cursor-not-allowed text-center transition-all focus-visible:outline-none cursor-pointer"
                  >
                    Run
                  </button>
                  {speedResult && (
                    <div className="flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-1 rounded-lg text-emerald-500 font-bold text-[9px] md:text-[10px]">
                      <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                      <span>{speedResult === "Failed" ? "Err" : `${Math.round(parseFloat(speedResult))}M`}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer log */}
        <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[8px] md:text-[9px] text-muted-foreground/75 font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            All systems operational
          </span>
          <span>Dashboard Console V1.1.0</span>
        </div>
      </div>

      {/* INTERACTIVE DETAIL MODALS */}
      <AnimatePresence>
        {activeModal && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-background z-[150] backdrop-blur-sm"
            />

            {/* Modal Box */}
            <div className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-6 overflow-y-auto no-scrollbar">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 15 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 15 }}
                 className="relative w-full max-w-3xl bg-card border border-border rounded-2xl md:rounded-[28px] overflow-hidden shadow-2xl p-3 sm:p-6 md:p-8 squircle-lg my-4 md:my-8 focus:outline-none"
               >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full border border-border/80 bg-background/60 backdrop-blur-md text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted/80 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* MODAL CONTENT: UNIFIED ATMOSPHERE & TIME */}
                {activeModal === "atmosphere" && (
                  <div className="space-y-3.5 sm:space-y-6">
                    <div className="flex items-center gap-2 border-b border-border/40 pb-2 md:pb-4">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-base font-extrabold text-foreground">Atmosphere & Chronology Diagnostics</h3>
                        <p className="text-[7.5px] sm:text-[10px] text-muted-foreground font-semibold">Unified Real-time Coordinates for {weather.city}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
                      
                      {/* Left: Clock & Chronology */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl border border-border/40 bg-muted/20">
                          {/* SWEETER, MORE VISIBLE ANALOG CLOCK FACE */}
                          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border border-border/80 bg-muted/25 dark:bg-black/25 flex items-center justify-center">
                            {/* Hour ticks */}
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                style={{ transform: `rotate(${i * 30}deg)` }}
                                className="absolute inset-0 flex justify-center"
                              >
                                <div className={cn(
                                  "rounded-full mt-0.5 sm:mt-1.5",
                                  i % 3 === 0 
                                    ? "w-[1px] sm:w-[1.2px] h-1.5 sm:h-2 bg-foreground dark:bg-slate-205 bg-slate-800" 
                                    : "w-[0.6px] sm:w-[0.8px] h-0.5 sm:h-1 bg-muted-foreground/35"
                                )} />
                              </div>
                            ))}

                            {/* Hour hand */}
                            <div
                              style={{ transform: `rotate(${hands.hr}deg)` }}
                              className="absolute inset-0 flex justify-center"
                            >
                              <div className={cn(
                                "w-[1.2px] sm:w-[2px] h-[30%] rounded-full mt-[20%] origin-bottom",
                                timeOfDay === "night" ? "bg-slate-200" : "bg-slate-800"
                              )} />
                            </div>
                            
                            {/* Minute hand */}
                            <div
                              style={{ transform: `rotate(${hands.min}deg)` }}
                              className="absolute inset-0 flex justify-center"
                            >
                              <div className={cn(
                                "w-[0.8px] sm:w-[1.2px] h-[40%] rounded-full mt-[10%] origin-bottom",
                                timeOfDay === "night" ? "bg-slate-300" : "bg-slate-700"
                              )} />
                            </div>
                            
                            {/* Sweeping Second hand */}
                            <div
                              style={{ transform: `rotate(${hands.sec}deg)` }}
                              className="absolute inset-0 flex justify-center"
                            >
                              <div className="w-[0.5px] sm:w-[0.6px] h-[45%] bg-amber-500 dark:bg-sky-400 rounded-full mt-[5%] origin-bottom" />
                            </div>

                            {/* Center dot */}
                            <div className="absolute w-1.2 sm:w-1.5 h-1.2 sm:h-1.5 rounded-full bg-amber-500 dark:bg-sky-400 z-20" />
                          </div>

                          {/* Digital display */}
                          <div className="text-center mt-2 sm:mt-4">
                            <h4 className="text-sm sm:text-lg md:text-xl font-black tracking-tight tabular-nums text-foreground">
                              {formatVisitorTime()}
                            </h4>
                            <p className="text-[8.5px] sm:text-[9px] font-bold text-muted-foreground mt-0.5">
                              {formatVisitorDate()}
                            </p>
                          </div>
                        </div>

                        {/* World clocks grid */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Tech Hub Times</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[9.5px] sm:text-xs font-semibold">
                            <div className="flex justify-between items-center bg-card/65 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">{weather.city.split(',')[0]} (Local)</span>
                              <span className="font-bold text-foreground tabular-nums text-[9px] sm:text-xs">{formatVisitorTime().substring(0,5)}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/65 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">London (BST)</span>
                              <span className="font-bold text-foreground tabular-nums text-[9px] sm:text-xs">{getLondonTime()}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/65 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">Tokyo (JST)</span>
                              <span className="font-bold text-foreground tabular-nums text-[9px] sm:text-xs">{getTokyoTime()}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/65 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">SFO (PDT)</span>
                              <span className="font-bold text-foreground tabular-nums text-[9px] sm:text-xs">{getSFOTime()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Weather & Atmosphere */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        {/* Big Temp Showcase */}
                        <div className="flex items-center justify-between bg-muted/20 p-2 sm:p-4 rounded-xl border border-border/40">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1 sm:p-1.5 bg-background border border-border/50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm shrink-0">
                              <div className="scale-85 sm:scale-100 origin-center flex items-center justify-center">
                                <AnimatedWeatherIcon code={weather.weatherCode} isDay={weather.isDay} />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-foreground leading-none tabular-nums">
                                {weather.temp}&deg;C
                              </h4>
                              <p className="text-[9px] sm:text-[10px] md:text-xs font-extrabold text-foreground mt-0.5">
                                {getWeatherDesc(weather.weatherCode)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted-foreground leading-normal shrink-0">
                            <div>Feels: <span className="text-foreground font-black">{weather.feelsLike}&deg;C</span></div>
                            <div>Wind: <span className="text-foreground font-black">{weather.windSpeed} km/h</span></div>
                          </div>
                        </div>

                        {/* Extra indicators */}
                        <div className="space-y-1 sm:space-y-2 text-[9.5px] sm:text-xs font-semibold">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Atmospheric Indication</h5>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Humidity Level</span>
                              <span className="font-bold text-foreground">{weather.humidity}%</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Air Quality</span>
                              <span className="font-bold text-emerald-500">42 (Good)</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">UV Sun Index</span>
                              <span className="font-bold text-amber-500">2 (Low)</span>
                            </div>
                          </div>
                        </div>

                        {/* Day progress indicator */}
                        <div className="space-y-1 p-2 sm:p-3 rounded-xl border border-border/60 bg-background/40">
                          <div className="flex justify-between text-[8.5px] sm:text-[9px] font-black text-muted-foreground">
                            <span>DAY PROGRESS</span>
                            <span>{getDayProgress()}%</span>
                          </div>
                          <div className="w-full h-1 bg-muted border border-border/40 rounded-full overflow-hidden">
                            <div className="bg-logo-gradient h-full rounded-full" style={{ width: `${getDayProgress()}%` }} />
                          </div>
                          <p className="text-[8px] sm:text-[9px] text-muted-foreground leading-normal pt-0.5 font-semibold line-clamp-1 sm:line-clamp-none">
                            {getTimePhaseMessage()}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Explanatory text */}
                    <p className="text-[7.5px] sm:text-[9.5px] text-muted-foreground leading-normal bg-primary/5 p-2 sm:p-3 rounded-xl border border-primary/10">
                      <strong>Dynamic Environmental Rendering:</strong> Parsed real-time weather codes and local chronology metrics. Background, sun/moon positions, and particle overlays adapt dynamically.
                    </p>
                  </div>
                )}

                {/* MODAL CONTENT: SYSTEM */}
                {activeModal === "system" && (
                  <div className="space-y-3.5 sm:space-y-6">
                    <div className="flex items-center gap-2 border-b border-border/40 pb-2 md:pb-4">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Laptop className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-base font-extrabold text-foreground">Client Device Diagnostics</h3>
                        <p className="text-[7.5px] sm:text-[10px] text-muted-foreground font-semibold">Active Client Capabilities</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-6 items-stretch">
                      {/* Left Column: Screen & Viewport Stats */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Screen & Viewport</h5>
                          <div className="space-y-1.5 text-[9.5px] sm:text-xs font-semibold">
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">OS Platform</span>
                              <span className="font-bold text-foreground">{system.os}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Browser</span>
                              <span className="font-bold text-foreground">{system.browser}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Viewport</span>
                              <span className="font-bold text-foreground tabular-nums">{screenSize}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Pixel Ratio</span>
                              <span className="font-bold text-foreground tabular-nums">{typeof window !== "undefined" ? window.devicePixelRatio : 1}x</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Hardware & Network Power Status */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Hardware & Power</h5>
                          <div className="space-y-1.5 text-[9.5px] sm:text-xs font-semibold">
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Battery Level</span>
                              <span className="font-bold text-foreground">{battery.supported ? `${battery.level}%` : "100%"}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Power Source</span>
                              <span className="font-bold text-foreground">{battery.supported && battery.charging ? "Battery Charging" : battery.supported ? "Battery Discharging" : "AC External Power"}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Connection Type</span>
                              <span className="font-bold text-foreground uppercase">{connectionInfo?.effectiveType || "Wifi/Ethernet"}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Latency</span>
                              <span className="font-bold text-foreground tabular-nums">{ping !== null ? `${ping} ms` : "0 ms"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Explanatory text */}
                    <p className="text-[7.5px] sm:text-[9.5px] text-muted-foreground leading-normal bg-primary/5 p-2 sm:p-3 rounded-xl border border-primary/10">
                      <strong>Hardware Diagnostics:</strong> Displays detected OS, browser version, viewport resolutions, battery charging telemetry, and active network connections.
                    </p>
                  </div>
                )}

                {/* MODAL CONTENT: NETWORK */}
                {activeModal === "network" && (
                  <div className="space-y-3.5 sm:space-y-6">
                    <div className="flex items-center gap-2 border-b border-border/40 pb-2 md:pb-4">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Gauge className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-base font-extrabold text-foreground">Network Diagnostics & Speed Test</h3>
                        <p className="text-[7.5px] sm:text-[10px] text-muted-foreground font-semibold">Active Connection Telemetry</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-6 items-stretch">
                      {/* Left Column: Connection Telemetry */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Connection Telemetry</h5>
                          <div className="space-y-1.5 text-[9.5px] sm:text-xs font-semibold">
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Status</span>
                              <span className={cn("font-extrabold", isOnline ? "text-emerald-500" : "text-destructive")}>
                                {isOnline ? "Online" : "Offline"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/60">
                              <span className="text-muted-foreground">Ping / Latency</span>
                              <span className="font-bold text-foreground tabular-nums">{ping !== null ? `${ping} ms` : "--"}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">Type</span>
                              <span className="font-bold text-foreground uppercase truncate max-w-[70px] sm:max-w-none">{connectionInfo?.effectiveType || "Wifi/LAN"}</span>
                            </div>
                            <div className="flex justify-between items-center bg-card/60 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/50">
                              <span className="text-muted-foreground">Bandwidth</span>
                              <span className="font-bold text-foreground tabular-nums">{connectionInfo?.downlink ? `${connectionInfo.downlink} Mbps` : "--"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Speed Test Panel */}
                      <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                        <div className="space-y-2 h-full flex flex-col justify-between">
                          <h5 className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">Bandwidth Diagnostics</h5>
                          <div className="p-2 sm:p-4 rounded-xl border border-border/60 bg-background/40 flex flex-col items-center justify-center flex-1 min-h-[90px] sm:min-h-[120px] relative overflow-hidden">
                            {isTesting ? (
                              <div className="space-y-1.5 w-full text-center">
                                <div className="relative w-8 h-8 sm:w-12 sm:h-12 mx-auto flex items-center justify-center">
                                  <div className="absolute inset-0 rounded-full border border-primary/20 border-t-primary animate-spin" />
                                  <span className="text-[9.5px] sm:text-xs font-black text-foreground tabular-nums">{progress}%</span>
                                </div>
                                <p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground animate-pulse">Running downlink test...</p>
                              </div>
                            ) : (
                              <div className="text-center space-y-1.5 w-full">
                                {speedResult ? (
                                  <div className="space-y-0.5">
                                    <span className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-widest text-muted-foreground">DOWNLOAD SPEED</span>
                                    <h4 className="text-xl sm:text-2xl font-black text-emerald-500 tracking-tight leading-none tabular-nums">
                                      {speedResult} <span className="text-[9px] sm:text-xs font-bold">Mbps</span>
                                    </h4>
                                  </div>
                                ) : (
                                  <div className="space-y-0.5">
                                    <h4 className="text-[10px] sm:text-xs font-extrabold text-foreground">Downlink Diagnostic</h4>
                                    <p className="text-[8px] sm:text-[9px] text-muted-foreground leading-normal max-w-[120px] sm:max-w-xs mx-auto">
                                      Run bandwidth diagnostics.
                                    </p>
                                  </div>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    runSpeedTest();
                                  }}
                                  disabled={!isOnline}
                                  className="w-full btn-logo-glossy py-1 rounded-lg font-bold text-[9.5px] sm:text-[10px] disabled:opacity-50 disabled:cursor-not-allowed text-center transition-all focus-visible:outline-none cursor-pointer mt-1"
                                >
                                  Test Speed
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Explanatory text */}
                    <p className="text-[7.5px] sm:text-[9.5px] text-muted-foreground leading-normal bg-primary/5 p-2 sm:p-3 rounded-xl border border-primary/10">
                      <strong>Bandwidth Telemetry:</strong> Evaluates simulated downlink transmission speeds and active latency profiles.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
