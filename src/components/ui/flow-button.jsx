'use client';

import { ArrowRight } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariant = {
  default:
    'group relative flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-3 w-25 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]',

  filled:
    'group relative flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 w-50 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]',

  outline:
    'group relative flex items-center justify-center overflow-hidden rounded-xl border border-primary bg-transparent px-6 py-4 w-50 text-sm font-semibold text-primary cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white active:scale-[0.95]',

  gradient:
    'group relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-hover px-8 py-4 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]',

  login:
    'group relative flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-3 w-25 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]',
}


export function FlowButton({
  onClick,
  text,
  variant = 'filled',
  className
}) {
  const hasAnimation =
    variant !== 'outline' && variant !== 'default';

  return (
    <button className={cn(buttonVariant[variant], className)} onClick={onClick}>

      {hasAnimation && (
        <ArrowRight className="absolute left-[-25%] h-4 w-4 stroke-[#111111] z-10 transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4 group-hover:stroke-white" />
      )}


      <span
        className={`relative z-10 text-center ${hasAnimation
          ? 'transition-all duration-800 ease-out group-hover:translate-x-3'
          : ''
          }`}
      >
        {text}
      </span>

      <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-hover opacity-0 transition-all duration-800 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-55 group-hover:w-full group-hover:opacity-100" />



      {hasAnimation && (
        <ArrowRight className="absolute right-4 h-4 w-4 stroke-white z-10 transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]" />
      )}
    </button>
  );
}