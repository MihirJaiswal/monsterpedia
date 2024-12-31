import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import Pokemon from "@/components/pokedex/Pokemon";


export default function Home() {
  return (
    <main className="bg-hero relative">
      <div className='absolute inset-0 bg-black bg-cover bg-repeat-x bg-center opacity-5 pointer-events-none'></div>
      <HomeHeader/>
      <Pokemon/>
      <Footer/>
    </main>
  );
}
