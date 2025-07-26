"use client";

import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";
import "./Chart.scss";
import { AppContext } from "../../../context/AppContext";

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${backendUrl}/etudiant/get`);
        const rawData = res.data?.data || [];

        // Obtenir la date d'aujourd'hui
        const today = dayjs();
        const last6Days = Array.from({ length: 6 }, (_, i) =>
          today.subtract(i, "day").format("YYYY-MM-DD")
        ).reverse(); // du plus ancien au plus récent

        // Compter les inscriptions par date
        const counts = last6Days.map((date) => {
          const count = rawData.filter(
            (etudiant) =>
              dayjs(etudiant.createdAt).format("YYYY-MM-DD") === date
          ).length;
          return {
            name: dayjs(date).format("DD MMM"), // ex: "21 Jul"
            nombre: count,
          };
        });

        setChartData(counts);
      } catch (err) {
        console.error("Erreur lors du chargement des données étudiants :", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="chart">
      <div className="title">
        Inscriptions des étudiants sur les 6 derniers jours
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="nombre" fill="#0a9048" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
