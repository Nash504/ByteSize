import Header from "@/components/header";
import Profile from "@/components/profile";
import srijan from "../../../public/srijan.PNG";
import nash from "../../../public/nash.png";
import Image from "next/image";

var srijandes = "Student at St Aloysius University. Passionate about learning new technologies.";
var nashdes = "Front-End developer. Created UI using Next.js and Tailwind CSS.";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full p-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-lg p-4 md:p-6 shadow-md mb-5">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#58CC02] mb-2">
                About ByteSize
              </h1>
              <p className="text-base">
                AI-powered flashcard generator created by students to simplify studying.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Image 
                src="/ByteSizeLogo.svg" 
                alt="ByteSize Logo" 
                width={100} 
                height={100} 
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Technology Section */}
        <div className="bg-white border-2 border-[#E5E5E5] rounded-lg p-4 md:p-6 shadow-md mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-[#58CC02] mb-3 text-center">Built With</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Next.js", "Tailwind CSS", "Gemini API"].map((tech) => (
              <span key={tech} className="px-2 py-1 bg-[#F7F7F7] border border-[#E5E5E5] text-gray-800 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-lg p-4 md:p-6 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-[#58CC02] mb-4 text-center">
            The Team
          </h2>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 xl:gap-12">
            <div className="w-full md:w-1/2 max-w-md mx-auto">
              <Profile
                img={srijan}
                name="Srijan K"
                linkedin_link="https://www.linkedin.com/in/srijan-kulal"
                github_link="https://github.com/srijankulal"
                Description={srijandes}
              />
            </div>
            <div className="w-full md:w-1/2 max-w-md mx-auto">
              <Profile
                img={nash}
                name="Nash Fernandes"
                linkedin_link="https://www.linkedin.com/in/nash-fernandes-b55b0b2b8/"
                github_link="https://github.com/Nash504"
                Description={nashdes}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
