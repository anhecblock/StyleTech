import { useState } from 'react';
import { Product } from '../App/App';
import './ArticleFormStyle.css';

const initialArticle: Product = {
    image: '',
    category: '',
    description: '',
    id: '',
    price: 0,
    title: '',
};

const ArticleForm = (): JSX.Element => {
    const [article, setArticle] = useState(initialArticle);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, [event.target.id]: event.target.value });
    };
    return (
        <div className="create">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log(article);
                }}
            >
                <h1>Create Article</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="title"
                    type="text"
                    value={article.title}
                    onChange={handleChange}
                />

                <label htmlFor="image">Image Url</label>
                <input
                    id="image"
                    type="text"
                    value={article.image}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    value={article.description}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    value={article.price}
                    onChange={handleChange}
                />

                <label htmlFor="category">Cateogry</label>
                <input
                    id="category"
                    type="text"
                    value={article.category}
                    onChange={handleChange}
                />
                <button>Create</button>
            </form>
        </div>
    );
};

export default ArticleForm;
