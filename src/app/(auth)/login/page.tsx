import AuthForm from "@/components/auth-form";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <AuthForm type="login" />
    </div>
  );
}
