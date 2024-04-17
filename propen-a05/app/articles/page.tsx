import { useState, useEffect } from 'react';
import { PrismaClient } from "@prisma/client";
import AddArticle from "./addArticle";
import UpdateArticle from "./updateArticle";
import DeleteArticle from "./deleteArticle";
import AccordionItem from '@/app/components/ui/Accordion';
const prisma = new PrismaClient();


export const dynamic = "force-dynamic";

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

const Article = async () => {

    const articles = await getArticles();

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
            <br/>
            <br/>
            <h3 className="text-2xl text-gray-800 font-bold">Articles</h3>
            <br/>
            <div className="mb-2">
                <AddArticle/>
            </div>

            <table className="table w-full bg-white p-4" style={{ padding: '20px' }}>
                <thead>
                <tr>
                    <th style={{ color: '#1D2939', fontSize: '14px', height: '50px' }}>No.</th>
                    <th style={{ color: '#1D2939', fontSize: '14px', height: '50px' }}>Title</th>
                    <th style={{ color: '#1D2939', fontSize: '14px', height: '50px' }}>Text</th>
                    <th className="text-center" style={{ color: '#1D2939', fontSize: '14px', height: '50px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article: { id: any; title: any; text: any}, index: number) => (
                    <tr key={article.id}>
                        <td>{index + 1}</td>
                        <td>{article.title}</td>
                        <td className="text-ellipsis max-w-xs">{article.text}</td>
                        <td className="flex justify-center">
            <div className="flex gap-x-2"> {/* Add this div with flex and gap */}
                <UpdateArticle article={article}/>
                <DeleteArticle article={article}/>
                </div>
                </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Article;