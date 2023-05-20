import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AIService } from 'src/app/services/ai.service';
import { APIService } from 'src/app/services/api.service';
import { MockAPIService } from 'src/app/services/mock-api.service';
import { OpenAiService } from 'src/app/services/open-ai.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ChatMessage } from 'src/app/shared/chat-message.model';

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
  isGeneratingResponse: boolean = false;
  options: Category[];
  levelOneCategories: Category[];
  messageForOptions = '';

  constructor(
    private openAiService: OpenAiService,
    private aiService: AIService,
    private utilityService: UtilityService,
    private APIService: APIService
  ) {}

  ngOnInit(): void {
    // testing options component (to remove)
    /* this.APIService.getCategories(2, 1).subscribe((categories) => {
      console.log(categories);
      this.messageForOptions = 'Please, select your choice';
      this.options = categories;
    });**/
    //fake selection (to do by a combo)
    const categories = this.APIService.getCategories(1).subscribe(
      (categories) => {
        this.levelOneCategories = categories;
        // payments
        //this.selectedCategory = category[1];
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
    this.chat.push({
      sender: 'User',
      text: this.message,
    });
    this.generateResponse1(this.message, this.selectedCategory);
    this.message = '';
    this.isGeneratingResponse = true;
  }

  onSend() {
    this.chat.push({
      sender: 'User',
      text: this.message,
    });
    this.generateResponse1(this.message);
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

  generateResponse1(prompt: string, category?: Category) {
    if (!this.utilityService.isNullOrUndefined(category)) {
      this.onSelectMessageByCategory(prompt, <Category>category);
    } else {
      this.aiService.makeStepByMessage(prompt).subscribe(
        (options) => {
          this.isGeneratingResponse = false;
          // send the categories to the chat and go listening (by using onSelectedOption)
          console.log(options);
          this.options = options;
          this.messageForOptions =
            'Dear customer, based on you request, please select one of the next options';

          /** if (options.length > 0) {
            this.onSelectedOption(options[0]);
          }*/
        },
        (error) => {
          this.isGeneratingResponse = false;
          this.options = [];
          this.chat.push({
            sender: 'System',
            text: 'I am sorry , but I cannot understand your question. I would recommend getting in touch with the Exads team.',
          });
        },
        () => {}
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
    this.options = [];

    this.aiService.makeStepByCategory(category, message).subscribe(
      (category) => {
        console.log(category);
        this.options.push(category);
      },
      (error) => {
        this.isGeneratingResponse = false;
        this.options = [];
        this.chat.push({
          sender: 'System',
          text: 'I am sorry , but I cannot understand your question. I would recommend getting in touch with the Exads team.',
        });
      },
      () => {
        // send the categories to the options component
        console.log('Send to UI:', this.options);
        this.isGeneratingResponse = false;
        this.messageForOptions =
          'Dear customer, based on you request, please select one of the next options';
      }
    );
  }

  onSelectedChoice(category: Category) {
    this.selectedCategory = category;
    console.log(category);
  }

  onClearChat() {
    this.chat = [];
    this.options = [];
    this.selectedCategory = undefined;
  }
}
