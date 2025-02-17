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
        setLoading(false);
        setOutput(data.content);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" p-2">
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
            <CardDescription>
              {input.length > 25000 ? (
                <p className="text-red-500">
                  {" "}
                  You have exceeded the maximum of 25,000 characters
                </p>
              ) : (
                ""
              )}
            </CardDescription>
            <CardDescription className=" text-right mt-2 mr-auto text-lg">
              {input.length < 25000 ? (
                <p>{input.length}/25000 characters</p>
              ) : (
                <p className="text-red-500">{input.length}/25000 characters</p>
              )}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button
              disabled={input.length > maxLength}
              className="text-lg font-bold mx-auto"
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
            <p>{output}</p>{" "}
          </Card>
        )
      )}
    </div>
  );
}
