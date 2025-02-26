import type React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface FlashcardGeneratorLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cardCount?: number;
  color?: "blue" | "purple" | "green" | "black";
}

export function FlashcardGeneratorLoader({
  cardCount = 1,
  color = "black",
  className,
  ...props
}: FlashcardGeneratorLoaderProps) {
  const colorClasses = {
    blue: "bg-blue-100 border-blue-300",
    purple: "bg-purple-100 border-purple-300",
    green: "bg-green-100 border-green-300",
    black: "bg-violet-800 border-black",
  };

  return (
    <div
      className={cn("relative w-48 h-32", className)}
      role="status"
      aria-label="Generating flashcards"
      {...props}
    >
      {[...Array(cardCount)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 rounded-lg border-2 shadow-md",
            colorClasses[color],
            "animate-flashcard-generate",
            index === cardCount - 1 && "flex items-center justify-center"
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        >
          {index === cardCount - 1 && (
            <Sparkles className={`w-6 h-6 text-${color}-500 animate-pulse`} />
          )}
        </div>
      ))}
    </div>
  );
}
