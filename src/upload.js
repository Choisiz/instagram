import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

//AWS S3 정보입력
const s3 = new aws.S3({
    accessKeyId: process.env.S3_API_KEY,
    secretAccessKey: process.env.S3_PASSWORD,
    region: "ap-northeast-2"
});

//localStorge: dest: "uploads/"
//AWS S3에 file 업로드하기
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "instagram-0327",
        acl : "public-read", //없으면 사진 안나옴
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
export default upload;