import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, {session?.user.username}</h1>
                    </div>
                </div>
            );
        }
export default page;