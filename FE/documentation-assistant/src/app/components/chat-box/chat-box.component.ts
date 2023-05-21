import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChatMessage, ChatText, DocumentMessage, OptionsMessage } from 'src/app/shared/chat-message.model';
import { Category } from '../../models/category.model';
import { MockAPIService } from 'src/app/services/mock-api.service';
import { type } from 'os';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent
  implements AfterViewInit, OnChanges, AfterViewChecked
{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Output() requestedTranslation = new EventEmitter<{
    category: Category;
    language: string;
  }>();
  @Output()onSelectedChoiceDone = new EventEmitter< {index: number, category: Category} >();
  @Input() chat: ChatMessage[] = [];
  @Input() isGenerating: boolean = false;
  @Input() messageForOptions = '';
  selectedChoice: Category;

  private isScrollToBottomNeeded = false;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
   // this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isScrollToBottomNeeded = true;
  }

  ngAfterViewChecked() {
    if(this.isScrollToBottomNeeded) {
      setTimeout(() => {
        this.isScrollToBottomNeeded = false;
        this.scrollToBottom();
      }, 500);
    }
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  onSelectedChoice(i: number, category: Category) {
    
    this.selectedChoice = category;
    this.onSelectedChoiceDone.emit({index: i+1, category});
  }

  onRequestedTranslation(language: string) {
    this.requestedTranslation.emit({
      category: this.selectedChoice,
      language: language,
    });
  }

  getChatText(message: ChatMessage): ChatText | null {
    return message.type === 'ChatText' ? <ChatText>message : null;
  }

  isDocumentMessage(message: ChatMessage): boolean {
    return message.type === 'DocumentMessage';
  }

  getDocumentMessage(message: ChatMessage): DocumentMessage | null {
    return message.type === 'DocumentMessage' ? <DocumentMessage>message : null;
  }

  isOptionsMessage(message: ChatMessage): boolean {
    return message.type === 'OptionsMessage';
  }

  getOptionsMessage(message: ChatMessage): OptionsMessage | null {
    return message.type === 'OptionsMessage' ? <OptionsMessage>message : null;
  }
}
