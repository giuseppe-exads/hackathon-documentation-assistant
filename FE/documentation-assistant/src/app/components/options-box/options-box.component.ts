import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-options-box',
  templateUrl: './options-box.component.html',
  styleUrls: ['./options-box.component.scss']
})
export class OptionsBoxComponent implements OnInit {

  @Input() options: Category[];
  @Input() message: string;
  @Output() onSelectedChoice = new EventEmitter<Category>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedOption(index:number, category: Category) {
    this.onSelectedChoice.emit(category);
  }

}
