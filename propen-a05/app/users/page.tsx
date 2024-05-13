import { PrismaClient } from "@prisma/client";
import DeleteUser from "./deleteUser";
import UpdateUser from "./editUser";
import AddUser from "./addUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Table from "../components/table/Table";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const getUsers = async () => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      password: true,
    },
  });
  return res;
};

const User = async () => {
  const session = await getServerSession(authOptions);
  const [users] = await Promise.all([getUsers()]);
  const tableHeaders = ["No", "ID", "Username", "Email", "Role", "Actions"]
    

  return (
    <div>
      <div className="mb-2">
        <AddUser />
      </div>

      <Table header={tableHeaders}>
          {users.map((user, index) => (
            <tr key={index} className='text-center'>
              <td className="py-[18px]">{index + 1}</td>
              <td>{user.id}</td>
              <td className="px-4">{user.username}</td>
              <td className="truncate max-w-40 px-4">{user.email}</td>
              <td className="px-4">{user.role}</td>
              {session?.user.username === user.username ? (
                <td className='px-6 font-bold text-red-500'>Disabled (Active User)</td>
              ) : (
                <td className="flex flex-row justify-center space-x-3 items-center py-[18px] place-content-center">
                <UpdateUser user={user} />
                <DeleteUser user={user} />
                </td>
              )}
              </tr>
          ))}   
      </Table>
    </div>
  );
};

export default User;