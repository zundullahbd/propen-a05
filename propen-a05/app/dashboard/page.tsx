import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Dashboard from "@/components/ui/dashboard";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.role === "Executive") {
        return (
            <div className="py-10 px-10">
                <div className="flex justify-center font-bold mb-5 color: #000000">
                    <Dashboard />
                    </div>
                </div>
            );
        }
    
};

export default page;