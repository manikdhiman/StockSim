import StatCard from "./StatCard";
import {
  BarChart3,
  TrendingUp,
  Zap,
  Flame,
} from "lucide-react";

const stats = [
  {
    label: "Portfolio Value",
    value: "₹1,05,340",
    change: "+5.34%",
    isPositive: true,
    icon: BarChart3,
  },
  {
    label: "Total Profit/Loss",
    value: "₹5,340",
    change: "+5.34%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    label: "XP Points",
    value: "2,450",
    change: "+150 today",
    isPositive: true,
    icon: Zap,
  },
  {
    label: "Learning Streak",
    value: "7 Days",
    change: "Keep it up!",
    isPositive: true,
    icon: Flame,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          animationDelay={index * 0.1}
        />
      ))}
    </div>
  );
}
