"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          Welcome back,{" "}
          <span className="gradient-text">{userName}</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your investment overview
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/learn">
          <Button variant="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
        </Link>

        <Link href="/trade">
          <Button variant="hero">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trade Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
