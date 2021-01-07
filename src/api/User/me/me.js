import { prisma } from "../../../../generated/prisma-client";
//import { USER_FRAGMENT } from "../../../fragment";

export default {
    Query: {
        me: async(_,__, {request,isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            return await prisma.user({id: user.id});
            /*
            return prisma.user({
             id: user.id
            }).$fragment(USER_FRAGMENT);
            복잡한 쿼리,ralationship일시 fragment 보다 다른구문 추천
            */
        }
    }
}