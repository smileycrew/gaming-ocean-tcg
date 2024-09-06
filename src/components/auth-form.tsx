"use client";

import { logIn, register } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";
import AuthFormHeader from "./auth-form-header";
import AuthFormFooter from "./auth-form-footer";
import AuthFormErrors from "./auth-form-errors";

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
            <p>Hello</p>
            <AuthFormHeader type={type} />
            {type === "register" && (
                <div className="flex gap-5">
                    <div className="space-y-3">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" maxLength={100} name="firstName" required />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" maxLength={100} name="lastName" required />
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    autoComplete="email"
                    id="email"
                    maxLength={100}
                    name="email"
                    required
                    type="email"
                />
            </div>

            <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                    autoComplete="current-password"
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

            <AuthFormErrors logInError={logInError} registerError={registerError} />

            <AuthFormFooter type={type} />
        </form>
    );
}
