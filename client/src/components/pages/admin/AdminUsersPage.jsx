import { ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { deleteUserById, getAllUsers } from "../../../context/AdminUserContext";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response) setUsers(response);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const success = await deleteUserById(userId);
      if (success) {
        setUsers(users.filter((user) => user._id !== userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    }
  };

  return (
    <div className="py-16 container">
      <div className="w-full flex justify-between mb-10">
        <div>
          <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
            All users
          </h3>
          <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
        </div>
        <Link
          to={"/admin/profile"}
          className="mb-3 text-white py-2.5 px-6 rounded-lg bg-main hover:bg-main-dark duration-200 hover:cursor-pointer font-semibold flex items-center gap-2"
        >
          <ExternalLink size={20} /> Profile
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm bg-gray-50 mt-8 font-poppins">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gradient-to-r from-main to-main-dark text-white">
            <tr>
              <th className="p-4 text-sm font-semibold">Name</th>
              <th className="p-4 text-sm font-semibold">Email</th>
              <th className="p-4 text-sm font-semibold">Created At</th>
              <th className="p-4 text-sm font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b transition-transform duration-200"
                >
                  <td
                    onClick={() => navigate(`/admin/users/${user._id}`)}
                    className="p-4 text-main-dark hover:text-teal-800 hover:underline cursor-pointer"
                  >
                    {user.name}
                  </td>
                  <td className="p-4 text-gray-700">{user.email}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 hover:cursor-pointer transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users registered.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
