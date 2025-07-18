import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCoins = async (includeSparkline = false) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 4,
        page: 1,
        sparkline: includeSparkline,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch top coins");
  }
};

export const fetchMarketData = async (limit = 50) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: limit,
        page: 1,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch market data");
  }
};

export const fetchCoinChart = async (coinId = "bitcoin", days = 7) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch chart data");
  }
};
