import { prisma } from "../../../../generated/prisma-client";

//포스트 검색하기
export default {
    Query: {
        searchPost: async (_,args) =>
        prisma.posts({
            where:{
                OR: [
                    {location_starts_with: args.term},
                    {caption_starts_with: args.term},
                    {user: {userName_starts_with: args.term}}
                ]
            }
        })
    }
}