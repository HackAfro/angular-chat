import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { PusherService } from './pusher.service';
import { EmojiPanelComponent } from './emoji-panel/emoji-panel.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, EmojiPanelComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [PusherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
