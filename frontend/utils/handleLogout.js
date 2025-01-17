import axios from "axios";

export const handleLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    if (response.data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      window.location.reload();
    }
  } catch (error) {
    console.error("Logout failed", error);
  }
};
