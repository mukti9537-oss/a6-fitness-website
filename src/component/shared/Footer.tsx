import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="sm:px-4 px-4 bg-[#0F1115] text-neutral-content py-8 sm:py-9 ">
            <div className=" flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className= "flex items-center gap-1">
                <Image src={logo} alt='FitlOg'
                width={18} 
                height={18}
                className="h-[18] w-[18]"
                />

                <span className="oswald-font text-xs sm:text-[11] font-bold"> FITLOG</span>

            </div>

                <p className="text-xs sm:text-[9] text-[#6B7280] ">
                    ©{new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.</p>

                </div>

        </footer>
    );
};

export default Footer;