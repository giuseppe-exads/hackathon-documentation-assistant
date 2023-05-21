import { Category } from "../models/category.model";

export interface ChatMessage {
  sender: 'User' | 'System' | 'Automatic';
  type: string;
}

export interface ChatText extends ChatMessage {
  text: string;
}

export interface DocumentMessage extends ChatMessage {
  category: Category;
}

export interface OptionsMessage extends ChatMessage {
  text: string;
  options: Category[];
}



