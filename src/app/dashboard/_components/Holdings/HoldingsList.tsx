import HoldingRow from "./HoldingRow";

const holdings = [
  { symbol: "RELIANCE", shares: 10, price: 2450, change: 2.3 },
  { symbol: "TCS", shares: 5, price: 3520, change: -1.2 },
  { symbol: "INFY", shares: 15, price: 1480, change: 0.8 },
];

export default function HoldingsList() {
  return (
    <div className="space-y-4">
      {holdings.map((stock) => (
        <HoldingRow key={stock.symbol} {...stock} />
      ))}
    </div>
  );
}
