"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  password: string;
};

const UpdateUser = ({ user }: { user: User }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState(user.password);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username ||!email ||!password ||!role) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);
    try {
      await axios.patch(`/api/users/${user.id}`, {
        username,
        email,
        role,
        password,
      });
      window.location.reload();
      toast.success("User updated successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/${user.id}`);
      const updatedUser = response.data;
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);
      setRole(updatedUser.role);
      setPassword(updatedUser.password);
    };
    if (user.id) {
      fetchUser();
    }
  }, [user.id]);

  return (
    <div className="flex flex-row justify-center space-x-5">
      <button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center space-x-2'
        onClick={handleModal}>
        <span>Edit</span>
        <Pencil size={16} />
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-gray-700">
          <h3 className="font-bold text-lg text-center text-white">Edit User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full text-white">
              <label className="label font-bold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered text-white"
                placeholder="Username"
              />
            </div>
            <div className="form-control w-full text-white">
              <label className="label font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                placeholder="Email"
              />
            </div>
            <div className="form-control w-full text-white">
              <label className="label font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                placeholder="Password"
              />
            </div>
            <div className="form-control w-full text-white">
              <label className="label font-bold">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Admin">Admin</option>
                <option value="Executive">Executive</option>
                <option value="Sales">Sales</option>
                <option value="CustomerService">Customer Service</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <div className="items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

