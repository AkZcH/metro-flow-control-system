import React from "react";
import WelcomeCard from "@/components/user/WelcomeCard";
import QuickActions from "@/components/user/QuickActions";
import RecentActivity from "@/components/user/RecentActivity";
import Announcements from "@/components/user/Announcements";

const UserPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] to-[#1a1a1a] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <WelcomeCard username="Akshat" />
        <QuickActions />
        <RecentActivity />
        <Announcements />
      </div>
    </div>
  );
};

export default UserPortal;
