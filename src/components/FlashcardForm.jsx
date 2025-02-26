"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FlashcardForm({ setFlashcards, setLoading }) {
  const [input, setInput] = useState("");
  const maxLength = 25000;

  const generateText = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      if (response.ok) {
        setFlashcards(data.content);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={generateText}>
      <Card className="border-[#58CC02] border-b-8 mt-4 p-4 border-2 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#4b4b4b]">
            AI Flashcard Generator
          </CardTitle>
          <CardDescription className="text-md text-[#777777]">
            Upload a document or paste notes to generate flashcards with AI.
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="text">
          <TabsList className="flex justify-center bg-[#f7f7f7] border border-[#E5E5E5]">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-[#58CC02] data-[state=active]:text-white"
            >
              Text
            </TabsTrigger>
            <TabsTrigger
              value="document"
              className="data-[state=active]:bg-[#58CC02] data-[state=active]:text-white"
            >
              Document
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <Textarea
              className="resize-none h-40 w-full p-2 border-2 border-[#E5E5E5]"
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
            <CardDescription className="text-right mt-2 text-lg text-[#777777]">
              {input.length}/{maxLength} characters
            </CardDescription>
            <CardFooter className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={input.length >= maxLength}
                className="bg-[#58CC02] text-white px-6 py-3 rounded-xl"
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
  );
}
