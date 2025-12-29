import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Title({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-4xl font-black bg-linear-to-r from-[#057252] to-[#95AB5D] text-transparent bg-clip-text",
        className
      )}
    >
      {children}
    </h2>
  );
}
