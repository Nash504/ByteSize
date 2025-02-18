"use client";
import Image from "next/image";
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

import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const maxLength = 25000;

  const generateText = async (event) => {
    event.preventDefault(); // Prevent page reload
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
        setOutput(data.content);
        setLoading(false);
        setOutput(data.content);
      }
    } catch (err) {
      console.log(err);
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

          <CardFooter className="w-full flex justify-center mt-4">
            <Button
              disabled={input.length >= maxLength}
              className="w-full max-w-xs text-lg font-bold"
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
        output && (
          <Card className="border-black mt-4 p-4 max-w-xl mx-auto border-4">
            <p>{output}</p>
          </Card>
        )
      )}
    </div>
  );
}
