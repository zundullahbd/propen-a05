"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Article = {
    id: string;
    title: string;
    text: string;
};

const UpdateArticle = ({ article }: { article: Article }) => {
    const [title, setTitle] = useState(article.title);
    const [text, setText] = useState(article.text);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/articles/${article.id}`, {
            title: title,
            text: text,
        });
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex items-center justify-between mb-40'>
            <button className="btn btn-info btn-sm" onClick={handleModal}>
                Edit
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {article.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Article Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered"
                                placeholder="Title"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Content</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="input input-bordered"
                                placeholder="Content"
                                rows={5}
                            />
                        </div>
                        <div className="modal-action">
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary">
                                    Save
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

export default UpdateArticle;
