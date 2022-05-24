import type { IncomingMessage, ServerResponse } from "http";
import { CompatibilityEvent, useCookie } from 'h3'

export default async (req,res: ServerResponse,event: CompatibilityEvent, context: any) => {
  const userCookie = useCookie(req, "userCookie");

  // @ts-ignore
  req.user = userCookie;
};