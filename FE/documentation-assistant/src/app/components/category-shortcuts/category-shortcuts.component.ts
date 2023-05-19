import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-shortcuts',
  templateUrl: './category-shortcuts.component.html',
  styleUrls: ['./category-shortcuts.component.scss'],
})
export class CategoryShortcutsComponent implements OnInit {
  @Input() categories: Category[];
  highlightedCategory: any = { name: '' };
  @Output() onSelectedCategory = new EventEmitter<Category>();

  constructor() {}

  ngOnInit(): void {}

  onCategorySelect(category: Category) {
    this.onSelectedCategory.next(category);
    this.highlightedCategory = category;
  }
}
