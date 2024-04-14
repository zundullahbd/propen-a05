import { PrismaClient } from "@prisma/client";
import AddArticle from "./addArticle";
import UpdateArticle from "./updateArticle";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

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
            <h2>FAQ</h2>
            <br/>
            <div className="faq">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Bagaimana jika ingin meng-update kuantitas produk?</td>
                    <td>Gunakan fitur update produk</td>
                </tr>
                <tr>
                    <td>Apa call center PT Best Price</td>
                    <td>021-772811090</td>
                </tr>
                </tbody>
            </table>
            </div>
            <br/>
            <br/>
            <h3>Article</h3>
            <br/>
            <div className="mb-2">
                <AddArticle/>
            </div>

            <table className="table w-full">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article: { id: any; title: any; text: any}, index: number) => (
                    <tr key={article.id}>
                        <td>{index + 1}</td>
                        <td>{article.title}</td>
                        <td>{article.text}</td>
                        <td className="flex justify-center space-x-1">
                            <UpdateArticle article={article}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Article;