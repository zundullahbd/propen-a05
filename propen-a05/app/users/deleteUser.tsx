"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SecondaryButton from "../components/ui/SecondaryButton";
import toast from "react-hot-toast";
import Image from "next/image";
import { Trash } from "lucide-react";

type User = {
    id: number;
    username: string;
    email: string;
};

const DeleteUser = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="flex flex-row justify-center space-x-5">
          <button
				    className='text-sm border border-red-500 text-red-500 py-2 px-2 rounded-lg flex items-center justify-center space-x-2'
				    onClick={handleModal}>
				    <span>Delete</span>
				    <Trash size={16} />
			    </button>
          <div className={isOpen ? "modal modal-open" : "modal"}>
              <div className="modal-box">
                  <h3 className="font-bold text-lg text-white text-left">
                      Are you sure to delete user {user.username}?
                  </h3>

                  <div className="modal-action">
                      <button type="button" onClick={handleModal} className="btn btn-danger">
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
                                      Berhasil Menghapus User!
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
              </div>
          </div>
      </div>
  );
};

export default DeleteUser;