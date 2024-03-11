"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const AddUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await axios.post("/api/account", {
            username,
            email,
            password
        });

        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="btn" onClick={handleModal}>
                Add New User
            </button>

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
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>
                                Close
                            </button>
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Saving...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;