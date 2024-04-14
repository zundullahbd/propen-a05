import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.role === "Admin") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, Admin {session?.user.username}</h1>
                    </div>
                </div>
            );
        }
    else if (session?.user.role === "Exec") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, Executive {session?.user.username}</h1>
                    </div>
                </div>
            );
        }
    else if (session?.user.role === "Sales") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, Sales {session?.user.username}</h1>
                    </div>
                </div>
            );
        }
    else if (session?.user.role === "CS") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, Customer Service {session?.user.username}</h1>
                    </div>
                </div>
            );
        }
};

export default page;