"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "pending" | "success" | "error";

const API_URL = "http://localhost:5000/users";

const AddNewUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("pending");
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
            if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
            setStatus("success");
            setName("");
            setEmail("");
        } catch (err) {
            console.error("Failed to add user:", err);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
                <CheckCircle2 className="size-10 text-emerald-600" aria-hidden />
                <p className="font-medium">User added successfully!</p>
                <Button render={<Link href="/Users">View all users</Link>}></Button>
                <Button variant="ghost" onClick={() => setStatus("idle")}>
                    Add another
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-lg border p-6"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="e.g. John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {status === "error" && (
                <p className="text-sm text-destructive">
                    Could not add the user. Make sure the API server is running on
                    localhost:5000 and try again.
                </p>
            )}
            <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? (
                    <>
                        <Loader2 className="animate-spin" data-icon="inline-start" />
                        Adding...
                    </>
                ) : (
                    <>
                        <Send data-icon="inline-start" />
                        Add user
                    </>
                )}
            </Button>
        </form>
    );
};

export default AddNewUser;
