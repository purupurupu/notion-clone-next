import { InferSelectModel } from "drizzle-orm";
import {
  customers,
  files,
  folders,
  prices,
  products,
  subscriptions,
  users,
  workspaces,
} from "../../../migrations/schema";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      files: {
        Row: {
          banner_url: string | null;
          created_at: string | null;
          data: string | null;
          folder_id: string | null;
          icon_id: string;
          id: string;
          in_trash: string | null;
          logo: string | null;
          title: string;
          workspace_id: string | null;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          folder_id?: string | null;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title: string;
          workspace_id?: string | null;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          folder_id?: string | null;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title?: string;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "files_folder_id_folders_id_fk";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "folders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "files_workspace_id_workspaces_id_fk";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      folders: {
        Row: {
          banner_url: string | null;
          created_at: string | null;
          data: string | null;
          icon_id: string;
          id: string;
          in_trash: string | null;
          logo: string | null;
          title: string;
          workspace_id: string | null;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title: string;
          workspace_id?: string | null;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title?: string;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "folders_workspace_id_workspaces_id_fk";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_products_id_fk";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_prices_id_fk";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          email: string | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          banner_url: string | null;
          created_at: string | null;
          data: string | null;
          icon_id: string;
          id: string;
          in_trash: string | null;
          logo: string | null;
          title: string;
          workspace_owner: string;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title: string;
          workspace_owner: string;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string | null;
          data?: string | null;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title?: string;
          workspace_owner?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      aal_level: "aal3" | "aal2" | "aal1";
      code_challenge_method: "plain" | "s256";
      factor_status: "verified" | "unverified";
      factor_type: "webauthn" | "totp";
      key_status: "expired" | "invalid" | "valid" | "default";
      key_type:
        | "stream_xchacha20"
        | "secretstream"
        | "secretbox"
        | "kdf"
        | "generichash"
        | "shorthash"
        | "auth"
        | "hmacsha256"
        | "hmacsha512"
        | "aead-det"
        | "aead-ietf";
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;

// manual add types
export type workspace = InferSelectModel<typeof workspaces>;
export type User = InferSelectModel<typeof users>;
export type Folder = InferSelectModel<typeof folders>;
export type File = InferSelectModel<typeof files>;
export type Product = InferSelectModel<typeof products>;
export type Price = InferSelectModel<typeof prices> & { products?: Product };
export type Customer = InferSelectModel<typeof customers>;
export type Subscription = InferSelectModel<typeof subscriptions> & {
  prices: Price;
};

export type ProductWithPrices = Product & { prices?: Price[] };
