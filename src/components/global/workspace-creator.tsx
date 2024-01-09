"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { User } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();
  const [permission, setPermission] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);

  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborator = (user: User) => {
    setCollaborators(collaborators.filter((u) => u.id !== user.id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-muted-foreground">
          Name
        </label>
        <div className="flex items-center justify-center gap-2">
          <Input
            name="name"
            value={title}
            placeholder="Workspace Name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="permissions" className="text-sm text-muted-foreground">
          Permission
        </Label>
      </div>
    </div>
  );
};

export default WorkspaceCreator;
