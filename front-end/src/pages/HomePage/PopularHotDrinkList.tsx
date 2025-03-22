// import { useProduct } from '@/hooks/useProduct';
import PopularCategoryList from './PopularCategoryList';
import {useEffect, useState} from "react";

export default function PopularHotDrinkList() {
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

  return (
    <PopularCategoryList
      title="Popular Hot Drink"
      coffees={products?.slice(0, 4)}
    />
  );
}
