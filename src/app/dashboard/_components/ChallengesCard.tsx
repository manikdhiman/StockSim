import { Target } from "lucide-react";
import ChallengeItem from "./ChallengeItem";

const challenges = [
  {
    title: "Grow portfolio by 5%",
    progress: 65,
    reward: "500 XP",
    deadline: "3 days left",
  },
  {
    title: "Complete 3 quizzes",
    progress: 33,
    reward: "300 XP",
    deadline: "5 days left",
  },
];

export default function ChallengesCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">
          Active Challenges
        </h2>
        <Target className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeItem
            key={challenge.title}
            {...challenge}
          />
        ))}
      </div>
    </div>
  );
}
