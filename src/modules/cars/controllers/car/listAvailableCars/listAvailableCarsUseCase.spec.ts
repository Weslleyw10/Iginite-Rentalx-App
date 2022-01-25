import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Available",
            description: "Description car",
            daily_rate: 100,
            license_plate: "BAR-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])

    })

    it("should be able to list cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Available Two",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ZAC-1234",
            fine_amount: 60,
            brand: "Brand By Params",
            category_id: "Category"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand By Params",
        })

        expect(cars).toEqual([car])

    })

    it("should be able to list cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Available Three",
            description: "Description car",
            daily_rate: 100,
            license_plate: "BIL-1234",
            fine_amount: 60,
            brand: "Brand By Params",
            category_id: "Category"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car Available Three",
        })

        expect(cars).toEqual([car])

    })

    it("should be able to list cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Available Three",
            description: "Description car",
            daily_rate: 100,
            license_plate: "DEC-1234",
            fine_amount: 60,
            brand: "Brand By Params",
            category_id: "BMW"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "BMW",
        })

        expect(cars).toEqual([car])

    })



})