'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Halo! Saya asisten virtual SD Negeri 5 Gesing. Ada yang bisa saya bantu seputar PPDB atau informasi sekolah?',
};

const SUGGESTIONS = [
  'Syarat PPDB apa saja?',
  'Kapan pendaftaran PPDB dibuka?',
  'Bagaimana cara mendaftar?',
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  const scrollToBottom = useCallback(() => {
    // Use rAF to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      // Focus input slightly after open animation
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Build history from previous messages (excluding welcome-only state)
    const history = messages
      // Skip the welcome message if it's the only one so far — LLM context will still include system prompt
      .slice(0, 20)
      .map((m) => ({ role: m.role, content: m.content }));

    const newUserMsg: ChatMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);
    setHasInteracted(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Gagal menghubungi asisten');
      }
      const reply: string = data?.response || 'Maaf, saya tidak dapat membalas saat ini.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e: any) {
      const errMsg =
        e?.message ||
        'Maaf, terjadi gangguan. Silakan hubungi sekolah di 08873886384.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${errMsg}` },
      ]);
      toast.error('Gagal menghubungi asisten. Coba lagi.');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter to send (Shift+Enter would normally insert newline, but Input is single-line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleOpen = () => {
    setOpen((o) => !o);
  };

  const handleSuggestion = (s: string) => {
    sendMessage(s);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? 'Tutup asisten PPDB' : 'Buka asisten PPDB'}
        aria-expanded={open}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center group"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping [animation-duration:2s] group-hover:animate-none" />
            {/* Notification badge */}
            {!hasInteracted && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold text-[10px] font-bold text-[#0a0f1e] flex items-center justify-center ring-2 ring-background">
                1
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Asisten PPDB"
          aria-modal="false"
          className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 sm:w-[380px] sm:max-w-[calc(100vw-3rem)] h-[70vh] sm:h-[560px] sm:max-h-[calc(100vh-8rem)] bg-card border border-border sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-tight truncate">
                  Asisten PPDB
                </p>
                <p className="text-[11px] text-primary-foreground/80 leading-tight truncate">
                  SD Negeri 5 Gesing
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
              onClick={toggleOpen}
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto custom-scroll px-3 py-4 space-y-3 bg-muted/30"
          >
            {messages.map((m, idx) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line break-words ${
                      isUser
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-card text-card-foreground border border-border rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                  {isUser && (
                    <div className="h-7 w-7 rounded-full bg-muted border border-border text-foreground flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-card border border-border">
                  <div className="flex items-center gap-1" aria-label="Asisten sedang mengetik">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/70 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestions — only show before first user message */}
            {!hasInteracted && !loading && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] text-muted-foreground px-1">
                  Coba tanyakan:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSuggestion(s)}
                      className="text-left text-xs px-3 py-2 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/40 transition-colors text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 p-3 border-t border-border bg-card flex items-center gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pertanyaan..."
              disabled={loading}
              maxLength={2000}
              aria-label="Pesan untuk asisten"
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              aria-label="Kirim pesan"
              className="shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
