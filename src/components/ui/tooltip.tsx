import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  color?: string; // <-- add this
  arrowColor?: string; // <- only controls arrow
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  color,
  arrowColor,
  ...props
}: TooltipContentProps) {
  const colorClass = color ? `tooltip-${color}` : "";
  const arrowClass = arrowColor ? `tooltip-arrow-${arrowColor}` : ""
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "base-tooltip-styles z-9999 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
          colorClass,
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={cn("fill-current",arrowClass)} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
