import { Product } from '../interfaces/interfaces';
import bufanda from '../assets/bufanda.png';
import zapato from '../assets/zapato.png';
import gorra from '../assets/gorra.png';
import abrigo from '../assets/abrigo.png';

export const initialArticle: Product = {
    category: '',
    description: '',
    id: '',
    image: '',
    price: 0,
    title: '',
};

export const articulos: Array<Product> = [
    {
        category: 'Cualquiera',
        description: 'Un articulo mÃ¡s',
        id: '01',
        image: zapato,
        price: 75,
        title: 'Zapato',
    },

    {
        category: 'Cualquiera',
        description: 'Un articulo mÃ¡s',
        id: '02',
        image: bufanda,
        price: 25,
        title: 'Bufanda',
    },

    {
        category: 'Cualquiera',
        description: 'Un articulo mÃ¡s',
        id: '01',
        image: gorra,
        price: 55,
        title: 'Gorra',
    },

    {
        category: 'Cualquiera',
        description: 'Un articulo mÃ¡s',
        id: '01',
        image: abrigo,
        price: 120,
        title: 'abrigo',
    },
];
