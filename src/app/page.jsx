"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [flashcards, setFlashcards] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
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
        setShowAnswer(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={generateText}>
        <Card className="border-black mt-4 p-4 max-w-xl mx-auto border-4">
          <CardHeader>
            <CardTitle className="text-2xl">AI Flashcard Generator</CardTitle>
            <CardDescription className="text-md">
              Upload a document, paste your notes to automatically generate
              flashcards with AI.
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="text" className="mx-auto w-full max-w-xl">
            <TabsList className="flex justify-center">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="document">Document</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <Textarea
                className="resize-none rounded-md"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your notes here..."
                required
              />
              {input.length >= maxLength && (
                <CardDescription className="text-red-500 mt-2">
                  You have exceeded the maximum of 25,000 characters
                </CardDescription>
              )}
              <CardDescription className="text-right mt-2 text-lg">
                <p className={input.length >= maxLength ? "text-red-500" : ""}>
                  {input.length}/{maxLength} characters
                </p>
              </CardDescription>
            </TabsContent>
            <TabsContent value="document">
              <p className="text-gray-500">Document feature coming soon!</p>
            </TabsContent>
          </Tabs>

          <CardFooter className="w-full flex ml-4 justify-end mt-4">
            <Button
              disabled={input.length >= maxLength}
              className="w-1/4 max-w-xs text-lg font-bold"
              type="submit"
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>

      {loading ? (
        <div className="flex justify-center items-center mx-auto pt-8">
          <Skeleton className="h-[200px] w-full max-w-xl rounded-xl" />
        </div>
      ) : (
        flashcards &&
        flashcards.questions &&
        flashcards.questions.length > 0 && (
          <div className="mx-auto mt-4 flex flex-col items-center p-8">
            <h2 className="text-xl font-bold mb-4">
              Topic: {flashcards.topic}
            </h2>
            <Carousel className="w-full max-w-xl ">
              <CarouselContent>
                {flashcards.questions.map((item, index) => (
                  <CarouselItem key={index}>
                    <Card className="mx-4 border-4 border-black">
                      <CardHeader>
                        <CardTitle className="text-xl text-center">
                          Flashcard {index + 1} of {flashcards.questions.length}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[200px]">
                        <div className="text-center">
                          <p className="text-lg mb-4">{item.question}</p>
                          {showAnswer && (
                            <p className="text-lg text-blue-600">
                              {item.answer}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => setShowAnswer(!showAnswer)}
                          className="mt-4"
                        >
                          {showAnswer ? "Hide Answer" : "Show Answer"}
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )
      )}
    </div>
  );
}
