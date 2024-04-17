"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Article = {
    title: string;
    id: number;
    text: string;
};

const DeleteArticle = ({ article }: { article: Article }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async (articleId: number) => {
        setIsLoading(true);
        await axios.delete(`/api/articles/${articleId}`);
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="btn border border-error-500 text-red-500 btn-sm bg-white hover:bg-error-100 hover:border-red-500" onClick={handleModal}>
                Delete
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are sure you want to delete {article.title}?
                    </h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>
                            No
                        </button>
                        {!isLoading ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(article.id)}
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

export default DeleteArticle;