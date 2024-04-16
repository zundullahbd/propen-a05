import { PrismaClient } from "@prisma/client";
import AddCustomer from "./addCustomer";
import DeleteCustomer from "./deleteCustomer";
import UpdateCustomer from "./updateCustomer";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const getCustomers = async () => {
    const res = await prisma.customer.findMany({
        select: {
            id: true,
            outlet: true,
            number: true,
            name: true,
            code: true,
            referenceNumber: true,
            date: true,
            createdTime: true,
            due: true,
            amount: true,
            payment: true,
            fulfillment: true,       
        },
    });
    return res;
};

const Customer = async () => {
    const customers = await getCustomers();

    return (
        <div>
             <div className="mb-2">
                <AddCustomer/>
            </div>

            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Outlet</th>
                    <th>Number</th>
                    <th>Customer Name</th>
                    <th>Code</th>
                    <th>Reference Number</th>
                    <th>Date</th>
                    <th>Created Time</th>
                    <th>Due</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Fulfillment</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={customer.id}>
                        <td>{index + 1}</td>
                        <td>{customer.outlet}</td>
                        <td>{customer.number}</td>
                        <td>{customer.name}</td>
                        <td>{customer.code}</td>
                        <td>{customer.referenceNumber}</td>
                        <td>{customer.date}</td>
                        <td>{customer.createdTime}</td>
                        <td>{customer.due}</td>
                        <td>{customer.amount}</td>
                        <td>{customer.payment}</td>
                        <td>{customer.fulfillment}</td>
                        <td className="flex justify-center space-x-1">
                        <UpdateCustomer customer={customer} />
                        <DeleteCustomer customer={customer} />
                        </td>
                    </tr>
          ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customer;