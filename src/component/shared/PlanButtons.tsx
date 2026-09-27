"use client";
import React from 'react';

import { Ilibrary } from '@/types/librarycard.type';
import { usePlan } from '@/context/PlanContext';
import { MdOutlineBookmarkAdd, MdPadding } from 'react-icons/md';


interface PlayButtonsProps {
    library: Ilibrary;
}
const PlanButtons = ({ library }: PlayButtonsProps) => {
    const { addToPlan, saveWorkout } = usePlan();
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-6 ">
            <button
                onClick={() => addToPlan(library)}
                className="w-full sm:w-auto bg-[#baff00] text-black
                                         text-xl sm:text-xs font-semibold px-4 sm:px-5 py-2.5 transition hover:bg-[#a8e600] rounded-md">
                <span className="flex gap-1">
                    <MdPadding size={20} /> Add to todays plan
                </span>

            </button>

            <button
                onClick={() => saveWorkout(library)}
                className="w-full sm:w-auto border border-[#30343c] text-[#E5E7EB] text-xl sm:text-xs px-4 sm:px-5 py-2.5 transition hover:bg-[#a8e600] rounded-md ">
                <span className=" flex gap-1">
                    <MdOutlineBookmarkAdd size={20} /> save for later
                </span>

            </button>
        </div>
    );
};

export default PlanButtons;