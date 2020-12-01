import { prisma } from "../../../../generated/prisma-client";

//댓글달기
export default {
    Mutation: {
        addComment: async(_,args, {request,isAuthenticated}) => {
            isAuthenticated(request);
            const {text, postId} = args;
            const {user} = request;
            const comment = await prisma.createComment({
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
            return comment;
        }
    }
}