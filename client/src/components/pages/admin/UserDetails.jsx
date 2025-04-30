import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const apiUrl = "http://localhost:5000"; // Base URL for your backend
        const res = await axios.get(`${apiUrl}/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setHistory(res.data.history);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <p className="text-2xl font-semibold text-gray-700">User not found</p>
        <Link
          to="/admin/users"
          className="mt-4 text-main-dark hover:underline text-lg"
        >
          Go back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="container">
        <div className="w-full flex justify-between mb-10">
          <div>
            <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
              Users Detail
            </h3>
            <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
          </div>
          
        </div>
        <div className="w-full bg-[#fbfaf8] box-shadow p-10 rounded-3xl border border-gray-200">
          {/* User Info Card */}
          <div className="bg-[#fbfaf8] p-6 rounded-xl border border-teal-200 box-shadow mb-6 font-poppins">
            <h2 className="text-2xl font-bold text-main-dark font-caudex">
              Personal Details
            </h2>
            <div className="flex place-items-center justify-between mt-3">
              <div className="flex place-items-center gap-12">
                <p className="text-gray-700">
                  <span className="font-semibold">Name: </span>
                  {user.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email: </span>
                  {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Registerd At: </span>
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 box-shadow font-poppins">
          <h2 className="text-2xl font-semibold text-main-dark font-caudex mb-4">
            Summarized History
          </h2>

          <div className="max-h-72 overflow-y-auto space-y-4 custom-scrollbar">
            {history.length === 0 ? (
              <p className="text-gray-500 text-center">No history yet.</p>
            ) : (
              history.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start bg-white p-4 rounded-xl box-shadow border border-gray-200 transition-all hover:shadow-lg hover:border-gray-300"
                >
                  <div>
                    <span className="font-semibold text-base text-gray-700">
                      Original Text:
                    </span>
                    <p className="mt-1 mb-2 text-gray-700 font-medium text-sm">
                      {item.originalText}
                    </p>
                    <span className="font-semibold text-base text-gray-500">
                      Summarized Text:
                    </span>
                    <p className="text-gray-500 text-sm mt-1">{item.summary}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          </div>

          {/* Back Button */}
          <div className="mt-10 text-center">
            <Link
              to="/admin/users"
              className="inline-block px-6 py-3 bg-main-dark text-white rounded-lg hover:bg-main-dark transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
