import type { IncomingMessage, ServerResponse } from "http";
import { CompatibilityEvent, useBody } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse, event: CompatibilityEvent) => {

    if(req.method !== 'POST') return 'Must be post request'

    const { user } = await useBody(event) // only for POST request
    
    // @ts-ignore
    req.user = user;

    return { updated: true }
};