// import { useProduct } from '@/hooks/useProduct';
import ProductsByCategory from './ProductsByCategory';
import {useEffect, useState} from "react";

export default function HotDrinkList() {
  // Product Provider
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/product/products/hot');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return <ProductsByCategory title="Hot Drink" coffees={products} />;
}
