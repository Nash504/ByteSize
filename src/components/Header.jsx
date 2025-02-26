import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold block sm:hidden text-[#58CC02]">
          ByteSize Mobile
        </span>
        <span className="text-2xl font-bold hidden sm:block text-[#58CC02]">
          ByteSize
        </span>
      </div>
      <div className="flex gap-1">
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
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="text-lg font-bold text-[#58CC02]"
                prefetch={false}
              >
                ByteSize
              </Link>
              <Link
                href="#"
                className="px-2.5 text-muted-foreground hover:text-[#58CC02]"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="#"
                className="px-2.5 text-muted-foreground hover:text-[#58CC02]"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="px-2.5 text-muted-foreground hover:text-[#58CC02]"
                prefetch={false}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
