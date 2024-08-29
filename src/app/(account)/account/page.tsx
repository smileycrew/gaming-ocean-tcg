import SignOutBtn from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function Page() {
  const session = await checkAuth();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <p>Logged in as {session.user.email}</p>

      <SignOutBtn />
    </div>
  );
}
