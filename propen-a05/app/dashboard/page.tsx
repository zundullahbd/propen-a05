import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (session?.user) {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, {session.user.username}</h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="py-10 px-10">
                    <div className="flex justify-between items-center text-2xl font-bold mb-5">
                        <h1>Welcome Back, Please Login</h1>
                        <div className="flex items-center">
                            <a href="/api/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            );
        } 
    }  
export default page;