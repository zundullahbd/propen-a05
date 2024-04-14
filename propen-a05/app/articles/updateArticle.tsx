"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Article = {
    title: string;
    id: number;
    text: string;
};

const UpdateArticle = ({ article }: { article: Article }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
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
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>
                Edit
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {article.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered"
                                placeholder="Title"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Article</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="input input-bordered"
                                placeholder="Article"
                                required
                                rows={5}
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

export default UpdateArticle;