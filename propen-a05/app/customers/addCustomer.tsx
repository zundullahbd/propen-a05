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


const AddCustomer = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [year_of_birth, setYear] = useState("");
    const [address, setAddress] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/customers", {
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
            <TextWithIconButton text="Add New" icon={<PlusIcon />} onClick={handleModal} />

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Customer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Customer Name</label>
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

export default AddCustomer;