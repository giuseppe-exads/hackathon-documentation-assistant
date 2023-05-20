import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { EndpointsConstants } from '../constants/endpoints.constant';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
})
export class APIService {
    constructor(private httpClientService: HttpClient,
        private utilityService: UtilityService) { }

    getCategoriesFromUI(categoryLevel: number, relatedCategory?: string): Observable<Array<Category>> {
        if (categoryLevel === 1) {
            return this.getCategories(1);
        } else if (categoryLevel === 2 && relatedCategory) {
            return this.getSubCategories(1, relatedCategory);
        } else {
            return EMPTY;
        }
    }

    getCategories(categoryLevel: number, categoryId?: number): Observable<Array<Category>> {
        return this.httpClientService.get<Category[]>(
            EndpointsConstants.categories.categories)
            .pipe(catchError((error: any) => of(error)));
    }

    getSubCategories(categoryLevel: number, relatedCategory: string): Observable<Array<Category>> {
        return this.httpClientService.get<Category[]>(
            EndpointsConstants.subCategories.subCategories + '/' + relatedCategory)
            .pipe(catchError((error: any) => of(error)));
    }
    

    getCategory(categoryId: number): Observable<Category> {
        const options = { params: new HttpParams().set('categoryId', categoryId) };

        return this.httpClientService.get<Category>(
            EndpointsConstants.categories.category, options)
            .pipe(catchError((error: any) => of(error)));
    }

    addCategory(category: Category): Observable<Category> {
        return this.httpClientService.post<Category>(
            EndpointsConstants.categories.category, category)
            .pipe(catchError((error: any) => of(error)));
    }

    updateCategory(category: Category): Observable<Category> {
        return this.httpClientService.put<Category>(
            EndpointsConstants.categories.category, category)
            .pipe(catchError((error: any) => of(error)));
    }

    deleteCategory(category: Category): Observable<Category> {
        const options = { params: new HttpParams().set('categoryId', category.id) };
        return this.httpClientService.delete<Category>(
            EndpointsConstants.categories.category, options)
            .pipe(catchError((error: any) => of(error)));
    }
}