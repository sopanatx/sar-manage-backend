import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query(() => String)
  sayHello1(): string {
    return 'หวัดดีค้าบบบบบ';
  }
}
