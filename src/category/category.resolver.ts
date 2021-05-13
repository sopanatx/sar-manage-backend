import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { Roles } from 'src/decorators/roles';
import { getCategories } from 'src/models/Query/getCategories';
import { getNavMemu } from 'src/models/Query/getNavMenu';
import { GetUser } from 'src/shared/decorators/decorators';
import { CategoryService } from './category.service';
import { HasTopicListDto } from './dto/hasTopicList.dto';
import { HasTopicListModel } from './model/hasTopicList.model';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  // @Roles('User')
  @Query(() => [getCategories])
  async getCategories(@GetUser() getUser): Promise<getCategories[]> {
    return this.categoryService.getCategories();
  }

  @Query(() => HasTopicListModel)
  async getHasTopicList(
    @Args('getHasTopicList') getHasTopicList: HasTopicListDto,
  ): Promise<HasTopicListModel> {
    return await this.categoryService.getHasTopicList(getHasTopicList);
  }

  @Query(() => [getNavMemu])
  async getNavMemu(): Promise<getNavMemu[]> {
    return this.categoryService.getNavigation();
  }
}
