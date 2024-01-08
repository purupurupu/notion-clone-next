import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  //user
  //subscriptions
  //folders
  //error
  //get all the different workspaces private collaborating shared
  return <div>Sidebar</div>;
};

export default Sidebar;
