import Logo from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between  bg-white px-4 md:px-6 shadow-sm border-b border-gray-200">
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
                href="About"
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
  );
}
