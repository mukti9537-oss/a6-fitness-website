import Image from 'next/image';
import React from 'react';
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaFire } from "react-icons/fa";

const LibraryCard = ({ library }) => {
    return (
        <div
            key={library.id}
            className="group bg-[#000000] rounded-2xl overflow-hidden border   hover:shadow-xl transition-all duration-300"
        >

            {/* Image */}
            <div className="h-72 bg-gray-100 overflow-hidden">
                <Image
                    src={library.image}
                    alt={library.name}
                    width={80}
                    height={70}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Card Content */}
            <div className="p-5">

                {/* muscleGroups */}

                <div className="flex flex-wrap gap-2 mt-2">
                    {library.muscleGroups.map((muscleGroups) => (
                        <span
                            key={muscleGroups}
                            className="text-xs px-2.5 py-1 font-bold rounded-4xl bg-[#C2F800] text-[#000000]"
                        >
                            {muscleGroups}
                        </span>
                    ))}
                </div>


                {/* card Name */}
                <h2 className=" oswald-font text-xl font-bold text-[#FFFFFF] line-clamp-1 mt-2">
                    {library.name}
                </h2>

                {/* Author */}
                <p className="text-sm text-[#9CA3AF] mt-1">
                    {library.equipment}
                </p>


                {/* Category + Rating */}

                <div className="flex items-center border-t border-[#20242E] pt-4 text-sm font-semibold text-[#9CA3AF] gap-4 mb-3 mt-8">

                    <span className='flex gap-1'>
                        <MdOutlineAccessTime size={20}/> {library.duration} min
                    </span>

                    <span className='flex gap-1' >
                          <FaFire  size={20}/>{library.caloriesBurned} kcal
                    </span>

                    <span className='flex gap-1'>
                        <MdOutlineStarBorder size={20} />{library.rating}
                    </span>

                </div>
            </div>
        </div>
    );
};

export default LibraryCard;
