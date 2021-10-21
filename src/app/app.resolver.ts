import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoogleRecaptchaException, Recaptcha } from '@nestlab/google-recaptcha';
import { GoogleRecaptchaValidator } from '@nestlab/google-recaptcha/services/google-recaptcha.validator';
import { Throttle } from 'nestjs-throttler';
import { getAppVersionModel } from 'src/models/getAppVersion.model';
import { getServiceStatus } from 'src/models/Query/getServiceStatus';
import { tokenModel } from 'src/models/token.model';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService, ///  private readonly recaptchaValidator: GoogleRecaptchaValidator,
  ) {}
  //@Recaptcha()
  @Query(() => String)
  async sayHello(): Promise<any> {
    return 'It Work!';
  }
  @Query(() => getServiceStatus)
  async getServiceStatus(): Promise<getServiceStatus> {
    return {
      status: 'OK',
      serviceName:
        'ระบบสารสนเทศเพื่อจัดเก็บเอกสารงานประกันคุณภาพการศึกษาระดับหลักสูตร',
      isInMaintenance: false,
    };
  }
}
