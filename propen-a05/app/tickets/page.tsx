
import {PrismaClient} from "@prisma/client";
import AddTicket from "./addTicket";
import DeleteTickets from "./deleteTickets";
import UpdateTickets from "./updateTickets";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";


const getTickets = async () => {
    const res = await prisma.ticket.findMany({
        select: {
            id: true,
            title: true,
            customerId: true,
            productSalesId: true,
            category: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
        },
    });
    return res;
};

const formatDateTime = (dateTime: Date | null): string => {
    return dateTime ? new Date(dateTime).toLocaleString() : "";
};

const Ticket = async () => {
    const tickets = await getTickets();

    return (
        <div>
            <div className="mb-2">
                <AddTicket/>
            </div>

            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Customer ID</th>
                    <th>Product Sales ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map((ticket, index) => (
                    <tr key={ticket.id}>
                        <td>{index + 1}</td>
                        <td>{ticket.title}</td>
                        <td>{ticket.customerId}</td>
                        <td>{ticket.productSalesId}</td>
                        <td>{ticket.category}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.status}</td>
                        <td>{formatDateTime(ticket.createdAt)}</td>
                        <td>{formatDateTime(ticket.updatedAt)}</td>
                        <td className="flex justify-center space-x-1">
                            <UpdateTickets  ticket={ticket}/>
                            <DeleteTickets ticket={ticket}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ticket;