import type { ServerResponse } from "http";
import { useBody } from 'h3'

export default async (req, res: ServerResponse) => {

    if(req.method !== 'POST') return 'Invalid request'

    const { user } = await useBody(req) // only for POST request
    
    // @ts-ignore
    req.user = user;

    return { updated: true }
};