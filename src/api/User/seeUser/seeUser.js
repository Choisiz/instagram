import { prisma } from "../../../../generated/prisma-client";

//유저정보
export default {
    Query: {
        seeUser: (_,args) =>{
            const {id} = args;
            return prisma.user({id});
        }
    }
};