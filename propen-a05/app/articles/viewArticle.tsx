"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import UpdateArticle from "./updateArticle";
import DeleteArticle from "./deleteArticle";

type Article = {
    title: string;
    id: number;
    text: string;
};

const ViewArticle = ({ article }: { article: Article }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleView = async (articleId: number) => {
        setIsLoading(true);
        await axios.get(`/api/articles/${articleId}`);
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <PrimaryButton text="View" onClick={handleModal}/>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                <button className="modal-close"  onClick={handleModal}>X</button>
                    <br>
                    </br>
                    <br>
                    </br>
                    <h3 className="font-bold text-lg text-white">
                        {article.title}
                    </h3>
                    <br>
                    </br>
                    <h6 className="text-white flex flex-wrap">
                        {article.text}
                    </h6>

                    <div className="modal-action" >
                    <UpdateArticle article={article}/>
                        {!isLoading ? (
                            <DeleteArticle article={article}/>
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

export default ViewArticle;
