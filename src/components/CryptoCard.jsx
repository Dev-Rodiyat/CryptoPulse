import { useEffect, useState } from "react";
import { fetchTopCoins } from "../utils/fetchCoins";
import { ClipLoader } from "react-spinners";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

export default function CryptoCard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCoins = () => {
    setLoading(true);
    fetchTopCoins(true) // true = include sparkline
      .then(data => {
        setCoins(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCoins();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <ClipLoader size={24} color="#f97316" />
      </div>
    );

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="sm:text-2xl font-bold text-white text-lg">🔥 Top 4 Cryptocurrencies</h2>
          <p className="text-slate-400 sm:text-sm text-xs">
            Real-time stats of the market’s leading coins
          </p>
        </div>
        <button
          onClick={loadCoins}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coins.map((coin, i) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-slate-800 p-5 rounded-xl text-center shadow hover:shadow-orange-400/20 transition hover:scale-[1.02]"
          >
            {/* Rank badge */}
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs rounded-full">
              #{coin.market_cap_rank}
            </div>

            <img src={coin.image} alt={coin.name} className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">{coin.name}</h3>
            <p className="text-slate-400">{coin.symbol.toUpperCase()}</p>
            <p className="text-xl text-orange-400 font-semibold mt-1">
              ${coin.current_price.toLocaleString()}
            </p>
            <p
              className={`text-sm font-medium mt-1 ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>

            {/* Sparkline */}
            {coin.sparkline_in_7d?.price && (
              <div className="mt-3">
                <Sparklines data={coin.sparkline_in_7d.price.slice(-20)} height={40}>
                  <SparklinesLine
                    color={
                      coin.price_change_percentage_24h >= 0 ? "#22c55e" : "#ef4444"
                    }
                    style={{ strokeWidth: 2, fill: "none" }}
                  />
                </Sparklines>
              </div>
            )}

            {/* Extra data */}
            <div className="text-sm text-slate-400 mt-4 space-y-1">
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
              <p>24h High: ${coin.high_24h.toLocaleString()}</p>
              <p>24h Low: ${coin.low_24h.toLocaleString()}</p>
              <p>Volume: ${coin.total_volume.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
