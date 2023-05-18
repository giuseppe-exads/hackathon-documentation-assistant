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
  selectedCategory: Category;

  message: string = '';
  chat: ChatMessage[] = [];
  isGeneratingResponse: boolean = false;


  constructor(
    private openAiService: OpenAiService,
    private aiService: AIService,
    private utilityService: UtilityService,
    private APIService: MockAPIService) {}

  ngOnInit(): void {
    //fake selection (to do by a combo)
    const categories = this.APIService.getCategories(1)
    .subscribe(
      (category) => {
        // payments
        //this.selectedCategory = category[1];
      }
    );
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

  generateResponse1(prompt: string, category?: Category) {
    if(!this.utilityService.isNullOrUndefined(category)) {
      this.onSelectMessageByCategory(prompt, <Category>category);
    } else {
      this.aiService.makeStepByMessage(prompt)
        .subscribe(options => {
          this.isGeneratingResponse = false;
          // send the categories to the chat and go listening (by using onSelectedOption)
          console.log(options);
          if (options.length > 0) {
            this.onSelectedOption(options[0]);
          }
        },
          (error) => console.log('error:', error),
          () => {
  
          });
    }
  }

  /**
   * The user has selected one option (category)
   * @param category 
   */
  onSelectedOption(category: Category) {
    // send the category to the category response
    this.onTranslateMessage(category, 'Italian');
  }

  /**
   * The user request to translate a text message
   * @param category 
   * @param language 
   */
  onTranslateMessage(category: Category, language: string) {
    this.aiService.translate(<string>category.textDoc, language)
      .subscribe(
        (message => {
          console.log('Doc translated -> ', message);
        })
      );
  }


  /**
   * The user firstly has selected a category of first level from a combom
   * then he has typed a free request
   * @param message The message typed by the user
   * @param category The category selected by the user
   */
  onSelectMessageByCategory(message: string, category: Category) {
    const categoriesToReturnToChat = new Array<Category>();

    this.aiService.makeStepByCategory(category, message)
      .subscribe(
        (category) => {
          console.log(category);
          categoriesToReturnToChat.push(category);
        },
        (error) => console.log('error:', error),
        () => {
          // send the categories to the options component
          console.log('Send to UI:', categoriesToReturnToChat)
        }
      );
  }
}
