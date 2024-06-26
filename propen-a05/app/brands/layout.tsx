import * as React from 'react'
import MainLayout from "../components/ui/MainLayout";

export const metadata = {
	title: 'Brands',
}

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

export default Layout