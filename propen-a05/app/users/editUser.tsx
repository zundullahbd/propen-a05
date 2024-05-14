"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import User from "./page";
import toast from "react-hot-toast";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";


type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
};

const UpdateUser = async ({ user }: { user: User }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/users/${user.id}`, {
      username: username,
      email: email,
      role: role,
      password: password
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-row justify-center space-x-5">
      <button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center space-x-2'
        onClick={handleModal}>
        <span>Edit</span>
        <Pencil size={16} />
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Data User {user.username}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold text-sm">New Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered text-gray-200"
                placeholder="Username"
              />
            </div>
            <div className="form-control w-full">
              <label className="label text-sm font-bold">New Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered text-gray-200"
                placeholder="Email"
              >
              </input>
            </div>
            <div className="form-control w-full">
              <label className="label text-sm font-bold">New Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered text-gray-200"
                placeholder="Password"
              >
              </input>
              </div>
            <div className="form-control w-full">
              <label className="label text-sm font-bold">New Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Admin">Admin</option>
                <option value="Exec">Executive</option>
                <option value="Sales">Sales</option>
                <option value="CS">Customer Service</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary text-white">
                  Save
                </button>
              ) : (
                toast.custom((t) => (
                  <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-green-600 ring-opacity-100`}
                  >
                    <div className="flex-1 w-0 p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src="correct.png"
                            alt=""
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-slate-600">
                            Success!
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            Berhasil Mengedit User!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-l">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

