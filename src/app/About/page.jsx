import FeedbackForm from "@/components/feedback-form";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F7F7F7]">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-left -ml-72  -mt-80 text-primary">
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
