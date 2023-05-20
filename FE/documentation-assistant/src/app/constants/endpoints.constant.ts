import { environment } from "src/environments/environment";

export const EndpointsConstants = {
    categories: {
        categories: environment.endpoint_URL + 'categories',
        category: 'category'
    },
    subCategories: {
        subCategories: environment.endpoint_URL + 'subCategories'
    }
}