import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { CreateCarUseCase } from "./createCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        })

        expect(car).toHaveProperty("id")

    })

    it("should not be able to create a car if already exists license plate.", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name car1",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"
            })

            await createCarUseCase.execute({
                name: "Name car2",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"
            })

        }).rejects.toBeInstanceOf(ErrorHandle)

    })

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Availabe",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        })

        expect(car.available).toBe(true)

    })

})
