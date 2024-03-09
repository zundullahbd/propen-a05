"use client";
import { useState, SyntheticEvent } from "react";
import type { Ticket } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const UpdateTicket = ({
                          ticket,
                      }: {
    ticket: Ticket;
}) => {
    const [title, setTitle] = useState(ticket.title);
    const [customerId, setCustomerId] = useState(ticket.customerId.toString());
    const [productSalesId, setProductSalesId] = useState(ticket.productSalesId.toString());
    const [category, setCategory] = useState(ticket.category);
    const [description, setDescription] = useState(ticket.description);
    const [status, setStatus] = useState(ticket.status);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/tickets/${ticket.id}`, {
            title: title,
            customerId: Number(customerId),
            productSalesId: Number(productSalesId),
            category: category,
            description: description,
            status: status
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
                    <h3 className="font-bold text-lg">Update {ticket.title}</h3>
                    <form onSubmit={handleUpdate}>
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
                                    Update
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

export default UpdateTicket;
