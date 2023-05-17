import { Component, OnInit } from '@angular/core';
import { OpenAiService } from 'src/app/services/open-ai.service';
import { ChatMessage } from 'src/app/shared/chat-message.model';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  message: string = '';
  chat: ChatMessage[] = [];
  isGeneratingResponse: boolean = false;

  constructor(private openAiService: OpenAiService) {}

  ngOnInit(): void {}

  onSend() {
    this.chat.push({
      sender: 'User',
      text: this.message,
    });
    this.generateResponse(this.message);
    this.message = '';
    this.isGeneratingResponse = true;
  }

  generateResponse(prompt: string) {
    this.openAiService.getDataFromOpenAI(prompt).subscribe((data) => {
      this.isGeneratingResponse = false;
      this.chat.push({
        sender: 'System',
        text: data,
      });
    });
  }
}
