"use client";
import { User } from "@/lib/supabase/supabase.types";
import React, { useState } from "react";

const WorkspaceCreator = () => {
  const [permission, setPermission] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [user, setUser] = useState("");

  return <div>WorkspaceCreator</div>;
};

export default WorkspaceCreator;
