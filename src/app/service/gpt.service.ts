import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  API_KEY: any = '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';

  private apiUrl = 'https://api.openai.com/v1/';

  constructor(private http: HttpClient) {}

  generateText(prompt: string) {
    const findquestion = prompt.search(/image/i);

    console.log(findquestion);

    const body = {
      model: 'text-davinci-003',
      // prompt: prompt,
      // max_tokens: 7,
      // temperature: 0,
      ////////////////////
      // images/generations//
      // prompt: prompt,
      // n: 2,
      // size: '1024x1024',
      ///////////////////////

      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    };

    const imgBody = {
      prompt: prompt,
      n: 2,
      size: '1024x1024',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.API_KEY,
      'OpenAI-Organization': 'org-5DyjaYGwATZfsktzh0bRjVXg',
    });

    if (findquestion == -1) {
      return this.http.post(this.apiUrl + 'completions', body, {
        headers: headers,
      });
    } else {
      return this.http.post(this.apiUrl + 'images/generations', imgBody, {
        headers: headers,
      });
    }
  }
}
