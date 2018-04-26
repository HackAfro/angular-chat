import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import { environment } from '../../environments/environment';
import { PusherService } from '../pusher.service';

declare const feather: any;

interface Message {
  text: string;
  timeStamp: Date;
  type: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private http: HttpClient, private pusher: PusherService) {}
  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  showEmojis = false;
  score = {
    isPositive: true,
    cumScore: 0,
  };

  sendMessage() {
    if (this.message !== '') {
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };
      this.http
        .post(`${environment.apiUrl}/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            type: 'outgoing',
          };
          this.messages = this.messages.concat(message);
          this.message = '';

          this.showEmojis = !this.showEmojis;

          // setTimeout(() => (this.showEmojis = !this.showEmojis), 4000);
        });
    }
  }

  selectEmoji(e) {
    this.message += ` ${e}`
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() {
    feather.replace();
    const channel = this.pusher.init();
    channel.bind('message', (data) => {
      if (data.id !== this.lastMessageId) {
        const message: Message = {
          ...data,
          type: 'incoming',
        };

        this.messages = this.messages.concat(message);
      }
    });
  }
}
