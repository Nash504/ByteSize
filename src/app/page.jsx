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
import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const maxLength = 25000;
  const generateText = async (event) => {
    event.preventDefault(); // Prevent page reload

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
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={generateText}>
        <Card className="border-black mt-4 p-4 max-w-xl mx-auto border-4">
          <CardHeader>
            <CardTitle className="text-2xl">AI Flashcard Generator</CardTitle>
            <CardDescription className="text-md">
              Upload a document, paste your notes to automatically generate
              flashcards with AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="resize-none rounded-md "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your notes here..."
              required
            />
            <CardDescription className=" text-right mt-2 mr-auto text-lg">
              {input.length < 25000 ? (
                <p>{input.length}/25000 characters</p>
              ) : (
                <p className="text-red-500">{input.length}/25000 characters</p>
              )}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button className="text-lg font-bold mx-auto" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div>
        {output ? (
          <p>{output}</p>
        ) : (
          <div className="flex justify-center items-center mt-8 mx-auto">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
}
