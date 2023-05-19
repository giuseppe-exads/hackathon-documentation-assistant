import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { FormsModule } from '@angular/forms';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypewriterDirective } from './shared/typewriter.directive';

/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { OptionsBoxComponent } from './components/options-box/options-box.component';
import { DocumentationMessageComponent } from './components/documentation-message/documentation-message.component';
import { CategoryShortcutsComponent } from './components/category-shortcuts/category-shortcuts.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    ChatBoxComponent,
    TypewriterDirective,
    OptionsBoxComponent,
    DocumentationMessageComponent,
    CategoryShortcutsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
