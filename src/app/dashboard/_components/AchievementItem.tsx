interface AchievementItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function AchievementItem({
  icon,
  title,
  description,
}: AchievementItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded-xl">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
