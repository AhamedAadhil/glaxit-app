import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CompaniesTable from "../components/CompaniesTable";

/**
 * Renders a component that displays a table of companies.
 * This component utilizes the CompaniesTable component to present
 * a list of companies.
 */

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/all_companies",
        {
          withCredentials: true, // Include cookies with the request
        }
      );
      setCompanies(response.data.data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleToggle = async (company_email) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/admin/toggle_status",
        { company_email },
        {
          withCredentials: true, // Include cookies with the request
        }
      );
      if (response.data.success) {
        toast.success("Status updated successfully!");
        // Refetch data to reflect changes
        handleFetch();
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleFetch();
  });
  return (
    <div>
      <CompaniesTable
        companies={companies}
        onActionClick={handleToggle}
        isPending
      />
    </div>
  );
};

export default Companies;
