import * as Minio from 'minio';
export const minioClient = new Minio.Client({
  endPoint: 'storage.itpsru.in.th',
  port: 443,
  useSSL: true,
  accessKey: 'LbkaHL9CdVbALDG6GVaFQb6rqsaEbL',
  secretKey: 'fF2He8BacGzDFMyp2ExfAqtAgnCig3',
});
