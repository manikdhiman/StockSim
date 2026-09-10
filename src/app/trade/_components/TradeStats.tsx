import {
  Wallet,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function TradeStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat-card">
        <Wallet className="w-4 h-4 mb-2" />
        <p className="text-sm text-muted-foreground">Available Balance</p>
        <p className="text-2xl font-bold">₹47,890</p>
      </div>

      <div className="stat-card">
        <BarChart3 className="w-4 h-4 mb-2" />
        <p className="text-sm text-muted-foreground">Portfolio Value</p>
        <p className="text-2xl font-bold">₹1,24,500</p>
      </div>

      <div className="stat-card">
        <TrendingUp className="w-4 h-4 mb-2 text-success" />
        <p className="text-sm text-muted-foreground">Total P&L</p>
        <p className="text-2xl font-bold text-success">+₹12,400</p>
      </div>

      <div className="stat-card">
        <Clock className="w-4 h-4 mb-2" />
        <p className="text-sm text-muted-foreground">Market Status</p>
        <p className="text-xl font-bold text-success">Open</p>
      </div>
    </div>
  );
}
