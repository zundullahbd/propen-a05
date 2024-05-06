"use client";
import { useState, SyntheticEvent } from "react";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton"
import { useRouter } from "next/navigation";
import axios from "axios";

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );


const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("/api/articles", {
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
            <TextWithIconButton text="Add New Article" icon={<PlusIcon />} onClick={handleModal} />

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Article</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered"
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Content</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="h-32 input input-bordered"
                                placeholder="Content"
                                required
                                rows={5}
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>
                                Close
                            </button>
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary text-white">
                                    Add
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

export default AddArticle;
