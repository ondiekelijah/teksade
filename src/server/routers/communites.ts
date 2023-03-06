import { procedure, router } from "../trpc";
import { z } from "zod";
import { supabase } from "@/supabase";
//This end point  contains all procedures (backend functions) related to  communities
export const communitesRouter = router({
  //TODO : Add procedures for  CRUD  operations  @Elijah @Musyoka  @Amwatah
  //Examples ;

  // get all communities
  getAllCommunites: procedure.query(async () => {
    const allCommunites = await supabase.from("communities").select("*");
    return allCommunites.data;
  }),
  //delete a community
  deleteCommunity: procedure
    .input(
      z.object({
        community_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const communityToDelete = await supabase
        .from("communities")
        .delete()
        .eq("id", input.community_id)
        .select("*")
        .single();
      return communityToDelete.data;
    }),
  // create a new community
  createNewCommunity: procedure
    .input(
      z.object({
        community_title: z.string(),
        community_description: z.string().min(10),
        creator_id: z.string().uuid(),
        country: z.string(),
        region: z.string(),
        social_links: z.string().url().array(),
        categories: z.string().array(),
        is_paid: z.boolean(),
        cover_image_url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newCommunity = await supabase
        .from("communities")
        .insert({
          name: input.community_title,
          description: input.community_description,
          created_by: input.creator_id,
          country: input.country,
          region: input.region,
          socials: input.social_links,
          categories: input.categories,
          paid: input.is_paid,
          members: [],
          verifed: false,
          coverimage_url: input.cover_image_url,
        })
        .select("*")
        .single();

      return newCommunity.data;
    }),

  // verify community
  verifyCommunity: procedure
    .input(
      z.object({
        community_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const communityToVerify = await supabase
        .from("communities")
        .update({
          verifed: true,
        })
        .eq("id", input.community_id)
        .select("*")
        .single();
      return communityToVerify.data;
    }),

  // join community,
  joinCommunity: procedure
    .input(
      z.object({
        new_member_id: z.string().uuid(),
        community_id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const currentCommunity = await supabase
        .from("communities")
        .select("*")
        .eq("id", input.community_id)
        .single();
      if (currentCommunity.data) {
        const newMembersList = [
          ...currentCommunity.data.members,
          input.new_member_id,
        ];
        const newCommunityWithUpadatedMembers = await supabase
          .from("communities")
          .update({
            members: newMembersList,
          })
          .eq("id", input.community_id)
          .select("*")
          .single();
        return newCommunityWithUpadatedMembers.data;
      }
    }),
});
