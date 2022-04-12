import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
    const dayMore24hours = dayjs().add(1, "day").toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        )
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 180,
            license_plate: "ABC-123B",
            fine_amount: 50,
            category_id: "1234",
            brand: "brand"
        })

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayMore24hours,
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayMore24hours,
            user_id: "12345",
        });

        await expect(
             createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212125",
                expected_return_date: dayMore24hours,
            })

        ).rejects.toEqual(new ErrorHandle("There's a rental in progress for user."))
    })

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "121212",
            expected_return_date: dayMore24hours,
            user_id: "123456",
        });

        await expect(            
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayMore24hours,
            })        
        ).rejects.toEqual(new ErrorHandle("Car is unavailable."))
    })

    it("Should not be able to create a new rental with return time invalid", async () => {
        await expect(
             createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate()
            })
            
        ).rejects.toEqual(new ErrorHandle("Invalid return time."))

    })
})