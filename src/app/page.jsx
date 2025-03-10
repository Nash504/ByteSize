"use client";
import "./globals.css";
import { useState, useEffect } from "react";
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
  CarouselNext,
  CarouselPrevious,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/logo";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [flashcards, setFlashcards] = useState(null);
  const [savedDecks, setSavedDecks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [activeTab, setActiveTab] = useState("text");
  const [deckName, setDeckName] = useState("");
  const [currentTopic, setCurrentTopic] = useState(null);
  const maxLength = 25000;

  // Load saved decks from local storage on component mount
  useEffect(() => {
    const savedDecksFromStorage = localStorage.getItem("savedDecks");
    if (savedDecksFromStorage) {
      setSavedDecks(JSON.parse(savedDecksFromStorage));
    }
  }, []);

  const generateText = async (event) => {
    event.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter some text to generate flashcards.");
      return;
    }

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

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setFlashcards(data.content);
      setFlippedCards({});

      // Set the first topic as current after generation
      if (data.content && Object.keys(data.content).length > 0) {
        setCurrentTopic(Object.keys(data.content)[0]);
      }

      toast.success("Your flashcards have been generated.");
    } catch (err) {
      console.error(err);
      toast.error(
        "There was an error generating your flashcards. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (topicName, index) => {
    const cardId = `${topicName}-${index}`;
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const isCardFlipped = (topicName, index) => {
    const cardId = `${topicName}-${index}`;
    return !!flippedCards[cardId];
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target.result.toString());
      toast.success(`${file.name} has been loaded successfully.`);
    };
    reader.onerror = () => {
      toast.error("There was an error reading your file.");
    };
    reader.readAsText(file);
  };

  const saveCurrentDeck = () => {
    if (!flashcards || !deckName.trim()) {
      toast.error("Please generate flashcards and provide a deck name first.");
      return;
    }

    const newDeck = {
      id: Date.now(),
      name: deckName,
      content: flashcards,
      createdAt: new Date().toISOString(),
    };

    const updatedDecks = [...savedDecks, newDeck];
    setSavedDecks(updatedDecks);
    localStorage.setItem("savedDecks", JSON.stringify(updatedDecks));

    toast.success(`${deckName} has been saved to your collection.`);

    setDeckName("");
  };

  const loadDeck = (deck) => {
    setFlashcards(deck.content);
    setFlippedCards({});
    if (deck.content && Object.keys(deck.content).length > 0) {
      setCurrentTopic(Object.keys(deck.content)[0]);
    }
    toast.success(`${deck.name} has been loaded.`);
  };

  const deleteDeck = (id, e) => {
    e.stopPropagation();
    const updatedDecks = savedDecks.filter((deck) => deck.id !== id);
    setSavedDecks(updatedDecks);
    localStorage.setItem("savedDecks", JSON.stringify(updatedDecks));
    toast.success("The deck has been removed from your collection.");
  };

  const exportDeck = () => {
    if (!flashcards) {
      toast.error("Please generate or load flashcards first.");
      return;
    }

    const fileName = `${deckName || "flashcards"}_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    const dataStr = JSON.stringify(flashcards, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Your flashcards have been exported as ${fileName}.`);
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Toaster position="top-center" richColors />
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
        <div className="flex gap-2 items-center">
          {savedDecks.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#58CC02] text-[#58CC02]"
                >
                  My Decks
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {savedDecks.map((deck) => (
                  <DropdownMenuItem
                    key={deck.id}
                    className="cursor-pointer flex justify-between items-center"
                    onClick={() => loadDeck(deck)}
                  >
                    <span>{deck.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500"
                      onClick={(e) => deleteDeck(deck.id, e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#58CC02] border border-white"
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
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>ByteSize Menu</SheetTitle>
                <SheetDescription>
                  Create, save, and study your flashcards
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-6">
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
                  href="/About"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="/Feedback"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  Feedback
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="p-4 max-w-3xl mx-auto font-feather">
        <form onSubmit={generateText}>
          <Card className="border-[#58CC02] border-b-8 mt-4 p-4 border-2 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#4b4b4b]">
                AI Flashcard Generator
              </CardTitle>
              <CardDescription className="text-md text-[#777777]">
                Upload a document or paste your notes to automatically generate
                flashcards with AI.
              </CardDescription>
            </CardHeader>
            <Tabs
              defaultValue="text"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
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
                  Upload FlashCards
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
                <div className="mt-2">
                  <Progress
                    value={(input.length / maxLength) * 100}
                    className="h-2"
                  />
                </div>
                <CardDescription className="flex justify-between mt-2 text-lg">
                  <span
                    className={
                      input.length >= maxLength
                        ? "text-[#FF4B4B]"
                        : "text-[#777777]"
                    }
                  >
                    {input.length >= maxLength &&
                      "You have exceeded the maximum character limit"}
                  </span>
                  <span
                    className={
                      input.length >= maxLength
                        ? "text-[#FF4B4B]"
                        : "text-[#777777]"
                    }
                  >
                    {input.length}/{maxLength}
                  </span>
                </CardDescription>
                <CardFooter className="flex justify-between mt-4">
                  <div className="flex gap-2 items-center">
                    <Label htmlFor="deckName" className="text-[#777777]">
                      Deck Name:
                    </Label>
                    <Input
                      id="deckName"
                      value={deckName}
                      onChange={(e) => setDeckName(e.target.value)}
                      placeholder="My Flashcards"
                      className="w-40 border-[#FFFFFF] focus:ring-2 focus:ring-[#58CC02]"
                    />
                  </div>
                  <Button
                    disabled={
                      input.length >= maxLength || input.length === 0 || loading
                    }
                    className="text-lg font-bold relative bg-[#58CC02] text-white px-6 py-3 rounded-xl transition-all duration-200
                    border-b-4 border-[#2E860A] shadow-[0px_4px_0px_#2E860A] hover:bg-[#46BB00]
                    active:border-b-[0px] active:shadow-[0px_0px_0px_0px] active:translate-y-[4px]"
                    type="submit"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="document">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#E5E5E5] rounded-md p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[#777777] mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-[#777777] font-medium mb-4">
                    Click to browse exported flashcards.
                  </p>
                  <Input
                    id="fileUpload"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      document.getElementById("fileUpload").click();
                    }}
                    variant="outline"
                    className="border-[#58CC02] text-[#58CC02]"
                    type="button" // Explicitly set type to button
                  >
                    Choose File
                  </Button>
                </div>
                {input && (
                  <div className="mt-4 flex justify-between">
                    <p className="text-[#4b4b4b] font-medium">
                      File content loaded successfully!!
                    </p>
                    <div className=" mt-2 p-3">
                      <Button
                        disabled={loading}
                        className="text-lg font-bold relative bg-[#58CC02] text-white px-6 py-3 rounded-xl transition-all duration-200
                        border-b-4 border-[#2E860A] shadow-[0px_4px_0px_#2E860A] hover:bg-[#46BB00]
                        active:border-b-[0px] active:shadow-[0px_0px_0px_0px] active:translate-y-[4px]"
                        type="submit"
                      >
                        {loading ? "Generating..." : "Generate"}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </form>

        {loading ? (
          <div className="flex flex-col justify-center items-center mx-auto pt-8">
            <FlashcardGeneratorLoader color="green" cardCount={3} />
            <p className="text-[#777777] mt-4">Generating your flashcards...</p>
          </div>
        ) : (
          flashcards && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#4b4b4b]">
                  Your Flashcards
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-[#58CC02] text-[#58CC02]"
                    onClick={saveCurrentDeck}
                    disabled={!deckName.trim()}
                  >
                    Save Deck
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#1CB0F6] text-[#1CB0F6]"
                    onClick={exportDeck}
                  >
                    Export
                  </Button>
                </div>
              </div>

              <Card className="border-2 border-[#E5E5E5] rounded-xl shadow p-4 mb-6">
                <CardHeader className="p-2">
                  <CardTitle className="text-lg text-[#4b4b4b]">
                    Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(flashcards).map((topic, index) => (
                      <Button
                        key={index}
                        variant={currentTopic === topic ? "default" : "outline"}
                        className={
                          currentTopic === topic
                            ? "bg-[#58CC02] text-white"
                            : "border-[#58CC02] text-[#58CC02]"
                        }
                        onClick={() => setCurrentTopic(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {currentTopic && (
                <div className="mt-4 flex flex-col items-center">
                  <h3 className="text-xl font-bold mb-4 text-[#4b4b4b]">
                    {currentTopic}
                  </h3>
                  <Carousel className="w-full max-w-md">
                    <CarouselContent>
                      {flashcards[currentTopic]
                        .filter((q) => q.question && q.answer)
                        .map((item, index) => (
                          <CarouselItem key={index}>
                            <div className="relative h-[300px] w-full perspective-2000">
                              <div
                                className="relative w-full h-full transition-transform duration-500"
                                style={{
                                  transformStyle: "preserve-3d",
                                  transform: isCardFlipped(currentTopic, index)
                                    ? "rotateY(180deg)"
                                    : "rotateY(0deg)",
                                }}
                                onClick={() => toggleCard(currentTopic, index)}
                              >
                                <Card className="absolute w-full h-full backface-hidden border-2 border-[#58CC02] border-b-8 rounded-xl shadow-lg">
                                  <CardHeader>
                                    <CardTitle className="text-lg text-center text-[#4b4b4b]">
                                      Flashcard {index + 1} of{" "}
                                      {flashcards[currentTopic].length}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex flex-col items-center justify-center p-4 h-[200px] overflow-y-auto">
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
                                  className="absolute w-full h-full backface-hidden border-2 border-[#1CB0F6] border-b-8 rounded-xl shadow-lg"
                                  style={{ transform: "rotateY(180deg)" }}
                                >
                                  <CardHeader>
                                    <CardTitle className="text-lg text-center text-[#4b4b4b]">
                                      Answer
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex flex-col items-center justify-center p-4 h-[200px] overflow-y-auto">
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
                    <div className="flex justify-center gap-4 mt-4">
                      <CarouselPrevious className="static transform-none bg-[#58CC02] text-white hover:bg-[#46BB00] hover:text-white" />
                      <CarouselNext className="static transform-none bg-[#58CC02] text-white hover:bg-[#46BB00] hover:text-white" />
                    </div>
                  </Carousel>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
