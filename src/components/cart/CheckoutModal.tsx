'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { saveOrderToFirestore } from '@/lib/firestoreServices';

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    amountNeededForFreeShipping
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = amountNeededForFreeShipping === 0 ? 0 : 200;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in all required shipping details.');
      return;
    }

    setIsSaving(true);
    const generatedId = `SEK-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderId: generatedId,
      customerName: formData.fullName,
      customerEmail: '',
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.city,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        selectedWeight: item.selectedWeight,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      shippingFee: deliveryFee,
      totalAmount: grandTotal,
      paymentMethod: 'Cash on Delivery (COD)',
      orderStatus: 'Pending' as const
    };

    // Save to Firestore in real-time for Admin Panel
    await saveOrderToFirestore(orderPayload);

    setOrderId(generatedId);
    setIsSaving(false);
    setIsSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#5e0d0c] text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Truck className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg leading-tight uppercase tracking-wider">
                {isSubmitted ? 'Order Confirmed!' : 'Cash on Delivery (COD) Checkout'}
              </h2>
              <p className="text-xs text-red-200">Official Store - Soghat-e-Khas</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-white/80 hover:text-white p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSubmitted ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">Thank You For Your Order!</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your order number is <span className="font-bold text-[#5e0d0c]">{orderId}</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Our team will call or WhatsApp you on <span className="font-semibold text-gray-800">{formData.phone}</span> to verify your delivery address before dispatch.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Address:</span>
                <span className="font-semibold text-gray-800">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount (COD):</span>
                <span className="font-extrabold text-[#e95144] text-sm">Rs. {grandTotal}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/923052396699?text=Hi%20Soghat-e-Khas,%20I%20placed%20order%20${orderId}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <span>Track on WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="bg-[#5e0d0c] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#430807] transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Customer Info Form */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b pb-2">
                Shipping Information
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e0d0c] outline-none bg-white"
                >
                  {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Gujranwala', 'Sialkot', 'Hyderabad', 'Sargodha', 'Bahawalpur', 'Other City'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House #, Street #, Sector/Area, Nearby Landmark"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e0d0c] outline-none"
                />
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b pb-2 mb-3">
                  Order Summary ({cart.reduce((a, c) => a + c.quantity, 0)} Items)
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-200">
                  {cart.map(item => (
                    <div key={item.cartId} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-gray-500">{item.selectedWeight} × {item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 pt-3 mt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping (Delivery Fee)</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold border-t pt-2 text-[#5e0d0c]">
                    <span>Total Amount</span>
                    <span>Rs. {grandTotal}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center space-x-2 text-[11px] text-green-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Payment Method: <strong>Cash on Delivery (Pay when order arrives)</strong></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-[#5e0d0c] hover:bg-[#430807] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-lg transition-all disabled:opacity-50"
              >
                {isSaving ? 'CONFIRMING ORDER...' : 'PLACE CONFIRMED COD ORDER'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
