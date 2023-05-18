import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-documentation-message',
  templateUrl: './documentation-message.component.html',
  styleUrls: ['./documentation-message.component.scss'],
})
export class DocumentationMessageComponent implements OnInit {
  @Input() message: Category;

  constructor() {}

  ngOnInit(): void {}
}
