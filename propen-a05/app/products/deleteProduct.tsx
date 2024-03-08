"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import OutlineButton from "@/components/OutlineButton";
import GrayButton from "@/components/GrayButton";


type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async (productId: number) => {
        setIsLoading(true);
        await axios.delete(`/api/products/${productId}`);
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* <button className="btn btn-secondary btn-sm" onClick={handleModal}>
                Delete
            </button> */}
            
            <OutlineButton text="Delete" onClick={handleModal}/>
            {/* <GrayButton text="Delete" onClick={handleModal}/> */}


            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are you sure you want to delete {product.title}?
                    </h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>
                            No
                        </button>
                        {!isLoading ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(product.id)}
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

export default DeleteProduct;