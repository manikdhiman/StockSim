import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface ChallengeItemProps {
  title: string;
  progress: number;
  reward: string;
  deadline: string;
}

export default function ChallengeItem({
  title,
  progress,
  reward,
  deadline,
}: ChallengeItemProps) {
  return (
    <div className="p-4 bg-secondary/30 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {deadline}
          </p>
        </div>
        <span className="text-sm text-primary font-medium">
          {reward}
        </span>
      </div>

      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground mt-2">
        {progress}% complete
      </p>
    </div>
  );
}
