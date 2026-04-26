import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Specs from "@/components/Specs";
import Catalog from "@/components/Catalog";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Specs />
      <Catalog />
      <Promo />
      <Footer />
      <CartDrawer />
    </main>
  );
};

export default Index;