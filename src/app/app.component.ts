import { Component } from '@angular/core';
import { GptService } from './service/gpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  generatedText!: string;
  messages: any[] = [
    { content: 'Hello! How can I help you today?', isFromUser: false },
  ];
  newMessageContent: string = '';

  async sendMessage() {
    if (this.newMessageContent) {
      this.messages.push({
        content: this.newMessageContent,
        isFromUser: true,
      });
      // Call your Chatbot API or Backend Service to get response
      // Append the response message to messages array
      await this.gptService
        .generateText(this.newMessageContent)
        .subscribe((response: any) => {
          //

          if (response?.data) {
            this.generatedText = response.data[0].url;
            this.messages.push({
              img: this.generatedText,
              isFromUser: false,
            });
          } else {
            this.generatedText = response.choices[0].text;
            this.messages.push({
              content: this.generatedText,
              isFromUser: false,
            });
          }
        });

      this.newMessageContent = '';
    }
  }

  constructor(private gptService: GptService) {}

  generateText() {}
}
