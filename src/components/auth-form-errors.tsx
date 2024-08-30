import { AuthFormError } from "@/lib/types";

type AuthFormErrorsProps = {
  logInError: AuthFormError | undefined;
  registerError: AuthFormError | undefined;
};

export default function AuthFormErrors({
  logInError,
  registerError,
}: AuthFormErrorsProps) {
  return (
    <>
      {registerError && (
        <p className="mt-2 text-sm text-red-500">{registerError.message}</p>
      )}

      {logInError && (
        <p className="mt-2 text-sm text-red-500">{logInError.message}</p>
      )}
    </>
  );
}
