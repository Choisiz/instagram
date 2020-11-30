import { prisma } from "../../../../generated/prisma-client";

//사용자 검색하기
export default {
    Query: {
        searchUser: async(_, args) =>
            prisma.users({
                where: {
                    OR: [
                        {userName_contains: args.term},
                        {firstName_contains: args.term},
                        {lastName_contains: args.term}
                    ]
                }
            })
    }
}