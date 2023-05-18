import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChatMessage } from 'src/app/shared/chat-message.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() chat: ChatMessage[] = [];
  @Input() isGenerating: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const containerElement = this.scrollContainer.nativeElement;
      this.renderer.setProperty(
        containerElement,
        'scrollTop',
        containerElement.scrollHeight
      );
    }
  }
}
