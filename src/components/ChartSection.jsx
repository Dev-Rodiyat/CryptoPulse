import { useEffect, useState } from "react";
import { fetchCoinChart } from "../utils/fetchCoins";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, TimeScale, LinearScale, PointElement, Tooltip } from "chart.js";
import 'chartjs-adapter-date-fns';
import { ClipLoader } from "react-spinners";

ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip);

export default function ChartSection() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchCoinChart("bitcoin", 7).then(data => {
            const prices = data.prices.map(([timestamp, price]) => ({
                x: new Date(timestamp),
                y: price,
            }));

            setChartData({
                datasets: [
                    {
                        label: "Bitcoin Price (7d)",
                        data: prices,
                        borderColor: "#f97316",
                        tension: 0.3,
                        fill: false,
                    },
                ],
            });
        });
    }, []);

    if (!chartData) return (
        <div className="flex justify-center py-10">
            <ClipLoader size={24} color="#f97316" />
        </div>
    )

    return (
        <div className="bg-slate-800 p-6 rounded-xl">
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                            },
                            ticks: { color: "#ccc" },
                        },
                        y: {
                            ticks: { color: "#ccc" },
                        },
                    },
                    plugins: {
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },
                    },
                }}
            />
        </div>
    );
}
