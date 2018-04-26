import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
declare const Pusher: any;

@Injectable()
export class PusherService {
  constructor() {
    var pusher = new Pusher(environment.pusherKey, {
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
