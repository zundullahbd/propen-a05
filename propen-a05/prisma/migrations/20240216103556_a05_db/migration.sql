-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
<<<<<<< HEAD
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "year_of_birth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    
    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);


=======
CREATE TABLE "Ticket" (
                          "id" SERIAL NOT NULL,
                          "customerId" INTEGER NOT NULL,
                          "productSalesId" INTEGER NOT NULL,
                          "category" TEXT NOT NULL,
                          "description" TEXT,
                          "status" TEXT NOT NULL,
                          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          "updatedAt" TIMESTAMP(3) NOT NULL,

                          PRIMARY KEY ("id")
);

>>>>>>> a361a8c3c39b602dcdd495b25f42ce9cfb1b3f15
-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
