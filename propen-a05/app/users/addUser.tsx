"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton"
import toast from "react-hot-toast";
import Image from "next/image";

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );


const AddUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // ["admin", "user"
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const validateForm = () => {
        if (!username || !email || !password || !role) {
            toast.error("All fields are required!");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        await axios.post("/api/users", {
            username: username,
            email: email,
            password: password,
            role: role
        })
        .catch((error) => {
            console.error(error);
            toast.error("Failed to add user!");
        })
        .finally(() => {
            setIsLoading(false);
        });

        setIsLoading(false);
        window.location.reload();
        setIsOpen(false);
        };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <TextWithIconButton text="Add New" icon={<PlusIcon />} onClick={handleModal} />

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input input-bordered"
                                placeholder="Username"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-control w-full">
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
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            ) : (
                                toast.custom((t) => (
                                    <div
                                      className={`${
                                        t.visible ? 'animate-enter' : 'animate-leave'
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
                                              Berhasil Menambahkan User!
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

export default AddUser;