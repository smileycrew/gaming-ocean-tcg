"use client";

import { logIn, register } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [logInError, dispatchLogin] = useFormState(logIn, undefined);
  const [registerError, dispatchRegister] = useFormState(register, undefined);
  return (
    <form
      action={type === "login" ? dispatchLogin : dispatchRegister}
      className="flex flex-col gap-5"
    >
      {type === "login" ? (
        <p>Welcome back to Gaming Ocean TCG</p>
      ) : (
        <p>Thank you for registering with us!</p>
      )}

      <div className="space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" maxLength={100} name="email" required type="email" />
      </div>

      <div className="space-y-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          maxLength={100}
          name="password"
          required
          type="password"
        />
      </div>

      <div className="ml-auto">
        <Button>{type === "login" ? "Login" : "Register"}</Button>
      </div>

      {registerError && (
        <p className="mt-2 text-sm text-red-500">{registerError.message}</p>
      )}

      {logInError && (
        <p className="mt-2 text-sm text-red-500">{logInError.message}</p>
      )}

      {type === "login" ? (
        <p>
          Not registered? <Link href="/register">Register</Link>
        </p>
      ) : (
        <p>
          Already registered? <Link href="/login">Login</Link>
        </p>
      )}
    </form>
  );
}
