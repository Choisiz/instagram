import { adjectives, nonus } from "./words"
const sgMail = require('@sendgrid/mail');

import jwt from "jsonwebtoken";

export const generateSecret = () => { //랜덤 비밀번호 생성
    const randomNumber =Math.floor(Math.random()*adjectives.length);
    return `${adjectives[randomNumber]} ${nonus[randomNumber]}`;
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendSecretMail =(address, secret) => { //메일보내기
    const mail = {
       to: address, 
       from: 'dnjsvltm327@gmail.com', 
       subject: '🔑Login Secret for Instagrdam🔑',
       html: `비밀번호를 입력하세요 <strong>${secret}</strong><br/> 이것을 카피하시오`,
    };
    return sgMail.send(mail).then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}

export const generateToken = id => jwt.sign({ id },process.env.JWT_SECRET);
//토큰 만들기

