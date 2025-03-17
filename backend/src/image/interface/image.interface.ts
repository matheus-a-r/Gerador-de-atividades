import { Document } from 'mongoose';
import { Template } from 'src/template/interface/template.interface';
export interface Image extends Document{
    readonly template_id: Template;
    readonly imageUrl: String;
    
    toDTO(): unknown;
}