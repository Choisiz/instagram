//인증요청확인
import {prisma} from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_,args) => {
            const {email, secret} =args;
            const user = await prisma.user({email});
            if(user.loginSecret ===secret){
                return generateToken(user.id);
            }else{
                throw Error("이메일/비밀번호 잘못입력함");
            }
        }
    }
}