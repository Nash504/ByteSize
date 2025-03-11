import Header from "@/components/header";
import Profile from "@/components/profile";
import srijan from "../../../public/srijan.PNG";
import nash from "../../../public/nash.png";

var srijandes =
  "Hello! I'm Srijan K, a student at St Aloysius (Deemed To Be University). I'm learning and trying to do something interesting, constantly exploring new technologies and pushing myself.";
var nashdes =
  "Contributed in the Front-End development. Developed the UI using Next.js and Tailwind CSS.";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full gap-4 p-4">
        <div className="flex flex-col items-start w-full gap-4 mb-4 mt-4">
          <h1 className="text-3xl font-bold text-left p-2 text-[#58CC02] ">
            About Us
          </h1>
          <p className="text-lg text-left"> 
            Welcome to ByteSize – "Simplifying Revision, One Byte at a Time."<br /><br/>
            We are a team of students from St. Aloysius Degree College, bringing you ByteSize,<br/><br/> An AI-powered flashcard generator that helps students quickly turn topics into smart, bite-sized flashcards for easy learning and revision.<br/><br/>
            Built with Next.js, ByteSize is designed for efficiency, ensuring a smooth, user-friendly experience. Stay organized, stay ahead—ByteSize makes studying smarter, not harder. 
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-4 mt-4"> 
          <h1 className="text-3xl font-bold text-left text-[#58CC02]">
            Meet the Team
          </h1>
          <br/>
          <div className="flex flex-row flex-wrap gap-4">
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
