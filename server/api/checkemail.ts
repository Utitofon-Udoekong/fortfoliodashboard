import { useQuery } from "h3";
import { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const query = useQuery(req);
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(query.email === "me@gmail.com")
        },500)
    })
    res.end(`${result}`)
}