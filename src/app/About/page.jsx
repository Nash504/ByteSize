import Header from "@/components/header";
import Profile from "@/components/profile";
import srijan from "../../../public/srijan.PNG";
import nash from "../../../public/nash.png";
import Image from "next/image";

var srijandes =
  "Hello! We're students at St Aloysius (Deemed To Be University). We're learning and trying to do something interesting, constantly exploring new technologies and pushing ourselves.";
var nashdes =
  "We contributed to the Front-End development. Together we developed the UI using Next.js and Tailwind CSS.";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full gap-8 p-4 md:p-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-lg p-6 md:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-[#58CC02] mb-4">
                About ByteSize
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                We're a team of students from St. Aloysius creating an AI-powered flashcard generator that simplifies studying with bite-sized cards.
              </p>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 md:w-60 md:h-60 flex items-center justify-center">
                <Image 
                  src="/ByteSizeLogo.svg" 
                  alt="ByteSize Logo" 
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology Section */}
        <div className="bg-white border-2 border-[#E5E5E5] rounded-lg p-6 md:p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-[#58CC02] mb-4 text-center">Built With</h2>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {["Next.js", "Tailwind CSS", "Gemini API", "Shadcn UI"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-[#F7F7F7] border border-[#E5E5E5] text-gray-800 rounded-full text-base md:text-lg">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-lg p-6 md:p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-[#58CC02] mb-6 text-center">
            The Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            <Profile
              img={srijan}
              name="Srijan K"
              linkedin_link="https://www.linkedin.com/in/srijan-kulal"
              github_link="https://github.com/srijankulal"
              Description={srijandes}
            />
            <Profile
              img={nash}
              name="Nash Fernandes"
              linkedin_link="https://www.linkedin.com/in/nash-fernandes-b55b0b2b8/"
              github_link="https://github.com/Nash504"
              Description={nashdes}
            />
          </div>
        </div>
      </main>
    </>
  );
}
