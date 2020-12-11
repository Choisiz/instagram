import {prisma} from "../../../../generated/prisma-client";
export default {
    Query: {
        seeRooms: (_,__, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.rooms({
                where: {
                    particpants_some: {
                        id: user.id
                    }
                }
            });

        }
    }
};