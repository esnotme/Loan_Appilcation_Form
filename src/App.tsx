import LoanTypeStep from "./steps/LoanTypeStep";

export default function App() {
  console.log("🟢 App component rendering...");
  return <LoanTypeStep onNext={() => console.log("➡️ Next step clicked")} />;
}
