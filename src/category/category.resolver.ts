import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/strategy/graphql-auth.guard';
import { getCategories } from 'src/models/Query/getCategories';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [getCategories])
  async getCategories(): Promise<getCategories[]> {
    return this.categoryService.getCategories();
  }
}
