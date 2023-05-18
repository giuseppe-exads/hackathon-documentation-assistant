import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { Observable, filter, from, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  constructor() {}

  readonly configuration = new Configuration({
    apiKey: environment.open_AI_API_KEY,
  });
  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string): Observable<string> {
    return from(
      this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text.replace('\n', '').trim(),
        max_tokens: 256
      })
    ).pipe(
      filter((resp) => !!resp && !!resp.data),
      map((resp) => resp.data),
      filter(
        (data: any) =>
          data.choices && data.choices.length > 0 && data.choices[0].text
      ),
      map((data) => data.choices[0].text)
    );
  }
}
