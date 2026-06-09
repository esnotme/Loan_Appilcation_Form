import { useEffect } from "react";

export default function AutoSaveWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const interval = setInterval(() => {
      const state = localStorage.getItem("formState");
      // TODO: add AES encryption before saving
      localStorage.setItem("formState", JSON.stringify(state));
    }, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
