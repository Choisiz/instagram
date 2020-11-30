import {prisma} from "../../../../generated/prisma-client";

//사용자만들기
export default {
    Mutation: {
        createAcount: async(_,args) =>{
            const {userName, email, firstName="", lastName="",bio=""} = args;
            const user = await prisma.createUser({
                userName,
                email,
                firstName,
                lastName,
                bio
            });
            return user;
        }
    }
}