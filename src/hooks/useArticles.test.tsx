import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import configureStore from 'redux-mock-store';
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
    it('should load public data if no data from firebase', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
            (url: string) => {
                switch (url) {
                    case 'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products.json':
                        return Promise.reject(new Error('not found'));
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
        const mockToastSuccess = jest.spyOn(toast, 'success');
        const store = mockStore({ articles: [] });
        const { result } = renderUseArticles(store);
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
