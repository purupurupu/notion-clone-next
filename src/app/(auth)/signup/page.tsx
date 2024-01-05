"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Logo from "../../../../public/cypresslogo.svg";
import Image from "next/image";
import Loading from "@/components/global/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/10": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    []
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof SignUpFormSchema>) => {};
  const signUpHandler = async ({
    email,
    password,
  }: z.infer<typeof SignUpFormSchema>) => {};

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link href="/" className="flex items-center w-full justify-left">
          <Image src={Logo} alt="logo" width={50} height={50} />
          <span className="text-4xl font-semibold dark:text-white first-letter:ml-2">
            Application
          </span>
        </Link>
        <FormDescription className="text-foreground/60">
          An all-In-One Collaboration and Productivity
        </FormDescription>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirmPassword"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!confirmation && !codeExchangeError && (
          <>
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loading />}
            </Button>
          </>
        )}
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className="self-container">
          Already have an account?{""}
          <Link href="/login" className="pl-2 text-primary">
            Login
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="w-4 h-4" />}
              <AlertTitle>
                {codeExchangeError ? "Invalid Link" : "Check you email"}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || "An email confirmation has been sent"}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default Signup;
