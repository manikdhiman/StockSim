import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  animationDelay?: number;
}

export default function StatCard({
  label,
  value,
  change,
  isPositive,
  icon: Icon,
  animationDelay = 0,
}: StatCardProps) {
  return (
    <div
      className="stat-card animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2 rounded-lg ${
            isPositive ? "bg-success/10" : "bg-destructive/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isPositive ? "text-success" : "text-destructive"
            }`}
          />
        </div>

        <span
          className={`text-sm font-medium ${
            isPositive ? "text-success" : "text-destructive"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-display text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
