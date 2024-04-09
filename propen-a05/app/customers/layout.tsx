export const metadata = {
    title: "Customers",
};

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="py-10 px-10">{children}</div>;
};

export default CustomerLayout;