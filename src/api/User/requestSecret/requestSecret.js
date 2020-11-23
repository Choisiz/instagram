//인증(메일) 보내기
import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_,args,{request}) => {
            console.log(request);
            const {email} = args;
            const loginSecret = generateSecret(); //랜덤 비밀번호 생성
            try{
                throw Error();
                await sendSecretMail(email,loginSecret); //받는 사용자 email,loginSecret 메일로 보내기
                await prisma.updateUser({data:{loginSecret},where:{email}});
                //pisma에 받는 사용자 메일기준으로 loginSecret 업데이트
                return true;
            }catch{
                return false;
            }
        }
    }
}