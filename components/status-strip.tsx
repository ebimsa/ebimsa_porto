"use client";

import React, { useState, useEffect } from "react";
import { useT } from "@/lib/i18n";
import {
  LocationPinIllustration,
  ClockIllustration,
  WeatherIllustration,
  InternetSpeedIllustration,
} from "@/components/ui-icons";

interface WeatherState {
  temp: number;
  code: number;
  isDay: boolean;
  loading: boolean;
}

export function StatusStrip() {
  const { t } = useT();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [timeStr, setTimeStr] = useState<string>("00:00:00");
  const [ping, setPing] = useState<number>(14);
  const [weather, setWeather] = useState<WeatherState>({
    temp: 28,
    code: 0,
    isDay: true,
    loading: true,
  });

  // Digital clock and live Date object
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentDate(now);
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ping jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.max(6, Math.min(32, 12 + Math.floor(Math.random() * 8 - 4))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Open-Meteo weather fetch
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = -5.4292;
        const lon = 105.2611;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&timezone=Asia%2FJakarta`
        );
        if (res.ok) {
          const data = await res.json();
          const curr = data.current;
          setWeather({
            temp: Math.round(curr.temperature_2m),
            code: curr.weather_code,
            isDay: curr.is_day === 1,
            loading: false,
          });
        }
      } catch {
        setWeather((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchWeather();
  }, []);

  return (
    <section id="console" className="relative py-4 z-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5 sm:py-3 rounded-2xl border border-border/80 bg-card/60 dark:bg-card/40 backdrop-blur-md shadow-sm text-xs font-mono">
          {/* Left: Location & Real-time Clock */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LocationPinIllustration className="w-4 h-4" />
              <span className="font-medium text-foreground">{t("status.liveTime")}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground pl-2 border-l border-border/60">
              <ClockIllustration date={currentDate} className="w-4 h-4" />
              <span className="font-bold text-foreground tracking-wider">{timeStr}</span>
              <span className="text-[10px] text-muted-foreground/70">WIB</span>
            </div>

            {/* Weather readout */}
            <div className="flex items-center gap-1.5 text-muted-foreground pl-2 border-l border-border/60">
              <WeatherIllustration code={weather.code} isDay={weather.isDay} className="w-4 h-4" />
              <span className="font-bold text-foreground">
                {weather.loading ? "--" : `${weather.temp}°C`}
              </span>
            </div>
          </div>

          {/* Right: Live Network Speed / Latency */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 border border-border text-foreground text-[11px] select-none"
              title={`Network Latency: ${ping}ms`}
            >
              <InternetSpeedIllustration ping={ping} className="w-4 h-4" />
              <div className="flex items-center gap-1 font-mono">
                <span className="font-bold tracking-tight">{ping}ms</span>
                <span className="text-[9px] text-muted-foreground font-semibold">PING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
