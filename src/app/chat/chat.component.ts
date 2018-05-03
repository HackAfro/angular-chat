import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import { PusherService } from '../pusher.service';

declare const feather: any;

interface Message {
  id: string;
  text: string;
  timeStamp?: Date;
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
    tone: '',
    score: 0,
  };

  sendMessage() {
    if (this.message !== '') {
      this.lastMessageId = v4();
      this.showEmojis = false;

      const data = {
        id: this.lastMessageId,
        text: this.message,
        type: 'outgoing',
      };
      this.messages = this.messages.concat(data);
      this.message = '';
      this.http
        .post('http://localhost:4000/messages', data)
        .subscribe((res: Message) => {});
    }
  }

  selectEmoji(e) {
    this.message += ` ${e}`;
    this.showEmojis = false;
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
        this.showEmojis = true;
        this.score = data.sentiment;
        this.messages = this.messages.concat(message);
      }
    });
  }
}
