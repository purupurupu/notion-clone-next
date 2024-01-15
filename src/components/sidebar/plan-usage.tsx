"use client";
import { Subscription } from "@/lib/supabase/supabase.types";
import React from "react";

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}
const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  return <div>PlanUsage</div>;
};

export default PlanUsage;
