
import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const getProducts = async () => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true,
            category: true,            
        },
    });
    return res;
};

const getBrands = async () => {
    const res = await prisma.brand.findMany();
    return res;
};

const Product = async () => {
    const [products, brands] = await Promise.all([getProducts(), getBrands()]);

    return (
        <div>
            <div className="mb-2">
                <AddProduct brands={brands} />
            </div>

            <table className="table w-full">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    {/* <th>Description</th> */}
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.productId}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.brand.name}</td>
                        <td>{product.babi}</td>
                        <td className="flex justify-center space-x-1">
                            <UpdateProduct brands={brands} product={product} />
                            <DeleteProduct product={product} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;