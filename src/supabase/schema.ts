export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            communities: {
                Row: {
                    categories: string[]
                    country: string
                    coverimage_url: string
                    created_at: string | null
                    created_by: string
                    description: string
                    id: string
                    members: string[]
                    name: string
                    paid: boolean | null
                    region: string
                    socials: string[]
                    verifed: boolean | null
                }
                Insert: {
                    categories: string[]
                    country: string
                    coverimage_url: string
                    created_at?: string | null
                    created_by: string
                    description: string
                    id?: string
                    members: string[]
                    name: string
                    paid?: boolean | null
                    region: string
                    socials: string[]
                    verifed?: boolean | null
                }
                Update: {
                    categories?: string[]
                    country?: string
                    coverimage_url?: string
                    created_at?: string | null
                    created_by?: string
                    description?: string
                    id?: string
                    members?: string[]
                    name?: string
                    paid?: boolean | null
                    region?: string
                    socials?: string[]
                    verifed?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "communities_created_by_fkey"
                        columns: ["created_by"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    communities: string[] | null
                    full_name: string | null
                    id: string
                    institution: string | null
                    role: string | null
                    socials: string[] | null
                    updated_at: string | null
                    username: string | null
                    verified: boolean | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    communities?: string[] | null
                    full_name?: string | null
                    id: string
                    institution?: string | null
                    role?: string | null
                    socials?: string[] | null
                    updated_at?: string | null
                    username?: string | null
                    verified?: boolean | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    communities?: string[] | null
                    full_name?: string | null
                    id?: string
                    institution?: string | null
                    role?: string | null
                    socials?: string[] | null
                    updated_at?: string | null
                    username?: string | null
                    verified?: boolean | null
                    website?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}