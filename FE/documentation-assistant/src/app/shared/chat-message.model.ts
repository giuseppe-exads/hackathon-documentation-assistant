export interface ChatMessage {
  sender: 'User' | 'System' | 'Automatic';
  text: string;
  options?: any;
  messageForOptions?: string;
}
