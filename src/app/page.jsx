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
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState("");
  const prompt = "give me a recipe for making cheese curds";

  const generateText = async () => {
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
      <form></form>
      <Card className="border-black mt-4 p-4 max-w-xl mx-auto border-2">
        <CardHeader>
          <CardTitle className="text-2xl">AI Flashcard Generator</CardTitle>
          <CardDescription>
            Upload a document, paste your notes to automatically generate
            flashcards with AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea />
        </CardContent>
        <CardFooter>
          <button
            onClick={generateText}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
          >
            Submit
          </button>
        </CardFooter>
      </Card>
      <p>{output}</p>
    </div>
  );
}
