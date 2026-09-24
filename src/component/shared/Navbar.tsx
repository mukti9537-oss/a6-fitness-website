import Image from 'next/image';
import Link from 'next/link';
import logo from "@/assets/logo.png";
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-base-100 border border-gray-700 shadow-lg">

            <div className="navbar max-w-7xl mx-auto px-4">
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
                                <Link href="/workout">Workout</Link>
                            </li>

                            <li>
                                <Link href="/My Plan">My Plan</Link>
                            </li>
                        </ul>
                    </div>
                    <Image src={logo} alt='FitlOg' />
                    <a className="btn btn-ghost text-xl">FITLOG</a>
                </div>

                {/* website page */}

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/workout">Workout</Link>
                        </li>
                        <li>
                            <Link href="/my-plan">My Plan</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">

                    <Link href="/my-plan"
                        className=" flex items-center gap-2 btn">
                        <span>Plan</span>
                        <span className="rounded-full bg-[#ccff00] px-1 text-black font-bold">0</span>
                    </Link>
                    <Link href="/my-plan"
                        className=" flex items-center gap-2 btn">
                        <span>Saved</span>
                        <span className="rounded-full px-1 border border-[#2D313B] text-[#D1D5DB] ">0</span>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;