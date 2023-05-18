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
                    name: 'Responsive Display Ads'
                },
                {
                    id: 18,
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
                        },
                        {
                            id: 5,
                            name: 'Downloading and printing PDFs of your invoices',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#downloading-and-printing-pdfs-of-your-invoices',
                            textDoc: 'To download or print PDFs of your invoices, click on the Total on the right side of the screen, and then click the View button. You will then see a PDF of the invoice. Click DOWNLOAD PDF to save a copy to your computer and click PRINT to print it.',
                        },
                        {
                            id: 6,
                            name: 'Available Payment types',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#available-payment-types',
                            textDoc: 'We support the following payments - You may see Debit/Credit Card, UnionPay, PayPal, Wire Transfer, Paxum, WebMoney, and  Cryptocurrency in the Payments tab To enhance your experience, we also have automatic payments for Credit/Debit cards - This option will automatically top up your balance by the chosen amount when it falls below a set amount of units of currency (Dollars or Euros).',
                        },
                        {
                            id: 7,
                            name: 'Debit/Credit Card',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#debitcredit-card',
                            textDoc: 'We have two providers for card payments: Shift4, SafeCharge. We also have automatic payments - This option will automatically top up your balance by the chosen amount when it falls below a set amount of units of currency (Dollars or Euros).                            ',
                        },
                        {
                            id: 8,
                            name: 'UnionPay',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#unionpay',
                            textDoc: 'If you select UnionPay to make a payment, you can use your UnionPay card to add funds to your account. You can simply select an amount to recharge your account with and you will be redirected to the UnionPay interface to complete the checkout process securely.',
                        },
                        {
                            id: 9,
                            name: 'Wire Transfer',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#wire-transfer',
                            textDoc: 'Send us a notification that you have sent a wire transfer payment. Fill in Sender Name, Amount, and Currency. When you add the details, a proforma will be created for you. When funds reach us, it will automatically be changed to an invoice.  A "Reference ID" will be generated when a Wire Transfer Proforma is created. Be sure to use this Reference ID number when sending your Wire Transfer. This ensures the payment will be located faster and avoid missing payments.',
                        },
                        {
                            id: 10,
                            name: 'Cryptocurrency',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#cryptocurrency',
                            textDoc: 'Send us a notification that you are about to send a USDC crypto payment to the blockchain address provided. Fill in the required Amount and click the SEND NOTIFICATION button. Once done, a proforma will be created. When the funds reach us, the proforma will automatically be changed to an invoice and the funds added to the your account. Funds will be converted from USDC to the currency you originally selected when setting up your Admin Panel.',
                        },
                        {
                            id: 11,
                            name: 'WebMoney',
                            link: 'https://docs.exads.com/docs/advertiser-payments/#webmoney',
                            textDoc: 'Select an amount from the drop-down to recharge your account by.',
                        }] as Category[]);
                    case 2:
                        return of([{
                            id: 12,
                            name: 'What are Responsive Display Ads?',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_7031358505511681387280045',
                            textDoc: 'Responsive Display Ads, or RDAs are used by advertisers and publishers as the default ad format on the Google Ads Display Network. An RDA is a banner ad that automatically adapts its size, format and appearance to fit any standard IAB banner display ad placement.'
                        },
                        {
                            id: 13,
                            name: 'EXADS RDA Ad Network Experience',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_825721216371681387288984',
                            textDoc: 'RDAs can help to deliver more effective and engaging ads to audiences, while also simplifying the ad creation and management process for advertisers and publishers. Responsive Display Ads offer multiple benefits to ad platform owners, such as: Increased reach, Better performance, Simplified ad creation, Improved user experience, Increased banner inventory sales, No setup required.'
                        },
                        {
                            id: 14,
                            name: 'EXADS RDAs Publisher Experience',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_7644490877221681387304602',
                            textDoc: 'The Responsive Display Ads feature offered by EXADS brings a variety of advantages for publishers and the opportunity of increasing revenues. Due to an intuitive user interface, the complexity of using RDAs is kept to a minimum. As long as the feature is enabled on the ad server, any publisher can benefit from it.'
                        },
                        {
                            id: 15,
                            name: 'Benefits of Responsive Display Ads for publishers',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_7691965448061681387313252',
                            textDoc: 'Responsive Display Ads offer multiple benefits to publishers, such as: Attracts more advertisers to bid on ad zones, aligned with the IAB industry standards and Google, a great end user experience, qualified clicks means higher eCPM, Easy to enable'
                        },
                        {
                            id: 16,
                            name: 'EXADS RDA Advertiser Experience',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_8666297328891681387323989',
                            textDoc: 'The EXADS platform is packed with creative tools for advertiser clients to optimize their campaigns and generate the maximum number of conversions. Let’s have an overview of the benefits that using the platform’s Responsive Display Ads can offer to your advertisers clients.'
                        },
                        {
                            id: 17,
                            name: 'Benefits of Responsive Display Ads for advertisers',
                            link: 'https://www.exads.com/blog/ad-serving-benefits-of-responsive-display-ads#h_2464458569711681387333032',
                            textDoc: 'Responsive Display Ads offer multiple benefits to advertisers, such as: easy RDA campaign setup, launching campaigns quickly, cost-effective, save time, increasing data for optimization'
                        },
                        ] as Category[]);
                    case 18:
                        return of([{
                            id: 19,
                            name: 'Creating campaigns',
                            link: 'https://docs.exads.com/docs/create-campaign-step1/',
                            textDoc: 'To start testing your traffic , you must create a campaign. To do this, from the main screen of the Admin Panel, click on Campaigns, then Campaigns List, and select New Campaign. There are four main steps that you will follow to create the campaign, and you will proceed through them from left to right.'
                        },
                        {
                            id: 20,
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