"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Rocket, Heart, Sparkles, Star, Calculator, HeartPulse, 
  Droplet, Ribbon, Shield, ClipboardCheck, Utensils, Moon,
  Activity, Users, Building2, Check, ArrowRight, Zap
} from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

const frames = [
  {
    id: "mission",
    title: "Our Mission",
    subtitle: "Building a Healthier Kerala",
    highlight: "Every Citizen. Every Day.",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-500/30 via-pink-500/20 to-transparent",
    accentColor: "rose",
  },
  {
    id: "eat",
    title: "Eat Well",
    subtitle: "Smart Food Choices",
    highlight: "Fuel Your Body Right",
    icon: Utensils,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/30 via-orange-500/20 to-transparent",
    accentColor: "amber",
  },
  {
    id: "act",
    title: "Act Well",
    subtitle: "Move More Daily",
    highlight: "Movement is Medicine",
    icon: Activity,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/30 via-green-500/20 to-transparent",
    accentColor: "emerald",
  },
  {
    id: "sleep",
    title: "Sleep Well",
    subtitle: "Rest & Recover",
    highlight: "Recharge Your Life",
    icon: Moon,
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-500/30 via-purple-500/20 to-transparent",
    accentColor: "indigo",
  },
  {
    id: "care",
    title: "Care Well",
    subtitle: "Know Your Numbers",
    highlight: "Prevention Saves Lives",
    icon: HeartPulse,
    gradient: "from-cyan-500 to-teal-600",
    bgGradient: "from-cyan-500/30 via-teal-500/20 to-transparent",
    accentColor: "cyan",
  },
  {
    id: "tools",
    title: "Free Health Tools",
    subtitle: "Instant Insights",
    highlight: "BMI • BP • Sugar • Screening",
    icon: Calculator,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/30 via-indigo-500/20 to-transparent",
    accentColor: "blue",
    tools: [
      { icon: Calculator, name: "BMI", color: "from-emerald-500 to-emerald-600" },
      { icon: HeartPulse, name: "BP", color: "from-rose-500 to-rose-600" },
      { icon: Droplet, name: "Sugar", color: "from-amber-500 to-amber-600" },
      { icon: Ribbon, name: "Cancer", color: "from-purple-500 to-purple-600" },
    ],
  },
  {
    id: "assessment",
    title: "5-Minute Checkup",
    subtitle: "Complete Health Assessment",
    highlight: "Your Personal Health Report",
    icon: ClipboardCheck,
    gradient: "from-teal-500 to-emerald-600",
    bgGradient: "from-teal-500/30 via-emerald-500/20 to-transparent",
    accentColor: "teal",
    features: ["Risk Score", "Lifestyle Tips", "PDF Report"],
  },
  {
    id: "jak",
    title: "Find Care Near You",
    subtitle: "Janakeeya Arogya Kendram",
    highlight: "Healthcare at Your Doorstep",
    icon: Building2,
    gradient: "from-sky-500 to-blue-600",
    bgGradient: "from-sky-500/30 via-blue-500/20 to-transparent",
    accentColor: "sky",
  },
  {
    id: "privacy",
    title: "100% Private",
    subtitle: "No Sign-up Required",
    highlight: "Your Data Stays Yours",
    icon: Shield,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/30 via-purple-500/20 to-transparent",
    accentColor: "violet",
    badges: ["Anonymous", "Secure", "Free"],
  },
  {
    id: "community",
    title: "For All Keralites",
    subtitle: "English & Malayalam",
    highlight: "Health For Everyone",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/30 via-teal-500/20 to-transparent",
    accentColor: "emerald",
  },
];

export default function LaunchPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "ready" | "countdown" | "frames" | "final" | "celebration" | "redirect">("intro");
  const [countdown, setCountdown] = useState(3);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [textReveal, setTextReveal] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [pulseRings, setPulseRings] = useState<number[]>([]);
  const [animatedText, setAnimatedText] = useState("");
  const [showHighlight, setShowHighlight] = useState(false);
  const [frameKey, setFrameKey] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const colors = [
    "rgba(16, 185, 129, 0.8)",
    "rgba(20, 184, 166, 0.8)",
    "rgba(6, 182, 212, 0.8)",
    "rgba(34, 197, 94, 0.8)",
    "rgba(250, 204, 21, 0.8)",
    "rgba(251, 146, 60, 0.8)",
    "rgba(168, 85, 247, 0.8)",
  ];

  // Generate particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
    }));
    setParticles(newParticles);

    // Fast intro sequence
    const timer1 = setTimeout(() => setTextReveal(1), 300);
    const timer2 = setTimeout(() => setTextReveal(2), 600);
    const timer3 = setTimeout(() => setTextReveal(3), 900);
    const timer4 = setTimeout(() => setShowTagline(true), 1200);
    const timer5 = setTimeout(() => setPhase("ready"), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pulse rings for ready state
  useEffect(() => {
    if (phase !== "ready") return;
    const interval = setInterval(() => {
      setPulseRings(prev => [...prev, Date.now()]);
      setTimeout(() => setPulseRings(prev => prev.slice(1)), 1500);
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Typewriter effect for frame highlights
  useEffect(() => {
    if (phase !== "frames") return;
    
    const currentHighlight = frames[currentFrame].highlight;
    setAnimatedText("");
    setShowHighlight(false);
    setFrameKey(prev => prev + 1);
    
    const startDelay = setTimeout(() => {
      setShowHighlight(true);
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex <= currentHighlight.length) {
          setAnimatedText(currentHighlight.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 25);
      
      return () => clearInterval(typeInterval);
    }, 150);
    
    return () => clearTimeout(startDelay);
  }, [phase, currentFrame]);

  const generateConfetti = useCallback(() => {
    const newConfetti: Confetti[] = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 10 + Math.random() * 40,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 18 + 8,
      delay: Math.random() * 0.6,
    }));
    setConfetti(newConfetti);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playBeep = useCallback((frequency: number, duration: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration / 1000);
    } catch {
      // Audio not supported
    }
  }, []);

  const handleLaunch = useCallback(() => {
    if (phase !== "ready") return;
    
    setPhase("countdown");
    let count = 3;
    setCountdown(count);
    playBeep(440, 150);
    
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        playBeep(440, 150);
      } else {
        clearInterval(countdownInterval);
        playBeep(880, 300);
        setPhase("frames");
        setCurrentFrame(0);
        setTotalProgress(0);
      }
    }, 700);
  }, [phase, playBeep]);

  // Continuous progress across ALL frames
  useEffect(() => {
    if (phase !== "frames") return;
    
    const totalDuration = 15000; // 15 seconds total for all frames
    const frameDuration = totalDuration / frames.length;
    const progressInterval = 30;
    let elapsed = 0;
    let lastFrameIndex = 0;
    
    const interval = setInterval(() => {
      elapsed += progressInterval;
      const progress = (elapsed / totalDuration) * 100;
      setTotalProgress(progress);
      
      // Calculate which frame we should be on
      const frameIndex = Math.min(Math.floor(elapsed / frameDuration), frames.length - 1);
      if (frameIndex !== lastFrameIndex) {
        lastFrameIndex = frameIndex;
        setCurrentFrame(frameIndex);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setPhase("final");
        
        setTimeout(() => {
          setPhase("celebration");
          generateConfetti();
          playBeep(523, 100);
          setTimeout(() => playBeep(659, 100), 100);
          setTimeout(() => playBeep(784, 100), 200);
          setTimeout(() => playBeep(1047, 300), 300);
          
          setTimeout(() => {
            setPhase("redirect");
            setTimeout(() => router.push("/"), 1200);
          }, 2500);
        }, 1000);
      }
    }, progressInterval);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const currentFrameData = frames[currentFrame];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {phase === "frames" && (
          <>
            <div className={`absolute inset-0 bg-gradient-radial ${currentFrameData.bgGradient} opacity-80 transition-all duration-500`} />
            {/* Animated light beams */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent animate-beam-1" />
            <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent animate-beam-2" />
            <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent animate-beam-3" />
          </>
        )}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-orbit" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px] animate-orbit-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-breathe" />
      </div>

      {/* Animated grid that pulses */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-grid-pulse"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {phase === "celebration" && confetti.map((c) => (
        <div
          key={c.id}
          className="absolute animate-confetti pointer-events-none"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className="rounded-sm"
            style={{
              width: c.size,
              height: c.size * 0.5,
              backgroundColor: c.color,
              transform: `rotate(${c.rotation}deg)`,
              boxShadow: `0 0 12px ${c.color}`,
            }}
          />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        
        {/* Kerala Emblem with float animation */}
        <div className={`absolute top-6 transition-all duration-500 ${textReveal >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src="/Kerala-sarkar-Emblem.png"
            alt="Kerala State Emblem"
            width={90}
            height={58}
            className="object-contain opacity-40 animate-float-slow"
          />
        </div>

        {/* INTRO & READY */}
        {(phase === "intro" || phase === "ready") && (
          <div className="text-center">
            {/* Animated logo */}
            <div className={`flex items-center justify-center mb-6 transition-all duration-500 ${textReveal >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 blur-xl animate-spin-slow" />
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-teal-500/20 blur-lg animate-spin-slow-reverse" />
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-float">
                  <Heart className="w-12 h-12 md:w-16 md:h-16 text-white animate-heartbeat" />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-sparkle" />
                  <Zap className="absolute -bottom-2 -left-2 w-5 h-5 text-cyan-300 animate-sparkle-delay" />
                  <Star className="absolute top-0 -left-3 w-4 h-4 text-pink-300 animate-twinkle" />
                </div>
                {phase === "ready" && pulseRings.map((ring) => (
                  <div key={ring} className="absolute inset-0 rounded-3xl border-2 border-emerald-400/50 animate-ping-fast" />
                ))}
              </div>
            </div>
            
            {/* Title with letter animations */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3 tracking-tight overflow-hidden">
              <span className={`inline-block transition-all duration-500 ${textReveal >= 2 ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-full rotate-12'}`}>
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent animate-shimmer-text inline-block hover:scale-110 transition-transform">
                  Healthy
                </span>
              </span>
              <span className="inline-block mx-3" />
              <span className={`inline-block transition-all duration-500 delay-150 ${textReveal >= 2 ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-full -rotate-12'}`}>
                <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent animate-shimmer-text-reverse inline-block hover:scale-110 transition-transform">
                  Life
                </span>
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-emerald-200/80 mb-3 transition-all duration-500 ${textReveal >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <span className="animate-word-fade-1">Kerala&apos;s</span>{" "}
              <span className="animate-word-fade-2">Health</span>{" "}
              <span className="animate-word-fade-3">&amp;</span>{" "}
              <span className="animate-word-fade-4">Wellness</span>{" "}
              <span className="animate-word-fade-5">Campaign</span>
            </p>
            
            <div className={`flex items-center justify-center gap-2 text-teal-300/60 text-base mb-10 transition-all duration-700 ${showTagline ? 'opacity-100' : 'opacity-0'}`}>
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="tracking-[0.2em] animate-text-glow">
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0s' }}>E</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.05s' }}>a</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.1s' }}>t</span>
                <span className="inline-block mx-1">·</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.2s' }}>A</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.25s' }}>c</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.3s' }}>t</span>
                <span className="inline-block mx-1">·</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.4s' }}>S</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.45s' }}>l</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.5s' }}>e</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.55s' }}>e</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.6s' }}>p</span>
                <span className="inline-block mx-1">·</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.7s' }}>C</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.75s' }}>a</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.8s' }}>r</span>
                <span className="animate-letter-bounce inline-block" style={{ animationDelay: '0.85s' }}>e</span>
              </span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            {/* Launch Button */}
            {phase === "ready" && (
              <button
                onClick={handleLaunch}
                className="group relative px-12 py-6 rounded-2xl font-bold text-xl md:text-2xl text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-bounce-subtle"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-2xl blur-lg opacity-80 group-hover:opacity-100 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl animate-shimmer-fast" />
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <span className="relative flex items-center gap-3">
                  <Rocket className="w-6 h-6 group-hover:-rotate-45 group-hover:-translate-y-1 transition-all duration-300" />
                  <span className="group-hover:tracking-wider transition-all duration-300">LAUNCH</span>
                  <Zap className="w-5 h-5 animate-pulse group-hover:animate-spin" />
                </span>
              </button>
            )}
          </div>
        )}

        {/* COUNTDOWN */}
        {phase === "countdown" && (
          <div className="text-center">
            <div className="relative">
              <div className="text-[160px] md:text-[240px] font-black text-transparent bg-gradient-to-b from-emerald-300 via-teal-400 to-cyan-500 bg-clip-text animate-countdown-pop leading-none">
                {countdown}
              </div>
              <div className="absolute inset-0 text-[160px] md:text-[240px] font-black text-emerald-500/30 blur-2xl animate-pulse leading-none">
                {countdown}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-emerald-400/40 animate-ping" />
                <div className="absolute w-60 h-60 rounded-full border-2 border-teal-400/30 animate-ping" style={{ animationDelay: '0.2s' }} />
                <div className="absolute w-80 h-80 rounded-full border border-cyan-400/20 animate-ping" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {/* FRAMES - Cinematic showcase */}
        {phase === "frames" && currentFrameData && (
          <div key={frameKey} className="w-full max-w-4xl mx-auto text-center">
            {/* Frame counter with animation */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-white/50 text-sm font-mono bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full animate-slide-in-right">
                <span className="text-white/80 animate-number-pop">{String(currentFrame + 1).padStart(2, '0')}</span>
                <span className="animate-pulse">/</span>
                <span>{String(frames.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Animated corner decorations */}
            <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-white/10 animate-corner-tl" />
            <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-white/10 animate-corner-tr" />
            <div className="absolute bottom-32 left-8 w-20 h-20 border-l-2 border-b-2 border-white/10 animate-corner-bl" />
            <div className="absolute bottom-32 right-8 w-20 h-20 border-r-2 border-b-2 border-white/10 animate-corner-br" />

            {/* Icon with explosive entrance and orbiting elements */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Orbiting rings */}
                <div className={`absolute -inset-6 rounded-full border border-white/10 animate-orbit-icon`} />
                <div className={`absolute -inset-10 rounded-full border border-white/5 animate-orbit-icon-reverse`} />
                
                {/* Orbiting dots */}
                <div className="absolute -inset-8 animate-orbit-dot">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/40 rounded-full" />
                </div>
                <div className="absolute -inset-12 animate-orbit-dot-reverse">
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />
                </div>

                <div className={`relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br ${currentFrameData.gradient} flex items-center justify-center shadow-2xl animate-icon-explode`}>
                  <currentFrameData.icon className="w-14 h-14 md:w-18 md:h-18 text-white animate-icon-breathe" />
                  <div className={`absolute -inset-3 rounded-3xl bg-gradient-to-br ${currentFrameData.gradient} opacity-40 blur-xl animate-pulse`} />
                  
                  {/* Corner sparks */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-spark-1" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full animate-spark-2" />
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-white rounded-full animate-spark-3" />
                  <div className="absolute -top-1 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-spark-4" />
                </div>
              </div>
            </div>

            {/* Title with character animation */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 overflow-hidden">
              <span className={`bg-gradient-to-r ${currentFrameData.gradient} bg-clip-text text-transparent inline-block animate-title-reveal`}>
                {currentFrameData.title.split('').map((char, i) => (
                  <span 
                    key={i} 
                    className="inline-block animate-char-pop"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h2>

            {/* Subtitle with slide and fade */}
            <p className="text-xl md:text-2xl text-white/60 mb-4 tracking-wide overflow-hidden">
              <span className="inline-block animate-subtitle-slide">
                {currentFrameData.subtitle.split(' ').map((word, i) => (
                  <span 
                    key={i} 
                    className="inline-block animate-word-pop mx-1"
                    style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </p>

            {/* Typewriter highlight with glow */}
            <div className="h-14 flex items-center justify-center">
              {showHighlight && (
                <div className="relative">
                  <p className="text-2xl md:text-3xl font-bold text-white animate-highlight-glow">
                    {animatedText}
                    <span className="animate-blink text-emerald-400">|</span>
                  </p>
                  <div className="absolute inset-0 text-2xl md:text-3xl font-bold text-white/20 blur-lg">
                    {animatedText}
                  </div>
                </div>
              )}
            </div>

            {/* Tools grid with staggered bounce */}
            {currentFrameData.tools && (
              <div className="flex justify-center gap-4 md:gap-6 mt-6">
                {currentFrameData.tools.map((tool, i) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div 
                      className={`w-14 h-14 md:w-18 md:h-18 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg animate-tool-bounce hover:scale-110 transition-transform cursor-pointer`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <tool.icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                    </div>
                    <span 
                      className="text-white/50 text-xs font-medium animate-fade-up"
                      style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                    >
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Features with fly-in animation */}
            {currentFrameData.features && (
              <div className="flex justify-center gap-3 mt-6">
                {currentFrameData.features.map((feature, i) => (
                  <div
                    key={feature}
                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-feature-fly hover:bg-white/20 transition-colors cursor-pointer"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <Check className="w-4 h-4 text-emerald-400 animate-check-pop" style={{ animationDelay: `${0.3 + i * 0.12}s` }} />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Badges with scale animation */}
            {currentFrameData.badges && (
              <div className="flex justify-center gap-3 mt-6">
                {currentFrameData.badges.map((badge, i) => (
                  <div
                    key={badge}
                    className={`bg-gradient-to-r ${currentFrameData.gradient} rounded-full px-5 py-2 animate-badge-scale hover:scale-110 transition-transform cursor-pointer shadow-lg`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <span className="text-white font-semibold text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            )}

            {/* SINGLE Progress bar for ALL frames */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
              {/* Main progress bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${totalProgress}%` }}
                >
                  {/* Shimmer effect on progress */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast" />
                </div>
                
                {/* Glow effect at the end */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-sm animate-pulse"
                  style={{ left: `calc(${totalProgress}% - 8px)` }}
                />
              </div>
              
              {/* Frame markers on progress bar */}
              <div className="absolute top-0 left-0 right-0 h-2 flex">
                {frames.map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 flex justify-end"
                  >
                    <div className={`w-0.5 h-full ${i < frames.length - 1 ? 'bg-white/20' : ''}`} />
                  </div>
                ))}
              </div>
              
              {/* Progress info */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-1">
                  {frames.map((frame, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentFrame 
                          ? 'w-4 bg-white' 
                          : i < currentFrame 
                            ? 'w-1.5 bg-white/60' 
                            : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/40 text-xs font-mono animate-pulse">
                  {Math.round(totalProgress)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FINAL */}
        {phase === "final" && (
          <div className="text-center animate-final-burst">
            <div className="relative mb-6">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/60 animate-shake mx-auto">
                <Rocket className="w-18 h-18 md:w-24 md:h-24 text-white -rotate-45 animate-rocket-lift" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
              <div className="absolute -inset-6 rounded-full border-2 border-emerald-400/20 animate-ping" style={{ animationDelay: '0.2s' }} />
              <div className="absolute -inset-12 rounded-full border border-teal-400/10 animate-ping" style={{ animationDelay: '0.4s' }} />
              
              {/* Exhaust flames */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="rounded-full animate-flame"
                    style={{
                      width: 20 - i * 3,
                      height: 20 - i * 3,
                      background: `linear-gradient(to bottom, ${i < 2 ? '#fbbf24' : i < 4 ? '#f97316' : '#ef4444'}, transparent)`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-2 animate-text-shake">
              LAUNCHING!
            </h2>
            <div className="flex justify-center gap-1.5 mt-4">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* CELEBRATION */}
        {phase === "celebration" && (
          <div className="text-center animate-celebration-zoom">
            <div className="relative mb-4">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black">
                <span className="bg-gradient-to-r from-yellow-300 via-emerald-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent animate-rainbow">
                  🎉 LAUNCHED! 🎉
                </span>
              </h2>
              <div className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black text-emerald-500/30 blur-xl animate-pulse">
                🎉 LAUNCHED! 🎉
              </div>
            </div>
            
            <p className="text-xl md:text-3xl text-emerald-200/90 mb-4 animate-bounce tracking-wide">
              Welcome to Healthy Life Kerala!
            </p>
            
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(11)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 md:w-7 md:h-7 text-yellow-400 animate-star-burst"
                  style={{ animationDelay: `${i * 0.04}s` }}
                />
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-emerald-300/70">
              <ArrowRight className="w-5 h-5 animate-bounce-x" />
              <span className="animate-pulse">Entering your health journey...</span>
            </div>
          </div>
        )}

        {/* REDIRECT */}
        {phase === "redirect" && (
          <div className="text-center animate-fade-zoom-out">
            <div className="w-14 h-14 border-3 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-lg text-emerald-300/50">Launching...</p>
          </div>
        )}

        {/* Bottom branding */}
        <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500 ${
          phase === "celebration" || phase === "redirect" || phase === "frames" || phase === "final" ? 'opacity-0' : 'opacity-100'
        }`}>
          <Image
            src="/vibe-4-wellness-logo.png"
            alt="Vibe 4 Wellness"
            width={45}
            height={36}
            className="object-contain opacity-40 animate-float-slow"
          />
          <div className="w-px h-5 bg-white/20" />
          <span className="text-white/30 text-xs">Government of Kerala</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes orbit { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(60px, -40px); } }
        @keyframes orbit-reverse { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-60px, 40px); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes float-particle { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; } 50% { transform: translateY(-20px) scale(1.2); opacity: 1; } }
        @keyframes shimmer-fast { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 15% { transform: scale(1.15); } 30% { transform: scale(1); } 45% { transform: scale(1.1); } 60% { transform: scale(1); } }
        @keyframes sparkle { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; } 50% { transform: scale(1.3) rotate(180deg); opacity: 0.5; } }
        @keyframes sparkle-delay { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.2); opacity: 0.3; } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes countdown-pop { 0% { transform: scale(0.3) rotate(-10deg); opacity: 0; } 60% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(1440deg); opacity: 0; } }
        @keyframes celebration-zoom { 0% { transform: scale(0.3); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes ping-fast { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes breathe { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.15; } }
        @keyframes fade-zoom-out { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes icon-explode { 0% { transform: scale(0) rotate(-180deg); opacity: 0; } 50% { transform: scale(1.2) rotate(10deg); opacity: 1; } 70% { transform: scale(0.95) rotate(-5deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes icon-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes title-reveal { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes char-pop { 0% { transform: translateY(30px) scale(0.5); opacity: 0; } 60% { transform: translateY(-5px) scale(1.1); } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes word-pop { 0% { transform: translateY(15px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes subtitle-slide { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes tool-bounce { 0% { transform: scale(0) translateY(20px); } 50% { transform: scale(1.15) translateY(-8px); } 100% { transform: scale(1) translateY(0); } }
        @keyframes fade-up { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes feature-fly { 0% { transform: translateX(-30px) scale(0.8); opacity: 0; } 100% { transform: translateX(0) scale(1); opacity: 1; } }
        @keyframes check-pop { 0% { transform: scale(0) rotate(-180deg); } 100% { transform: scale(1) rotate(0deg); } }
        @keyframes badge-scale { 0% { transform: scale(0) rotate(-10deg); } 60% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1) rotate(0deg); } }
        @keyframes final-burst { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
        @keyframes rocket-lift { 0% { transform: rotate(-45deg) translateY(0); } 100% { transform: rotate(-45deg) translateY(-20px); } }
        @keyframes text-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes highlight-glow { 0% { text-shadow: 0 0 10px rgba(255,255,255,0.5); } 100% { text-shadow: 0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(16,185,129,0.6); } }
        @keyframes spark-1 { 0%, 100% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } }
        @keyframes spark-2 { 0%, 100% { transform: scale(0); opacity: 0; } 40%, 60% { transform: scale(1); opacity: 1; } }
        @keyframes spark-3 { 0%, 100% { transform: scale(0); opacity: 0; } 30%, 70% { transform: scale(1); opacity: 0.8; } }
        @keyframes spark-4 { 0%, 100% { transform: scale(0); opacity: 0; } 20%, 80% { transform: scale(0.8); opacity: 0.6; } }
        @keyframes shimmer-text { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.4); } }
        @keyframes shimmer-text-reverse { 0%, 100% { filter: brightness(1.4); } 50% { filter: brightness(1); } }
        @keyframes text-glow { 0%, 100% { text-shadow: 0 0 10px rgba(94, 234, 212, 0.3); } 50% { text-shadow: 0 0 25px rgba(94, 234, 212, 0.7); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
        @keyframes star-burst { 0% { transform: scale(0) rotate(0deg); } 50% { transform: scale(1.4) rotate(180deg); } 100% { transform: scale(1) rotate(360deg); } }
        @keyframes letter-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes word-fade-1 { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes word-fade-2 { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes word-fade-3 { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes word-fade-4 { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes word-fade-5 { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes orbit-icon { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orbit-icon-reverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes orbit-dot { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orbit-dot-reverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes corner-tl { 0% { opacity: 0; transform: translate(-20px, -20px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes corner-tr { 0% { opacity: 0; transform: translate(20px, -20px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes corner-bl { 0% { opacity: 0; transform: translate(-20px, 20px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes corner-br { 0% { opacity: 0; transform: translate(20px, 20px); } 100% { opacity: 1; transform: translate(0, 0); } }
        @keyframes slide-in-right { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes number-pop { 0% { transform: scale(0.5); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes grid-pulse { 0%, 100% { opacity: 0.02; } 50% { opacity: 0.04; } }
        @keyframes beam-1 { 0%, 100% { opacity: 0.1; transform: translateX(-50%) scaleY(0.8); } 50% { opacity: 0.3; transform: translateX(-50%) scaleY(1); } }
        @keyframes beam-2 { 0%, 100% { opacity: 0.05; transform: scaleY(0.9); } 50% { opacity: 0.15; transform: scaleY(1); } }
        @keyframes beam-3 { 0%, 100% { opacity: 0.05; transform: scaleY(0.9); } 50% { opacity: 0.15; transform: scaleY(1); } }
        @keyframes flame { 0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.9; } 50% { transform: scaleY(1.3) scaleX(0.8); opacity: 1; } }
        @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        
        .animate-orbit { animation: orbit 15s ease-in-out infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 18s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
        .animate-shimmer-fast { animation: shimmer-fast 1.2s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        .animate-sparkle-delay { animation: sparkle-delay 2s ease-in-out infinite 0.3s; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-countdown-pop { animation: countdown-pop 0.35s ease-out forwards; }
        .animate-confetti { animation: confetti 3.5s ease-out forwards; }
        .animate-celebration-zoom { animation: celebration-zoom 0.5s ease-out forwards; }
        .animate-ping-fast { animation: ping-fast 1.2s ease-out forwards; }
        .animate-breathe { animation: breathe 4s ease-in-out infinite; }
        .animate-fade-zoom-out { animation: fade-zoom-out 1s ease-out forwards; }
        .animate-icon-explode { animation: icon-explode 0.5s ease-out forwards; }
        .animate-icon-breathe { animation: icon-breathe 2s ease-in-out infinite; }
        .animate-title-reveal { animation: title-reveal 0.4s ease-out forwards; }
        .animate-char-pop { animation: char-pop 0.4s ease-out both; }
        .animate-word-pop { animation: word-pop 0.3s ease-out both; }
        .animate-subtitle-slide { animation: subtitle-slide 0.4s ease-out 0.1s both; }
        .animate-tool-bounce { animation: tool-bounce 0.5s ease-out both; }
        .animate-fade-up { animation: fade-up 0.4s ease-out both; }
        .animate-feature-fly { animation: feature-fly 0.4s ease-out both; }
        .animate-check-pop { animation: check-pop 0.3s ease-out both; }
        .animate-badge-scale { animation: badge-scale 0.4s ease-out both; }
        .animate-final-burst { animation: final-burst 0.4s ease-out forwards; }
        .animate-shake { animation: shake 0.15s ease-in-out infinite; }
        .animate-rocket-lift { animation: rocket-lift 0.6s ease-out infinite alternate; }
        .animate-text-shake { animation: text-shake 0.1s ease-in-out infinite; }
        .animate-blink { animation: blink 0.5s step-end infinite; }
        .animate-highlight-glow { animation: highlight-glow 0.4s ease-out forwards; }
        .animate-spark-1 { animation: spark-1 0.8s ease-out infinite; }
        .animate-spark-2 { animation: spark-2 0.9s ease-out infinite 0.1s; }
        .animate-spark-3 { animation: spark-3 1s ease-out infinite 0.2s; }
        .animate-spark-4 { animation: spark-4 1.1s ease-out infinite 0.3s; }
        .animate-shimmer-text { animation: shimmer-text 2s ease-in-out infinite; }
        .animate-shimmer-text-reverse { animation: shimmer-text-reverse 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-rainbow { animation: rainbow 2s linear infinite; }
        .animate-star-burst { animation: star-burst 0.4s ease-out both; }
        .animate-letter-bounce { animation: letter-bounce 1s ease-in-out infinite; }
        .animate-word-fade-1 { animation: word-fade-1 0.4s ease-out 0s both; }
        .animate-word-fade-2 { animation: word-fade-2 0.4s ease-out 0.1s both; }
        .animate-word-fade-3 { animation: word-fade-3 0.4s ease-out 0.2s both; }
        .animate-word-fade-4 { animation: word-fade-4 0.4s ease-out 0.3s both; }
        .animate-word-fade-5 { animation: word-fade-5 0.4s ease-out 0.4s both; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 15s linear infinite; }
        .animate-orbit-icon { animation: orbit-icon 4s linear infinite; }
        .animate-orbit-icon-reverse { animation: orbit-icon-reverse 6s linear infinite; }
        .animate-orbit-dot { animation: orbit-dot 3s linear infinite; }
        .animate-orbit-dot-reverse { animation: orbit-dot-reverse 5s linear infinite; }
        .animate-corner-tl { animation: corner-tl 0.5s ease-out forwards; }
        .animate-corner-tr { animation: corner-tr 0.5s ease-out 0.1s forwards; }
        .animate-corner-bl { animation: corner-bl 0.5s ease-out 0.2s forwards; }
        .animate-corner-br { animation: corner-br 0.5s ease-out 0.3s forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
        .animate-number-pop { animation: number-pop 0.3s ease-out forwards; }
        .animate-grid-pulse { animation: grid-pulse 3s ease-in-out infinite; }
        .animate-beam-1 { animation: beam-1 2s ease-in-out infinite; }
        .animate-beam-2 { animation: beam-2 2.5s ease-in-out infinite 0.5s; }
        .animate-beam-3 { animation: beam-3 3s ease-in-out infinite 1s; }
        .animate-flame { animation: flame 0.15s ease-in-out infinite; }
        .animate-bounce-x { animation: bounce-x 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
