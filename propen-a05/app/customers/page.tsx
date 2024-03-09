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
            name: true,
            gender: true,
            year_of_birth: true,
            address: true,
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
                    <th>Customer Name</th>
                    <th>Gender</th>
                    <th>Year of Birth</th>
                    <th>Address</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer: { id: any; name: any; gender: any; year_of_birth: any; address: any; }, index: number) => (
                    <tr key={customer.id}>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.gender}</td>
                        <td>{customer.year_of_birth}</td>
                        <td>{customer.address}</td>
                        <td className="flex justify-center space-x-1">
                            <UpdateCustomer customer={customer}/>
                            <DeleteCustomer customer={customer}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customer;