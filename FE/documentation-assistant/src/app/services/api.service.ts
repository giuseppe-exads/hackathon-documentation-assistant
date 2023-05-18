import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { EndpointsConstants } from '../constants/endpoints.constant';
import { Observable, catchError, of, throwError } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
})
export class APIService {
    constructor(private httpClientService: HttpClient,
        private utilityService: UtilityService) { }

    getCategories(categoryLevel: number, categoryId?: number): Observable<Array<Category>> {
        const options = {
            params: new HttpParams()
                .set('categoryLevel', categoryLevel)
        };

        if (!this.utilityService.isNullOrUndefined(categoryId)) {
            options.params.set('category', <number>categoryId);
        }
        
        return this.httpClientService.get<Category[]>(
            EndpointsConstants.categories.categories, options)
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