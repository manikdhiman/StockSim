import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import LeaderboardTabs from "./_components/LeaderboardTabs";
import { Flame, TrendingUp, Zap, Trophy, Medal } from "lucide-react";

// 1. Database Row Types
type ReturnRow = {
  portfolio_id: string;
  user_id: string;
  return_pct: number;
  username: string | null;
  avatar_url: string | null;
  xp: number;
  current_streak: number;
};


export interface PortfolioLeader {
  rank: number;
  name: string;
  xp: number;
  returns: number;
  streak: number;
  avatar: string | null;
}

export interface XpLeader {
  id: string;
  rank: number;
  name: string;
  xp: number;
  level: number;
  badges: number;
  streak: number;
  avatar: string | null;
}

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  // FETCH 1: XP LEADERBOARD
  const { data: xpData, error: xpError } = await supabase
    .from("public_leaderboard") 
    .select("id, username, avatar_url, xp, level, current_streak")
    .order("xp", { ascending: false })
    .limit(50);

  // FETCH 2: RETURNS LEADERBOARD (From New View)
  const { data: returnsDataRaw, error: returnsError } = await supabase
    .from("public_portfolio_returns")
    .select("*")
    .order("return_pct", { ascending: false })
    .limit(50);

  // 1. Transform Returns List
  const portfolioLeaders: PortfolioLeader[] = (returnsDataRaw as unknown as ReturnRow[] || []).map((row, index) => ({
    rank: index + 1,
    name: row.username || "Anonymous Trader",
    avatar: row.avatar_url,
    xp: row.xp || 0,
    streak: row.current_streak || 0,
    returns: Number(row.return_pct?.toFixed(2)) || 0, 
  }));

  const xpLeaders: XpLeader[] = (xpData || []).map((profile: any, index: number) => ({
    id: profile.id,
    rank: index + 1,
    name: profile.username || "Anonymous Trader",
    xp: profile.xp || 0,
    level: profile.level || 1,
    streak: profile.current_streak || 0,
    badges: 0,
    avatar: profile.avatar_url,
  }));

  // Fetch specific profile
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("username, avatar_url, xp, level, current_streak")
    .eq("id", user.id)
    .single();

  const { data: userReturnRow } = await supabase
    .from("public_portfolio_returns")
    .select("return_pct")
    .eq("user_id", user.id)
    .single();

  const userXp = userProfile?.xp || 0;
  const { count: rankCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gt("xp", userXp);

  const currentUser = {
    rank: (rankCount || 0) + 1,
    name: userProfile?.username || "You",
    xp: userProfile?.xp || 0,
    level: userProfile?.level || 1,
    returns: userReturnRow?.return_pct ? Number(userReturnRow.return_pct.toFixed(2)) : 0,
    streak: userProfile?.current_streak || 0,
    avatar: userProfile?.avatar_url,
  };

  const renderAvatar = (avatarUrl: string | null | undefined, name: string) => {
    if (avatarUrl && typeof avatarUrl === "string" && avatarUrl.length > 2) {
      return (
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      );
    }
    return <span>{name?.charAt(0).toUpperCase() || "U"}</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Compete with the top traders in the community.
          </p>
        </div>

        {/* --- PERSONAL RANK CARD --- */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary border border-border/50 flex items-center justify-center text-2xl font-bold text-primary overflow-hidden shadow-sm">
                   {renderAvatar(currentUser.avatar, currentUser.name)}
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-md border border-background">
                  #{currentUser.rank}
                </div>
              </div>
              
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold">{currentUser.name}</h2>
                <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                  <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-md text-xs">
                    <Medal className="w-3 h-3 text-blue-400" />
                    Lvl {currentUser.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    {currentUser.rank <= 10 ? "Top 10" : `Rank #${currentUser.rank}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-display text-lg sm:text-xl font-bold">
                    {currentUser.xp.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-1">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-display text-lg sm:text-xl font-bold">
                    {/* Display Real Returns! */}
                    {currentUser.returns > 0 ? "+" : ""}{currentUser.returns}%
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Returns</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-orange-500 mb-1">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-display text-lg sm:text-xl font-bold">
                    {currentUser.streak}
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Streak</p>
              </div>
            </div>
          </div>
        </div>
        {/* --- LEADERBOARD TABS --- */}
        <LeaderboardTabs
          portfolioLeaders={portfolioLeaders}
          xpLeaders={xpLeaders}
        />
      </div>
    </DashboardLayout>
  );
}
