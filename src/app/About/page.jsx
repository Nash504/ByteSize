
import Header from "@/components/header";
import Profile from "@/components/profile";
import srijan from '../../../public/srijan.PNG';


var des="Hello! I'm Srijan K, a student at St Aloysius (Deemed To Be University). I'm learning and trying to do something interesting, constantly exploring new technologies and pushing myself."

export default function Home() {
  return (
    <>
    <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-left -ml-56  -mt-80 text-primary">
            About Us
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <Profile img={srijan} name='Srijan' Description={des}/>
        </div>
        
      </main>
      
    </>
  );
}
