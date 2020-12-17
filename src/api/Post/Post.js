import { prisma } from "../../../generated/prisma-client";

export default {
    Post: { //fragment 대신 computed 
        files: ({id}) => prisma.post({id}).files(),
        comments: ({id}) => prisma.post({id}).comments(),
        user: ({id}) => prisma.post({id}).user(),
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