import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Dashboard from "../dashboard/components/dashboard";

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
    else if (session?.user.role === "Executive") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <h1>Welcome Back, Executive {session?.user.username}</h1>
                    <Dashboard />
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
    else if (session?.user.role === "CustomerService") {
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