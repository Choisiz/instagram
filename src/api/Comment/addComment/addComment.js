import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../meddlewares";
//댓글달기
export default {
    Mutation: {
        addComment: async(_,args, {request}) => {
            isAuthenticated(request);
            const {text, postId} = args;
            const {user} = request;
            return prisma.createComment({
                user:{
                    connect: {
                        id: user.id
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                },
                text
            });
        }
    }
}