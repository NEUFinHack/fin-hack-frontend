
import About from "./Pages/About";
import Tracks from "./Pages/Tracks";
import Faq from "./Pages/Faq";
import Speakers from "./Pages/Speakers";
import Sponsors from "./Pages/Sponsors";
import Title from "./Pages/Title";
import Footer from "./Pages/Footer";
import Partners from "./Pages/Partners"

function Home() {
  return (
    <div>
         <Title id="#title"/>
         <About id="#about"/>
         <Tracks id="#tracks"/>
         <Faq id="#faq"/>
         <Speakers id="#speakers"/>
         <Partners id="#partners"/>
         <Sponsors id="#sponsors"/>
         <Footer/>
    </div>
    
);
}

export default Home
