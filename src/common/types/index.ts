import { Request } from "express-jwt";
import { JwtPayload } from "jsonwebtoken";

export type AuthCookie = {
    accessToken: string;
};
export interface AuthPayload extends JwtPayload {
    sub: string; // override or change to `string` to match default
    role: string;
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface AuthRequest extends Request {
    auth: AuthPayload;
}
