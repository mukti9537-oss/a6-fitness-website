import Image from "next/image";
import React from "react";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="px-4 py-10 md:py-16">
      <div className="bg-base-300 rounded-2xl min-h-105 flex justify-between gap-6 items-center px-10 ">

        {/* Content */}
        <div className="space-y-4 text-center md:text-left">

          <h4 className=" space-y-8 font-medium text-[#ccff00]">
            WORKOUT LIBRARY
          </h4>

          <h2 className=" oswald-font text-2xl font-bold leading-tight  text-white md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET
          </h2>

          <p className="max-w-lg text-base text-[#9CA3AF] leading-7 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into todays plan, and watch the weeks work add up.
          </p>

          <a href="#library"
            className="btn  bg-[#ccff00]  text-black">
            BROWSE WORKOUTS
          </a>

        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl ">
          <Image
            src={bannerImg}
            alt="Fitness image"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;