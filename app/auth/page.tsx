"use client";
import { LoginForm } from "@/components/login-form";
// import { signUpWithCredentials } from "@/lib/actions/auth/signup-with-credentials";
// async function onSubmit() {
//     // console.log(values)
//     // setError("");
//     // setSuccess("");

//       signUpWithCredentials(values)
//         .then((data) => {
//           if (data?.error) {
//             setError(data.error);
//           } else if (data?.success) {
//             setSuccess(data.success);
//           }
//         })
//         .catch(() => setError("Something went wrong"));
//     );
//   }
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
