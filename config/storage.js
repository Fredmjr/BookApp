import * as Minio from "minio";
let SSL;
if (process.env.MINIO_USESSL == "false") {
  SSL = false;
}
if (process.env.MINIO_USESSL == "true") {
  SSL = true;
}

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: process.env.MINIO_PORT,
  useSSL: SSL,
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY,
});

export default minioClient;
