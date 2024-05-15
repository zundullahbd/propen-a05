import { Eye, FilePlus2, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const DashboardActions = async () => {
    return (
		<>
			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<LayoutDashboard className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Anaytical Dashboard</h3>
				</div>

				<Link href='/dashboard'>
					<button className='text-sm bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 w-full line-clamp-1'>
						<span>Open Dashboard</span>
						<Eye className='h-5 w-5 ms-2' />
					</button>
				</Link>
			</div>
			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Average Stars</h3>
				</div>

				<span className='text-indigo-700 text-4xl font-bold'>4 out of 5</span>
			</div>

			<div className='bg-white rounded-xl border border-gray-200 p-6'>
				<div className='flex items-center space-x-4 mb-4'>
					<div className='flex-shrink-0 h-8 w-8 rounded-lg relative bg-indigo-200 text-indigo-700'>
						<FilePlus2 className='h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
					</div>
					<h3 className='font-medium line-clamp-1'>Average Handling Time</h3>
				</div>

				<span className='text-indigo-700 text-4xl font-bold'>4 Secs</span>
			</div>
        </>
    )
};

export default DashboardActions
