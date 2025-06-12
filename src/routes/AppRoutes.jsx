import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PageNotFound from "../pages/PageNotFound";
import { UserProvider, UseUser } from "../context/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AppLayout from "../components/layouts/AppLayout";
import SearchProperty from '../components/ui/SearchProperty';
import ListProperty from '../components/ui/ListProperty';
import Messages from '../components/ui/Messages';
import Profile from '../components/ui/Profile';
import AccountAccessPage from "../components/ui/AccountAccessPage";


function AppRoutes() {
  return (
    <>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/search" element={<SearchProperty />} />
                    <Route path="/account-access" element={<AccountAccessPage />} />
                    <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>} >
                        <Route path="/list" element={<ListProperty />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    </>
  );
}

export default AppRoutes;
