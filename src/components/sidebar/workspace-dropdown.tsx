"use client";

import { useAppState } from "@/lib/providers/state-provider";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultValue,
}) => {
  const { dispatch, state } = useAppState();

  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
    return () => {};
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);

  return <div>WorkspaceDropdown</div>;
};

export default WorkspaceDropdown;
