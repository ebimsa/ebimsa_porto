"use client";

import React, { useState, useEffect } from "react";
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
  Navigation
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
      <div className="relative w-12 h-12 flex items-center justify-center">
        {isDay ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="text-amber-500"
          >
            <Sun className="w-9 h-9" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-amber-200 dark:text-amber-100"
          >
            <Moon className="w-9 h-9 fill-amber-200/10 dark:fill-amber-100/10" />
          </motion.div>
        )}
      </div>
    );
  }

  if (code === 1 || code === 2 || code === 3) {
    return (
      <div className="relative w-12 h-12">
        <motion.div
          animate={{ y: [0, -1.5, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1 left-1 text-amber-400"
        >
          <Sun className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ x: [-1.5, 1.5, -1.5], y: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-1 right-1 text-zinc-400 dark:text-zinc-300"
        >
          <Cloud className="w-8 h-8 fill-zinc-400/10" />
        </motion.div>
      </div>
    );
  }

  if (code === 45 || code === 48) {
    return (
      <div className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5">
        <motion.div
          animate={{ x: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-8 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full"
        />
        <motion.div
          animate={{ x: [2.5, -2.5, 2.5] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="w-10 h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full"
        />
        <motion.div
          animate={{ x: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="w-7 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full"
        />
      </div>
    );
  }

  if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
    const isHeavy = code === 80 || code === 81 || code === 82 || code === 65;
    return (
      <div className="relative w-12 h-12 flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-zinc-400 dark:text-zinc-300 z-10"
        >
          <Cloud className="w-8.5 h-8.5 fill-zinc-400/10" />
        </motion.div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5 justify-center z-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 8, opacity: [0, 1, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: isHeavy ? 0.7 + i * 0.1 : 1.2 + i * 0.15,
                delay: i * 0.25,
                ease: "easeIn",
              }}
              className="w-0.5 h-2 bg-sky-400 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (code >= 95 && code <= 99) {
    return (
      <div className="relative w-12 h-12 flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-zinc-500 dark:text-zinc-400 z-10"
        >
          <Cloud className="w-8.5 h-8.5 fill-zinc-500/20" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0, 1, 0, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            times: [0, 0.04, 0.06, 0.1, 0.14, 1],
            ease: "easeInOut",
          }}
          className="absolute bottom-0 text-yellow-400 z-0"
        >
          <CloudLightning className="w-5.5 h-5.5" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ y: [0, -1, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="text-zinc-400 dark:text-zinc-300"
    >
      <Cloud className="w-9 h-9 fill-zinc-400/10" />
    </motion.div>
  );
}

export function StatusSection() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [speedResult, setSpeedResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState<number | null>(null);
  const [activeWeatherEffect, setActiveWeatherEffect] = useState<string | null>(null);
  
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

  const getWeatherGroup = (code: number) => {
    if (code === 0) return "clear";
    if (code === 1 || code === 2 || code === 3) return "cloudy";
    if (code === 45 || code === 48) return "fog";
    if (code >= 95 && code <= 99) return "thunderstorm";
    if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return "rain";
    return "cloudy";
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
    return {
      hr: (hrs % 12) * 30 + mins * 0.5,
      min: mins * 6,
      sec: secs * 6,
    };
  };

  const hands = getClockHands();

  const getTimeCardClass = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-sky-500/10 border-orange-500/25 dark:border-orange-500/15 shadow-[inset_0_0_20px_rgba(245,158,11,0.03)]";
      case "day":
        return "bg-gradient-to-br from-sky-400/10 via-blue-500/5 to-cyan-400/10 border-blue-400/25 dark:border-blue-400/15 shadow-[inset_0_0_20px_rgba(56,189,248,0.03)]";
      case "sunset":
        return "bg-gradient-to-br from-purple-600/10 via-pink-500/5 to-orange-500/10 border-pink-500/25 dark:border-pink-500/15 shadow-[inset_0_0_20px_rgba(236,72,153,0.03)]";
      case "night":
      default:
        return "bg-black border-neutral-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-slate-100";
    }
  };

  const getWeatherCardClass = () => {
    const group = getWeatherGroup(weather.weatherCode);
    switch (group) {
      case "clear":
        return "bg-gradient-to-br from-amber-500/12 via-yellow-500/4 to-orange-500/12 border-amber-500/35 dark:border-amber-500/25 shadow-[inset_0_0_20px_rgba(245,158,11,0.04)]";
      case "rain":
        return "bg-gradient-to-br from-sky-500/12 via-teal-500/4 to-indigo-500/12 border-sky-500/35 dark:border-sky-500/25 shadow-[inset_0_0_20px_rgba(14,165,233,0.04)]";
      case "thunderstorm":
        return "bg-gradient-to-br from-zinc-850/20 via-purple-900/5 to-slate-900/20 border-purple-500/35 dark:border-purple-500/25 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]";
      case "cloudy":
      case "fog":
      default:
        return "bg-gradient-to-br from-slate-400/8 via-zinc-500/4 to-slate-500/8 border-slate-400/25 dark:border-slate-500/15 shadow-[inset_0_0_20px_rgba(148,163,184,0.02)]";
    }
  };

  const getBatteryCardClass = () => {
    if (battery.supported) {
      if (battery.charging) {
        return "border-emerald-500/25 dark:border-emerald-500/15 shadow-[inset_0_0_20px_rgba(16,185,129,0.04)]";
      }
      if (battery.level < 20) {
        return "border-rose-500/25 dark:border-rose-500/15 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] animate-pulse";
      }
      if (battery.level >= 70) {
        return "hover:border-emerald-500/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.01)]";
      }
    }
    return "hover:border-primary/20";
  };

  // Update online status
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Set initial connection info if available
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        setConnectionInfo({
          downlink: conn.downlink,
          rtt: conn.rtt,
          effectiveType: conn.effectiveType,
        });
      }

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // Update clock every second
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // System & Browser Detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      let detectedOS = "Unknown OS";
      if (/Windows/i.test(ua)) detectedOS = "Windows";
      else if (/Macintosh|Mac OS X/i.test(ua)) detectedOS = "macOS";
      else if (/Linux/i.test(ua)) detectedOS = "Linux";
      else if (/Android/i.test(ua)) detectedOS = "Android";
      else if (/iPhone|iPad|iPod/i.test(ua)) detectedOS = "iOS";

      let detectedBrowser = "Unknown Browser";
      if (/edg/i.test(ua)) detectedBrowser = "Edge";
      else if (/chrome|chromium|crios/i.test(ua)) detectedBrowser = "Chrome";
      else if (/firefox|fxios/i.test(ua)) detectedBrowser = "Firefox";
      else if (/safari/i.test(ua)) detectedBrowser = "Safari";

      setSystem({ os: detectedOS, browser: detectedBrowser });

      // Battery API
      if ("getBattery" in navigator) {
        (navigator as any).getBattery().then((batteryObj: any) => {
          const updateBattery = () => {
            setBattery({
              level: Math.round(batteryObj.level * 100),
              charging: batteryObj.charging,
              supported: true,
            });
          };
          updateBattery();
          batteryObj.addEventListener("levelchange", updateBattery);
          batteryObj.addEventListener("chargingchange", updateBattery);
        });
      }
    }
  }, []);

  // Measure Latency/Ping
  const measurePing = async () => {
    try {
      const startTime = performance.now();
      await fetch(`/favicon.ico?cb=${Date.now()}`, { method: "HEAD" });
      const endTime = performance.now();
      setPing(Math.round(endTime - startTime));
    } catch {
      setPing(null);
    }
  };

  useEffect(() => {
    if (isOnline) {
      measurePing();
    } else {
      setPing(null);
    }
  }, [isOnline]);

  // Real Internet Speed Test: Downloads /icon.png dynamically (approx 671KB)
  const runSpeedTest = async () => {
    if (!isOnline) return;
    setIsTesting(true);
    setSpeedResult(null);
    setProgress(0);

    try {
      const startTime = performance.now();
      const response = await fetch(`/icon.png?cb=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Speed test failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Cannot get stream reader");

      let receivedLength = 0;
      const totalLength = 671185; 

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedLength += value.length;
        setProgress(Math.min(Math.round((receivedLength / totalLength) * 100), 100));
      }

      const endTime = performance.now();
      const durationSec = (endTime - startTime) / 1000;
      const sizeBits = receivedLength * 8;
      const mbps = (sizeBits / 1024 / 1024) / durationSec;

      setSpeedResult(mbps.toFixed(1));
      measurePing();
    } catch (err) {
      console.error(err);
      setSpeedResult("Failed");
    } finally {
      setIsTesting(false);
    }
  };

  // Fetch weather based on IP geolocation
  useEffect(() => {
    const fetchWeather = async () => {
      let lat = -6.2088;
      let lon = 106.8456;
      let cityName = "Jakarta";
      
      try {
        const locResponse = await fetch("https://ipapi.co/json/");
        if (locResponse.ok) {
          const locData = await locResponse.json();
          if (locData.latitude && locData.longitude) {
            lat = locData.latitude;
            lon = locData.longitude;
            cityName = locData.city || locData.region || "Lokal";
          }
        }
      } catch (err) {
        console.warn("Location fetch failed, using default coordinates", err);
      }

      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`
        );
        if (!weatherResponse.ok) throw new Error("Weather fetch failed");
        
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        
        setWeather({
          temp: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          weatherCode: current.weather_code,
          isDay: current.is_day === 1,
          city: cityName,
          loading: false,
          error: false,
        });
      } catch (err) {
        console.error(err);
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    };

    fetchWeather();
  }, []);

  // Automatically activate weather background simulation based on actual weather
  useEffect(() => {
    if (!weather.loading && !weather.error) {
      setActiveWeatherEffect(getWeatherGroup(weather.weatherCode));
    }
  }, [weather.loading, weather.error, weather.weatherCode]);

  const getWeatherDesc = (code: number) => {
    switch (code) {
      case 0:
        return "Cerah";
      case 1:
      case 2:
      case 3:
        return "Cerah Berawan";
      case 45:
      case 48:
        return "Kabut";
      case 51:
      case 53:
      case 55:
        return "Gerimis";
      case 61:
      case 63:
      case 65:
        return "Hujan";
      case 80:
      case 81:
      case 82:
        return "Hujan Deras";
      case 95:
      case 96:
      case 99:
        return "Badai Petir";
      default:
        return "Berawan";
    }
  };

  // Helper formatting for visitor
  const formatVisitorTime = () => {
    if (!currentTime) return "00:00:00";
    return currentTime.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatVisitorDate = () => {
    if (!currentTime) return "Loading...";
    return currentTime.toLocaleDateString("id-ID", {
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

  return (
    <section id="console" className="py-24 relative overflow-hidden border-t border-border/40 bg-dot-pattern transition-colors duration-500">
      
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
                {Array.from({ length: 65 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: "120vh", opacity: [0, 0.7, 0.7, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + Math.random() * 0.6,
                      delay: Math.random() * 3,
                      ease: "linear",
                    }}
                    style={{ left: `${(i / 65) * 100}%` }}
                    className="absolute w-[1.2px] h-14 bg-sky-400/40 dark:bg-sky-400/30"
                  />
                ))}
              </div>
            )}

            {/* Thunderstorm effect */}
            {activeWeatherEffect === "thunderstorm" && (
              <>
                <div className="absolute inset-0 flex justify-around opacity-55">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: "120vh", opacity: [0, 0.8, 0.8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + Math.random() * 0.5,
                        delay: Math.random() * 3,
                        ease: "linear",
                      }}
                      style={{ left: `${(i / 80) * 100}%` }}
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
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
                    animate={{ y: "-10vh", opacity: [0, 0.4, 0.4, 0], scale: [0.5, 1.4, 0.8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 8 + Math.random() * 6,
                      delay: Math.random() * 5,
                      ease: "easeInOut",
                    }}
                    style={{ left: `${5 + Math.random() * 90}%` }}
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
                      delay: i * 5,
                      ease: "linear",
                    }}
                    className="absolute w-96 h-48 rounded-full bg-zinc-300/10 dark:bg-zinc-700/5 blur-3xl"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
            Console
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Interactive Dashboard.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Pantau status sistem Anda, uji kecepatan internet secara riil, dan lihat prediksi cuaca terkini dari satu tempat.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* WIDGET 1: Visitor Local Time */}
          <div className={cn(
            "col-span-2 md:col-span-1 p-4 sm:p-6 rounded-3xl border transition-all duration-300 squircle-lg flex flex-row items-center justify-between min-h-[170px] group relative overflow-hidden gap-6",
            getTimeCardClass()
          )}>
            {/* Tiny Twinkling Stars in Night Mode */}
            {timeOfDay === "night" && (
              <div className="absolute inset-0 pointer-events-none z-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 2.5,
                    }}
                    style={{
                      top: `${15 + Math.random() * 70}%`,
                      left: `${15 + Math.random() * 70}%`,
                    }}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  />
                ))}
              </div>
            )}
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none z-0" />
            
            {/* Left side: Digital Info */}
            <div className="flex flex-col justify-between h-full z-10 flex-1">
              <div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5",
                  timeOfDay === "night" ? "text-slate-400" : "text-muted-foreground"
                )}>
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Waktu Anda
                </span>
                <span className={cn(
                  "text-[8px] font-bold px-2 py-0.5 rounded-full border inline-block mt-1.5 uppercase tracking-wide",
                  timeOfDay === "night" 
                    ? "text-zinc-350 bg-zinc-900 border-zinc-800" 
                    : "text-muted-foreground/85 bg-muted/60 border-border/40"
                )}>
                  {getVisitorTimezone().split("/")[1]?.replace("_", " ") || "Lokal"}
                </span>
              </div>
              <div className="mt-4">
                <h3 className={cn(
                  "text-2xl sm:text-3xl font-black tracking-tight tabular-nums leading-none",
                  timeOfDay === "night" ? "text-slate-100" : "text-foreground"
                )}>
                  {formatVisitorTime()}
                </h3>
                <p className={cn(
                  "text-[10px] sm:text-xs font-semibold mt-1.5 flex items-center gap-1",
                  timeOfDay === "night" ? "text-slate-400" : "text-muted-foreground"
                )}>
                  <Calendar className={cn(
                    "w-3 h-3", 
                    timeOfDay === "night" ? "text-zinc-500" : "text-muted-foreground/60"
                  )} />
                  {formatVisitorDate()}
                </p>
              </div>
            </div>

            {/* Right side: Analog Watchface */}
            <div className={cn(
              "relative w-20 h-20 rounded-full border flex items-center justify-center backdrop-blur-sm z-10 shadow-sm shrink-0",
              timeOfDay === "night" 
                ? "border-zinc-800 bg-zinc-900/50 text-slate-100" 
                : "border-foreground/10 bg-background/20 dark:bg-black/15"
            )}>
              {/* Dial indicators (Ticks) */}
              <div className={cn("absolute top-1 w-0.5 h-1", timeOfDay === "night" ? "bg-zinc-800" : "bg-foreground/20")} />
              <div className={cn("absolute bottom-1 w-0.5 h-1", timeOfDay === "night" ? "bg-zinc-800" : "bg-foreground/20")} />
              <div className={cn("absolute left-1 w-1 h-0.5", timeOfDay === "night" ? "bg-zinc-800" : "bg-foreground/20")} />
              <div className={cn("absolute right-1 w-1 h-0.5", timeOfDay === "night" ? "bg-zinc-800" : "bg-foreground/20")} />
              
              {/* Hour Hand */}
              <div
                style={{ transform: `rotate(${hands.hr}deg)`, transformOrigin: "bottom center" }}
                className={cn(
                  "absolute bottom-10 left-[38.5px] w-[3px] h-[20px] rounded-full",
                  timeOfDay === "night" ? "bg-slate-200 shadow-[0_0_8px_rgba(255,255,255,0.15)]" : "bg-foreground"
                )}
              />
              {/* Minute Hand */}
              <div
                style={{ transform: `rotate(${hands.min}deg)`, transformOrigin: "bottom center" }}
                className={cn(
                  "absolute bottom-10 left-[39px] w-[2px] h-[28px] rounded-full",
                  timeOfDay === "night" ? "bg-slate-300 shadow-[0_0_8px_rgba(255,255,255,0.1)]" : "bg-foreground/70"
                )}
              />
              {/* Second Hand */}
              <div
                style={{ transform: `rotate(${hands.sec}deg)`, transformOrigin: "bottom center" }}
                className="absolute bottom-10 left-[39.5px] w-[1px] h-[32px] bg-amber-500 dark:bg-sky-400 rounded-full"
              />
              {/* Center Pin */}
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-sky-400 border border-background z-20 shadow-sm" />
            </div>
          </div>

          {/* WIDGET 2: Visitor Device Info */}
          <div className="col-span-1 p-4 sm:p-6 rounded-3xl border border-border bg-card hover:border-primary/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[170px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-primary" />
              Sistem Perangkat
            </span>
            <div className="space-y-2.5 my-3">
              <div className="flex items-center justify-between text-[10px] sm:text-xs gap-1">
                <span className="text-muted-foreground font-medium truncate">OS:</span>
                <span className="font-bold text-foreground truncate">{system.os}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-xs gap-1">
                <span className="text-muted-foreground font-medium truncate">Browser:</span>
                <span className="font-bold text-foreground truncate">{system.browser}</span>
              </div>
            </div>
          </div>

          {/* WIDGET 3: Visitor Battery / Power Info */}
          <div className={cn(
            "col-span-1 p-4 sm:p-6 rounded-3xl border transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[170px] group relative overflow-hidden",
            getBatteryCardClass()
          )}>
            {/* Battery Charging Float Up Bubbles */}
            {battery.supported && battery.charging && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: "110%", x: `${20 + i * 20}%`, opacity: 0, scale: 0.6 }}
                    animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      delay: i * 0.8,
                    }}
                    className="absolute w-1 h-1 bg-emerald-400 dark:bg-emerald-500 rounded-full"
                  />
                ))}
              </div>
            )}
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none z-0" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 z-10">
              {battery.supported && battery.charging ? (
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Battery className="w-3.5 h-3.5 text-primary" />
              )}
              Daya & Baterai
            </span>
            
            <div className="my-2 z-10">
              {battery.supported ? (
                <div>
                  <h4 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
                    {battery.level}%
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold mt-1">
                    {battery.charging ? "Mengisi Daya" : "Daya Baterai"}
                  </p>
                  {/* Liquid battery bar */}
                  <div className="relative w-full h-3 bg-muted/60 border border-border/40 rounded-full overflow-hidden flex items-center px-0.5 mt-2 shadow-inner">
                    <motion.div
                      className={cn(
                        "h-1.5 rounded-full",
                        battery.charging 
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500" 
                          : battery.level < 20 
                            ? "bg-gradient-to-r from-red-500 to-rose-600 animate-pulse" 
                            : "bg-logo-gradient"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${battery.level}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                    Daya AC Stabil
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                    Terhubung Adaptor
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* WIDGET 4: Weather Info */}
          <div
            className={cn(
              "col-span-2 md:col-span-1 p-4 sm:p-6 rounded-3xl border transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[200px] group relative overflow-hidden select-none z-10",
              getWeatherCardClass()
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none z-0" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                Prediksi Cuaca
              </span>
              <span className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/40 flex items-center gap-1 shrink-0">
                <Navigation className="w-2.5 h-2.5 text-sky-400" />
                {weather.city}
              </span>
            </div>

            {weather.loading ? (
              <div className="py-6 flex flex-col items-center justify-center gap-2 z-10">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground font-semibold">Memuat...</p>
              </div>
            ) : weather.error ? (
              <div className="py-6 text-center z-10">
                <p className="text-xs text-destructive font-bold">Gagal memuat cuaca</p>
              </div>
            ) : (
              <div className="flex items-center justify-between my-2 gap-4 z-10">
                {/* Left: Temp and Condition */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background border border-border/40 rounded-xl flex items-center justify-center shadow-sm">
                    <AnimatedWeatherIcon code={weather.weatherCode} isDay={weather.isDay} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl sm:text-3xl font-black tracking-tight text-foreground tabular-nums">
                        {weather.temp}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">&deg;C</span>
                    </div>
                    <p className="text-xs font-bold text-foreground mt-0.5">
                      {getWeatherDesc(weather.weatherCode)}
                    </p>
                  </div>
                </div>

                {/* Right: Detailed metrics */}
                <div className="grid grid-cols-1 gap-1 text-right text-xs shrink-0">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Terasa:</span>
                    <span className="font-bold text-foreground tabular-nums">{weather.feelsLike}&deg;C</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Lembab:</span>
                    <span className="font-bold text-foreground tabular-nums">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Angin:</span>
                    <span className="font-bold text-foreground tabular-nums">{weather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* WIDGET 5: Network & Speed Test (Spans 2 columns on desktop) */}
          <div className="col-span-2 md:col-span-2 p-4 sm:p-6 rounded-3xl border border-border bg-card hover:border-primary/25 hover:shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-primary" />
                Uji Kecepatan Internet
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                isOnline 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            {/* Latency & connection properties */}
            <div className="grid grid-cols-3 gap-3 my-3">
              <div className="bg-background border border-border/40 p-2.5 rounded-2xl text-center shadow-sm">
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Latency</p>
                <p className="text-sm font-black text-foreground mt-0.5">
                  {ping !== null ? `${ping} ms` : "--"}
                </p>
              </div>
              <div className="bg-background border border-border/40 p-2.5 rounded-2xl text-center shadow-sm">
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Downlink</p>
                <p className="text-sm font-black text-foreground mt-0.5">
                  {connectionInfo?.downlink ? `${connectionInfo.downlink} Mbps` : "--"}
                </p>
              </div>
              <div className="bg-background border border-border/40 p-2.5 rounded-2xl text-center shadow-sm">
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Tipe</p>
                <p className="text-sm font-black text-foreground mt-0.5 uppercase">
                  {connectionInfo?.effectiveType || "Wifi/LAN"}
                </p>
              </div>
            </div>

            {/* Speed Test Trigger */}
            <div className="space-y-2 mt-1">
              {isTesting ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                      </span>
                      Mengunduh berkas uji...
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border/40">
                    <motion.div
                      className="h-full bg-logo-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={runSpeedTest}
                    disabled={!isOnline}
                    className="flex-1 btn-logo-glossy py-2 rounded-xl font-bold text-[11px] disabled:opacity-50 disabled:cursor-not-allowed text-center transition-all focus-visible:outline-none cursor-pointer"
                  >
                    Uji Kecepatan Riil
                  </button>
                  {speedResult && (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-400/5 border border-emerald-500/25 px-3 py-1.5 rounded-xl text-emerald-500 font-bold text-[11px] shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{speedResult === "Failed" ? "Gagal" : `${speedResult} Mbps`}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer log */}
        <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[9px] text-muted-foreground/75 font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Semua sistem berjalan normal
          </span>
          <span>Dashboard Console V1.1.0</span>
        </div>
      </div>
    </section>
  );
}
