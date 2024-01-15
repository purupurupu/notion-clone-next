"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { workspaces } from "@/lib/supabase/schema";
import { Folder } from "@/lib/supabase/supabase.types";
import React, { use, useEffect, useState } from "react";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  // local state folders
  // sete real time updates
  const { state, dispatch } = useAppState();
  const [folders, setFolders] = useState(workspaceFolders);

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
    return () => {};
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state]);

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between w-full h-10 pr-4 bg-background group/title text-Neutrals/neutrals-8">
        <span className="text-xs font-bold text-Neutrals-8">FOLDERS</span>
      </div>
    </>
  );
};

export default FoldersDropdownList;
