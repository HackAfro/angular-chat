import { Injectable } from '@angular/core';
declare const Pusher: any;

@Injectable()
export class PusherService {
  constructor() {
    var pusher = new Pusher('<PUSHER_KEY>', {
      cluster: 'eu',
      encrypted: true,
    });
    this.channel = pusher.subscribe('chat');
  }
  channel;

  public init() {
    return this.channel;
  }
}
