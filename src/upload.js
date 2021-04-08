import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: process.env.S3_API_KEY,
    secretAccessKey: process.env.S3_PASSWORD,
    region: "ap-northeast-2"
});
//localStorge: dest: "uploads/"
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "instagram-0327",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
export default upload;