import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { FunctionComponent, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { useArticles } from './useArticles';

interface WrapperProps {
    children: ReactNode;
}

jest.mock('react-toastify');
jest.mock('axios');

const mockStore = configureStore([thunk]);

beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockClear();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockClear();
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockClear();
});

const renderUseArticles = (store: ReturnType<typeof mockStore>) => {
    const wrapper = ({ children }: WrapperProps) => (
        <Provider store={store}>{children}</Provider>
    );
    return renderHook(() => useArticles(), {
        wrapper,
    });
};

describe('getData', () => {
    let mockToastSuccess: jest.SpyInstance;
    let store: MockStore;
    let wrapper: FunctionComponent<WrapperProps>;

    beforeEach(() => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockImplementation(
            (url: string) => {
                switch (url) {
                    case 'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products.json':
                        return Promise.resolve({ status: 200 });
                    case 'https://fakestoreapi.com/products':
                        return Promise.resolve({
                            status: 200,
                            data: mockData,
                        });
                    default:
                        return Promise.reject(new Error('not found'));
                }
            }
        );
        mockToastSuccess = jest.spyOn(toast, 'success');
        store = mockStore({ articles: [] });
        wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
    });

    it('should load public data if no data from firebase', async () => {
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getData();
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(mockToastSuccess).toHaveBeenCalled();
    });

    it('should load data from firebase', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockImplementation(
            (url: string) => {
                switch (url) {
                    case 'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products.json':
                        return Promise.resolve({
                            status: 200,
                            data: firebaseApiRes.data,
                        });
                    case 'https://fakestoreapi.com/products':
                        return Promise.resolve({
                            status: 200,
                            data: mockData,
                        });
                    default:
                        return Promise.reject(new Error('not found'));
                }
            }
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getData();
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(mockToastSuccess).toHaveBeenCalled();
    });
});

describe('CreateArticle', () => {
    it('should fetch articles data successfully', async () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValueOnce({ status: 200 });
        const mockToastSuccess = jest.spyOn(toast, 'success');
        const store = mockStore({ articles: mockData });
        const { result } = renderUseArticles(store);
        // Create Article
        expect(result.current.createArticle).toBeDefined();
        const success = await result.current.createArticle(
            'John Doe',
            mockData[1]
        );
        expect(success).toBe(true);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(mockToastSuccess).toHaveBeenCalledTimes(1);
    });

    it('Should show error on fail', async () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValueOnce({ status: 201 });
        const mockToastError = jest.spyOn(toast, 'error');
        const store = mockStore({ articles: mockData });
        const { result } = renderUseArticles(store);
        result.current.getData();
        expect(axios.get).toHaveBeenCalledTimes(1);
        const success = await result.current.createArticle(
            'John Doe',
            mockData[1]
        );
        expect(success).toBe(false);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(mockToastError).toHaveBeenCalled();
    });
});

describe('addFav', () => {
    it('Should show error on fail', async () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValueOnce({ status: 201 });
        const mockToastError = jest.spyOn(toast, 'error');
        const store = mockStore({ articles: mockData });
        const wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getData();
        await result.current.addFav(mockData[1], 'John Doe');
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(mockToastError).toHaveBeenCalled();
    });
    it('Should show success response', async () => {
        (
            axios.post as jest.MockedFunction<typeof axios.post>
        ).mockResolvedValueOnce({ status: 200 });
        const mockToastSuccess = jest.spyOn(toast, 'error');
        const store = mockStore({ articles: mockData });
        const wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        result.current.getData();
        expect(axios.get).toHaveBeenCalledTimes(1);
        await result.current.addFav(mockData[1], 'John Doe');
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(mockToastSuccess).toHaveBeenCalledTimes(1);
    });
});
describe('getFav', () => {
    it('Should show success response', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
            data: mockData,
        });
        const store = mockStore({ articles: mockData });
        const wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getFav('1');
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
describe('deleteArticle', () => {
    it('Should show error on fail', async () => {
        (
            axios.delete as jest.MockedFunction<typeof axios.delete>
        ).mockRejectedValueOnce({ statusText: 'article deleted' });
        const mockToastError = jest.spyOn(toast, 'error');
        const store = mockStore({ articles: mockData });
        const wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getData();
        await result.current.deleteArticle('1');
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(mockToastError).toHaveBeenCalled();
    });
    it('Should show error on failing', async () => {
        (
            axios.delete as jest.MockedFunction<typeof axios.delete>
        ).mockResolvedValueOnce({ status: 200 });
        const mockToastSSuccess = jest.spyOn(toast, 'success');
        const store = mockStore({ articles: mockData });
        const wrapper = ({ children }: WrapperProps) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook(() => useArticles(), {
            wrapper,
        });
        await result.current.getData();
        await result.current.deleteArticle('1');
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(mockToastSSuccess).toHaveBeenCalled();
    });
});
const mockData = [
    {
        id: '1',
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
        id: '2',
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description:
            'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    },
];
const firebaseApiRes = {
    data: {
        NPPDCm0G7wMeTGnC22s: {
            autor: 'Y4ItE1Y7FYOZcD4Fj9tuSrGKfAT2',
            category: 'ropa',
            description: 'abrigo marron ',
            id: '',
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clara.es%2Fmedio%2F2020%2F10%2F24%2Fabrigo-camel_b4591163_800x1143.jpg&f=1&nofb=1&ipt=38deac24d6f17b8f4c0cb58f5a865cf9cff3408eda4324074fb77c8b91fb164f&ipo=images',
            name: '',
            price: '13',
            title: 'abrigo',
        },
    },
};
