//사용자만들기
import { makePrismaClientClass } from "prisma-client-lib";
import {prisma} from "../../../../generated/prisma-client";

export default{
    Mutation: {
        createAcount: async (_,args,{request}) =>{
            const{userName,email,firstName="",lastName="",bio=""} = args;
            return null;
        }
    }
     
}