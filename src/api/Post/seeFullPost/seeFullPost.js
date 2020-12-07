import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragment";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const {id} = args;
            console.log(id);
            return prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
        }
    }
}