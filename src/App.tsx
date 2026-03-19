import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { siteData } from './data';

export const BUSINESS_ID = "d2d8c175-6e6f-458c-8a98-0dfdb6ea72ce";
export const RECAPTCHA_SITE_KEY = "6LfRt44sAAAAACVTvFvGjoufmEcZqZk_pT4T_5Xd";
export const API_BASE_URL = "https://kora-agent.quseappdev.com";

function App() {
  return (
    <>
      <Header businessName={siteData.business.name} />
      <main>
        <Hero title={siteData.business.name} subtitle={siteData.business.description} />
        <About description={siteData.business.description} />
        <Menu cuisine={siteData.menu.cuisine} />
        <Gallery />
        <Contact 
          address={siteData.business.address} 
          phone={siteData.contact.phone}
          email={siteData.contact.email}
          businessId={BUSINESS_ID} 
        />
      </main>
      <Footer businessId={BUSINESS_ID} />
    </>
  )
}

export default App