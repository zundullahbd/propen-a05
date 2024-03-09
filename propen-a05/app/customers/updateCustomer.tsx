"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Customer = {
    id: number;
    name: string;
    gender: string,
    year_of_birth: number;
    address: string;
};

const UpdateCustomer = ({ customer }: { customer: Customer }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [year_of_birth, setYear] = useState("");
    const [address, setAddress] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/customers/${customer.id}`, {
            name: name,
            gender: gender,
            year_of_birth: Number(year_of_birth),
            address: address,
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
                    <h3 className="font-bold text-lg">Update {customer.name}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered"
                                placeholder="Customer Name"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Year of Birth</label>
                            <input
                                type="text"
                                value={year_of_birth}
                                onChange={(e) => setYear(e.target.value)}
                                className="input input-bordered"
                                placeholder="Year of Birth"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered"
                                placeholder="Adress"
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

export default UpdateCustomer;