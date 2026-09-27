"use client";
import React, { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import { MdOutlineAccessTime } from 'react-icons/md';
import { FaCheck, FaFire } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';

type Tab = "plan" | "saved";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSaved,
        markAsDone,
        isLoaded

    } = usePlan();

    const [activeTab, setActiveTab] = useState<Tab>("plan");
    const currentWorkouts = activeTab === "plan" ? plan: saved ;

    const totalMinutes =plan.reduce(
        (total , workout) => total + Number(workout.duration || 0),
        0
    );
    const totalCalories =plan.reduce(
        (total , workout) => total + Number(workout.caloriesBurned || 0),
        0
    );
    // loading

    if(!isLoaded) {
        return(
            <main className="min-h-screen bg-[#0B0D10] px-4 py-16 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-center text-sm text-[#9CA3AF]">
                        Loading workouts...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B0D10] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

            <h1 className="oswald-font text-4xl font-black tracking-wide sm:text-5xl">
                My Plan
            </h1>
            <p className="mt-2 text-sm text-[#9CA#AF] sm:text-base">
                Cap of five lifts for today. Finish them, then load more.
            </p>
        </div>
        {/* metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* exercise */}
            <div className="rounded-2xl border border-[#20242E] bg-[#111318] p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280)]">
                    Exercises
                </p>
                <h2 className="mt-3 text-3xl font-black">
                    {plan.length}
                </h2>
            </div>
            {/* minutes */}
            <div className="rounded-full border border-[#20242E] bg-[#111318] p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
                    Minutes
                </p>

                <div className= "mt-3 flex items-center justify-between"> 
                    <h2 className="text-3xl font-black">
                        {totalMinutes}
                    </h2>
                    <MdOutlineAccessTime
                    size={24}
                    className="text-[#C2F800]" 
                    />
                </div>
            </div>
            {/* calories */}
                  <div className="rounded-full border border-[#20242E] bg-[#111318] p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
                    Calories
                </p>

                <div className= "mt-3 flex items-center justify-between"> 
                    <h2 className="text-3xl font-black">
                        {totalCalories}
                    </h2>
                    <FaFire
                    size={21}
                    className="text-[#C2F800]" />
                </div>
            </div>
            {/* tab */}
            <div className="mb-8 border-b border-[#20242E]">
                <div className="flex gap-7">
                    <button
                    onClick={()=> setActiveTab("plan")}
                    className={`relative pb-4 text-sm font-bold ${
                        activeTab === "plan"
                        ? "text-[#C2F800]"
                        : "text-[#6B7280]"
                    }`}>
                        Todays Plan
                        {plan.length > 0 && (
                            <span className="ml-2 rounded-full bg-[#C2F800] px-2 py-0.5 text-xs text-black">
                                {plan.length}
                            </span>
                        )}
                        {activeTab === "plan" && (
                            <span className="absolute bottom-0 left-0 h-[2] w-full bg-[#C2F800]"/>
                        )}
                    </button>
                    <button
                    onClick={()=> setActiveTab("saved")}
                    className={`relative pb-4 text-sm font-bold ${
                        activeTab === "saved"
                        ? "text-[#C2F800]"
                        : "text-[#6B7280]"
                    }`}>
                        Saved
                        {saved.length > 0 && (
                            <span className="ml-2 rounded-full bg-[#C2F800] px-2 py-0.5 text-xs text-black">
                                {saved.length}
                            </span>
                        )}
                        {activeTab === "saved" && (
                            <span className="absolute bottom-0 left-0 h-[2] w-full bg-[#C2F800]"/>
                        )}
                    </button>
                </div>
            </div>
            {/* empty state */}
            {currentWorkouts.length === 0 ? (
                <div className=" flex min-h-[420] flex-col items-center justify-center rounded-2xl border border-[#20242E]bg-[#111318] px-5 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1B1F25]">
                        <span className="text-3xl text-[#C2F800]">
                            +
                        </span>
                    </div>
                    <h2 className="oswald-font text-[#FFFFFF] text-2xl">
                        NOTHING HERE YET
                    </h2>
                    <p className="mt-6 text-sm text-[#A1A1AA]">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                    href="/"
                    className="mt-6 rounded-xl bg-[#C2F800] px-6 py-3 text-sm
                     font-black text-black hover:bg-[#d4ff4d]">
                        Go to workouts
                    </Link>
                </div>
            ) : (
                // workout card
                <div className="space-y-4">
                    {currentWorkouts.map((library) => (
                        <div 
                         key={library.id}
                            className = "overflow-hidden rounded-2xl border border-[#20242E] bg-[#111318]">
                                {/* image */}
                                <div className="relative h-56 w-full shrink-0 md:h-auto md:w-64">
                                    <Image
                                    src={library.image}
                                    alt={library.name}
                                    fill
                                    sizes="(max-width: 768) 100vw, 256px" 
                                    className = "object-cover"/>
                                </div>
                                {/* content */}
                                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                    <div>
                                        {/* muscle group */}
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {library.muscleGroups?.map((muscleGroup) => (
                                                <span 
                                                key={muscleGroup}
                                                className="rounded-full bg-[#C2F800] px-2.5 py-1 text-xl font-black text-black">
                                                    {muscleGroup}
                                                </span>
                                            ))}
                                        </div>
                                        {/* name */}
                                        <h2 className="oswald-font text-2xl font-black uppercase">
                                            {library.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-[#9CA3AF]">
                                            {library.equipment}
                                        </p>
                                        {/* state */}
                                        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#20242E]
                                        pt-4 text-sm text-[#9CA3AF]">
                                            <span className="flex items-center gap-1.5">
                                                <MdOutlineAccessTime 
                                                size={19}/>
                                                {library.duration} min 
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <FaFire 
                                                size={16}/>
                                                {library.caloriesBurned} Kcal 
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MdOutlineAccessTime 
                                                size={21}/>
                                                {library.rating} 
                                            </span>
                                        </div>
                                    </div>
                                    {/* button */}
                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <Link
                                        href={`/library/${library.id}`}
                                        className="rounded-lg border border-[#353A44] px-4 py-2.5 text-xs 
                                        font-blod text-white hover:border-[#C2F800] hover:text-[#C2F800]">
                                            View Details
                                        </Link>
                                        {/* mark done */}
                                        {activeTab === "plan" && (
                                            <button
                                            onClick={() => markAsDone(library.id)}
                                            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs 
                                        font-black text-black bg-[#C2F800] hover:bg-[#C2F800]">
                                            <FaCheck 
                                            size={12}/>
                                            Mark as Done
                                            </button>
                                        )}
                                        {/* remove */}
                                        <button
                                        onClick={() =>
                                            activeTab === "plan"
                                            ? removeFromPlan(library.id)
                                            : removeSaved(library.id)
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border
                                        border-[#353A44] text-[#9CA3AF] hover:border-red-500 hover:text-red-500"
                                        aria-label="Remove workout">
                                            <FaXmark size={15}/>
                                        </button>


                                    </div>

                                </div>
                           
                        </div>
                    ))}

                </div>
            )}

        </div>
        </main>
    );
};

export default MyPlanPage;
