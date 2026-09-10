"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap } from "lucide-react";
import LeaderboardList from "./LeaderboardList";
import { PortfolioLeader, XpLeader } from "../page";

interface LeaderboardTabsProps {
  portfolioLeaders: PortfolioLeader[];
  xpLeaders: XpLeader[];
}

export default function LeaderboardTabs({
  portfolioLeaders,
  xpLeaders,
}: LeaderboardTabsProps) {
  return (
    <Tabs defaultValue="portfolio">
      <TabsList className="w-full sm:w-auto bg-secondary/50 mb-6">
        <TabsTrigger value="portfolio">
          <TrendingUp className="w-4 h-4 mr-2" />
          Portfolio Returns
        </TabsTrigger>
        <TabsTrigger value="xp">
          <Zap className="w-4 h-4 mr-2" />
          XP Points
        </TabsTrigger>
      </TabsList>

      <TabsContent value="portfolio">
        <LeaderboardList
          type="portfolio"
          users={portfolioLeaders}
        />
      </TabsContent>

      <TabsContent value="xp">
        <LeaderboardList
          type="xp"
          users={xpLeaders}
        />
      </TabsContent>
    </Tabs>
  );
}
