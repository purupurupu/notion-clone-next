"user server";

import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { FormSchema } from "@/lib/types";

export async function actionLogin({
  email,
  password,
}: z.infer<typeof FormSchema>) {}
