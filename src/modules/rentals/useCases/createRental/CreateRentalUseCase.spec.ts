import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { ErrorHandle } from "@shared/errors/ErrorHandle"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
    const dayMore24hours = dayjs().add(1, "day").toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        )
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayMore24hours,
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayMore24hours,
            })

            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212125",
                expected_return_date: dayMore24hours,
            })
        }).rejects.toBeInstanceOf(ErrorHandle)
    })

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayMore24hours,
            })

            const rental = await createRentalUseCase.execute({
                user_id: "12345b",
                car_id: "121212",
                expected_return_date: dayMore24hours,
            })
        }).rejects.toBeInstanceOf(ErrorHandle)
    })

    it("Should not be able to create a new rental with return time invalid", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(ErrorHandle)

    })
})