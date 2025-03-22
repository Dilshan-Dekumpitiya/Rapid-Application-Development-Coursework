import { Link } from 'react-router-dom';
import { APP_NAME } from '@/constants/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t mt-8">
      <div className="w-full mx-auto">
        <div className="w-full max-w-screen-lg md:flex md:justify-between p-4 py-6 lg:py-8 mx-auto">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center text-primary">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {APP_NAME}
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="p-2 mx-auto">
          <p className="text-sm text-gray-500 text-center">
            {'© 2025'}
            <Link to="/" className="hover:underline">
              {APP_NAME}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
