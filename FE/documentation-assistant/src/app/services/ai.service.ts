import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable, concat, map, of, switchMap } from 'rxjs';
import { OpenAiService } from './open-ai.service';
import { MockAPIService } from './mock-api.service';

@Injectable({
    providedIn: 'root',
})
export class AIService {
    constructor(
        private openAIService: OpenAiService,
        private apiService: MockAPIService) { }

    makeStep1(messageFromUser: string): Observable<string> {
        return this.apiService.getCategories(1)
            .pipe(
                switchMap((categories) => {
                    const cats = categories.map((category) => `"${category.name}"`);
                    const messageToSend =
                        `ChatGPT, could you return me one of the next labels, ${cats.join(',')}, that you can assign to the next sentence, "${messageFromUser}"?`;

                    return this.openAIService.getDataFromOpenAI(messageToSend);
                })
            );
    }

    makeStep1_(messageFromUser: string): Observable<string> {
        return this.apiService.getCategories(1)
            .pipe(
                switchMap((categories) => {
                    const cats = categories.map((category) => `"${category.name}"`);
                    const messageToSend =
                        `ChatGPT, could you return me one of the next labels, ${cats.join(',')}, that you can assign to the next sentence, "${messageFromUser}"?`;
                    return this.openAIService.getDataFromOpenAI(messageToSend)
                        .pipe(
                            switchMap((messageFromChatGPT) => {

                                const category = categories.find(cat => messageFromChatGPT.includes(cat.name));
                                return this.apiService.getCategories(2, category?.id)
                                    .pipe(
                                        map((subCategories) => {
                                            let msg = `Dear user I've undestood that you are searching about ${category?.name}. <br>Could you select one of the next options:`;
                                            msg = msg.concat('<ul>');

                                            subCategories.forEach(
                                                (subC => {
                                                    msg = msg.concat('<li>', subC.name, '</li>');
                                                })
                                            )
                                            msg = msg.concat('</ul>')

                                            return msg;
                                        })
                                    )
                            }
                            ))
                })
            );
    }

    makeStep2(category: Category): Observable<string> {
        return this.apiService.getCategories(2, category.id)
            .pipe(
                map(categories => {
                    return `Dear user I've undestood that you are searching about ${category.name}.
                    Could you select one of the next options, ${categories.join(',')} ?`
                })
            );
    }
}