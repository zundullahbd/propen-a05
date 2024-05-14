import { useState, useEffect } from 'react';
import { PrismaClient } from "@prisma/client";
import AddArticle from "./addArticle";
import ViewArticle from "./viewArticle";
import AccordionItem from '@/app/components/ui/Accordion';
import { db } from '@/lib/prisma';
const prisma = new PrismaClient();
import * as React from 'react'
import { ArrowDownAZ, ArrowUpAZ, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import Table from '../components/table/Table';

export const dynamic = "force-dynamic";

interface PageProps {
    searchParams: {
        page: string
        sort: string
    }
}

const faqs = [
    {
        title: 'Can I update or add notes to a complaint ticket?',
        content: 'Yes, you can easily update or add notes to a complaint ticket to provide additional information or document any actions taken. Simply open the complaint ticket within the system, and you will find an option to add notes or update the ticket status. This ensures clear communication and transparency throughout the resolution process.',
    },
    {
        title: 'How do I track the status of a customer complaint in the system?',
        content: 'To track the status of a customer complaint, simply log into the customer service portal and navigate to the "Complaints" section. There, you will find a list of all active complaints, along with their current status and assigned representative. You can filter and search for specific complaints to monitor their progress and any updates made by the customer service team.',
    },
    {
        title: 'How do I log a customer complaint in the system?',
        content: 'To log a customer complaint, first, navigate to the customer service portal on our system. Then, select the option to create a new complaint ticket. Fill in all required fields, including the customers contact information, details of the complaint, and any relevant order or product information. Once completed, submit the ticket, and it will be assigned to a customer service representative for further action.',
    },
];

const getArticles = async () => {
    const res = await prisma.article.findMany({
        select: {
            id: true,
            title: true,
            text: true,
        },
    });
    return res;
};

const Page: React.FC<PageProps> = async ({ searchParams }) => {

    const page = Number.parseInt(searchParams.page, 10) || 1
    const sort = searchParams.sort === 'asc' ? 'asc' : 'desc'
    const serialized = JSON.stringify({ page, sort })

    const limit = 6;
    const offset = (page - 1) * limit;

    const articles = await db.article.findMany({
        take: limit,
        skip: offset,
        orderBy: { title: sort },
    });

    const totalArticles = await db.article.count();
    const totalPages = Math.ceil(totalArticles / limit);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const header = ["#", "Title", "Content", "Actions"];

    return (
        <div>
            <h3 className="text-2xl text-gray-800 font-bold">Frequently Asked Questions</h3>
            <div className="my-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} title={faq.title}>
                        <p>{faq.content}</p>
                    </AccordionItem>
                ))}
            </div>
            <br />
            <br />
            <h3 className="text-2xl text-gray-800 font-bold">Articles</h3>
            <br />
            <div className="mb-2">
                <AddArticle />
            </div>
            <br>
            </br>

            <Link
                href={`/articles?page=${page}&sort=${sort === 'asc' ? 'desc' : 'asc'}`}
                className='flex items-center space-x-2 text-gray-500'>
                {sort === 'asc' ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />}
                <span className='text-sm'>Title</span>
            </Link>

            <br>
            </br>

            <Table header={header} className='w-full items-center justify-between'>
                {articles.map((article: { id: any; title: any; text: any }, index: number) => (
                    <tr key={index} className='text-center items-center justify-between'>
                        <td className="py-[18px]">{index + 1}</td>
                        <td>{article.title}</td>
                        <td className="text-ellipsis max-w-xs">{article.text}</td>
                        <td className="flex flex-wrap items-stretch justify-center p-2">
                            <div className="flex gap-x-2"> {/* Add this div with flex and gap */}
                                <ViewArticle article={article} />
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>

        </div>

    );
};
export default Page;
