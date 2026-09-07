import { cn } from "@/lib/utils";

interface PageGridProps {
  children: React.ReactNode;
  className?: string;
}

export function PageGrid({ children, className }: PageGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1400px] grid-cols-4 gap-x-4 px-6",
        "sm:grid-cols-8 sm:gap-x-6 sm:px-10",
        "lg:grid-cols-12 lg:gap-x-6 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
