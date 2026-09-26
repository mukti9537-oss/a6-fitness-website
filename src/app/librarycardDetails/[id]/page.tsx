import React from "react";
import { Ilibrary } from "@/types/librarycard.type"
import Image from 'next/image';
import { MdPadding } from "react-icons/md";
import { MdOutlineBookmarkAdd } from "react-icons/md";

interface IlibrarycardDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const getLibrary = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

    if (!res.ok) {
        throw new Error("Failed to fetch library data");
    }

    return res.json();
};

const librarycardDetailsPage = async ({
    params,
}: IlibrarycardDetailsPageProps) => {
    const { id } = await params;

    const libraryData: Ilibrary[] = await getLibrary();

    const library = libraryData.find(
        (item) => String(item.id) === String(id)
    );

    if (!library) {
        return <div>Library card not found.</div>;
    }

    return (
        <main className="min-h-screen bg-[#1c1c1c] px-3 sm:px-5 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 ">
            {/* main details */}
            <div className="w-full max-w-6xl mx-auto bg-[#0d0f13] rounded-xl border border-[#20232a] overflow-hidden ">
                {/* content */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 ">
                    {/* image + details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">

                        {/* image */}
                        <div className="w-full">
                            <Image
                                src={library.image}
                                alt={library.name}
                                width={80}
                                height={70}
                                className="w-full h-[260] sm:h-[#350] md:h-[420] lg:h-[500] obeject-cover rounded-xl"
                                />
                                </div>

                            {/* details */}
                            <div className="text-white">

                                {/* title */}
                                <h1 className="
                                text-2xl sm:text-3xl md:text-4xl font-bold uppercase oswald-font
                                 tracking-tight leading-tight
                                ">
                                    {library.name}
                                </h1>
                                {/* discription */}
                                <p className="text-gray-400
                                text-xs sm:text-sm leading-5 mt-2 max-w-xl">
                                    {library.description}
                                </p>
                                {/* muscle group */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {library.muscleGroups.map((muscleGroups) => (
                                        <span
                                            key={muscleGroups}
                                            className="text-xs px-2.5 py-1 font-bold rounded-4xl bg-[#C2F800] text-[#000000]"
                                        >
                                            {muscleGroups}
                                        </span>
                                    ))}
                                </div>
                                {/* workout info */}
                                <div className="bg-[#15181e] border border-[#242832]
                                rounded-xl mt-5 overflow-hidden">

                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            Equipment
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.equipment}
                                        </span>
                                    </div>
                            
                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            difficulty
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.difficulty}
                                        </span>
                                    </div>
                      
                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            sets
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.sets}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            reps
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.reps}
                                        </span>
                                    
                                </div>
       
                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            duration
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.duration} min
                                        </span>
                                    </div>

                       
                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                           calories
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.caloriesBurned} Kcal
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 px-4 sm:px-5
                                    py-3 border-b border-[#242832]">
                                        <span className="sm:text-[10] uppercase text-[#9CA3AF] text-xs font-semibold">
                                            rating
                                        </span>
                                        <span className="sm:text-xs text-[#9CA3AF] text-xs text-right ">
                                            {library.rating}
                                        </span>
                                    </div>
                                </div>
                                {/* instruction */}
                                <div className="mt-5 sm:mt-6">
                                    <h2 className="
                                    text-xs
                                    sm:text-sm
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[#FFFFFF]
                                    mb-3
                                    ">
                                        Instructions
                                    </h2>
                                    <div className="space-y-2">
                                        {library.instructions.map((instuction , index) => (
                                            <div key={index} className="flex gap-2 sm:gap-3 text-[#D1D5DB] text-xs">
                                                <span>
                                                    {index + 1}.
                                                </span>
                                                <p>{instuction}</p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                {/* button */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-6 ">
                                    <button className="w-full sm:w-auto bg-[#baff00] text-black
                                    text-xl sm:text-xs font-semibold px-4 sm:px-5 py-2.5 transition hover:bg-[#a8e600] rounded-md">
                                        <span className="flex gap-1">
                                            <MdPadding size={20} /> Add to todays plan 
                                        </span>
                                        
                                    </button>

                                    <button className="w-full sm:w-auto border border-[#30343c] text-[#E5E7EB] text-xl sm:text-xs px-4 sm:px-5 py-2.5 transition hover:bg-[#a8e600] rounded-md "> 
                                        <span className=" flex gap-1">
                                             <MdOutlineBookmarkAdd size={20} /> save for later
                                        </span>
                                    
                                    </button>
                                </div>
                            </div>
                    </div>


                </div>


            </div>

        </main>


    );
}

export default librarycardDetailsPage;