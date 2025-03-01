"use client";
import "./globals.css";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FlashcardGeneratorLoader } from "@/components/ui/flashcard-generator-loader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/logo";

export default function Home() {
  const [flashcards, setFlashcards] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const maxLength = 25000;

  const generateText = async (event) => {
    event.preventDefault();
    setLoading(true);
    const prompt = input;
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (response.ok) {
        setFlashcards(data.content);
        setFlippedCards({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Modified function to use topic-index combined identifier
  const toggleCard = (topicName, index) => {
    const cardId = `${topicName}-${index}`;
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Helper function to check if a card is flipped
  const isCardFlipped = (topicName, index) => {
    const cardId = `${topicName}-${index}`;
    return !!flippedCards[cardId];
  };

  return (
    <div className="bg-[#F7F7F7]">
      <header className="flex h-16 w-full items-center justify-between bg-white px-4 md:px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-bold block sm:hidden text-[#58CC02]">
            ByteSize Mobile
          </span>
          <span className="text-2xl font-bold hidden sm:block text-[#58CC02]">
            ByteSize
          </span>
        </div>
        <div className="flex gap-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#58CC02] border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetTitle></SheetTitle>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <Logo />
                  <span className="text-lg font-bold text-[#58CC02]">
                    ByteSize
                  </span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="p-2 max-w-lg mx-auto font-feather">
        <form onSubmit={generateText}>
          <Card className="border-[#58CC02] border-b-8 mt-4 p-4 border-2 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#4b4b4b]">
                AI Flashcard Generator
              </CardTitle>
              <CardDescription className="text-md text-[#777777]">
                Upload a document, paste your notes to automatically generate
                flashcards with AI.
              </CardDescription>
            </CardHeader>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="flex justify-center bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg p-1 mb-4">
                <TabsTrigger
                  value="text"
                  className="text-[#4b4b4b] rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-[#F0F0F0] transition-colors"
                >
                  Text
                </TabsTrigger>
                <TabsTrigger
                  value="document"
                  className="text-[#4b4b4b] rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-[#F0F0F0] transition-colors"
                >
                  Document
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <Textarea
                  className="resize-none rounded-md h-40 w-full p-2 focus:ring-2 focus:ring-[#58CC02] focus:bg-white border-2 border-[#E5E5E5]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your notes here..."
                  required
                />
                {input.length >= maxLength && (
                  <CardDescription className="text-[#FF4B4B] mt-2">
                    You have exceeded the maximum of 25,000 characters
                  </CardDescription>
                )}
                <CardDescription className="text-right mt-2 text-lg">
                  <p
                    className={
                      input.length >= maxLength
                        ? "text-[#FF4B4B]"
                        : "text-[#777777]"
                    }
                  >
                    {input.length}/{maxLength} characters
                  </p>
                </CardDescription>
                <CardFooter className="flex justify-end mt-4">
                  <Button
                    disabled={input.length >= maxLength}
                    className="w-1/4 text-lg font-bold relative bg-[#58CC02] text-white px-6 py-3 rounded-xl transition-all duration-200
                    border-b-4 border-[#2E860A] shadow-[0px_4px_0px_#2E860A] hover:bg-[#46BB00]
                    active:border-b-[0px] active:shadow-[0px_0px_0px_0px] active:translate-y-[4px]"
                    type="submit"
                  >
                    Submit
                  </Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="document">
                <p className="text-[#777777] p-10 font-bold">
                  Document feature coming soon!
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </form>

        {loading ? (
          <div className="flex justify-center items-center mx-auto pt-8">
            <FlashcardGeneratorLoader color="green" cardCount={1} />
          </div>
        ) : (
          flashcards &&
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
                        <div className="relative h-[500px] w-full perspective-2000">
                          <div
                            className="relative w-full h-96 transition-transform duration-500"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: isCardFlipped(topic, index)
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            }}
                            onClick={() => toggleCard(topic, index)}
                          >
                            <Card className="absolute w-full backface-hidden border-2 border-[#58CC02] border-b-8 rounded-xl shadow-lg">
                              <CardHeader>
                                <CardTitle className="text-lg text-center text-[#4b4b4b]">
                                  Flashcard {index + 1} of {questions.length}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex flex-col items-center justify-center p-4 h-[200px] overflow-y-auto pb-16">
                                <div className="text-center w-full">
                                  <p className="text-md text-[#4b4b4b]">
                                    {item.question}
                                  </p>
                                </div>
                                <p className="mt-4 text-xs text-[#777777]">
                                  Tap to flip
                                </p>
                              </CardContent>
                            </Card>

                            <Card
                              className="absolute w-full h-full backface-hidden border-2 border-[#1CB0F6] border-b-8 rounded-xl p-2 shadow-lg"
                              style={{ transform: "rotateY(180deg)" }}
                            >
                              <CardHeader>
                                <CardTitle className="text-lg text-center text-[#4b4b4b]">
                                  Answer
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex flex-col items-center justify-center w-full overflow-y-auto pb-16">
                                <div className="text-center w-full">
                                  <p className="text-md text-[#1CB0F6]">
                                    {item.answer}
                                  </p>
                                </div>
                                <p className="mt-4 text-xs text-[#777777]">
                                  Tap to flip back
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4"></div>
              </Carousel>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
