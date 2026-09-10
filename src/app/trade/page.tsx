import DashboardLayout from "@/components/DashboardLayout";
import TradeClient from "./TradeClient";

export default async function TradePage() {
  // later: fetch balance, holdings, etc here
  return (
    <DashboardLayout>
      <TradeClient />
    </DashboardLayout>
  );
}
