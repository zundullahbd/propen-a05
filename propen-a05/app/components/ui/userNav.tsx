import Navbar from "./Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserNav = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className='w-full'>
        {session?.user ? (
            <Navbar />
        ) : (
            null
        )}
        </div>
    );
}
export default UserNav;