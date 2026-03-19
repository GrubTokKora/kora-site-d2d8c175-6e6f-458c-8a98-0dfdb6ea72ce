import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const BUSINESS_ID = "d2d8c175-6e6f-458c-8a98-0dfdb6ea72ce";

const businessDetails = {
  name: "Terracotta Multicuisine Restaurant & Banquet",
  description: "Polished venture serving Indian, Asian & Italian specialities, plus fusion dishes & Mexican plates.",
  address: "2, Pramukh Arcade, Gandhinagar Gujarat",
  cuisine: ["Indian", "Chinese", "Continental"],
};

function App() {
  return (
    <>
      <Header businessName={businessDetails.name} />
      <main>
        <Hero title={businessDetails.name} subtitle={businessDetails.description} />
        <About description={businessDetails.description} />
        <Menu cuisine={businessDetails.cuisine} />
        <Gallery />
        <Contact address={businessDetails.address} />
      </main>
      <Footer businessId={BUSINESS_ID} />
    </>
  )
}

export default App