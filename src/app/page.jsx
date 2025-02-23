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
import { FlashcardGeneratorLoader } from "@/components/ui/flashcard-generator-loader";

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
    <div className="p-2 max-w-lg mx-auto font-poppins">
      <form onSubmit={generateText}>
        <Card className="border-black mt-4 p-4 border-4">
          <CardHeader>
            <CardTitle className="text-2xl">AI Flashcard Generator</CardTitle>
            <CardDescription className="text-md">
              Upload a document, paste your notes to automatically generate
              flashcards with AI.
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="flex justify-center">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="document">Document</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <Textarea
                className="resize-none rounded-md h-40 w-full p-2 focus:bg-indigo-50"
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
              <CardFooter className="flex justify-end mt-4">
                <Button
                  disabled={input.length >= maxLength}
                  className="w-1/4 text-lg font-bold"
                  type="submit"
                >
                  Submit
                </Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="document">
              <p className="text-gray-500 p-10 font-bold ">
                Document feature coming soon!
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </form>

      {loading ? (
        <div className="flex justify-center items-center mx-auto pt-8">
          <FlashcardGeneratorLoader color="black" cardCount={1} />
          {/* <Skeleton className="h-[200px] w-full max-w-md rounded-xl" /> */}
        </div>
      ) : (
        flashcards &&
        Object.entries(flashcards).map(([topic, questions], topicIndex) => (
          <div key={topicIndex} className="mt-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 mt-16">{topic}</h2>

            <Carousel
              className="w-full max-w-md"
              onSlideChange={() => setShowAnswer(false)}
            >
              <CarouselContent>
                {questions
                  .filter((q) => q.question && q.answer)
                  .map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[400px] w-full perspective-2000 ">
                        <div
                          className="relative w-full h-96 transition-transform duration-500"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: showAnswer
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          }}
                          onClick={() => setShowAnswer(!showAnswer)}
                        >
                          {/* Front of card */}
                          <Card className="bg-purple-900 absolute w-full h-full backface-hidden border-4 border-black rounded-xl">
                            <CardHeader>
                              <CardTitle className="text-lg text-center">
                                Flashcard {index + 1} of {questions.length}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center p-4 h-[200px] overflow-y-auto pb-16">
                              <div className="text-center w-full">
                                <p className="text-md">{item.question}</p>
                              </div>
                              <p className="mt-4 text-xs text-gray-500">
                                Tap to flip
                              </p>
                            </CardContent>
                          </Card>

                          {/* Back of card */}
                          <Card
                            className="absolute w-full h-full backface-hidden border-4 border-black rounded-xl p-2"
                            style={{ transform: "rotateY(180deg)" }}
                          >
                            <CardHeader>
                              <CardTitle className="text-lg text-center">
                                Answer
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center w-full overflow-y-auto pb-16 ">
                              <div className="text-center w-full">
                                <p className="text-md text-blue-600">
                                  {item.answer}
                                </p>
                              </div>
                              <p className="mt-4 text-xs text-gray-500">
                                Tap to flip back
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        ))
      )}
    </div>
  );
}
