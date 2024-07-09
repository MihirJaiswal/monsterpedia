import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import Pokemon from "@/components/pokedex/Pokemon";


export default function Home() {
  return (
    <main className="bg-hero">
      <HomeHeader/>
      <Pokemon/>
      <Footer/>
    </main>
  );
}
