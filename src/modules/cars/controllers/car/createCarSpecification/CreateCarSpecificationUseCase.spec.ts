import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        )
    })

    it("should not be able to add a new specification to a not existent car", async () => {
        expect(async () => {
            const car_id = "123"
            const specifications_ids = ["12345"]

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_ids
            })
        }).rejects.toBeInstanceOf(ErrorHandle)
    })

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        })

        const specification = await specificationRepositoryInMemory.create({
            name: "Specification",
            description: "specification teste"
        })

        const specifications_ids = [specification.id]

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_ids
        })        

        expect(specificationsCar).toHaveProperty("specifications")
        expect(specificationsCar.specifications.length).toBe(1)

        

    })


})

