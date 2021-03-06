import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { CategoryAlreadyExistsException } from "../exceptions/CategoryAlreadyExistsException";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsException();
    }

    await this.categoriesRepository.create({ name, description });
  }
}
