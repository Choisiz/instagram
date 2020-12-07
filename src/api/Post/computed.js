import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        isLiked: async (parent, _, {request}) => {
            const {user} = request; 
            const {id} = parent; //입력id = postId
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id //인증자
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            })
        },
        likeCount: (parent) =>
            prisma.likesConnection({
                where: { 
                    post: {
                        id: parent.id
                    } 
                }
            })
            .aggregate()
            .count()
    }
}