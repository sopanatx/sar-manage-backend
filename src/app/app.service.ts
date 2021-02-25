import { Injectable } from '@nestjs/common';
import { getAppVersionModel } from 'src/models/getAppVersion.model';

@Injectable()
export class AppService {
  async getAppVersion(): Promise<getAppVersionModel> {
    return {
      statusCode: 200,
      status: 'OK',
      serverZone: 'AWS-PROD-SGP-1',
      version: process.env.APP_VERSION,
      allowedMinimumVersion: process.env.ALLOWED_MINIMUM_APP_VERSION,
      versionCode: +process.env.APP_VERSIONCODE,
      allowedMinimumVersionCode: 204,
      isAllowedOlderVersion: true,
      apiServerType: process.env.API_TYPE,
      isInMaintenance: eval(process.env.IS_INMAINTENANCE) || false,
    };
  }
}
