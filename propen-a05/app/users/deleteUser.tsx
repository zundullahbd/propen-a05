"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
};

const DeleteUser = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/users/${user.id}`);
    }
    catch (error) {
      console.error(error);
      toast.error("Failed to delete user!");
    }
    finally {
      setIsLoading(false);
    }
    setIsLoading(false);
    toast.success("User deleted successfully!");
    window.location.reload();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-row justify-center space-x-5">
      <button
        className='text-sm border border-red-500 text-red-500 py-2 px-2 rounded-lg flex items-center justify-center space-x-2'
        onClick={handleModal}>
        <span>Delete</span>
        <Trash size={16} />
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-gray-700">
          <h3 className="font-bold text-lg text-center text-white">
            Are you sure you want to delete user {user.username}?
          </h3>

          <div className="modal-action">
            <button type="button" onClick={handleModal} className="btn btn-danger">
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(Number(user.id))}
                className="btn btn-primary text-white"
              >
                Yes
              </button>
            ) : (
              <div className="items-center justify-center">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;