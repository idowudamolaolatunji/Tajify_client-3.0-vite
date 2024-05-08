import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './utils/protectedRoutes';

import Login from "./auth/Login";
import OtpAuth from "./auth/OtpAuth";
import Register from "./auth/Register";

import HomePage from "./pages/HomePage";
import BlogsSection from "./pages/BlogsSection";
import BlogEditor from './pages/BlogEditor';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogCategory from './pages/BlogCategory';

import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import Channels from './pages/Channels';
import Market from './pages/Market';
import MarketProduct from './pages/MarketProduct';
import MarketProductUpload from './pages/MarketProductUpload';
import MarketCart from "./pages/MarketCart";
import MarketCategory from "./pages/MarketCategory";
import PublicProfile from './pages/PublicProfile';
import PrivateProfile from './pages/PrivateProfile';


// import LiveStream from "./pages/Channels/LiveStream";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/wallet" element={<Wallet />}></Route>
                    <Route path="/settings" element={<Settings />}></Route>
                    <Route path="/write-post" element={<BlogEditor />}></Route>
                    <Route path="/public-profile" element={<PublicProfile />}></Route>
                    <Route path="/my-profile" element={<PrivateProfile />}></Route>
                </Route>


                {/* UNPROTECTED ROUTES */}
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/verify-otp" element={<OtpAuth />}></Route>
                <Route path="/signup" element={<Register />}></Route>

                <Route path="/blogs" element={<BlogsSection />}></Route>
                <Route path="/blogs/:blogSlug" element={<BlogDetailPage />}></Route>
                <Route path="/blogs/category/:category" element={<BlogCategory />}></Route>

                <Route path="/market" element={<Market />}></Route>
                <Route path="/market/upload" element={<MarketProductUpload />}></Route>
                <Route path="/market/:productSlug" element={<MarketProduct />}></Route>
                <Route path="/market/category/:categorySlug/:categoryName" element={<MarketCategory />}></Route>
                <Route path="/market/cart" element={<MarketCart />}></Route>

                <Route path="/channel" element={<Channels />}></Route>
                {/* <Route path="/live/:roomId" element={<LiveStream />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
