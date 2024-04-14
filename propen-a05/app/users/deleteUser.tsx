"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type User = {
    id: number;
    username: string;
    email: string;
};



const DeleteUser = async ({ user }: {user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
//   const session = await getServerSession(authOptions); 

  const router = useRouter();

  const handleDelete = async (id: number) => {
      setIsLoading(true);
      await axios.delete(`/api/users/${user.id}`);
      setIsLoading(false);
      router.refresh();
      setIsOpen(false);
     
  };

  const handleModal = () => {
      setIsOpen(!isOpen);
  };

  return (
      <div>
        {/* {session?.user.id ===  user.id &&(
            <div className="text-red-500">You can't delete your own account</div>
        )}    */}
          <button className="btn btn-error btn-sm" onClick={handleModal}>
              Delete
          </button>

          <div className={isOpen ? "modal modal-open" : "modal"}>
              <div className="modal-box">
                  <h3 className="font-bold text-lg">
                      Are sure to delete {user.username}?
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

export default DeleteUser;