import FeedbackForm from "@/components/feedback-form";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F7F7F7]">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-primary">
            We Value Your Feedback
          </h1>
          <p className="text-center mb-8 text-muted-foreground">
            Help us improve our service by sharing your thoughts and
            suggestions.
          </p>
          <FeedbackForm />
        </div>
      </main>
    </>
  );
}
