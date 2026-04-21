import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.18),0_6px_14px_-4px_rgba(217,122,44,0.5)] hover:brightness-110 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25),0_6px_14px_-4px_rgba(220,40,40,0.45)] hover:brightness-110 hover:-translate-y-0.5",
        outline:
          "border border-input bg-card/80 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_10px_-4px_rgba(20,20,15,0.2)] hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_10px_-4px_rgba(20,20,15,0.18)] hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-gradient-saffron text-primary-foreground font-semibold tracking-wide shadow-[inset_0_1px_0_rgba(255,220,150,0.6),inset_0_-3px_0_rgba(120,50,5,0.45),0_14px_30px_-10px_rgba(217,122,44,0.7)] hover:brightness-110 hover:-translate-y-0.5",
        "hero-outline":
          "border-2 border-primary-foreground/85 text-primary-foreground font-semibold tracking-wide bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_-8px_rgba(0,0,0,0.5)] hover:bg-primary-foreground/15 hover:-translate-y-0.5",
        saffron:
          "bg-gradient-saffron text-primary-foreground shadow-[inset_0_1px_0_rgba(255,220,150,0.6),inset_0_-3px_0_rgba(120,50,5,0.45),0_10px_24px_-8px_rgba(217,122,44,0.6)] hover:brightness-110 hover:-translate-y-0.5",
        accent:
          "bg-accent text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25),0_6px_14px_-4px_rgba(180,40,40,0.45)] hover:brightness-110 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
