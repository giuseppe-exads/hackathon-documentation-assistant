import { Component, OnInit } from '@angular/core';
import { AIService } from 'src/app/services/ai.service';
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

  constructor(
    private openAiService: OpenAiService,
    private aiService: AIService) {}

  ngOnInit(): void {}

  onSend1() {
    this.chat.push({
      sender: 'User',
      text: this.message,
    });
    this.generateResponse1(this.message);
    this.message = '';
    this.isGeneratingResponse = true;
  }

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

  generateResponse1(prompt: string) {
    this.aiService.makeStep1(prompt).subscribe((data) => {
      this.isGeneratingResponse = false;
      console.log('step1:', data);
      this.chat.push({
        sender: 'System',
        text: data,
      });
    });
  }
}
