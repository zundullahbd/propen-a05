"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import OutlineButton from "@/app/components/ui/OutlineButton";

type User = {
  id: number;
  username: string;
  email: string;
};

const deleteUser = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (userId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/account/${userId}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <OutlineButton text="Delete" onClick={handleModal} />

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete {user.username}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(user.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default deleteUser;