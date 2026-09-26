import React from 'react';
import LibraryCard from '../shared/LibraryCard';
import { Ilibrary } from '@/types/librarycard.type';

const getLibrary = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await res.json();
    return data;
};

const LibrarySection = async () => {
    const libraryData = await getLibrary();
    console.log(libraryData , "LibraryData")

    return (
        <section id="librarySection" className="px-4  ">
            {/* Section Title */}
            <div className="">
                <h1 className=" oswald-font text-3xl font-bold text-[#FFFFFF]">
                    THE LIBRARY
                </h1>

                <p className="text-[#9CA3AF] mt-2 mb-7">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* library Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

                {libraryData.map((library: Ilibrary , ind:number) => {
                    return <LibraryCard key={ind} library = {library} />    
                })} 

            </div>
        </section>
    );
};

export default LibrarySection;