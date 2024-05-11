import MainLayout from "../components/ui/MainLayout";
import * as React from 'react'

export const metadata = {
    title: "Sales",
};

interface LayoutProps {
	children: React.ReactNode
	modal: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, modal }) => {
	return (
        <MainLayout>
            {modal}
            <div className="py-10 px-10">{children}</div>
        </MainLayout>
	)
}

export default Layout;

