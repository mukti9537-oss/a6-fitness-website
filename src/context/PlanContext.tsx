"use client";

import React, { createContext, useContext, useEffect, useState, } from "react"

import { Ilibrary } from "@/types/librarycard.type"
import { toast } from 'react-toastify';


interface PlanContextType {
    plan: Ilibrary[];
    saved: Ilibrary[];
    doneIds: number[];

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
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Ilibrary[]>([]);

    const [saved, setSaved] = useState<Ilibrary[]>([]);

    const [doneIds , setDoneIds] = useState<number[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = () => {
            try {
                const storedPlan = localStorage.getItem("fitlog-plan");
                const storedWorkouts = localStorage.getItem("fitlog-plan");

                if (storedPlan) {
                    setPlan(JSON.parse(storedPlan));
                }
                if (storedWorkouts) {
                    setSaved(JSON.parse(storedWorkouts));
                }
                setIsLoaded(true);
            } catch {
                setIsLoaded(true);
            }

        };
        const timer = setTimeout(loadData, 0);
        return () => clearTimeout(timer);

    }, []);
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

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
        setDoneIds((prev) => 
        prev.filter((doneId) => doneId !== workout.id));
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
        setPlan((prev) => prev.filter((item) => item.id !== id));

        setDoneIds((prev) => prev.filter((doneId) => doneId !== id));

        toast.success("Workout removed");
    };
    const removeSaved = (id: number) => {
        setSaved((previous) =>
            previous.filter((item) => item.id !== id)
        );
        toast.success("Workout removed from saved");
    };

    const markAsDone = (id: number) => {
        setDoneIds((prev) =>
            prev.includes(id) ? prev : [...prev, id]
        );
        toast.success("Workout marked as done");
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                addToPlan,
                saveWorkout,
                removeFromPlan,
                removeSaved,
                markAsDone,
                doneIds,
                isLoaded
            }}
        >
            {children}

        </PlanContext.Provider>
    );
};
export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "useplan must be used inside Planprovider"
        );
    }
    return context;
};

export default PlanContext;