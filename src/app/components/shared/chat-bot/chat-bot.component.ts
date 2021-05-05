import { Component, OnInit } from '@angular/core';

import { Interactions } from 'aws-amplify';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  conversation: Array<object>;
  message: any;
  waitingMsg: boolean;
  chatStart: any;

  constructor() {
    this.conversation = [];
    this.waitingMsg = false;
    this.chatStart = '';
  }

  ngOnInit(): void {
    $('.chat-bot-icon').on('click', (e) => {
      $(this).children('img').toggleClass('hide');
      $(this).children('svg').toggleClass('animate');
      $('.chat-screen').toggleClass('show-chat');
      this.chatStart = moment().format('MMMM Do YYYY, h:mm A');
    });
    $('.end-chat').on('click', (e) => {
      $('.chat-bot-icon').children('img').toggleClass('hide');
      $('.chat-bot-icon').children('svg').toggleClass('animate');
      $('.chat-screen').toggleClass('show-chat');
    });
  }

  async startChat() {
    if (this.message) {
      const tempMsg = this.message;
      const chatBody = document.getElementsByClassName('chat-body')[0];
      this.conversation.push({
        from: 'user',
        msg: this.message,
      });
      setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      });
      this.message = '';
      this.waitingMsg = true;
      var response = await Interactions.send('CBI_Test_Nonp', tempMsg.toString());
      if (response && response.message) {
        this.waitingMsg = false;
        this.conversation.push({ from: 'bot', msg: response.message });
        setTimeout(() => {
          chatBody.scrollTop = chatBody.scrollHeight;
        });
      }
    }
  }
}
