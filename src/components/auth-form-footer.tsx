import Link from "next/link";

type AuthFormFooterProps = {
  type: "login" | "register";
};

export default function AuthFormFooter({ type }: AuthFormFooterProps) {
  return (
    <>
      {type === "login" ? (
        <p>
          Not registered? <Link href="/register">Register</Link>
        </p>
      ) : (
        <p>
          Already registered? <Link href="/login">Login</Link>
        </p>
      )}
    </>
  );
}
