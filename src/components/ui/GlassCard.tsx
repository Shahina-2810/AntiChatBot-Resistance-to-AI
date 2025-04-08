
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "glass-card rounded-xl p-5 transition-all duration-300 animate-enter hover-scale",
      className
    )}>
      {children}
    </div>
  );
}
