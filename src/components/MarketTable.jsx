import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { fetchMarketData } from "../utils/fetchCoins";
import { toast } from "react-toastify";
import { FiDownload, FiSearch, FiX } from "react-icons/fi";

export default function MarketTable() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMarketData()
            .then(data => setCoins(data))
            .catch(() => toast.error("Failed to fetch market data"))
            .finally(() => setLoading(false));
    }, []);

    const filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const downloadCSV = () => {
        if (filtered.length === 0) {
            toast.error("No data to export.");
            return;
        }

        const headers = ["#", "Name", "Price", "24h %", "Market Cap"];
        const rows = filtered.map((coin, index) => [
            index + 1,
            coin.name,
            coin.current_price,
            coin.price_change_percentage_24h?.toFixed(2) + "%",
            coin.market_cap
        ]);

        const csvContent =
            [headers, ...rows]
                .map(row =>
                    row
                        .map(field => `"${String(field).replace(/"/g, '""')}"`)
                        .join(",")
                )
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "crypto_market_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="relative max-w-md w-full">
                    <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search coins..."
                        className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-800 text-white placeholder:text-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            onClick={() => setSearch("")}
                        >
                            <FiX size={18} />
                        </button>
                    )}
                </div>

                <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white transition"
                >
                    <FiDownload size={16} />
                    Download CSV
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <ClipLoader size={24} color="#f97316" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl bg-slate-800 shadow-lg">
                    <table className="w-full text-left">
                        <thead className="bg-slate-700 text-slate-300">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Coin</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">24h %</th>
                                <th className="p-3">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((coin, index) => (
                                <tr
                                    key={coin.id}
                                    className="border-b border-slate-700 hover:bg-slate-700/40 transition-colors"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 flex items-center gap-2">
                                        <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                                        {coin.name}
                                    </td>
                                    <td className="p-3">${coin.current_price.toLocaleString()}</td>
                                    <td
                                        className={`p-3 ${coin.price_change_percentage_24h >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                            }`}
                                    >
                                        {coin.price_change_percentage_24h?.toFixed(2)}%
                                    </td>
                                    <td className="p-3">${coin.market_cap.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center text-slate-400 p-6">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
