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
import { ChatMessage } from 'src/app/shared/chat-message.model';
import { Category } from '../../models/category.model';
import { MockAPIService } from 'src/app/services/mock-api.service';

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
  @Input() chat: ChatMessage[] = [];
  @Input() isGenerating: boolean = false;
  @Input() options: Category[];
  @Input() messageForOptions = '';
  private isScrollToBottomNeeded = false;

  selectedChoice: Category;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.isScrollToBottomNeeded = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const containerElement = this.scrollContainer.nativeElement;
      const maxScrollTop =
        containerElement.scrollHeight - containerElement.clientHeight;
      setTimeout(() => {
        this.renderer.setProperty(containerElement, 'scrollTop', maxScrollTop);
      }, 0);
    }
  }

  onSelectedChoice(category: Category) {
    console.log(category);
    this.selectedChoice = category;
  }

  onRequestedTranslation(language: string) {
    this.requestedTranslation.emit({
      category: this.selectedChoice,
      language: language,
    });
  }
}
