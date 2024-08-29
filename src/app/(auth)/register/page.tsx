import AuthForm from "@/components/auth-form";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <AuthForm type="register" />
    </div>
  );
}
