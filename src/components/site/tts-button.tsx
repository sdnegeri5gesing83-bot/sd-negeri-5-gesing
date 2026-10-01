'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, Pause, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TtsButtonProps {
  /** Text to read aloud (max 1024 chars enforced on the server) */
  text: string;
  /** Optional className override */
  className?: string;
  /** Button size — defaults to 'sm' */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Optional accessible label override */
  label?: string;
  /** Optional variant override — defaults to 'ghost' */
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
}

type State = 'idle' | 'loading' | 'playing';

const MAX_TTS_CHARS = 1024;

/**
 * Reusable Text-to-Speech button.
 * - On click: POST /api/tts, get a WAV blob, play it.
 * - Shows loading spinner while generating.
 * - When playing, shows a Pause button that stops playback.
 */
export function TtsButton({
  text,
  className,
  size = 'sm',
  label,
  variant = 'ghost',
}: TtsButtonProps) {
  const [state, setState] = useState<State>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentUrlRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAndCleanup();
    };
  }, []);

  const stopAndCleanup = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch {}
      audioRef.current = null;
    }
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    // Prevent click from bubbling up to parent (e.g. card onClick that opens a dialog)
    e.stopPropagation();
    e.preventDefault();

    if (state === 'playing') {
      // Stop playback
      stopAndCleanup();
      setState('idle');
      return;
    }
    if (state === 'loading') return;

    const trimmed = (text || '').trim();
    if (!trimmed) {
      toast.error('Teks kosong, tidak dapat dibacakan');
      return;
    }
    if (trimmed.length > MAX_TTS_CHARS) {
      toast.error(`Teks terlalu panjang (maksimal ${MAX_TTS_CHARS} karakter)`);
      return;
    }

    // Stop any existing audio first
    stopAndCleanup();
    setState('loading');

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) {
        let errMsg = 'Gagal membuat audio';
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) {
          try {
            const j = await res.json();
            if (j?.error) errMsg = j.error;
          } catch {}
        }
        throw new Error(errMsg);
      }

      const blob = await res.blob();
      if (!blob || blob.size === 0) {
        throw new Error('Audio yang dihasilkan kosong');
      }

      const url = URL.createObjectURL(blob);
      currentUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        stopAndCleanup();
        setState('idle');
      };
      audio.onerror = () => {
        stopAndCleanup();
        setState('idle');
        toast.error('Gagal memutar audio');
      };

      // Some browsers require play() to be triggered from user gesture
      await audio.play();
      setState('playing');
    } catch (e: any) {
      stopAndCleanup();
      setState('idle');
      const msg = e?.message || 'Gagal membuat audio. Coba lagi nanti.';
      toast.error(msg);
    }
  };

  const accessibleLabel =
    label ||
    (state === 'playing' ? 'Hentikan audio' : 'Dengarkan teks ini');

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={handleClick}
      disabled={state === 'loading'}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={className}
    >
      {state === 'loading' ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : state === 'playing' ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      {size !== 'icon' && (
        <span className="ml-1">{state === 'playing' ? 'Stop' : 'Dengarkan'}</span>
      )}
    </Button>
  );
}
