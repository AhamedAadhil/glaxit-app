import { useEffect, useState } from "react";
import CompaniesTable from "../components/CompaniesTable";
import axios from "axios";
import toast from "react-hot-toast";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/get_pending_requests",
        {
          withCredentials: true, // Include cookies with the request
        }
      );

      setRequests(response.data.data);
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
  }, []);

  //   console.log(requests);

  return (
    <div>
      <CompaniesTable
        companies={requests}
        onActionClick={handleToggle}
        isPending
      />
    </div>
  );
};

export default PendingRequests;
