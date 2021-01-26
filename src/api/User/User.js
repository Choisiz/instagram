import { prisma } from "../../../generated/prisma-client";

export default {
    User: { //fragment 대신 computed
        posts: ({id}) => prisma.user({id}).posts(), //포스트
        following:({id}) => prisma.user({id}).following(), //팔로잉
        followers:({id}) => prisma.user({id}).followers(), //팔로워
        likes: ({id}) => prisma.user({id}).likes(),  //좋아요
        comments: ({id}) => prisma.user({id}).comments(), //코멘트
        rooms: ({id}) => prisma.user({id}).rooms(), //채팅룸
        postsCount: ({id}) => //포스트 수
            prisma
                .postsConnection({where: {user: {id}}})
                .aggregate()
                .count(),
        followingCount: ({id}) =>//내가 다른사람을
            prisma
                .usersConnection({where:{followers_some: {id}}})
                .aggregate()
                .count(),
        followersCount: ({id}) => //다른사람이 나를
            prisma
                .usersConnection({where: {following_none: {id}}})
                .aggregate()
                .count(),
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },

        isFollowing: async(parent,_,{request}) => {
            const { user } = request;
            const { id: parentId } = parent;
           try{
            const exists = await prisma.$exists.user({
                AND:[
                    {
                        id: user.id
                    },
                    {
                        following_some: {
                            id: parentId
                        }
                    }
                ]
            });
            return exists;

           }catch {
               return false;
           }
        },

        isSelf: (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent; 
            return user.id ===parentId;
        }
    }
};