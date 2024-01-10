import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { User } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";

interface CollaboratorSearchProps {
  existingCollaborators: User[] | [];
  getCollaborator: (collaborator: User) => void;
  children: React.ReactNode;
}

const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({
  children,
  existingCollaborators,
  getCollaborator,
}) => {
  const { user } = useSupabaseUser();
  const [searchResult, setSearchResult] = useState<User[] | []>([]);
  const timeRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, []);

  const onChangeHandler = () => {};
  const addCollaborator = () => {};

  return <div>CollaboratorSearch</div>;
};

export default CollaboratorSearch;
