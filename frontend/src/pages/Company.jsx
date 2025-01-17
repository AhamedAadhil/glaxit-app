import { useEffect, useState } from "react";
import axios from "axios";

const Company = () => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/company/profile",

        { withCredentials: true }
      );
      const data = response.data.data;

      console.log(response, "resp");
      if (response.data.success) {
        setCompanyInfo(data);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  console.log(companyInfo, "com info");

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Company Portal
        </h1>
        {companyInfo && (
          <div className="bg-white shadow-md rounded p-6">
            <p className="text-gray-700">
              <strong>Company ID:</strong> {companyInfo.company_id}
            </p>
            <p className="text-gray-700">
              <strong>Company Name:</strong> {companyInfo.company_name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {companyInfo.company_email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {companyInfo.company_address}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Company;
