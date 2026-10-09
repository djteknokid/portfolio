import { ReactNode } from "react";
import { LearnlogProvider } from "./context";
import "./learnlog.css";

export const metadata = {
  title: "Learnlog",
  description: "Write what you learned today.",
};

export default function LearnlogLayout({ children }: { children: ReactNode }) {
  return (
    <LearnlogProvider>
      <div className="learnlog-root">
        {children}
      </div>
    </LearnlogProvider>
  );
}
