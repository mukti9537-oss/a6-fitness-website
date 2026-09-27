"use client";
import React, { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import { MdOutlineAccessTime, MdOutlineStarBorder } from 'react-icons/md';
import { FaCheck, FaFire } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { FaXmark } from 'react-icons/fa6';


type Tab = "plan" | "saved";
type SortOption = "Duration" | "Calories" | "Rating";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSaved,
        markAsDone,
        doneIds,
        isLoaded

    } = usePlan();

    const [activeTab, setActiveTab] = useState<Tab>("plan");
    const [sortBy, setSortBy] = useState<SortOption>("Duration")

    const currentWorkouts = activeTab === "plan" ? plan : saved;

    const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
        if (sortBy === "Duration") {
            return Number(a.duration || 0) - Number(b.duration || 0);
        }
        if (sortBy === "Calories") {
            return Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0);
        }
        if (sortBy === "Rating") {
            return Number(b.rating || 0) - Number(a.rating || 0);
        }
        return 0;

    });

    const totalMinutes = plan.reduce(
        (total, workout) => total + Number(workout.duration || 0),
        0
    );
    const totalCalories = plan.reduce(
        (total, workout) => total + Number(workout.caloriesBurned || 0),
        0
    );
    // loading

    if (!isLoaded) {
        return (
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
        <main className="min-h-screen bg-[#0B0D10] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">


            {/* header */}
            <div className="mb-7">
                <h1 className="oswald-font text-xl font-black tracking-wide sm:text-4xl">
                    My Plan
                </h1>
                <p className="mt-2 max-w-xl text-xs text-[#9CA3AF] sm:text-sm">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* metrics */}

            <div className="mb-6 overflow-hidden rounded-xl border border-[#20242F] bg-[#111318]">
                <div className="grid grid-cols-1 divide-y divide-[#20242E] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {/* exercise */}

                    <div className="px-5 py-5 sm:px-6">
                        <p className="text-xs text-[#6B7280]">
                            Exercises
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-[#C2F800]">
                            {plan.length}
                        </h2>
                    </div>
                    {/* minutes */}

                    <div className="px-5 py-5 sm:px-6">
                        <p className="text-xs text-[#6B7280]">
                            Minutes
                        </p>
                        <h2 className=" mt-2 text-3xl font-black">
                            {totalMinutes}
                        </h2>
                    </div>
                    {/* calories */}

                    <div className="px-5 py-5 sm:px-6">

                        <p className="text-xs text-[#6B7280]">
                            Calories
                        </p>
                        <h2 className=" mt-2 text-3xl font-black">
                            {totalCalories}
                        </h2>
                    </div>
                </div>
            </div>

            {/* tab */}
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex rounded-lg border border-[#20242E] bg-[#111318] p-1">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`rounded-md px-4 py-2 text-xs font-bold transition
                                ${activeTab === "plan"
                                ? " bg-[#1B1F25] text-white"
                                : "text-[#6B7280] hover:text-white"
                            }`}>
                        Todays Plan

                        <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[10]
                        ${activeTab === "plan"
                                ? "bg-[#C2F800] text-black"
                                : "bg-[#20242E] text-[#9CA3AF]"}`}>
                            {plan.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-md px-4 py-2 text-xs font-bold transition
                                ${activeTab === "saved"
                                ? "bg-[#1B1F25] text-white"
                                : "text-[#6B7280] hover:text-white"
                            }`}>
                        Saved
                        <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[10]
                        ${activeTab === "saved"
                                ? "bg-[#C2F800] text-black"
                                : "bg-[#20242E] text-[#9CA3AF]"}`}>
                            {saved.length}
                        </span>
                    </button>
                </div>

                {/* sort */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A92A0]">
                        Sort By</span>

                    <div className="relative">

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="h-7 w-[64] appearence-none rounded-md border border-[#20242E] bg-[#111318]
                            px-2 pr-5 text-xs text-[#FFFFFF] outline-none cursor-pointer">

                            <option value="Duration">Duration</option>
                            <option value="Calories">Calories</option>
                            <option value="Rating">Rating</option>
                        </select>

                    </div>
                </div>
            </div>

            {/* empty state */}

            {currentWorkouts.length === 0 ? (
                <div className=" flex min-h-[280] flex-col items-center justify-center rounded-xl border border-dashed
                     border-[#272c35] bg-[#0F1115] px-5 text-center">
                    <h2 className="oswald-font uppercase font-black text-[#FFFFFF] text-2xl">
                        NOTHING HERE YET
                    </h2>
                    <p className="mt-2 text-xs text-[#A1A1AA]">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/"
                        className="mt-5 mb-2 rounded-full bg-[#C2F10D] px-6 py-2.5 text-xs transition
                     font-black text-[#000000] hover:bg-[#D4FF4D]">
                        Go to workouts
                    </Link>
                </div>
            ) : (
                // workout card
                <div className="space-y-3">
                    {sortedWorkouts.map((library) => {
                        const isDone =
                            activeTab === "plan" &&
                            doneIds.includes(library.id);

                        return (
                            <div
                                key={library.id}
                                className="sm:flex sm:min-h-[78] w-full sm:items-center rounded-xl border border-[#20242E] bg-[#111318] p-3">
                                {/* image */}
                                <div className="relative h-[60] w-[90] shrink-0 overflow-hidden rounded-lg sm:h-[54] sm:w-[#100]">
                                    <Image
                                        src={library.image}
                                        alt={library.name}
                                        fill
                                        sizes="100px"
                                        className="object-cover" />
                                </div>
                                {/* content */}
                                <div className="flex-1 px-3 min-w-0">
                                    <h2 className="oswald-font truncate text-[12] font-black uppercase">
                                        {library.name}
                                    </h2>

                                    <p className="mt-0.5 truncate text-xs text-[#9CA3AF] sm:text-sm">
                                        {library.equipment}
                                    </p>

                                    <div className="mt-1.5 flex flex-wrap items-center gap-3 gap-y-1 
                                    text-sm text-[#9CA3AF] sm:text-xs">
                                        <span className="flex items-center gap-1">
                                            <MdOutlineAccessTime
                                                size={11}
                                                className="text-[#C2F800]" />
                                            {library.duration} min
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FaFire
                                                size={9}
                                                className="text-[#C2F800]" />
                                            {library.caloriesBurned} Kcal
                                        </span>

                                        <span className="flex items-center gap-1.5">
                                            <MdOutlineStarBorder
                                                size={12}
                                                className="text-[#C2F800]" />
                                            {library.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* action */}
                                <div className="mt-3 flex w-full items-center gap-2 border-t border-[#20242E] 
                                pt-3 sm:mt-0 sm:w-auto sm:border-0 sm:pt-0">
                                    {/* view details */}
                                    <Link
                                        href={`/librarycardDetails/${library.id}`}
                                        className="rounded-full border border-[#353A44] px-3 py-1.5 text-xs 
                                        text-[#D1D5DB] transition hover:border-[#C2F800] hover:text-[#C2F800]">
                                        View Details
                                    </Link>

                                    {/* mark done */}
                                    {activeTab === "plan" && !isDone && (
                                        <button
                                            onClick={() => markAsDone(library.id)}
                                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs 
                                        font-black text-black bg-[#C2F800] hover:bg-[#C2F800]">
                                            <FaCheck
                                                size={8} />
                                            Mark as Done
                                        </button>
                                    )}
                                    {/* remove */}
                                    <button
                                        onClick={() => {
                                            if (activeTab === "plan") {
                                                if (isDone) {
                                                    removeFromPlan(library.id);
                                                }
                                            } else {
                                                removeSaved(library.id);
                                            }
                                        }}
                                        disabled={activeTab === "plan" && !isDone}
                                        className={`flex h-7 w-7 items-center justify-center rounded-full ${activeTab === "plan" && !isDone
                                            ? "cursor-not-allowed text-[#353A44]"
                                            : "text-[#6B7280] hover:text-red-500"
                                            }`}
                                    >
                                        <FaXmark size={12} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
};

export default MyPlanPage;
