"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import DropdownButton from "@/app/components/ui/DropdownButton";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton";
import TextButton from "@/app/components/ui/TextButton";
import SecondaryButton from "@/app/components/ui/SecondaryButton";

type User = {
  id: number;
  username: string;
  email: string;
};

const editUser = ({
  user,
}: {
  user: User;
}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/account/${user.id}`, {
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
      <PrimaryButton text="Edit" onClick={handleModal}/>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {user.username}</h3>
          <form onSubmit={handleUpdate}>
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
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default editUser;