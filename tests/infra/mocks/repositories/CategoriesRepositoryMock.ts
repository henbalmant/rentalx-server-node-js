import { Category } from "@infra/repositories/entities/CategoryEntity";
import { ICategoriesRepository, ICreateCategoryDTO } from "@domains/cars/repositories/ICategoriesRepository";

export class CategoriesRepositoryMock implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category!;
  }

  async list(): Promise<Category[]> {
    const list = this.categories;

    return list;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}
