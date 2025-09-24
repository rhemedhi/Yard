import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PageNotFound from "../pages/PageNotFound";
import { UserProvider, UseUser } from "../context/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AppLayout from "../components/layouts/AppLayout";
import SearchProperty from "../pages/SearchProperty";
import ScrollToTop from "../utils/scrollToTop";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import CategoryPage from "../pages/CategoryPage";
import UpdatePassword from "../pages/UpdatePassword";
import PropertyPage from "../pages/PropertyPage";
import ListPropertyPage from "../pages/ListPropertyPage";
import PropertyDetails from "../features/listing/components/PropertyDetails";
import PropertyLocation from "../features/listing/components/PropertyLocation";
import PropertyImages from "../features/listing/components/PropertyImages";
import PropertySummary from "../features/listing/components/PropertySummary";
import { PropertyListProvider } from "../features/listing/context/PropertyListContext";
import PropertyAmenities from "../features/listing/components/PropertyAmenities";
import AuthorizeListingForm from "../utils/AuthorizeForm";
import Messages from "../pages/Messages";
import MessagesInbox from "../features/messaging/components/MessagesInbox";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";
import AccountAccessPage from "../pages/AccountAccessPage";


function AppRoutes() {
  return (
    <>
        <UserProvider>
            <PropertyListProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <AuthorizeListingForm />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/search" element={<SearchProperty />} />
                        <Route path="/account-access" element={<AccountAccessPage />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                        <Route path="/update-password" element={<UpdatePassword />}/>
                        <Route path="/category/:category" element={<CategoryPage />}/>
                        <Route path="/property/:propertyId" element={<PropertyPage />}/>

                        <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>} >
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/messages/:conversationId" element={<MessagesInbox />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />


                            {/* Property Listing Routes Start */}
                            <Route path="/list" element={<ListPropertyPage />} /> 
                            <Route path="/list/propertydetails" element={<PropertyDetails />} />
                            <Route path="/list/propertylocation" element={<PropertyLocation />} />
                            <Route path="/list/propertyamenities" element={<PropertyAmenities />} />
                            <Route path="/list/propertyimages" element={<PropertyImages />} />
                            <Route path="/list/propertysummary" element={<PropertySummary />} />
                            {/* Property Listing Routes End */}
                            
                        </Route>
                            
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </PropertyListProvider>
        </UserProvider>
    </>
  );
}

export default AppRoutes;
