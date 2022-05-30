import { useBody } from 'h3'

export default async (req) => {

    if(req.method !== 'POST') return 'Invalid request'

    const { user } = await useBody(req) // only for POST request
    
    // @ts-ignore
    req.user = user;

    return { updated: true }
};