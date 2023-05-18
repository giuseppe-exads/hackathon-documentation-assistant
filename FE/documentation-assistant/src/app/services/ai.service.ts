import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { EMPTY, Observable, concat, map, of, switchMap } from 'rxjs';
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

    makeStep(messageFromUser: string): Observable<Category[]> {
        return this.apiService.getCategories(1)
            .pipe(
                switchMap((categories) => {
                    const cats = categories.map((category) => `"${category.name}"`);
                    const messageToSend =
                        `ChatGPT, could you return me one of the next labels, ${cats.join(',')}, that you can assign to the next sentence, "${messageFromUser}"?
                        if you don't find any label return "No detected"`;
                    return this.openAIService.getDataFromOpenAI(messageToSend)
                        .pipe(
                            switchMap((messageFromChatGPT) => {
                                const category = categories.find(cat => messageFromChatGPT.includes(cat.name));

                                if (!this.utilityService.isNullOrUndefined(category)) {
                                    return this.apiService.getCategories(2, category?.id)
                                } else {
                                    return EMPTY;
                                }
                            }
                            ))
                })
            );
    }

    translate(message: string, language: string): Observable<String> {
        const messageToSend = `ChatGPT, please return only the next message translated into ${language}. Message: "${message}"`;
        return this.openAIService.getDataFromOpenAI(messageToSend);
    }
}