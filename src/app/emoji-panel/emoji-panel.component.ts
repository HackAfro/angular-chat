import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji-panel',
  templateUrl: './emoji-panel.component.html',
  styleUrls: ['./emoji-panel.component.scss'],
})
export class EmojiPanelComponent implements OnInit {
  constructor() {}
  @Input() result: {} = {};
  @Input() showEmojis: boolean = false;
  @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

  emojiList = {
    positive: ['😀', '😁', '😘', '😄'],
    neutral: ['😐', '😑', '😶', '🤔'],
    negative: ['😟', '🙁', '😢', '😞'],
  };

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.onEmojiSelect.emit(emoji);
  }

  ngOnInit() {}
}
