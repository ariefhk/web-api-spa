"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Other() {
    const router = useRouter();

    const handleMovePage = () => {
        sessionStorage.removeItem("reloaded-other");
        router.push("/");
    };

    useEffect(() => {
        if (sessionStorage.getItem("reloaded-other") != null) {
            alert("you are reload other page ");
            console.log("page other was reloaded");
            sessionStorage.removeItem("reloaded-other");
        } else {
            console.log("page other was not reloaded");
        }

        sessionStorage.setItem("reloaded-other", "yes"); // could be anything
    }, []);

    if (typeof window !== "undefined") {
        window.onpopstate = (event) => {
            console.log("page other was cleared");
            sessionStorage.removeItem("reloaded-other");
        };
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <section className="flex flex-col gap-5 items-center">
                <h1 className="text-6xl">This is Other</h1>
                <button onClick={handleMovePage} className="border hover:bg-white hover:text-black w-max rounded-xl px-3 py-2">
                    Move to Main
                </button>
            </section>
        </main>
    );
}
