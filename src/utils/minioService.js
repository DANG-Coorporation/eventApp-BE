const minio = require("minio");
const fs = require("fs");
const minioClient = new minio.Client({
  endPoint: "103.150.93.30",
  port: 9000,
  useSSL: false,
  accessKey: "!NaufanRikzaMinIO99",
  secretKey: "W£Bn1:26;0",
});

const uploadImg = async file => {
  const filename = file.filename;
  const bucketName = "passify.io";
  const tempFile = `./temp/${filename}`;
  const fileData = fs.readFileSync(tempFile);
  const result = await minioClient.putObject(bucketName, filename, fileData);

  const imgPath = `http://103.150.93.30:9000/${bucketName}/${filename}`;

  console.log(result);
  fs.unlinkSync(tempFile);
  return imgPath;
};

module.exports = uploadImg;
