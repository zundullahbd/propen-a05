'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WavyAnimation = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        animate={{
          y: [0, 20, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <div className="w-screen h-1/2">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 288L48 272C96 256 192 224 288 197.3C384 171 480 149 576 165.3C672 181 768 235 864 234.7C960 235 1056 181 1152 165.3C1248 149 1344 171 1392 181.3L1440 192V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V288Z"
              fill="url(#paint0_linear_1_2)"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M0 288L48 272C96 256 192 224 288 197.3C384 171 480 149 576 165.3C672 181 768 235 864 234.7C960 235 1056 181 1152 165.3C1248 149 1344 171 1392 181.3L1440 192V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V288Z;
                         M0 288L48 272C96 256 192 224 288 213.3C384 203 480 181 576 197.3C672 213 768 267 864 266.7C960 267 1056 213 1152 197.3C1248 181 1344 203 1392 213.3L1440 224V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V288Z;
                         M0 288L48 272C96 256 192 224 288 197.3C384 171 480 149 576 165.3C672 181 768 235 864 234.7C960 235 1056 181 1152 165.3C1248 149 1344 171 1392 181.3L1440 192V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V288Z"
              />
            </motion.path>
            <defs>
              <linearGradient
                id="paint0_linear_1_2"
                x1="720"
                y1="0"
                x2="720"
                y2="320"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4B0082" />
                <stop offset="0.5" stopColor="#FFD700" />
                <stop offset="1" stopColor="#4B0082" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <div className="relative z-10">
          <Image
            src="/surf.png"
            alt="Surfer"
            className="w-48 h-48 mr-8 animate-surf"
            width={192}
            height={192}
          />
          <Image
            src="/island.png"
            alt="Island"
            className="w-64 h-64 animate-sway"
            width={256}
            height={256}
          />
          <Image
            src="/sunset.png"
            alt="Sunset"
            className="absolute top-0 right-0 w-48 h-48"
            width={192}
            height={192}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WavyAnimation;