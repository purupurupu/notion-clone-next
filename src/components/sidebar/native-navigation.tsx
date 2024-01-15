import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CypressHomeIcon from "../icons/cypressHomeIcon";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col">
        <li>
          <Link
            className="flex gap-2 transition-all group/native text-Neutrals/neutrals-7"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
