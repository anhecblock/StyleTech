export interface Product {
    id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

export interface ArticleFromDb extends Product {
    name: string;
    autor: string;
}

export interface UiData {
    isLoading: boolean;
}
