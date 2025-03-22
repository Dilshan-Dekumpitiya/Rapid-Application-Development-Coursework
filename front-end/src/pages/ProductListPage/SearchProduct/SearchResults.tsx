import ProductCardSmall from '@/components/shared/card/ProductCardSmall';
import { CoffeeProduct } from '@/types';
import {useEffect, useState} from "react";

interface SearchResultsProps {
  coffees: CoffeeProduct[];
}

export default function SearchResults({ coffees }: SearchResultsProps) {
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {products?.map((coffee) => (
        <ProductCardSmall key={coffees._id} coffee={coffee} />
      ))}
    </div>
  );
}
