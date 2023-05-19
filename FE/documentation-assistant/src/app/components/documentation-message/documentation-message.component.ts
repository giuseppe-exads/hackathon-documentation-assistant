import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { AIService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-documentation-message',
  templateUrl: './documentation-message.component.html',
  styleUrls: ['./documentation-message.component.scss'],
})
export class DocumentationMessageComponent implements OnInit {
  @Input() message: Category;

  languages = ['English', 'German', 'Italian', 'Spanish', 'Portuguese'];
  isGenerating = false;
  constructor(
    private aiService: AIService
  ) { }

  ngOnInit(): void { }

  onTranslate(language: string) {
    this.isGenerating = true;

    this.aiService
      .translate(<string>this.message.textDoc,
        language)
      .subscribe((message) => {
        this.isGenerating = false;
        this.message.textDoc = message.toString();
      });
  }
}
