import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/shared/chat-message.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() chat: ChatMessage[] = [];
  constructor() {}

  ngOnInit(): void {}
}
