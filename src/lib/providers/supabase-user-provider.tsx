"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthUser } from "@supabase/supabase-js";
import { get } from "http";
import React, { createContext, useContext, useEffect, useState } from "react";
import { set } from "zod";
import { getUserSubscriptionStatus } from "../supabase/queries";
import { toast } from "@/components/ui/use-toast";
import { Subscription } from "../supabase/supabase.types";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const supabase = createClientComponentClient();
  // fetch the user details
  // fetch the user subscription
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(user);
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description:
              "Oppse! An unexpected error happened. Try again later.",
          });
        }
      }
    };
    getUser();
  }, [supabase, toast]);

  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
