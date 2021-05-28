import * as Minio from 'minio';
export const minioClient = new Minio.Client({
  endPoint: process.env.S3_HOST,
  port: +process.env.S3_PORT,
  useSSL: false,
  accessKey: process.env.S3_ACCESSKEY,
  secretKey: process.env.S3_SECRETKEY,
});
