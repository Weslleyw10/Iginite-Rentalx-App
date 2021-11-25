import fs from 'fs';
import csvParse from 'csv-parse'

import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'

interface IImportCategory {
    name: string;
    description: string;
}

export class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const parseFile = csvParse()
            const stream = fs.createReadStream(file.path)
            const categories: IImportCategory[] = []

            stream.pipe(parseFile)

            parseFile
                .on("data", async (line) => {
                    // [name, description]
                    const [name, description] = line
                    categories.push({
                        name,
                        description
                    })
                })
                .on("end", () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on("error", (err) => {
                    reject(err)
                })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file)
        
        categories.map(async (category) => {
            const { name, description } = category
            const AlreadyExitsCategory = this.categoriesRepository.findByName(name)

            if(!AlreadyExitsCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                })
                
                
            }
        })
    }
}