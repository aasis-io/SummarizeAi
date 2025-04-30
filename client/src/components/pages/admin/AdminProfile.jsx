import { Loader, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AdminAuthContext from "../../../context/AdminAuthContext";

const AdminProfile = () => {
  const { adminData, loading, logout } = useContext(AdminAuthContext); // Ensure `logout` is provided in context
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (adminData) {
      setProfile(adminData);
    }
  }, [adminData]);
  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
        <div>
          <p className="text-sm text-gray-500 uppercase">Name</p>
          <p className="text-lg font-medium text-gray-900">
            {profile.admin.name || "Admin"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase">Email</p>
          <p className="text-lg font-medium text-gray-900">
            {profile.admin.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
