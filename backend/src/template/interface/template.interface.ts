import { Document } from 'mongoose';
export interface Template extends Document{
    readonly level: string;
    readonly subject: string;
    readonly theme: boolean;
    readonly layout: string;
    readonly html: string
    readonly user_id: string
}