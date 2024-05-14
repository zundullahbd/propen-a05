"use client";
import { useState, SyntheticEvent } from "react";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton"
import axios from "axios";


const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );


const AddCustomer = () => {
    const [outlet, setOutlet] = useState("");
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [referenceNumber, setReferenceNumber] = useState("");
    const [date, setDate] = useState("");
    const [createdTime, setCreatedTime] = useState("");
    const [due, setDue] = useState("");
    const [amount, setAmount] = useState("");
    const [payment, setPayment] = useState("");
    const [fulfillment, setFulfillment] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/customers", {
            outlet: outlet,
            number: number,
            name: name,
            code: code,
            referenceNumber: referenceNumber,
            date: date,
            createdTime: createdTime,
            due: due,
            amount: Number(amount),
            payment: payment,
            fulfillment: fulfillment,
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
            <TextWithIconButton text="Add Customer" icon={<PlusIcon />} onClick={handleModal} />

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Customer</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label className="label font-bold">Outlet</label>
                        <select
                            value={outlet}
                            onChange={(e) => setOutlet(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="" disabled>
                                Select Outlet
                            </option>
                            <option value="Serpong">Serpong</option>
                        </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Number</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="input input-bordered"
                                placeholder="Number"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Customer</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Mengizinkan hanya huruf alfabet (baik huruf besar maupun kecil)
                                    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
                                    setName(filteredValue);
                                }}
                                className="input input-bordered"
                                placeholder="Customer"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input input-bordered"
                                placeholder="Code"
                               
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Reference Number</label>
                            <input
                                type="text"
                                value={referenceNumber}
                                onChange={(e) => setReferenceNumber(e.target.value)}
                                className="input input-bordered"
                                placeholder="Reference Number"
                              
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="input input-bordered"
                                placeholder="Date"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Created Time</label>
                            <input
                                type="time"
                                value={createdTime}
                                onChange={(e) => setCreatedTime(e.target.value)}
                                className="input input-bordered"
                                placeholder="Created Time"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Due</label>
                            <input
                                type="due"
                                value={due}
                                onChange={(e) => setDue(e.target.value)}
                                className="input input-bordered"
                                placeholder="Due"
                            />
                        </div>
                        <div className="form-control w-full">
                        <label className="label font-bold">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered"
                            placeholder="Amount"
                            step="0.01" // Membatasi input ke dua tempat desimal
                            min="0" // Membatasi nilai minimum ke nol (opsional, sesuai kebutuhan)
                        />
                        </div>
                        <div className="form-control w-full">
                        <label className="label font-bold">Payment</label>
                        <select
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="" disabled>
                                Select Payment
                            </option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Partially">Partially Paid</option>
                            <option value="Paid">Paid</option>
                        </select>
                        </div>
                        <div className="form-control w-full">
                        <label className="label font-bold">Fulfillment</label>
                        <select
                            value={fulfillment}
                            onChange={(e) => setFulfillment(e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="" disabled>
                                Select Fulfillment
                            </option>
                            <option value="Sent">Sent</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
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

export default AddCustomer;