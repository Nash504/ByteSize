"use client";
import { useState } from "react";
import Header from "@/components/Header";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardCarousel from "@/components/FlashcardCarousel";
import { FlashcardGeneratorLoader } from "@/components/ui/flashcard-generator-loader";

export default function Home() {
  const [flashcards, setFlashcards] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#F7F7F7]">
      <Header />
      <div className="p-2 max-w-lg mx-auto font-feather">
        <FlashcardForm setFlashcards={setFlashcards} setLoading={setLoading} />
        {loading ? (
          <FlashcardGeneratorLoader color="#58CC02" cardCount={1} />
        ) : (
          <FlashcardCarousel flashcards={flashcards} />
        )}
      </div>
    </div>
  );
}
