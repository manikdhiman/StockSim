import { Medal, Crown, Zap, Flame, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioLeader, XpLeader } from "../page";

type PortfolioProps = {
  type: "portfolio";
  users: PortfolioLeader[];
};

type XpProps = {
  type: "xp";
  users: XpLeader[];
};

type LeaderboardListProps = PortfolioProps | XpProps;

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-muted-foreground font-medium">{rank}</span>;
};

const getRankStyle = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30";
  if (rank === 2) return "bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/30";
  if (rank === 3) return "bg-gradient-to-r from-amber-600/10 to-transparent border-amber-600/30";
  return "bg-card/50 hover:bg-card/80";
};

export default function LeaderboardList(props: LeaderboardListProps) {
  
  return (
    <div className="glass-card p-4 sm:p-6 space-y-3">
      {props.users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No active players found for this category.
        </div>
      )}

      {props.users.map((user) => {
        const isPortfolio = props.type === "portfolio";
        
        const avatarUrl = user.avatar;
        const hasImage = avatarUrl && (avatarUrl.startsWith("/") || avatarUrl.startsWith("http") || avatarUrl.startsWith("data:"));

        return (
          <div
            key={(user as any).id || user.rank} 
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
              getRankStyle(user.rank)
            )}
          >
            {/* LEFT SECTION: Rank, Avatar, Name, Sub-stats */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {getRankIcon(user.rank)}
              </div>

              <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold overflow-hidden shrink-0">
                {hasImage ? (
                  <img 
                    src={avatarUrl!} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <p className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">
                  {user.name}
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {isPortfolio ? (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-blue-400" />
                      {user.xp} XP
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      {(user as any).level ? `Lvl ${(user as any).level}` : `${(user as XpLeader).badges} Badges`}
                    </span>
                  )}
                  
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {user.streak} days
                  </span>
                </div>
              </div>
            </div>
            {/* RIGHT SECTION: Main Stat */}
            <div className="text-right shrink-0">
              {isPortfolio ? (
                <>
                  <p className="font-display text-lg font-bold text-emerald-500">
                    +{(user as PortfolioLeader).returns}%
                  </p>
                  <p className="text-xs text-muted-foreground">Returns</p>
                </>
              ) : (
                <>
                  <p className="font-display text-lg font-bold text-primary">
                    {(user as XpLeader).xp.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}