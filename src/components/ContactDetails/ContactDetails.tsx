import React, { useState, useEffect } from 'react';
import './ContactDetails.css';
import { createApiUrl } from '../../utils/api';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

interface ContactDetailsProps {
  adId: string;
  adName: string;
}

interface ContactData {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  linkedIn?: string;
}

interface CacheEntry {
  data: ContactData;
  timestamp: number;
}

// Module-level cache to persist data across component mounts/unmounts
// This prevents re-fetching contact details when the same ad is opened multiple times
const contactCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

const ContactDetails: React.FC<ContactDetailsProps> = ({ adId, adName }) => {
  const [contacts, setContacts] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactDetails = async (forceRefresh = false) => {
      // Check cache first
      if (!forceRefresh) {
        const cachedEntry = contactCache.get(adId);
        if (cachedEntry) {
          const isExpired = Date.now() - cachedEntry.timestamp > CACHE_DURATION;
          if (!isExpired) {
            setContacts(cachedEntry.data);
            setError(null);
            return;
          }
        }
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(createApiUrl(`/get_ad_contact_details?ad_id=${adId}`), {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contact details');
        }

        const data = await response.json();
        
        // Cache the successful response
        contactCache.set(adId, {
          data,
          timestamp: Date.now()
        });
        
        setContacts(data);
      } catch (err) {
        console.error('Error fetching contact details:', err);
        setError('Failed to load contact details');
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [adId]);

  const handleRetry = () => {
    // Force refresh on retry (ignore cache)
    setError(null);
    const fetchContactDetails = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(createApiUrl(`/get_ad_contact_details?ad_id=${adId}`), {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contact details');
        }

        const data = await response.json();
        
        // Cache the successful response
        contactCache.set(adId, {
          data,
          timestamp: Date.now()
        });
        
        setContacts(data);
      } catch (err) {
        console.error('Error fetching contact details:', err);
        setError('Failed to load contact details');
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  };

  const generateWhatsAppLink = (phoneNumber: string) => {
    const message = `Inquiry on ${adName} from JazaMarket.com`;
    // Remove any non-digit characters except the plus sign, then remove the plus
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '').replace('+', '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateInstagramLink = (username: string) => {
    return `https://www.instagram.com/${username}`;
  };

  const generateXLink = (username: string) => {
    return `https://x.com/${username}`;
  };

  const generateFacebookLink = (username: string) => {
    return `https://www.facebook.com/${username}`;
  };

  const generateLinkedInLink = (username: string) => {
    return `https://www.linkedin.com/in/${username}`;
  };

  if (loading) {
    return <div className="contact-details-loading">Loading contact details...</div>;
  }

  if (error) {
    return (
      <div className="contact-details-error">
        <span>{error}</span>
        <button onClick={handleRetry} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!contacts) {
    return <div className="contact-details-empty">No contact details available</div>;
  }

  const availableContacts = Object.entries(contacts).filter(([_, value]) => value != null && value !== '');

  if (availableContacts.length === 0) {
    return <div className="contact-details-empty">No contact details available</div>;
  }

  return (
    <div className="contact-details">
      <h4>Contact Details</h4>
      <div className="contact-icons">
        {contacts.whatsapp && (
          <a
            href={generateWhatsAppLink(contacts.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon whatsapp"
            title={`WhatsApp: ${contacts.whatsapp}`}
          >
            <FaWhatsapp />
          </a>
        )}
        
        {contacts.instagram && (
          <a
            href={generateInstagramLink(contacts.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon instagram"
            title={`Instagram: @${contacts.instagram}`}
          >
            <FaInstagram />
          </a>
        )}
        
        {contacts.facebook && (
          <a
            href={generateFacebookLink(contacts.facebook)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon facebook"
            title={`Facebook: ${contacts.facebook}`}
          >
            <FaFacebook />
          </a>
        )}
        
        {contacts.x && (
          <a
            href={generateXLink(contacts.x)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon twitter"
            title={`X: @${contacts.x}`}
          >
            <FaTwitter />
          </a>
        )}
        
        {contacts.linkedIn && (
          <a
            href={generateLinkedInLink(contacts.linkedIn)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon linkedin"
            title={`LinkedIn: ${contacts.linkedIn}`}
          >
            <FaLinkedin />
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
