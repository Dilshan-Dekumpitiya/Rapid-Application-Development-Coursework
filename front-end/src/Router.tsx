import {Navigate, Route, Routes} from 'react-router-dom';
// Layouts
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
// Pages
import HomePage from '@/pages/HomePage';
import AdminHomePage from '@/pages/AdminHomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from "@/pages/SignUpPage.tsx";

export default function Router() {
		return (
				<Routes>
						<Route element={<AppLayout/>}>
								<Route path="/" element={<Navigate to="/login" />} />
								<Route path="/dashboard" element={<HomePage/>}/>
								<Route path="/products" element={<ProductListPage/>}/>
								<Route path="/orders" element={<OrderHistoryPage/>}/>
								<Route path="/orders/:id" element={<OrderDetailPage/>}/>
								<Route path="/profile" element={<ProfilePage/>}/>
								
                <Route path="/admin-home" element={<AdminHomePage/>}/>
								{/* 404 */}
								<Route path="*" element={<NotFoundPage/>}/>
						</Route>
						{/* Auth */}
						<Route element={<AuthLayout/>}>
								<Route path="/login" element={<LoginPage/>}/>
								<Route path="/sign-up" element={<SignUpPage/>}/>
						</Route>
				</Routes>
		);
}
