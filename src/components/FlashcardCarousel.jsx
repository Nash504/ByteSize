"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function FlashcardCarousel({ flashcards }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      {flashcards &&
        Object.entries(flashcards).map(([topic, questions], topicIndex) => (
          <div key={topicIndex} className="mt-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 mt-16 text-[#4b4b4b]">
              {topic}
            </h2>
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {questions
                  .filter((q) => q.question && q.answer)
                  .map((item, index) => (
                    <CarouselItem key={index}>
                      <div
                        className="relative w-full h-96 transition-transform duration-500"
                        style={{
                          transform: flippedCards[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                          transformStyle: "preserve-3d",
                        }}
                        onClick={() => toggleCard(index)}
                      >
                        <Card className="absolute w-full backface-hidden border-2 border-[#58CC02] border-b-8 rounded-xl shadow-lg">
                          {flippedCards[index] ? item.answer : item.question}
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        ))}
    </>
  );
}
