import React from 'react';
import './PaymentDetailsPopup.css';

interface PaymentDetailsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    packageName: string;
    packagePrice: string;
}

const PaymentDetailsPopup: React.FC<PaymentDetailsPopupProps> = ({
    isOpen,
    onClose,
    packageName,
    packagePrice
}) => {
    if (!isOpen) return null;

    const paybill = "510911";
    const accountNumber = "03202871471750";
    const whatsappNumber = "254750922133";
    
    const whatsappMessage = encodeURIComponent("PAYMENT CONFIRMATION. MPESA CODE: ");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const handleWhatsAppRedirect = () => {
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="payment-details-overlay">
            <div className="payment-details-popup">
                <div className="popup-header">
                    <h2>Payment Details</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="popup-content">
                    <div className="package-info">
                        <h3>Package: {packageName}</h3>
                        <p className="package-price">Amount: {packagePrice}</p>
                    </div>

                    <div className="payment-instructions">
                        <h3>M-Pesa Payment Instructions</h3>
                        
                        <div className="payment-details">
                            <div className="payment-step">
                                <span className="step-number">1</span>
                                <div className="step-content">
                                    <p>Go to M-Pesa on your phone</p>
                                </div>
                            </div>

                            <div className="payment-step">
                                <span className="step-number">2</span>
                                <div className="step-content">
                                    <p>Select "Lipa na M-Pesa"</p>
                                </div>
                            </div>

                            <div className="payment-step">
                                <span className="step-number">3</span>
                                <div className="step-content">
                                    <p>Select "Pay Bill"</p>
                                </div>
                            </div>

                            <div className="payment-step">
                                <span className="step-number">4</span>
                                <div className="step-content">
                                    <p>Enter the following details:</p>
                                    <div className="payment-info">
                                        <div className="info-row">
                                            <span className="label">Business Number:</span>
                                            <span className="value">{paybill}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">Account Number:</span>
                                            <span className="value">{accountNumber}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">Amount:</span>
                                            <span className="value">{packagePrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-step">
                                <span className="step-number">5</span>
                                <div className="step-content">
                                    <p>Enter your M-Pesa PIN and send</p>
                                </div>
                            </div>

                            <div className="payment-step">
                                <span className="step-number">6</span>
                                <div className="step-content">
                                    <p>After payment, send the M-Pesa confirmation message to our WhatsApp:</p>
                                    <button 
                                        className="whatsapp-btn"
                                        onClick={handleWhatsAppRedirect}
                                    >
                                        Send to WhatsApp: {whatsappNumber}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="important-note">
                            <h4>Important:</h4>
                            <p>Your package will be activated within 24 hours after we receive your payment confirmation on WhatsApp.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsPopup;
