import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname,".env")});
import { adjectives, nonus } from "./words"
import sgMail from "@sendgrid/mail";

export const generateSecret = () => {
    const randomNumber =Math.floor(Math.random()*adjectives.length);
    return `${adjectives[randomNumber]} ${nonus[randomNumber]}`;
}

console.log(
    process.env.SENDGRID_API_KEY
    );


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendSecretMail =(address, secret) => {
    const mail = {
       to: address, 
       from: 'dnjsvltm327@gmail.com', 
       subject: 'Login Secret for Instagram',
       html: `Hello, Your Login secret it ${secret}.<br/> 카피하시오`,
    };
    return sgMail.send(mail).then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}

