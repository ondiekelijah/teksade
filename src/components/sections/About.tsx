"use client"
import React from 'react'
import Image from "next/image"
import { Button } from '../Button';
import { useRouter } from 'next/navigation';

export const About = () => {

    const route = useRouter().push;

    return (
        <div className='relative flex items-center justify-center w-full h-screen font-sans text-gray-900'>
            <div aria-hidden="true" className="absolute inset-0 grid w-full grid-cols-2 m-auto h-max -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div
                className="flex flex-wrap-reverse justify-between max-w-screen-xl mx-auto gap-y-24"
            >
                <div className="relative z-10 w-full my-auto md:w-1/2">
                    <span className="flex items-center px-1 text-xl text-green">
                        <span className="font-small dark:text-slate-400">Connect with techies near and far 🚀</span>
                    </span>
                    <h1
                        className="pt-4 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:text-6xl dark:text-white whitespace-nowrap md:text-4xl "
                    >
                        Become part of<br />
                        <span className="whitespace-nowrap">something bigger</span>
                    </h1>
                    <p className="max-w-md pt-8 font-normal leading-relaxed text-gray-600 sm:text-lg md:pr-3 dark:text-slate-400">
                        There is strength in numbers. Teksade connects you with your tech tribe and even helps you discover more. We can all help to make the world a better place. Join in the fun!
                    </p>
                    <div className="flex pt-8">
                        <Button variant='solid' as='a' className='space-x-1 cursor-pointer' onClick={() => route('/communities')}>
                            <span>Explore Communities</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Button>
                    </div>
                </div>

                <div className="relative flex flex-col justify-between w-full md:w-1/2">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 drop-shadow-2xl">
                            <img className="object-cover w-full rounded-md" src="img/g-2.jpg" alt="long image" />
                        </div>
                        <div className="col-span-1 my-3 drop-shadow-2xl">
                            <img className="object-cover w-full mb-1 rounded-md" src="img/g-3.jpg" alt="short image 1" />
                            <img className="object-cover w-full mb-1 rounded-md" src="img/kate.jpeg" alt="short image 2" />
                            <img className="object-cover w-full rounded-md" src="img/g-1.jpg" alt="short image 1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
