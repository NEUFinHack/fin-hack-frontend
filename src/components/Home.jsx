// import Navbar from "./NavBar";
import About from "./Pages/About";
import Tracks from "./Pages/Tracks";
import Faq from "./Pages/Faq";
import Speakers from "./Pages/Speakers";
import Sponsors from "./Pages/Sponsors";
import Title from "./Pages/Title";
function Home() {
  return (
    <div>
         {/* <Navbar/> */}
         <Title id="#title"/>
         <About id="#about"/>
         <Tracks id="#tracks"/>
         <Faq id="#faq"/>
         <Speakers id="#speakers"/>
         <Sponsors id="#sponsors"/>
    </div>
    
);
}

export default Home
