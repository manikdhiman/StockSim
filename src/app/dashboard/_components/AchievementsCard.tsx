import { Award } from "lucide-react";
import AchievementItem from "./AchievementItem";

const achievements = [
  { icon: "🎯", title: "First Trade", description: "Completed your first trade" },
  { icon: "📚", title: "Quick Learner", description: "Completed 5 lessons" },
  { icon: "🔥", title: "On Fire", description: "7 day learning streak" },
];

export default function AchievementsCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold">
          Recent Achievements
        </h2>
        <Award className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <AchievementItem
            key={achievement.title}
            {...achievement}
          />
        ))}
      </div>
    </div>
  );
}
