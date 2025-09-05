import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WEBSOCKET_URL = "wss://ws.blockchain.info/inv";
const MAX_DATA_POINTS = 30;

const RealTimeChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "BTC Transaction Value",
        data: [],
        fill: true, // 3. Fill the area below the line
        borderColor: "rgb(54, 235, 162)",
        backgroundColor: "rgba(54, 235, 162, 0.2)", // 4. Set a transparent fill color
        tension: 0.4, // 5. Smooth the line to make it curved (like EKG)
        pointRadius: 0, // 6. Hide the dots on data points
      },
    ],
  });
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket Connected!");
      setIsConnected(true);
      socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket Message Received:", message);
      if (message.op === "utx" && message.x && message.x.out[0]) {
        const transactionValueBtc = message.x.out[0].value / 100000000;
        const currentTime = new Date().toLocaleTimeString("pl-PL");

        setChartData((prevData) => {
          const newLabels = [
            ...prevData.labels.slice(-MAX_DATA_POINTS + 1),
            currentTime,
          ];
          const newData = [
            ...prevData.datasets[0].data.slice(-MAX_DATA_POINTS + 1),
            transactionValueBtc,
          ];

          return {
            labels: newLabels,
            datasets: [{ ...prevData.datasets[0], data: newData }],
          };
        });
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected.");
      setIsConnected(false);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      }
      socket.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-gray-900 text-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Real-Time Bitcoin Transactions
      </h1>
      <div className="mb-4 text-center">
        Connection Status:
        <span className={isConnected ? "text-green-500" : "text-red-500"}>
          {isConnected ? " Connected" : " Disconnected"}
        </span>
      </div>
      <div className="relative h-96">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default RealTimeChart;
