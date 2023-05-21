import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AIService } from 'src/app/services/ai.service';
import { APIService } from 'src/app/services/api.service';
import { MockAPIService } from 'src/app/services/mock-api.service';
import { OpenAiService } from 'src/app/services/open-ai.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ChatMessage, ChatText, DocumentMessage, OptionsMessage } from 'src/app/shared/chat-message.model';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  // to map with that select by user
  @Input()
  selectedCategory?: Category;

  message: string = '';
  chat: ChatMessage[] = [
    /* {
      sender: 'System',
      text: "Hello and welcome to our docSquad customer care service. How can I help you? Whether you have questions, need assistance with a product or service, or have any concerns or feedback, I'm here to assist you",
    }, */
  ];
  levelOneCategories: Category[];
  isGeneratingResponse = false;

  constructor(
    private openAiService: OpenAiService,
    private aiService: AIService,
    private utilityService: UtilityService,
    private APIService: APIService
  ) {}

  ngOnInit(): void {
    const categories = this.APIService.getCategories(1).subscribe(
      (categories) => {
        this.levelOneCategories = categories;
      }
    );
  }

  triggerFunction(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      !!this.message && this.onSend1();
    }
  }

  onSend1() {
    this.addMessage({
      sender: 'User',
      text: this.message,
      type: 'ChatText'
    } as ChatText)
    this.isGeneratingResponse = true;  
    this.generateResponse1(this.message, this.selectedCategory);
    this.message = '';
  }

 /* onSend() {
    this.chat.push({
      type: 'ChatText',
      sender: 'User',
      text: this.message,
    } as ChatText);
    this.generateResponse1(this.message);
    this.message = '';
    this.isGeneratingResponse = true;
  }*/

  generateResponse(prompt: string) {
   /* this.openAiService.getDataFromOpenAI(prompt).subscribe((data) => {
      this.isGeneratingResponse = false;
      this.chat.push({
        type: 'ChatText',
        sender: 'System',
        text: data,
      } as ChatText);
      this.isGeneratingResponse = true;
    });*/
  }

  generateResponse1(prompt: string, category?: Category) {
    if (!this.utilityService.isNullOrUndefined(category)) {
      this.onSelectMessageByCategory(prompt, <Category>category);
    } else {
      const optionsToSend: ChatMessage[] = [];

      this.aiService.makeStepByMessage(prompt).subscribe(
        (options) => {
          this.isGeneratingResponse = false;
          // send the categories to the chat and go listening (by using onSelectedOption)
          optionsToSend.push({
            type: 'OptionsMessage',
            sender: 'System',
            text: 'Dear customer, based on you request, please select one of the next options',
            options: options
          } as OptionsMessage)
        },
        (error) => {
          this.isGeneratingResponse = false;
          const chat = Object.assign([], this.chat);
          this.addMessage({
            type: 'ChatText',
            sender: 'System',
            text: 'I am sorry , but I cannot understand your question. I would recommend getting in touch with the Exads team.',
          } as ChatText)
        },
        () => {
          this.addMessages(optionsToSend);
        }
      );
    }
  }

  /**
   * The user request to translate a text message
   * @param category
   * @param language
   */
  onTranslateMessage(event: { category: Category; language: string }) {
    this.aiService
      .translate(<string>event.category.textDoc, event.language)
      .subscribe((message) => {
        this.isGeneratingResponse = false;
        event.category.textDoc = message.toString();
      });
  }

  /**
   * The user firstly has selected a category of first level from a combom
   * then he has typed a free request
   * @param message The message typed by the user
   * @param category The category selected by the user
   */
  onSelectMessageByCategory(message: string, category: Category) {
    const optionsToSend: ChatMessage[] = [];
    this.aiService.makeStepByCategory(category, message).subscribe(
      (categories) => {
        this.isGeneratingResponse = false;

        optionsToSend.push({
          type: 'OptionsMessage',
          sender: 'System',
          text: 'Dear customer, based on you request, please select one of the next options',
          options: categories
        } as OptionsMessage)
      },
      (error) => {
        this.isGeneratingResponse = false;
        this.addMessage({
          type: 'ChatText',
          sender: 'System',
          text: 'I am sorry , but I cannot understand your question. I would recommend getting in touch with the Exads team.',
        } as ChatText)
      },
      () => {
        this.addMessages(optionsToSend);
      }
    );
  }

  onSelectedChoice(category: Category) {
    this.selectedCategory = category;
  }

  onClearChat() {
    this.chat = [];
    this.selectedCategory = undefined;
  }

  onSelectedChoiceDone(event: {index: number, category: Category}) {

    this.addMessage({
      sender: 'System',
      category: event.category,
      type: 'DocumentMessage'
    } as DocumentMessage, event.index);
  }

  private addMessage(message: ChatMessage, position?: number) {
    const chat = Object.assign([], this.chat);
    if(position) {
      chat.push(message); 
    } else {
      chat.push(message);   
    }
    this.chat = chat;
  }

  private addMessages(messages: ChatMessage[], position?: number) {
    const chat = Object.assign([], this.chat);
    this.chat = chat.concat(messages);;
  }
}
