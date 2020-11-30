import { generateSecret, sendSecretMail } from "../../../utils";
import {prisma} from "../../../../generated/prisma-client";

//메일보내기 (인증)
export default {
    Mutation: {
        requestSecret: async(_,args,{request}) =>{
            const {email} =args;
            const loginSecret= generateSecret();
            try{
                
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            }catch{
                return false;
            }
        }
    }
}