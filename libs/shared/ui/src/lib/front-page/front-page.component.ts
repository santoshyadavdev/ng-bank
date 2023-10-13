import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'ngbank-front-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ToolbarComponent, PageComponent],
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent {
  @Output() readonly menuButtonClick = new EventEmitter<void>();
}
