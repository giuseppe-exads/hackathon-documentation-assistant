import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable, concat, map, of, switchMap } from 'rxjs';
import { OpenAiService } from './open-ai.service';
import { MockAPIService } from './mock-api.service';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
})
export class AIService {
    constructor(
        private openAIService: OpenAiService,
        private apiService: MockAPIService,
        private utilityService: UtilityService) { }

    makeStep1(messageFromUser: string): Observable<string> {
        return this.apiService.getCategories(1)
            .pipe(
                switchMap((categories) => {
                    const cats = categories.map((category) => `"${category.name}"`);
                    const messageToSend =
                        `ChatGPT, could you return me one of the next labels, ${cats.join(',')}, that you can assign to the next sentence, "${messageFromUser}"?
                        if you don't find any label return "No detected" into the JSON after defined. 
                        The label will be returned using a JSON format of this type { "label": string } into the "label" property and no extra text`;
                    return this.openAIService.getDataFromOpenAI(messageToSend)
                        .pipe(
                            switchMap((messageFromChatGPT) => {
                                const result = JSON.parse(messageFromChatGPT.trim().replace('.\n\n', '')) as { label: string };
                                const category = categories.find(cat => cat.name === result.label);

                                if (!this.utilityService.isNullOrUndefined(category)) {
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
                                        );
                                    } else {
                                        return of(`Dear user, I\'m sorry but I can\'t help you. Navigate to...`);
                                    }
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