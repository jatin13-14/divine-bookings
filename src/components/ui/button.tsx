import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono uppercase tracking-[0.18em] text-xs font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(30_90%_58%/0.4),0_10px_30px_-10px_hsl(30_90%_58%/0.6)] hover:shadow-[0_0_0_1px_hsl(30_90%_58%/0.6),0_14px_40px_-10px_hsl(30_90%_58%/0.8)] hover:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_0_0_1px_hsl(0_75%_55%/0.4),0_10px_30px_-10px_hsl(0_75%_55%/0.5)] hover:brightness-110",
        outline:
          "border border-border/80 bg-card/40 text-foreground backdrop-blur-md hover:border-primary/60 hover:bg-card/70 hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/60 hover:border-primary/40 hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-card/50 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline normal-case tracking-normal font-sans",
        hero:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(30_90%_58%/0.5),0_0_50px_-5px_hsl(30_90%_58%/0.7),0_18px_40px_-12px_hsl(30_90%_58%/0.6)] hover:shadow-[0_0_0_1px_hsl(30_90%_58%/0.8),0_0_70px_-5px_hsl(30_90%_58%/0.9)] hover:brightness-110",
        "hero-outline":
          "border border-foreground/30 text-foreground bg-foreground/5 backdrop-blur-md hover:border-primary/70 hover:text-primary hover:bg-primary/10",
        saffron:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(30_90%_58%/0.5),0_0_40px_-8px_hsl(30_90%_58%/0.6)] hover:brightness-110",
        accent:
          "bg-accent text-accent-foreground shadow-[0_0_0_1px_hsl(195_90%_60%/0.5),0_0_40px_-8px_hsl(195_90%_60%/0.6)] hover:brightness-110",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-[0.65rem]",
        lg: "h-12 px-8 text-sm",
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
