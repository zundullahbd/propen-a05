"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import User from "./page";


type User = {
  id: number;
  username: string;
  email: string;
};

const UpdateUser = ({user}: {user: User}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/users/${user.id}`, {
      username: username,
      email: email,
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
        <button className="btn btn-info btn-sm" onClick={handleModal}>
            Edit
        </button>

        <div className={isOpen ? "modal modal-open" : "modal"}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update {user.username}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control w-full">
                        <label className="label font-bold">Product Name</label>
                        <input
                            type="number"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input input-bordered"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Email</label>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered"
                            placeholder="Email"
                        >
                        </input>
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

export default UpdateUser;

