export interface ChatMessage {
  sender: 'User' | 'System' | 'Automatic';
  text: string;
}
