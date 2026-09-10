import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight } from "lucide-react";

export default function LearningProgressCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">
          Learning Progress
        </h2>
        <BookOpen className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Stock Basics</span>
            <span className="text-primary">100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Technical Analysis</span>
            <span className="text-primary">60%</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Risk Management</span>
            <span className="text-muted-foreground">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        <Link href="/learn">
          <Button variant="outline" className="w-full mt-4">
            Continue Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
