import { storage } from "~~/helpers/fireadmin"


export default async (req, res) => {
    const newsList = storage.getFiles()
    return console.log(newsList)
}