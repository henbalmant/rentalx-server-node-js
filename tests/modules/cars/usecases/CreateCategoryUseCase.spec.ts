import { AppError } from "../../../../src/errors/AppError";
import { Category } from "../../../../src/modules/cars/entities/Category";
import { CreateCategoryUseCase } from "../../../../src/modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { CategoriesRepositoryMock } from "../../../mocks/repositories/CategoriesRepositoryMock";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryMock.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.name).toBe(category.name);
    expect(categoryCreated.description).toBe(category.description);
    expect(categoryCreated).toBeInstanceOf(Category);
  });

  it("Should not be able to create a new category with name already registered", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description test"
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});