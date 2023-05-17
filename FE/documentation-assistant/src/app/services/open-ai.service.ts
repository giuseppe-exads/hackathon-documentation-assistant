import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { filter, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  constructor() {}

  readonly configuration = new Configuration({
    apiKey: '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',
  });
  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string) {
    from(
      this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 256,
      })
    )
      .pipe(
        filter((resp) => !!resp && !!resp.data),
        map((resp) => resp.data),
        filter(
          (data: any) =>
            data.choices && data.choices.length > 0 && data.choices[0].text
        ),
        map((data) => data.choices[0].text)
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
