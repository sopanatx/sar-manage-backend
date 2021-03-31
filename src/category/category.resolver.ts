import { Query, Resolver } from '@nestjs/graphql';
import { getCategories } from 'src/models/Query/getCategories';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}
  @Query(() => [getCategories])
  async getCategories(): Promise<getCategories[]> {
    return this.categoryService.getCategories();
  }
}
