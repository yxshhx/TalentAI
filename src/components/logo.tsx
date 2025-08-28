import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function TalentAILogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", props.className)}
      {...props}
    >
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
      <path d="M12 2l0 2" />
      <path d="M12 20l0 2" />
      <path d="M20 12l2 0" />
      <path d="M2 12l2 0" />
    </svg>
  );
}
