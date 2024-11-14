"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "@/app/TokenContext/TokenContext";

export default function CreateUser() {
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/"); // Redirect to homepage if token exists
    }
  }, [token, router]);

  return (
    <div className="container">
      <h1>Create account or login to access news</h1>
    </div>
  );
}
