import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { EMPTY, Observable, of } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class MockAPIService extends APIService {
    override getCategories(categoryLevel: number, categoryId?: number): Observable<Category[]> {
        switch (categoryLevel) {
            case 1:
                return of([{
                    id: 1,
                    name: 'Payments'
                },
                {
                    id: 2,
                    name: 'Campaigns'
                }] as Category[]);
            case 2:
                switch (categoryId) {
                    case 1:
                        return of([{
                            id: 3,
                            name: 'Checking your funds and spending',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#checking-your-funds-and-spending',
                            textDoc: 'To manage and monitor your funds and spending, click on the Payments tab.'
                        },
                        {
                            id: 4,
                            name: 'Making a payment in the Payments tab',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#making-a-payment-in-the-payments-tab',
                            textDoc: 'In the Make a payment panel at the top of the tab, you will see the available payment options for your network. You may see Debit/Credit Card, UnionPay, PayPal, Wire Transfer, Paxum, WebMoney, and Cryptocurrency options here if they are available. The Debit/Credit Card, UnionPay, PayPal, Paxum, WebMoney, and Cryptocurrency options are integrated into our system, so we are notified instantly that you have made a payment.'
                        }] as Category[]);
                    case 2:
                        return of([{
                            id: 3,
                            name: 'Creating campaigns',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#checking-your-funds-and-spending',
                            textDoc: 'To manage and monitor your funds and spending, click on the Payments tab.'
                        },
                        {
                            id: 4,
                            name: 'Updating campaigns',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#making-a-payment-in-the-payments-tab',
                            textDoc: 'In the Make a payment panel at the top of the tab, you will see the available payment options for your network. You may see Debit/Credit Card, UnionPay, PayPal, Wire Transfer, Paxum, WebMoney, and Cryptocurrency options here if they are available. The Debit/Credit Card, UnionPay, PayPal, Paxum, WebMoney, and Cryptocurrency options are integrated into our system, so we are notified instantly that you have made a payment.'
                        }] as Category[]);
                    default:
                        return EMPTY;
                }
            default:
                return EMPTY;
        }
    }

    override getCategory(categoryId: number): Observable<Category> {
        switch (categoryId) {
            case 1:
                return of({
                    id: 3,
                    name: 'Payments'
                });

            case 2:
                return of({
                    id: 3,
                    name: 'Campaigns'
                });

            case 3:
                return of({
                    id: 3,
                    name: 'Checking your funds and spending',
                    link: 'https://docs.exads.com/docs/advertiser-payments/#checking-your-funds-and-spending',
                    textDoc: 'To manage and monitor your funds and spending, click on the Payments tab.'
                });

            case 4:
                return of({
                    id: 4,
                    name: 'Making a payment in the Payments tab',
                    link: 'https://docs.exads.com/docs/advertiser-payments/#making-a-payment-in-the-payments-tab',
                    textDoc: 'In the Make a payment panel at the top of the tab, you will see the available payment options for your network. You may see Debit/Credit Card, UnionPay, PayPal, Wire Transfer, Paxum, WebMoney, and Cryptocurrency options here if they are available. The Debit/Credit Card, UnionPay, PayPal, Paxum, WebMoney, and Cryptocurrency options are integrated into our system, so we are notified instantly that you have made a payment.'
                });
        }
        return EMPTY;
    }
}