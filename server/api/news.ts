import { storage } from "~~/helpers/fireadmin"


export default defineEventHandler(async () => {
    const newsList = await storage.getFiles()
    return newsList
})