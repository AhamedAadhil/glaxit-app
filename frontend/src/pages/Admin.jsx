import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const [chartData, setChartData] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/dashboard",
        {
          withCredentials: true, // Include cookies with the request
        }
      );
      const { total_companies, pending_companies, approved_companies } =
        response.data;

      const data = [
        { name: "Total Companies", value: total_companies },
        { name: "Pending Companies", value: pending_companies },
        { name: "Approved Companies", value: approved_companies },
      ];
      setChartData(data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-center">Company Info Graph</h2>
      <div className="flex justify-center mt-10">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={50} />
        </BarChart>
      </div>
    </main>
  );
};

export default Admin;
