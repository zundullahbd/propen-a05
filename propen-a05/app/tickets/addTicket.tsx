'use client'
import { useState, SyntheticEvent } from "react";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton"
import axios from "axios";


const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );


const AddTicket = () => {
    const [title, setTitle] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [productSalesId, setProductSalesId] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/tickets", {
            title: title,
            customerId: Number(customerId),
            productSalesId: Number(productSalesId),
            category: category,
            description: description,
            status: status
        });
        setIsLoading(false);    
        window.location.reload();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <TextWithIconButton text="Add New" icon={<PlusIcon />} onClick={handleModal} />

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Ticket</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Ticket title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered"
                                placeholder="Ticket title"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Customer ID</label>
                            <input
                                type="text"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                className="input input-bordered"
                                placeholder="Customer ID"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Sales ID</label>
                            <input
                                type="text"
                                value={productSalesId}
                                onChange={(e) => setProductSalesId(e.target.value)}
                                className="input input-bordered"
                                placeholder="Product Sales ID"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input input-bordered"
                            >
                                <option value="">Select Category</option>
                                <option value="Bantuan Informasi">Bantuan Informasi</option>
                                <option value="Komplain">Komplain</option>
                                <option value="Klaim Garansi">Klaim Garansi</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input input-bordered"
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="input input-bordered"
                            >
                                <option value="">Select Status</option>
                                <option value="Terbuka">Terbuka</option>
                                <option value="Dalam Proses BestPrice">Dalam Proses BestPrice</option>
                                <option value="Dalam Proses 3rd Party">Dalam Proses 3rd Party</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
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

export default AddTicket;