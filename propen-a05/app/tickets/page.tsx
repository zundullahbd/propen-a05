// "use client";
// import { PrismaClient } from "@prisma/client";
// import AddTicket from "./addTicket";
// import DeleteTickets from "./deleteTickets";
// import UpdateTickets from "./updateTickets";

// import Table from "../components/table/Table";
// import TableStatus from "../components/table/TableStatus";
// import TableButton from "../components/table/TableButton";
// import { useRouter } from "next/navigation";

// const prisma = new PrismaClient();

// export const dynamic = "force-dynamic";

// export const formatDateTime = (dateTime: Date | null): string => {
//     return dateTime ? new Date(dateTime).toLocaleString() : "";
// };


// const getTickets = async () => {
//     const res = await prisma.ticket.findMany({
//         select: {
//             id: true,
//             title: true,
//             customerId: true,
//             productSalesId: true,
//             category: true,
//             description: true,
//             status: true,
//             createdAt: true,
//             updatedAt: true,
//         },
//     });
//     return res;
// };


// const Ticket = async () => {
//     const tickets = await getTickets();
//     const router = useRouter();
//     const tableHeaders = ["No", "ID", "Last Updated", "Product", "Category", "Description", "Status", "Actions"];
    

//     return (
//         <div>
//             <div className="mb-2">
//                 <AddTicket/>
//             </div>

//             <Table header={tableHeaders}>
//                 {tickets.map((tickets, index) => (
//                     <tr key={index} className='text-center'>
//                         <td className=' py-[18px]'>{index + 1}</td>
//                         <td>{tickets.id}</td>
//                         <td>{formatDateTime(new Date(tickets.updatedAt))}</td>
//                         <td className='px-4'>{tickets.productSalesId}</td>
//                         <td>{tickets.category}</td>
//                         <td className='truncate max-w-40 px-4 text-left'>{tickets.description}</td>
//                         <td className='px-4'><TableStatus status={tickets.status} /></td>
//                         <td><TableButton label='Details' onClick={() => router.push(`/tickets/${tickets.id}`)} borderColor='border-[#a16207]' textColor='text-[#a16207]' /></td>
//                     </tr>
//                 ))}
//             </Table>
//         </div>
//     );
// };

// export default Ticket;
'use client'
import {PrismaClient} from "@prisma/client";
import AddTicket from "./addTicket";
import { useRouter, redirect } from "next/navigation";
import Table from "../components/table/Table";
import TableButton from "../components/table/TableButton";
import TableStatus from "../components/table/TableStatus";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";


export const getTickets = async () => {
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
        },
    });
    return res;
};

 export const formatDateTime = (dateTime: Date | null): string => {
    return dateTime ? new Date(dateTime).toLocaleString() : "";
};

const Ticket = async () => {
    const router = useRouter();
    const tickets = await getTickets();
    const tableHeaders = ["No", "ID", "Last Updated", "Product", "Category", "Description", "Status", "Actions"];
    

    return (
        <div>
            <div className="mb-2">
                <AddTicket/>
            </div>

            <Table header={tableHeaders}>
                {tickets.map((tickets, index) => (
                    <tr key={index} className='text-center'>
                        <td className=' py-[18px]'>{index + 1}</td>
                        <td>{tickets.id}</td>
                        <td>{formatDateTime(new Date(tickets.updatedAt))}</td>
                        <td className='px-4'>{tickets.productSalesId}</td>
                        <td>{tickets.category}</td>
                        <td className='truncate max-w-40 px-4 text-left'>{tickets.description}</td>
                        <td className='px-4'><TableStatus status={tickets.status} /></td>
                        <td><TableButton label='Details' onClick={() => router.push(`/tickets/${tickets.id}`)} borderColor='border-[#a16207]' textColor='text-[#a16207]' /></td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default Ticket;