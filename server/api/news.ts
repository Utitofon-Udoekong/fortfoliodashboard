import { storage } from "~~/helpers/fireadmin"


export default defineEventHandler(async () => {
    const news = await storage.getFiles()
})