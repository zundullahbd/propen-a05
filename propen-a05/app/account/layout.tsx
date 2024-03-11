import MainLayout from "../components/ui/MainLayout";

export const metadata = {
    title: "Users",
};

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MainLayout>
            <div className="py-10 px-10">{children}</div>
        </MainLayout>
    );
};

export default AccountLayout;