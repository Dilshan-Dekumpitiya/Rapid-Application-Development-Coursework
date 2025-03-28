import SearchProduct from './SearchProduct';
import HotDrinkList from './HotDrinkList';
import ColdDrinkList from './ColdDrinkList';

export default function ProductListPage() {
  return (
    <div className="p-3 bg-primary-50">
      <SearchProduct />
      <HotDrinkList />
      <ColdDrinkList />
    </div>
  );
}
