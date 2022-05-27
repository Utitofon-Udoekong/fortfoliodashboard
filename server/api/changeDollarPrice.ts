import type { ServerResponse } from "http";
import { useBody } from 'h3'
import { doc, updateDoc } from "firebase/firestore";

export default async (req, res: ServerResponse) => {

    if (req.method !== 'POST') return 'Invalid request'

    const { newPrice } = await useBody(req) // only for POST request
    const config = useRuntimeConfig()
    const { $firestore } = useNuxtApp()
    const priceRef = doc($firestore, "egoPrice", config.EGO_ID);
    await updateDoc(priceRef, {
        dollarToNaira: newPrice
    });
    // @ts-ignore

    return { updated: true }
};