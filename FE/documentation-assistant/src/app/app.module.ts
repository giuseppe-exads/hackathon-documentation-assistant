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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    ChatBoxComponent,
    TypewriterDirective,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
