import DashboardLayout from '@/components/DashboardLayout'

import DashboardHeader from "./_components/DashboardHeader";
import StatsGrid from "./_components/StatsGrid";

import HoldingsCard from "./_components/Holdings/HoldingsCard";
import LearningProgressCard from "./_components/LearningProgressCard";

import AchievementsCard from "./_components/AchievementsCard";
import ChallengesCard from "./_components/ChallengesCard";

export default async function DashboardPage() {
  /**
   * Later you can replace this with:
   * - Supabase server auth
   * - Profile fetch
   * - Cached user query
   */
  const userName = "Investor";

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <DashboardHeader userName={userName} />

        {/* Stats */}
        <StatsGrid />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <HoldingsCard />
          <LearningProgressCard />
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <AchievementsCard />
          <ChallengesCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
