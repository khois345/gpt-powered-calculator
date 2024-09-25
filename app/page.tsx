import Calculator from './components/Calculator';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-white text-5xl pt-2 pb-5">Generative-AI-powered calculator</h1>
      <Calculator />
      <Footer />
    </main>
  );
}
