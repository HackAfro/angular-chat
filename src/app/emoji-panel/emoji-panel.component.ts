import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji-panel',
  templateUrl: './emoji-panel.component.html',
  styleUrls: ['./emoji-panel.component.scss'],
})
export class EmojiPanelComponent implements OnInit {
  constructor() {}
  @Input() score: {} = {};
  @Input() showEmojis: boolean = false;
  @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

  emojiList = {
    positive: ['😀', '😁', '😘', '😄'],
    negative: ['😟', '🙁', '😢', '😞'],
  };

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.onEmojiSelect.emit(emoji);
  }

  ngOnInit() {}
}
