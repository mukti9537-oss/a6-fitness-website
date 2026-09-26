"use client";
import Image from 'next/image';
import Link from 'next/link';
import logo from "@/assets/logo.png";

import { usePathname } from 'next/navigation';
import React from 'react';


const Navbar = () => {
    const pathname = usePathname();

    const isWorkoutActive = pathname === "/";
    const isMyPlanActive = pathname === "/my-plan"

    return (
        <nav className="sticky top-0 bg-[#0C0D10] border border-gray-800 shadow-lg">

            <div className="navbar  ">
                {/* mobile page */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link href="/"
                                className={`px-7 py-7 rounded-full text-sm transition
                                 ${isWorkoutActive 
                                    ? "bg-[#172408] text-[#ccff00]"
                                    : "text-[#D1D5DB] hover:text-white"
                                 }`}
                                >Workout</Link>
                            </li>

                            <li>
                                <Link href="/My Plan"
                                className={`px-7 py-7 rounded-full text-sm transition
                                 ${isMyPlanActive 
                                    ? "bg-[#172408] text-[#ccff00]"
                                    : "text-[#D1D5DB] hover:text-white"
                                 }`}
                                >My Plan</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-1 ">
                        <Image src={logo} alt='FitlOg' />
                        <span className="oswald-font text-xl font-bold">FITLOG</span>
                    </div>
                </div>

                {/* website page */}

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/"
                             className={`px-3 py-1 rounded-full text-sm transition
                                 ${isWorkoutActive 
                                    ? "bg-[#172408] text-[#ccff00]"
                                    : "text-[#D1D5DB] hover:text-white"
                                 }`}
                            >Workout</Link>
                        </li>
                        <li>
                            <Link href="/my-plan"
                            className={`px-3 py-1 rounded-full text-sm transition
                                 ${isMyPlanActive 
                                    ? "bg-[#172408] text-[#ccff00]"
                                    : "text-[#D1D5DB] hover:text-white"
                                 }`}
                            >My Plan</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end gap-4">

                    <Link href="/my-plan"
                        className=" flex items-center gap-2">
                        <span>Plan</span>
                        <span className="rounded-full bg-[#ccff00] px-2 text-black font-bold">0</span>
                    </Link>
                    <Link href="/my-plan"
                        className=" flex items-center gap-2">
                        <span>Saved</span>
                        <span className="rounded-full px-2 border border-[#2D313B] text-[#D1D5DB] ">0</span>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;