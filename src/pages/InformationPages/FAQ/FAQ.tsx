import React, { useState } from 'react';
import { useSEO } from '../../../hooks/useSEO';
import MainLayout from '../../MainLayout';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import './FAQ.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  useSEO({
    customTitle: 'Frequently Asked Questions - JazaMarket',
    customDescription: 'Find answers to common questions about using JazaMarket, Kenya\'s leading online marketplace for buying and selling.',
    ogUrl: window.location.href,
  });

  const faqData: FAQItem[] = [
    // Getting Started
    {
      id: 1,
      question: "How do I create an account on JazaMarket?",
      answer: "Creating an account is easy! Click on 'Sign Up' in the top right corner, fill in your details including name, email, and phone number, then verify your email address. You'll be ready to start buying and selling immediately.",
      category: "getting-started"
    },
    {
      id: 2,
      question: "Is it free to use JazaMarket?",
      answer: "Yes, basic registration and posting ads on JazaMarket is completely free. We offer premium features for enhanced visibility and additional tools, but you can successfully buy and sell without any cost.",
      category: "getting-started"
    },
    {
      id: 3,
      question: "What can I sell on JazaMarket?",
      answer: "You can sell almost anything legal including vehicles, electronics, property, household items, fashion, services, and more. We have 18+ categories to choose from. Items must comply with our terms of service and Kenyan laws.",
      category: "getting-started"
    },

    // Posting Ads
    {
      id: 4,
      question: "How do I post an ad?",
      answer: "After logging in, click 'Post Ad' button, select the appropriate category, fill in your item details, add photos, set your price, and publish. Your ad will be live immediately and visible to millions of users.",
      category: "posting"
    },
    {
      id: 5,
      question: "How many photos can I upload?",
      answer: "You can upload up to 10 high-quality photos per ad. We recommend using clear, well-lit images that show your item from different angles to attract more buyers.",
      category: "posting"
    },
    {
      id: 6,
      question: "How long do ads stay active?",
      answer: "Free ads remain active for 30 days. You can renew them for free before they expire. Premium ads may have longer durations depending on the package you choose.",
      category: "posting"
    },
    {
      id: 7,
      question: "Can I edit or delete my ad after posting?",
      answer: "Yes, you can edit your ad anytime from your dashboard. You can update the price, description, photos, or mark it as sold. You can also delete ads you no longer need.",
      category: "posting"
    },

    // Buying
    {
      id: 8,
      question: "How do I contact a seller?",
      answer: "Click on any ad to view the seller's contact information. You can call or text them directly using the provided phone number. Some sellers also accept messages through our platform.",
      category: "buying"
    },
    {
      id: 9,
      question: "Is it safe to buy from JazaMarket?",
      answer: "JazaMarket provides a platform for buyers and sellers to connect. We recommend following our safety guidelines: meet in public places, inspect items before paying, and trust your instincts. Report any suspicious activity to us.",
      category: "buying"
    },
    {
      id: 10,
      question: "What payment methods are accepted?",
      answer: "Payment methods are arranged directly between buyers and sellers. Common methods include cash, mobile money (M-Pesa), bank transfers, and other mutually agreed methods. We recommend secure payment options.",
      category: "buying"
    },

    // Safety
    {
      id: 11,
      question: "What should I do if I encounter a scam?",
      answer: "Report the suspicious user or ad immediately through our reporting system or contact us at safety@jazamarket.com. Block the user and don't proceed with the transaction. Your safety is our priority.",
      category: "safety"
    },
    {
      id: 12,
      question: "Where should I meet buyers or sellers?",
      answer: "Always meet in public, well-lit places with good foot traffic like shopping centers, bank premises, or busy cafes. Avoid isolated areas or private residences, especially for first meetings.",
      category: "safety"
    },
    {
      id: 13,
      question: "How can I verify if a seller is legitimate?",
      answer: "Check their profile for multiple listings, read reviews if available, verify their phone number, ask for additional photos or video calls, and trust your instincts. Legitimate sellers are usually responsive and transparent.",
      category: "safety"
    },

    // Account
    {
      id: 14,
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and check your email for reset instructions. Follow the link to create a new password for your account.",
      category: "account"
    },
    {
      id: 15,
      question: "How do I update my profile information?",
      answer: "Go to your Dashboard, click on 'Profile Settings', and update your information including name, phone number, email, and profile picture. Remember to save your changes.",
      category: "account"
    },
    {
      id: 16,
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account by contacting our support team at support@jazamarket.com. Note that this action is permanent and will remove all your ads and data.",
      category: "account"
    },

    // Technical
    {
      id: 17,
      question: "Why can't I upload photos?",
      answer: "Ensure your images are under 5MB each and in supported formats (JPG, PNG, GIF). Check your internet connection and try refreshing the page. If the problem persists, contact our support team.",
      category: "technical"
    },
    {
      id: 18,
      question: "The website is loading slowly. What can I do?",
      answer: "Clear your browser cache and cookies, check your internet connection, try a different browser, or use our mobile app. If issues persist, the problem might be temporary - try again later.",
      category: "technical"
    },
    {
      id: 19,
      question: "Do you have a mobile app?",
      answer: "We're currently working on mobile apps for Android and iOS. In the meantime, our website is fully mobile-optimized and works great on all devices and browsers.",
      category: "technical"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'posting', name: 'Posting Ads' },
    { id: 'buying', name: 'Buying' },
    { id: 'safety', name: 'Safety' },
    { id: 'account', name: 'Account' },
    { id: 'technical', name: 'Technical' }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="faq-page">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="intro-text">
            Find quick answers to the most common questions about using JazaMarket. 
            Can't find what you're looking for? Contact our support team.
          </p>

          <div className="faq-search">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="faq-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="faq-content">
            {filteredFAQs.length > 0 ? (
              <div className="faq-list">
                {filteredFAQs.map(item => (
                  <div key={item.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleItem(item.id)}
                    >
                      <span>{item.question}</span>
                      {openItems.includes(item.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {openItems.includes(item.id) && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No questions found matching your search. Try different keywords or browse all categories.</p>
              </div>
            )}
          </div>

          <div className="faq-footer">
            <h2>Still Need Help?</h2>
            <p>
              Can't find the answer to your question? Our support team is here to help you.
            </p>
            <div className="help-buttons">
              <a href="/contact" className="help-btn primary">Contact Support</a>
              <a href="mailto:support@jazamarket.com" className="help-btn secondary">Email Us</a>
              <a href="tel:+254750922133" className="help-btn secondary">Call Us</a>
            </div>
          </div>
        </div>
      </div>
   </MainLayout>
  );
};

export default FAQ;
