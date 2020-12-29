import {prisma} from "../../../../generated/prisma-client";

//사용자만들기
export default {
    Mutation: {
        createAcount: async(_,args) =>{
            const {userName, email, firstName="", lastName="",bio=""} = args;
            const exists = await prisma.$exists.user({userName});
            if(exists){
                throw Error("유저가 존재함");
            }
                await prisma.createUser({
                    userName,
                    email,
                    firstName,
                    lastName,
                    bio
                });
                return true;
        }
    }
}