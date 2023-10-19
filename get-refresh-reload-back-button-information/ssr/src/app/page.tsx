"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    const handleMovePage = () => {
        sessionStorage.removeItem("reloaded-main");
        router.push("/other");
    };

    useEffect(() => {
        if (sessionStorage.getItem("reloaded-main") != null) {
            alert("you are reload main page ");
            console.log("page main was reloaded");
            sessionStorage.removeItem("reloaded-main");
        } else {
            console.log("page main was not reloaded");
        }

        sessionStorage.setItem("reloaded-main", "yes"); // could be anything
    }, []);

    if (typeof window !== "undefined") {
        window.onpopstate = (event) => {
            console.log("page main was cleared");
            sessionStorage.removeItem("reloaded-main");
        };
    }

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <section className="flex flex-col gap-5 items-center">
                <h1 className="text-6xl">This is Main</h1>
                <button onClick={handleMovePage} className="border hover:bg-white hover:text-black w-max rounded-xl px-3 py-2">
                    Move to Other
                </button>
            </section>
        </main>
    );
}
