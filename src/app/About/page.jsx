import FeedbackForm from "@/components/feedback-form";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <header className="flex h-16 w-full items-center justify-between bg-white px-4 md:px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Logo />
            <span className="text-lg font-bold block sm:hidden text-[#58CC02]">
              ByteSize Mobile
            </span>
            <span className="text-2xl font-bold hidden sm:block text-[#58CC02]">
              ByteSize
            </span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#58CC02] border border-gray-300"
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
            <SheetTitle></SheetTitle>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <Logo />
                  <span className="text-lg font-bold text-[#58CC02]">
                    ByteSize
                  </span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-[#58CC02]"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
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
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F7F7F7] ">
=======
    <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
>>>>>>> a9cfc6362931257fe68046731f9a02dfa0e132a9
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-left -ml-56  -mt-80 text-primary">
            About Us
          </h1>
          <p className="text-center mb-8 text-muted-foreground">
            We like cheese
          </p>
        </div>
      </main>
    </>
  );
}
