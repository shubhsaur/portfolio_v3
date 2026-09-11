import { cn } from "@/lib/utils";

interface PageGridProps {
  children: React.ReactNode;
  className?: string;
}

export function PageGrid({ children, className }: PageGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[87.5rem] grid-cols-4 gap-x-4 px-4",
        "sm:grid-cols-8 sm:gap-x-6 sm:px-6",
        "lg:grid-cols-12 lg:gap-x-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
