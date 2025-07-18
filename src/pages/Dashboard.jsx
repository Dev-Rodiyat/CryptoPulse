import { useState } from "react";
import CryptoCard from "../components/CryptoCard";
import ChartSection from "../components/ChartSection";
import MarketTable from "../components/MarketTable";

const TABS = ["Top Coins", "Market Trends", "Market Overview"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Top Coins");

  const renderTab = () => {
    switch (activeTab) {
      case "Top Coins":
        return <CryptoCard />;
      case "Market Trends":
        return <ChartSection />;
      case "Market Overview":
        return <MarketTable />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-slate-900 text-white px-4 py-10 pt-32 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-center md:text-left w-full md:w-auto">
          📊 Dashboard
        </h2>

        <div className="flex gap-3 flex-wrap justify-center">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">{renderTab()}</div>
    </section>
  );
}
