'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/sign-in');

		let rotation = 0;
		let animationFrameId: number;

		const animate = () => {
			rotation += 1;

			const childDiv = document.querySelector('.child-div') as HTMLElement;
			if (childDiv) {
				childDiv.style.transform = `rotate(${rotation}deg)`;
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [router]);

	return (
		<div
			className='justify-center items-center flex flex-col h-screen bg-center bg-no-repeat bg-cover'
			style={{ backgroundImage: `url(/landing.svg)` }}>
			<div className='absolute inset-0 z-0 child-div' />
			<div className='z-10'></div>
		</div>
	);
}