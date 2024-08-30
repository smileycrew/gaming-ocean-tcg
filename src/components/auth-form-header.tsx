type AuthFormHeaderProps = {
  type: "login" | "register";
};

export default function AuthFormHeader({ type }: AuthFormHeaderProps) {
  return (
    <>
      {type === "login" ? (
        <p>Welcome back to Gaming Ocean TCG</p>
      ) : (
        <p>Thank you for registering with us!</p>
      )}
    </>
  );
}
