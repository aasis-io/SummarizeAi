import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "./../../context/AuthContext";
import HistoryContext from "./../../context/HistoryContext";
import { Trash2, LogOut, Mail, Info } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { authData, logout } = useContext(AuthContext);
  const { history, deleteHistoryItem, clearAllHistory } =
    useContext(HistoryContext);

  if (!authData || !authData.user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  const handleDeleteHistoryItem = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this history item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHistoryItem(itemId);
      }
    });
  };

  const handleClearAllHistory = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your entire history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllHistory();
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="container">
        <div className="w-full flex justify-between mb-10">
          <div>
            <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
              Dashboard
            </h3>
            <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
          </div>
          {/* <button
            onClick={handleLogout}
            className="mb-6 text-red-500 hover:cursor-pointer font-semibold flex items-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button> */}
        </div>

        <div className="w-full bg-[#fbfaf8] box-shadow p-10 rounded-3xl border border-gray-200">
          {authData?.user && (
            <div className="bg-[#fbfaf8] p-6 rounded-xl border border-teal-200 box-shadow mb-6 font-poppins">
              <h2 className="text-2xl font-bold text-teal-700 font-caudex">
                Personal Details
              </h2>
              <div className="flex place-items-center justify-between mt-3">
                <div className="flex place-items-center gap-12">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name: </span>
                    {authData.user.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email: </span>
                    {authData.user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="mb-6 text-white py-2.5 px-6 rounded-lg bg-red-500 hover:bg-red-600 duration-200 hover:cursor-pointer font-semibold flex items-center gap-2"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 box-shadow font-poppins">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-teal-700 font-caudex">
                Summarized History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="text-sm hover:cursor-pointer text-red-600 font-semibold hover:underline hover:text-red-800"
                >
                  Clear All
                </button>
              )}
            </div>
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
                      <p className="text-gray-500 text-sm mt-1">
                        {item.summary}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteHistoryItem(item._id)}
                      className="text-red-500 hover:cursor-pointer hover:text-red-700 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border mt-6 border-gray-200 box-shadow mb-6 font-poppins">
            <h2 className="text-2xl font-bold text-teal-700 font-caudex">
              Help & Terms
            </h2>
            <h3 className="text-base font-medium mt-3 text-gray-600">
              Support Center
            </h3>
            <div className="flex mt-4">
              <div className="flex flex-col gap-4">
                <div className="text-gray-700 flex gap-4 place-items-center">
                  <Mail className="text-teal-500 h-5 w-5 mb-5" />
                  <div>
                    <a
                      href="mailto:helloashishthapa@gmail.com"
                      className="underline"
                    >
                      support@summarizeai.com
                    </a>
                    <p className="mt-1">Response in 1-2 business days</p>
                  </div>
                </div>
                <div className="text-gray-700 flex gap-4 place-items-center">
                  <Info className="text-teal-500 h-5 w-5" />
                  <div>
                    <p>
                      If you need any help, please do not hesitate to contact
                      us.
                    </p>
                  </div>
                </div>
                <div className="text-gray-700 flex gap-8 mt-6 place-items-center">
                  <a href="" className="underline">Terms of service</a>
                  <a href="" className="underline">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
