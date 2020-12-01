import { prisma } from "../../../../generated/prisma-client";

//유저정보
export default {
    Query: {
        seeUser: async(_,args) =>{
            const {id} = args;
            const user =await prisma.user({id});
            const posts =await prisma.user({id}).post();
            return {
                user,
                posts
            }
        }
    }
};