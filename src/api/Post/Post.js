import { prisma } from "../../../generated/prisma-client";

export default {
    Post: { //fragment 대신 computed 
        files: ({id}) => prisma.post({id}).files(), //파일
        comments: ({id}) => prisma.post({id}).comments(), //댓글
        user: ({id}) => prisma.post({id}).user(), //사용자
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
        }, //좋아요
        likeCount: (parent) =>
            prisma.likesConnection({
                where: { 
                    post: {
                        id: parent.id
                    } 
                }
            })
            .aggregate()
            .count() //좋아요 숫자
    }
}