import type { IncomingMessage, ServerResponse } from "http";
import { CompatibilityEvent, useBody } from 'h3'

export default async (req, res: ServerResponse) => {

    if(req.method !== 'POST') return 'Must be post request'

    const { user } = await useBody(req) // only for POST request
    
    // @ts-ignore
    req.user = user;

    return { updated: true }
};