const AWS = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: process.cwd() + '/.env.development' });
} else {
  require('dotenv').config();
}

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  secretAccessKey,
  accessKeyId,
});

const uploadToS3 = async data => {
  const fileStream = fs.createReadStream(data.path);

  await s3
    .putObject({
      Bucket: bucketName,
      Key: `images/${data.filename}`,
      ContentType: data.mimetype,
      Body: fileStream,
      ACL: 'public-read',
    })
    .promise();

  await unlinkAsync(data.path);

  return `https://${bucketName}.s3.amazonaws.com/images/${data.filename}`;
};

module.exports = { uploadToS3 };
