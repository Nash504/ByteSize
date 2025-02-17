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
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const prompt =
    "DNA replication is the process by which a cell makes an identical copy of its DNA before cell division. It begins with the enzyme **helicase** unwinding the double helix, creating a replication fork. **Primase** adds RNA primers to start the process. **DNA polymerase** then attaches new complementary nucleotides to each original strand, forming two identical DNA molecules. One strand is synthesized continuously (**leading strand**), while the other is made in fragments (**lagging strand**) joined by **ligase**. This ensures accurate genetic information transfer. **Proofreading enzymes** correct errors to maintain fidelity. DNA replication is **semi-conservative**, meaning each new DNA molecule has one original and one new strand, ensuring genetic stability across generations.";

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
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateText}
            className="  text-lg font-bold mx-auto"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
      <p>{output}</p>
    </div>
  );
}
