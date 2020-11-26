//메일보내기 (인증)
import { generateSecret, sendSecretMail } from "../../../utils";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_,args,{request}) =>{
            console.log(request.user);
            const {email} =args;
            const loginSecret= generateSecret();
            try{
                throw Error(); //test
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            }catch{
                return false;
            }
        }
    }
}