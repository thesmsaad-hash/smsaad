"use client";

import * as React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Headphones,
  Sparkles,
  Radio,
} from "lucide-react";

interface PodcastPlayerProps {
  title: string;
  summary?: string | null;
  audioUrl?: string | null;
}

export function PodcastPlayer({ title, summary, audioUrl }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(180); // 3 minutes default demo length
  const [playbackRate, setPlaybackRate] = React.useState(1.0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [usingSpeechSynth, setUsingSpeechSynth] = React.useState(false);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const synthUtteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  // Default sample audio for testing if no custom MP3 is linked
  const defaultAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const activeSource = audioUrl || defaultAudioUrl;

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (!isPlaying) {
      // Check if browser SpeechSynthesis can read the summary or play audio track
      if (activeSource && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Fallback to SpeechSynthesis
          startSpeechSynth();
        });
      } else {
        startSpeechSynth();
      }
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    }
  };

  const startSpeechSynth = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${title}. ${summary || ""}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackRate;
      utterance.onend = () => setIsPlaying(false);
      synthUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setUsingSpeechSynth(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(audioRef.current.duration || duration, audioRef.current.currentTime + seconds)
      );
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    const rates = [1.0, 1.25, 1.5, 2.0];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIndex];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-2xl border border-[#7C3AED]/30 bg-[#111827]/90 p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-4 my-6">
      {/* Background Ambient Glow */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#7C3AED]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#22D3EE]/10 blur-3xl pointer-events-none" />

      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={activeSource}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] shadow-lg shadow-[#7C3AED]/25">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#22D3EE]">
                <Radio className="h-3 w-3 animate-pulse text-[#7C3AED]" />
                AI Audio Overview
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA]">Dual-Host Synthesis</span>
            </div>
            <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
              Podcast Brief: {title}
            </h4>
          </div>
        </div>

        {/* Animated Equalizer Waveform */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1F2937]/60 border border-[#27272A] self-start sm:self-auto">
          <div className={`w-1 rounded-full bg-[#7C3AED] transition-all ${isPlaying ? "h-5 animate-pulse" : "h-2"}`} />
          <div className={`w-1 rounded-full bg-[#22D3EE] transition-all ${isPlaying ? "h-7 animate-bounce" : "h-3"}`} />
          <div className={`w-1 rounded-full bg-[#7C3AED] transition-all ${isPlaying ? "h-4 animate-pulse" : "h-2"}`} />
          <div className={`w-1 rounded-full bg-[#22D3EE] transition-all ${isPlaying ? "h-6 animate-bounce" : "h-3"}`} />
          <div className={`w-1 rounded-full bg-[#7C3AED] transition-all ${isPlaying ? "h-3 animate-pulse" : "h-1.5"}`} />
          <span className="text-[10px] font-mono text-[#A1A1AA] ml-1.5 font-bold">
            {isPlaying ? "PLAYING AUDIO" : "AUDIO READY"}
          </span>
        </div>
      </div>

      {/* Controls & Scrubber */}
      <div className="space-y-3">
        {/* Progress Scrubber */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Rewind 10s */}
            <button
              onClick={() => skipTime(-10)}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#1F2937] transition-all cursor-pointer"
              title="Rewind 10s"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90 transition-all shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => skipTime(10)}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#1F2937] transition-all cursor-pointer"
              title="Forward 10s"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Selector */}
            <button
              onClick={changeSpeed}
              className="px-2.5 py-1 rounded-lg border border-[#27272A] bg-[#1F2937] text-xs font-mono font-bold text-[#22D3EE] hover:border-[#7C3AED] transition-all cursor-pointer"
              title="Playback Speed"
            >
              {playbackRate}x
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#1F2937] transition-all cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastPlayer;
