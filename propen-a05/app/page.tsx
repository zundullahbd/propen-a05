<<<<<<< HEAD
export default function Home() {
    return <h1 className='text-4xl'>Home</h1>;
  }
=======
import Image from "next/image";
import { Box, Stack, Input, Button, Text } from "@chakra-ui/react";
import AddProduct from "./products/addProduct";

export default function Home() {
  return (
      <Box className="h-[calc(100%-5rem)] px-40 pb-20 pt-10 flex justify-center items-center">
          <Box className="flex w-full overflow-hidden rounded-2xl shadow-xl bg-base-50">
              <Box className="flex w-1/2 flex-col items-center justify-between px-24 py-10">
                  <Box className="flex flex-col items-center text-lg text-base-content-200 mb-10">
                      {/* Replace with your logo component */}
                      <Image
                          src="/logo-bni-full.svg" // Replace with your actual logo path
                          width={175}
                          height={57}
                          alt=""
                      />
                      <a href="./addProduct">Product</a>
                      <Text className="font-bold">International Division</Text>
                      <Text className="">Custody Form Database</Text>
                  </Box>
                  <Box className="mb-4 flex w-full flex-col gap-4">
                      <Box className="mb-2">
                          <Text className="text-base-content-300">Email address</Text>
                          <Input
                              type="email"
                              placeholder="johndoe@bni.co.id"
                              className="rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                      </Box>
                      <Box className="mb-2">
                          <Text className="text-base-content-300">Password</Text>
                          <Input
                              type="password"
                              placeholder="••••••••••••"
                              className="rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                      </Box>
                  </Box>
                  <Button className="btn w-full">Login</Button>
              </Box>
              <Box className="w-1/2 bg-[url('/images/bg-auth.svg')] object-cover" />
          </Box>
      </Box>
  )
}


>>>>>>> 4bbe576caf1bf4f0e7f52b7d132ede7b0fa2c13a
