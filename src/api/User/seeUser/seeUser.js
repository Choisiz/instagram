import { prisma } from "../../../../generated/prisma-client";

//유저정보
export default {
    Query: {
        seeUser: async(_,args) =>{
            console.log(args);
            const {userName} = args;
            return await prisma.user({userName});
        }
    }
};