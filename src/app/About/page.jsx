import FeedbackForm from "@/components/feedback-form";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
    <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-primary">
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
