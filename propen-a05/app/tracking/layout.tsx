import * as React from 'react';

interface LayoutProps extends React.PropsWithChildren {
	//
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
	return <main className='p-4 w-full max-w-7xl mx-auto'>{children}</main>;
}