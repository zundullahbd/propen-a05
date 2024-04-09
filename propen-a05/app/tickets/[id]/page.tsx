// "use client";
// import { useParams, useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { PrismaClient } from '@prisma/client';

// import TableStatus from '@/app/components/table/TableStatus';
// import PrimaryButton from '@/app/components/ui/PrimaryButton';
// import TicketTile from '@/app/components/ui/TicketTile';
// import { formatDateTime } from '../page';

// const prisma = new PrismaClient();

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

// const TicketDetailPage = () => {
//     const router = useRouter();
//     const params = useParams();
//     const appURL = "http://localhost:3000";
//     const ticketURL = `${appURL}/tickets/${params.id}`;
//     const [isCopyLinkPopUpOpen, setIsCopyLinkPopUpOpen] = useState(false);
//     const [isMounted, setIsMounted] = useState(false);
//     const dummyData = {
//         'ID': '1',
//         'createdAt': '2021-09-21',
//         'updatedAt': '2021-09-21',
//         'category': 'Product Quality',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor arcu tempor cursus dignissim. Nulla facilisi. Integer erat felis, aliquet at euismod at, cursus ut velit. Quisque dictum, nisl in cursus bibendum, nisi tellus vulputate lacus, vel gravida nisi ex commodo nisl. Sed nec justo leo. Cras magna felis, luctus nec vestibulum in, sodales non dui. Quisque facilisis, lorem eu semper congue, mauris magna viverra mi, non eleifend lectus urna non erat.',
//         'status': 'In Progress',
//         'customer': 'Budi Budi',
//         'product': {
//             'name': 'Samsung AC 1 PK',
//             'id': 'AR18CYKAAWKNSE',
//             'brand': 'Samsung',
//             'category': 'Air Conditioner (AC)',
//             'variant': 'Default',
//             'purchaseDate': '2021-09-21',
//         },
//         'rating': {
//             'stars': 5,
//             'review': 'The customer service attitude was exceptional – friendly, understanding, and proactive in resolving my issue. Not to mention, the speed of service was remarkable; my concern was addressed swiftly and efficiently. Keep up the fantastic work!',
//             'likes': ['Customer service attitude', 'Speed of service', 'Communication quality'],
//         }
//     }
    
//     useEffect(() => {
//         setIsMounted(true);
//     }, [isMounted]);

//     function copyTicketURLToClipboard() {
//         navigator.clipboard.writeText(ticketURL);
//         setIsCopyLinkPopUpOpen(false);
//     }

//     return (
//         <div className='flex flex-col'>
//             <button onClick={router.back} className='w-min flex text-[#344054] font-medium'>
//                 <span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 mt-[1px]">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//                     </svg>
//                 </span>
//                 Back
//             </button>
//             <div className="grid grid-cols-2 gap-7 mt-4 w-full">
//                 {/* Left Section */}
//                 <div>
//                     <div className="flex space-x-5 items-center">
//                         <h1 className='text-[#344054] font-semibold text-2xl'>Ticket #{dummyData.ID}</h1>
//                         <TableStatus status="In Progress" />
//                     </div>
//                     <div className="mt-4">
//                         <TicketTile header="Ticket Details">
//                             <div className='text-[#344054] space-y-5'>
//                                 <div className='grid grid-cols-3'>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Ticket ID</h2>
//                                         <p>#{dummyData.ID}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Customer</h2>
//                                         <p>{dummyData.customer}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Category</h2>
//                                         <p className='border-[1px] border-[#344054] py-1 px-2 rounded-xl text-center'>{dummyData.category}</p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-3">
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Date Submitted</h2>
//                                         <p>{formatDateTime(new Date(dummyData.createdAt))}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Last Updated</h2>
//                                         <p>{formatDateTime(new Date(dummyData.updatedAt))}</p>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <h2 className='text-[#667085] mb-2'>Description</h2>
//                                     <p>{dummyData.description}</p>
//                                 </div>
//                             </div>
//                         </TicketTile>
//                     </div>
//                 </div>
//                 {/* Right Section */}
//                 <div>
//                     <div className="flex items-center justify-end space-x-4 relative">
//                         {isCopyLinkPopUpOpen && (<div className="absolute -top-10 bg-white rounded-lg p-6 w-full text-[#344054] shadow-md shadow-black/30">
//                             <div className="flex flex-row justify-between items-center mb-2">
//                                 <h2 className='font-semibold'>Ticket #{dummyData.ID}</h2>
//                                 <button onClick={() => setIsCopyLinkPopUpOpen(false)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                             <p>Use this link to track your complaint status in real time</p>
//                             <div className="flex mt-5 text-[#3D3FDF] font-medium text-2xl items-center space-x-5">
//                                 <h1>{ticketURL}</h1>
//                                 <button onClick={copyTicketURLToClipboard}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                                         <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
//                                         <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
//                                         <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                         )}
//                         <PrimaryButton onClick={() => setIsCopyLinkPopUpOpen(true)} text='Generate Link' />
//                         {/* <PrimaryButton onClick={() => { }} text='Edit' />
//                         <TableButton onClick={() => { }} label='Delete' borderColor='border-[#D92D20]' textColor='text-[#D92D20]' /> */}
//                     </div>
//                     <div className="mt-3">
//                         <TicketTile header="Product Details">
//                             <div className='text-[#344054] space-y-5'>
//                                 <div className='grid grid-cols-2'>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Product Name</h2>
//                                         <p>{dummyData.product.name}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Product ID</h2>
//                                         <p>{dummyData.product.id}</p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-2">
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Brand</h2>
//                                         <p>{dummyData.product.brand}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Product Category</h2>
//                                         <p>{dummyData.product.category}</p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-2">
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Variant</h2>
//                                         <p>{dummyData.product.variant}</p>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Purchase Date</h2>
//                                         <p>{formatDateTime(new Date(dummyData.product.purchaseDate))}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </TicketTile>
//                     </div>
//                 </div>
//                 {/* Bottom Section */}
//                 {
//                     dummyData.rating && (
//                         <div className="col-span-2 mt-7">
//                             <TicketTile header="Rating & Review">
//                                 <div className="flex flex-row text-[#344054] space-x-32">
//                                     <div>
//                                         <div>
//                                             <h2 className='text-[#667085] mb-2'>Rating</h2>
//                                             <div className="flex space-x-1">
//                                                 {dummyData.rating.stars > 0 && Array.from({ length: dummyData.rating.stars }).map((_, index) => (
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#3D3FDF]">
//                                                         <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
//                                                     </svg>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className='mt-5'>
//                                             <h2 className='text-[#667085] mb-2'>What they liked</h2>
//                                             {dummyData.rating.likes.length > 0 && dummyData.rating.likes.map((like, index) => (
//                                                 <div className='flex items-center space-x-3'>
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3D3FDF]">
//                                                         <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
//                                                     </svg>
//                                                     <p>{like}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h2 className='text-[#667085] mb-2'>Rating</h2>
//                                         <p>{dummyData.rating.review}</p>
//                                     </div>
//                                 </div>
//                             </TicketTile>
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default TicketDetailPage