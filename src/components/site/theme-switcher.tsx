'use client';

import { useState } from 'react';
import { useTheme, THEMES } from '@/lib/theme-store';
import { Palette, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { current, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-cyan-300 hover:bg-white/10 transition-all"
          title="Ganti tema warna"
          aria-label="Ganti tema warna"
        >
          <Palette className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-3 z-[60]"
        align="center"
        sideOffset={8}
      >
        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5 text-primary" />
          Tema Warna
        </p>
        <div className="space-y-1.5">
          {THEMES.map((theme) => (
            <button
              key={theme.key}
              onClick={() => { setTheme(theme.key); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all',
                current === theme.key
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40 hover:bg-muted/40'
              )}
            >
              <div className="flex items-center gap-1">
                <div className="h-5 w-5 rounded-full ring-1 ring-border" style={{ backgroundColor: theme.colors.bg }} />
                <div className="h-5 w-5 rounded-full -ml-1.5 ring-1 ring-border" style={{ backgroundColor: theme.colors.primary }} />
                <div className="h-5 w-5 rounded-full -ml-1.5 ring-1 ring-border" style={{ backgroundColor: theme.colors.accent }} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-foreground">{theme.label}</p>
                <p className="text-[10px] text-muted-foreground">{theme.description}</p>
              </div>
              {current === theme.key && (
                <Check className="h-4 w-4 text-primary shrink-0" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
