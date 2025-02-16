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
  const [nash, setNash] = useState(true);
  return (
    <div className="bg-slate-500">
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            Submit
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
