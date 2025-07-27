import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage.tsx';
import SignUpPage from './pages/SignUp/SignUpPage.tsx';
import './App.css';
import HomePage from './pages/Home/HomePage.tsx';
import DashboardLayout from './pages/Dashboard/DashboardLayout.tsx';
import MyAds from './pages/Dashboard/MyAds.tsx';
import Placeholder from './pages/Dashboard/Placeholder.tsx';
import ProfileSettings from './pages/Dashboard/ProfileSettings.tsx';
import AdCategoryPage from './pages/AdCategory/AdCategoryPage.tsx';
import { ProfileProvider } from './context/ProfileContext.tsx';
import AboutUs from './pages/AboutUs/AboutUs.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.tsx';
import TermsConditions from './pages/TermsConditions/TermsConditions.tsx';
import ContactUs from './pages/ContactUs/ContactUs.tsx';
import SafetyTips from './pages/SafetyTips/SafetyTips.tsx';
import FAQ from './pages/FAQ/FAQ.tsx';
import Blog from './pages/Blog/Blog.tsx';
import IntellectualProperty from './pages/IntellectualProperty/IntellectualProperty.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category/:categoryName" element={<AdCategoryPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/safety" element={<SafetyTips />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/intellectual-property" element={<IntellectualProperty />} />
      <Route
        path="/dashboard"
        element={
          <ProfileProvider>
            <DashboardLayout />
          </ProfileProvider>
        }
      >
        <Route index element={<Placeholder title="Dashboard" />} />
        <Route path="my_ads" element={<MyAds />} />
        <Route path="favourite_ads" element={<Placeholder title="Favourite Ads" />} />
        <Route path="messages" element={<Placeholder title="Messages" />} />
        <Route path="profile_settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
