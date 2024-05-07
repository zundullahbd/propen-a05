'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		// Perform a client-side redirect to the sign-in page
		router.replace('/sign-in');

		// Define the rotation angle and the animation frame ID
		let rotation = 0;
		let animationFrameId: number;

		// Define the animation function
		const animate = () => {
			// Rotate the child div element by 1 degree
			rotation += 1;

			// Update the rotation value of the child div element
			const childDiv = document.querySelector('.child-div') as HTMLElement;
			if (childDiv) {
				childDiv.style.transform = `rotate(${rotation}deg)`;
			}

			// Request the next animation frame
			animationFrameId = requestAnimationFrame(animate);
		};

		// Start the animation
		animate();

		// Clean up the animation when the component unmounts
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [router]);

	// Optionally, you can render a fallback content or a loading spinner while the redirection is in progress
	return (
		<div
			className='justify-center items-center flex flex-col h-screen bg-center bg-no-repeat bg-cover'
			style={{ backgroundImage: `url(/landing.svg)` }}>
			<div className='absolute inset-0 z-0 child-div' />
			<div className='z-10'></div>
		</div>
	);
}