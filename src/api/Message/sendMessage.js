import {prisma} from "../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../fragment";

//채팅방만들기 및 메세지 보내기
export default {
    Mutation: {
        sendMessage: async(_, args, {request,isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if(roomId === undefined) { //채팅방이 없으면
                if(user.id !== toId){ //from 과 to가 틀리면
                    room = await prisma //채팅방을 만든다(from:id와 to:id를 연결)
                    .createRoom({
                        participants: {
                            connect: [ { id: toId }, { id : user.id } ]
                        }
                    })
                    .$fragment(ROOM_FRAGMENT);
                }
            } else { //채팅방이 있으면
                room = await prisma.room({id: roomId}).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("Room not found");
            }

            const getTo = room.participants.filter(
                participant => participant.id !== user.id //사용자 제외 참가자 id
                )[0];

            return prisma.createMessage({ //메세지 만들기
                text: message,
                from: { //사용자 id와 연결
                    connect: { id: user.id }
                },
                to: { // 채팅방 존재시 참가자id 연결 / 없으면 toId 받기
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: { //id와 연결
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
};