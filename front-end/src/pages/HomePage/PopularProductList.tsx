import { useEffect, useState } from 'react';
import ProductCardBgImage from '@/components/shared/card/ProductCardBgImage';
import CategoryTitle from './CategoryTitle';

export default function PopularProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/product/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="mt-6">
            <CategoryTitle>Popular Drink</CategoryTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product) => (
                    <ProductCardBgImage key={product._id} coffee={product} />
                ))}
            </div>
        </div>
    );
}
