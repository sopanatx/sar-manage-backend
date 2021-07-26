import * as Minio from 'minio';
export const minioClient = new Minio.Client({
  endPoint: '103.164.54.207',
  port: 9000,
  useSSL: false,
  accessKey: process.env.S3_ACCESSKEY,
  secretKey: process.env.S3_SECRETKEY,
});
