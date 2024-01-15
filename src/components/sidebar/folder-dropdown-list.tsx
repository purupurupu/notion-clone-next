"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { workspaces } from "@/lib/supabase/schema";
import { Folder } from "@/lib/supabase/supabase.types";
import React, { use, useEffect, useState } from "react";
import TooltipComponent from "../global/tooltip-component";
import { PlusIcon } from "lucide-react";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { v4 } from "uuid";
import { createFolder } from "@/lib/supabase/queries";
import { toast, useToast } from "../ui/use-toast";
import { desc } from "drizzle-orm";
import { Accordion } from "../ui/accordion";

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
  const { state, dispatch, folderId } = useAppState();
  const { toast } = useToast();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();

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

  const addFolderHandler = async () => {
    // if (folders.length >= 3 && !subscription) {};
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "👜",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could'nt create folder",
      });
    } else {
      toast({
        title: "Success",
        description: "Folder created",
      });
    }
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between w-full h-10 pr-4 bg-background group/title text-Neutrals/neutrals-8">
        <span className="text-xs font-bold text-Neutrals-8">FOLDERS</span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="hidden cursor-pointer group-hover/title:inline-block hover:dark:text-white"
          />
        </TooltipComponent>
      </div>
      <Accordion
        className="pb-20"
        type="multiple"
        defaultValue={[folderId || ""]}
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <div key={folder.id}>{folder.title}</div>
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
