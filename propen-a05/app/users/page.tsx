import { PrismaClient } from "@prisma/client";
import DeleteUser from "./deleteUser";
import UpdateUser from "./editUser";
import AddUser from "./addUser";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const getUsers = async () => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return res;
};

const User = async () => {
  const [users] = await Promise.all([getUsers()]);

  return (
    <div>
      <div className="mb-2">
        <AddUser />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="flex justify-center space-x-1">
                <UpdateUser user={user} />
                <DeleteUser user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;