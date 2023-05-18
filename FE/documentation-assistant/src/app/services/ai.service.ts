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

    makeStep(messageFromUser: string): Observable<string> {
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

    makeStepNew1(messageFromUser: string): Observable<Category[]> {
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

    makeStepNew(messageFromUser: string): Observable<Category> {
        return this.apiService.getCategories(1)
            .pipe(
                switchMap((categories) => {
                    const cats = categories.map((category) => `"${category.name}"`);

                    const messageToSend = `Chatgpt could you find one label among the next ones that can be assigned to the next sentence? The Label to return will be "No detected" in case any label will be found. Labels: ${cats.join(',')}. Sentence:"${messageFromUser}"`;
                    return this.openAIService.getDataFromOpenAI(messageToSend)
                        .pipe(
                            switchMap((messageFromChatGPT) => {
                                const category = categories.find(cat => messageFromChatGPT.includes(cat.name));

                                if (!this.utilityService.isNullOrUndefined(category)) {
                                    return this.apiService.getCategories(2, category?.id)
                                        .pipe(
                                            switchMap((subCategories) => {
                                                const subCats = subCategories.map((category) => `"${category.name}"`);

                                                const messageToSend = `Chatgpt could you find one label among the next ones that can be assigned to the next sentence? The Label to return will be "No detected" in case any label will be found. Labels: ${subCats.join(',')}, "${category?.name}". Sentence:"${messageFromUser}"`;

                                                return this.openAIService.getDataFromOpenAI(messageToSend)
                                                    .pipe(
                                                        map((messageFromChatGPT) => {
                                                            subCategories.push(<Category>category);

                                                            const categoryToReturn = subCategories.find(cat => messageFromChatGPT.includes(cat.name));

                                                            return <Category>categoryToReturn;
                                                        })
                                                    )
                                            })
                                        )

                                } else {
                                    //return of(`Dear user, I\'m sorry but I can\'t help you. Navigate to...`);
                                    return [{ id: -1, name: 'No Detected' }] as Category[];
                                }
                            }
                            ))
                })
            );
    }

    makeOptionsStep(category: Category): Observable<string> {
        return this.apiService.getCategories(2, category.id)
            .pipe(
                map(categories => {
                    return `Dear user I've undestood that you are searching about ${category.name}.
                    Could you select one of the next options, ${categories.join(',')} ?`
                })
            );
    }

    makeDocumentationStep(category: Category): Observable<string> {
        return this.apiService.getCategories(2, category.id)
            .pipe(
                map(categories => {
                    return `Dear user I've undestood that you are searching about ${category.name}.
                    Could you select one of the next options, ${categories.join(',')} ?`
                })
            );
    }
}