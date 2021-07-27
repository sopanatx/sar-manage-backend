import * as Minio from 'minio';
export const minioClient = new Minio.Client({
  endPoint: 'storage.itpsru.in.th',
  port: 443,
  useSSL: true,
  accessKey: process.env.S3_ACCESSKEY,
  secretKey: process.env.S3_SECRETKEY,
});
