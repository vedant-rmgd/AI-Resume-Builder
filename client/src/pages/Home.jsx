import Banner from "../components/home/Banner.jsx";
import Hero from "../components/home/Hero.jsx";
import Features from "../components/home/Features.jsx";
import Testimonial from "../components/home/Testimonial.jsx";
import CallToAction from "../components/home/CallToAction.jsx";
import Footer from "../components/home/Footer.jsx";

function Home() {
    return (
        <>
            <Banner />
            <Hero/>
            <Features/>
            <CallToAction/>
            <Footer/>
        </>
    );
}

export default Home;
