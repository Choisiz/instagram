import "./env";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // 요청을 유일한 매개 변수로 받아들이고 JWT를 문자열 또는 null 로 반환하는 함수
    secretOrKey : process.env.JWT_SECRET
};

const verifyUser = async(payload, done) => {
    try{
        const user = await prisma.user({id:payload.id});
        if(user !== null){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
}

export const authenticateJwt = (req,res,next) => 
passport.authenticate("jwt",{session: false},(error,user)=>{
    if(user){
        req.user = user;//이게 실행되고 나서 graqhql함수를 실행함
    }
    next();
})(req,res,next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();