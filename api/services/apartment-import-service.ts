import {Apartment, PrismaClient} from "@prisma/client"
import parser from "csv-parser"


let db = new PrismaClient()

export const ApartmentImportService = async (doorStreamObject: NodeJS.ReadStream, residentStreamObject: NodeJS.ReadableStream , apartment: Apartment) => {
    

        // wee need to import doors before residents to align data properly
        let doorPromiseObjects:Promise<any>[] = [];
        doorStreamObject.pipe(parser()).on('data', async (row: any) => {
            // console.log(row)
            // residentStreamObject.pause();
            doorPromiseObjects.push(new Promise(async (resolve, reject) => {
                let rowSet = row
                try {
                    await db.door.create({
                        data: {
                            name: rowSet['Door'].replace(/\s+/g, ' ').trim(),
                            acme_id: rowSet['Acme Device ID'],
                            apartment: {
                                connect: {
                                    id: apartment.id
                                }
                            }
                        }
                    })
                    resolve("success");
                } catch (error) {
                    reject(error.message)
                }
            }))
        })

        return Promise.all(doorPromiseObjects).then(resp => {
            residentStreamObject.pipe(parser()).on('data', async (row: any) => {
                // console.log(row)
                let doors = row['Doors'].split(",").map((word:string) => word.replace(/\s+/g, ' ').trim())
                console.log(doors)
                // get the doors
                let doorSet = (await db.door.findMany({where: {
                    name: {
                        in: doors
                    }
                }}))
                console.log(doorSet)
                //let doors ID
                let doorObjects = doorSet.map(door => {
                    return {id: door.id}
                })
    
                // get the door objects
                await db.user.create({
                    data: {
                        first_name: row['First Name'],
                        last_name: row['Last Name'],
                        email: row['Email'],
                        doors: {
                            connect: doorObjects
                        },
                        apartment: {
                            connect: {
                                id: apartment.id
                            }
                        }
                    }
                })
            })
        }).then(resp => {
            return apartment
        }).catch(err => {
            throw err
        })
}