import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function InstaPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Loading...</p>
      </main>
    }>
      <LoginPage />
    </Suspense>
  );
}
