"use client";

import React, { createContext, useContext, useEffect, useState, } from "react"

import { Ilibrary } from "@/types/librarycard.type"
import { toast } from 'react-toastify';


interface PlanContextType {
    plan: Ilibrary[];
    saved: Ilibrary[];

    addToPlan: (workout: Ilibrary) => void;
    saveWorkout: (workout: Ilibrary) => void;

    removeFromPlan: (id: number) => void;
    removeSaved: (id: number) => void;

    markAsDone: (id: number) => void;

    isLoaded: boolean;
}
const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({
    children,
} : {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Ilibrary[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const storedPlan = localStorage.getItem("fitlog-plan");
            return storedPlan ? JSON.parse(storedPlan) : [];
        } catch {
            return [];
        }
    });

    const [saved, setSaved] = useState<Ilibrary[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const storedWorkouts = localStorage.getItem("fitlog-saved");
            return storedWorkouts ? JSON.parse(storedWorkouts) : [];
        } catch {
            return [];
        }
    });

    const isLoaded = true;

    useEffect(() => {
        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan]);

    useEffect(() => {
        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved]);

    const addToPlan = (workout: Ilibrary) => {
        if (plan.length >= 5) {
            toast.error("Todays plan can contain only 5 workouts."
            );
            return;
        }
        const alreadyaExists = plan.some(
            (item) => item.id === workout.id
        );
        if (alreadyaExists) {
            toast.error(
                "workout is already in todays plan."
            );
            return;
        }
        setPlan((previous) => [
            ...previous,
            workout,
        ]);
        toast.success("Added to todays plan");
    };

    const saveWorkout = (workout: Ilibrary) => {
        const alreadyaExists = saved.some(
            (item) => item.id === workout.id
        );
        if (alreadyaExists) {
            toast.error(
                "workout is already saved."
            );
            return;
        }
                setSaved((previous) => [
            ...previous,
            workout,
        ]);
         toast.success("Workout saved for later");
    };

    const removeFromPlan = (id: number) => {
        setPlan((previous) => 
        previous.filter((item) => item.id !== id)
    );
    toast.success("Workout removed");
    };
    const removeSaved = (id: number) => {
        setSaved((previous) => 
        previous.filter((item) => item.id !== id)
    );
    toast.success("Workout removed from saved");
    };

    const markAsDone = (id: number) => {
        setPlan((previous) => 
        previous.filter((item) => item.id !== id)
    );
    toast.success("Workout marked as done");
    };
        return (
            <PlanContext.Provider
            value = {{
                plan,
                saved,
                addToPlan,
                saveWorkout,
                removeFromPlan,
                removeSaved,
                markAsDone,
                isLoaded
            }}
            >
                {children}

            </PlanContext.Provider>
        );
    };
    export const usePlan = () => {
        const context = useContext(PlanContext);

        if(!context) {
            throw new Error(
                "useplan must be used inside Planprovider"
            );
        }
        return context;
    };

    export default PlanContext;