import { Link } from "react-router-dom";
import { FaChartBar, FaClock, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-800 text-white">
      <section className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-orange-400">CryptoPulse</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Real-time crypto market insights. Fast. Simple. Free.
        </p>
        <Link
          to="/dashboard"
          className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-3 rounded-full transition"
        >
          View Dashboard
        </Link>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-orange-400/20 transition">
            <FaChartBar className="w-12 h-12 mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Track Market</h3>
            <p>Get up-to-date prices and trends of top cryptocurrencies.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-orange-400/20 transition">
            <FaClock className="w-12 h-12 mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
            <p>All data is updated in real-time using the CoinGecko API.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-orange-400/20 transition">
            <FaShieldAlt className="w-12 h-12 mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p>Built with performance and simplicity in mind. No sign-up needed.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-black border-t border-gray-700 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why CryptoPulse?</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
          <div>
            <h3 className="text-orange-400 text-xl font-semibold mb-2">Clean Dashboard</h3>
            <p>Modern and responsive dashboard that makes data easy to read.</p>
          </div>
          <div>
            <h3 className="text-orange-400 text-xl font-semibold mb-2">Fast Performance</h3>
            <p>Minimal loading time. Fetches only essential data for speed.</p>
          </div>
          <div>
            <h3 className="text-orange-400 text-xl font-semibold mb-2">API-Powered</h3>
            <p>Backed by CoinGecko API – one of the most trusted crypto APIs.</p>
          </div>
          <div>
            <h3 className="text-orange-400 text-xl font-semibold mb-2">Responsive UI</h3>
            <p>Looks great on mobile, tablet, and desktop devices.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-gradient-to-r from-orange-500 to-orange-400 text-black">
        <h2 className="text-3xl font-bold mb-4">Ready to explore the market?</h2>
        <p className="text-lg mb-6">Jump into the dashboard and get live crypto data now!</p>
        <Link
          to="/dashboard"
          className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Go to Dashboard →
        </Link>
      </section>
    </div>
  );
}
