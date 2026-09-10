import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HoldingsList from "./HoldingsList";

export default function HoldingsCard() {
  return (
    <div className="lg:col-span-2 glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">
          Your Holdings
        </h2>

        <Link
          href="/trade"
          className="text-primary text-sm hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <HoldingsList />
    </div>
  );
}
