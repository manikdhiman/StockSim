import { TrendingUp, TrendingDown } from "lucide-react";

interface HoldingRowProps {
  symbol: string;
  shares: number;
  price: number;
  change: number;
}

export default function HoldingRow({
  symbol,
  shares,
  price,
  change,
}: HoldingRowProps) {
  const isPositive = change >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
          {symbol.slice(0, 2)}
        </div>

        <div>
          <p className="font-semibold">{symbol}</p>
          <p className="text-sm text-muted-foreground">
            {shares} shares
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">₹{price.toLocaleString()}</p>
        <p
          className={`text-sm flex items-center gap-1 justify-end ${
            isPositive ? "text-success" : "text-destructive"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive && "+"}
          {change}%
        </p>
      </div>
    </div>
  );
}
