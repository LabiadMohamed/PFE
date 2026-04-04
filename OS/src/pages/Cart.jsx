import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Truck, ShieldCheck, ShoppingBag, Info, User, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Step Management: 1 = Cart, 2 = Info & Payment, 3 = Confirmation, 4 = Success
  const [step, setStep] = useState(1);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '', phone: '', city: '', address: '', paymentMethod: 'cod',
    cardName: '', cardNum: '', cardDate: '', cardCvc: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const afterDiscount = subtotal - discountAmount;
  const isFreeShipping = afterDiscount > 200; // Adjusted for Euro/Dollar values
  const shipping = isFreeShipping ? 0 : (afterDiscount > 0 ? 15 : 0);
  const total = afterDiscount + shipping;

  // Handlers
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'OPTISTYLE20') {
      setDiscount(0.20);
      setPromoMessage({ text: 'Promo code applied! (-35%)', type: 'success' });
    } else if (promoCode.trim() !== '') {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid code.', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Step Navigations
  const goToCheckoutForm = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToConfirmation = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = "Full name is required";
    if (!formData.phone.trim()) err.phone = "Phone number is required";
    if (!formData.address.trim()) err.address = "Complete address is required";
    
    if (formData.paymentMethod === 'cmi') {
      if (!formData.cardName.trim()) err.cardName = "Required";
      if (!formData.cardNum.trim()) err.cardNum = "Required";
      if (!formData.cardDate.trim()) err.cardDate = "Required";
      if (!formData.cardCvc.trim()) err.cardCvc = "Required";
    }

    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const finalizeOrder = () => {
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Render Functions ---

  const renderStepsIndicator = () => (
    <div className="flex items-center justify-center mb-10  w-full max-w-4xl mx-auto px-4">
      {[ { id: 1, label: "Cart" }, { id: 2, label: "Information" }, { id: 3, label: "Confirmation" } ].map((s, index) => (
        <React.Fragment key={s.id}>
          <div className={`flex flex-col items-center ${step >= s.id ? 'text-[#292077]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= s.id ? 'bg-[#292077] text-white shadow-lg shadow-[#292077]/30' : 'bg-gray-200 text-gray-500'}`}>{s.id}</div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold">{s.label}</span>
          </div>
          {index < 2 && <div className={`flex-1 h-px mx-2 sm:mx-4 ${step > s.id ? 'bg-[#292077]' : 'bg-gray-200'} transition-colors`}></div>}
        </React.Fragment>
      ))}
    </div>
  );

  const renderSummarySidebar = (buttonAction, buttonText, IconLeft, IconRight) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl w-full lg:w-[400px] h-fit sticky top-36 border border-gray-100 shadow-[0_4px_24px_rgba(41,32,119,0.06)]">
      <h2 className="text-xl font-bold mb-6 text-[#292077] tracking-tight">Order Summary</h2>
      
      <div className="space-y-4 mb-6 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">{subtotal.toLocaleString()} dh</span>
        </div>
        
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-green-600 font-medium">
            <span>Discount (35%)</span>
            <span>-{discountAmount.toLocaleString()} €</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          {isFreeShipping ? (
            <span className="font-semibold text-green-600 uppercase text-xs tracking-wider">Free</span>
          ) : (
            <span className="font-medium text-gray-800">{shipping} dh</span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-gray-900 font-bold text-lg">Total</span>
          <span className="text-2xl font-black text-[#d4af37]">{total.toLocaleString()} dh</span>
        </div>
        <p className="text-xs text-gray-400 text-right mt-1">Taxes included</p>
      </div>

      {step === 1 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="block text-xs font-semibold text-[#292077] mb-2 uppercase tracking-wide">Promo Code</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Ex: OPTISTYLE20"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#292077] focus:ring-1 focus:ring-[#292077] uppercase transition-colors"
            />
            <button 
              onClick={handleApplyPromo}
              className="bg-[#292077] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d4af37] transition-colors"
            >
              Apply
            </button>
          </div>
          {promoMessage && (
            <p className={`text-xs mt-2 font-medium ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {promoMessage.text}
            </p>
          )}
        </div>
      )}

      <button 
        onClick={buttonAction}
        disabled={cartItems.length === 0}
        className="w-full bg-[#292077] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d4af37] hover:shadow-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {IconLeft && <IconLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
        <span>{buttonText}</span>
        {IconRight && <IconRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>

      <div className="mt-6 flex flex-col items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>100% Secure Payment</span>
        </div>
      </div>
    </div>
  );

  // --- Step 1: Cart View ---
  const renderStep1_Cart = () => (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex-1">
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-black text-[#292077] tracking-tight">Your Cart</h1>
          <span className="text-sm font-semibold text-[#d4af37] bg-yellow-50 px-4 py-1.5 rounded-full border border-[#d4af37]/20">{cartItems.length} item(s)</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Explore our new eyewear collections.</p>
            <Link to="/" className="bg-[#292077] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#d4af37] transition-colors">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="group flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#292077]/30 hover:shadow-md transition-all">
                <div className="w-full sm:w-36 h-36 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-1">{item.brand}</p>
                      <h3 className="text-lg font-bold text-[#292077] mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">Color: <span className="font-medium text-gray-700">{item.color}</span></p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-6 sm:mt-0">
                    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-[#292077] hover:bg-white rounded shadow-sm transition-all"><Minus className="w-4 h-4" /></button>
                      <span className="w-6 text-center font-bold text-sm text-[#292077]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-[#292077] hover:bg-white rounded shadow-sm transition-all"><Plus className="w-4 h-4" /></button>
                    </div>
                    <p className="text-xl font-black text-[#d4af37]">{(item.price * item.quantity).toLocaleString()} dh</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {renderSummarySidebar(goToCheckoutForm, "Proceed to Checkout", null, ArrowRight)}
    </div>
  );

  // --- Step 2: Customer Form & Payment Selection ---
  const renderStep2_Form = () => (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex-1">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#d4af37] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to cart
        </button>

        <div className="space-y-8">
          <section className="bg-white p-6 md:p-8 border border-gray-100 rounded-3xl shadow-sm">
            <h2 className="text-lg font-bold text-[#292077] mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#292077]/10 text-[#292077] flex items-center justify-center text-sm"><User className="w-4 h-4" /></span> 
              Customer Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} 
                  className={`w-full p-3.5 bg-gray-50 border ${formErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#292077] focus:ring-1 focus:ring-[#292077] focus:bg-white transition-all`} placeholder="Ex: Ressa Amine" />
                {formErrors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} 
                  className={`w-full p-3.5 bg-gray-50 border ${formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#292077] focus:ring-1 focus:ring-[#292077] focus:bg-white transition-all`} placeholder="Ex: +212 49 685 851" />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} 
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#292077] focus:bg-white transition-all font-medium text-gray-800" placeholder="Ex: Nador" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Address *</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3"
                  className={`w-full p-3.5 bg-gray-50 border ${formErrors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#292077] focus:ring-1 focus:ring-[#292077] focus:bg-white transition-all`} placeholder="Street name, Building number, Apartment..."></textarea>
                {formErrors.address && <p className="text-red-500 text-xs mt-1.5 font-medium">{formErrors.address}</p>}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 border border-gray-100 rounded-3xl shadow-sm">
            <h2 className="text-lg font-bold text-[#292077] mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#292077]/10 text-[#292077] flex items-center justify-center text-sm"><CreditCard className="w-4 h-4" /></span> 
              Select Payment Method
            </h2>
            
            <div className="space-y-4">
              <label onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))} className={`block border-2 ${formData.paymentMethod === 'cod' ? 'border-[#292077] bg-[#292077]/5' : 'border-gray-100 hover:border-gray-200 bg-white'} rounded-2xl cursor-pointer transition-all`}>
                <input type="radio" className="sr-only" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-[#292077]' : 'border-gray-300'}`}>
                    {formData.paymentMethod === 'cod' && <div className="w-3 h-3 bg-[#292077] rounded-full" />}
                  </div>
                  <div className={`p-2 rounded-lg ${formData.paymentMethod === 'cod' ? 'bg-[#292077] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold ${formData.paymentMethod === 'cod' ? 'text-[#292077]' : 'text-gray-900'}`}>Cash on Delivery (COD)</h3>
                </div>
              </label>

              <label onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cmi' }))} className={`block border-2 ${formData.paymentMethod === 'cmi' ? 'border-[#292077] bg-[#292077]/5' : 'border-gray-100 hover:border-gray-200 bg-white'} rounded-2xl cursor-pointer transition-all`}>
                <input type="radio" className="sr-only" name="paymentMethod" value="cmi" checked={formData.paymentMethod === 'cmi'} onChange={handleInputChange} />
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cmi' ? 'border-[#292077]' : 'border-gray-300'}`}>
                    {formData.paymentMethod === 'cmi' && <div className="w-3 h-3 bg-[#292077] rounded-full" />}
                  </div>
                  <div className={`p-2 rounded-lg ${formData.paymentMethod === 'cmi' ? 'bg-[#292077] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold ${formData.paymentMethod === 'cmi' ? 'text-[#292077]' : 'text-gray-900'}`}>Credit / Debit Card</h3>
                </div>
                {formData.paymentMethod === 'cmi' && (
                  <div className="px-5 sm:px-[72px] pb-6">
                    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name on card</label>
                        <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="Ex: Ressa Amine" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#292077] rounded-lg text-sm uppercase" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Card Number</label>
                        <input type="text" name="cardNum" value={formData.cardNum} onChange={handleInputChange} placeholder="4000 1234 5678 9010" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#292077] rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Expiry Date</label>
                        <input type="text" name="cardDate" value={formData.cardDate} onChange={handleInputChange} placeholder="MM/YY" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#292077] rounded-lg text-sm text-center" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">CVV</label>
                        <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} placeholder="123" className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#292077] rounded-lg text-sm text-center" />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              <label onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))} className={`block border-2 ${formData.paymentMethod === 'paypal' ? 'border-[#292077] bg-[#292077]/5' : 'border-gray-100 hover:border-gray-200 bg-white'} rounded-2xl cursor-pointer transition-all`}>
                <input type="radio" className="sr-only" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleInputChange} />
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-[#292077]' : 'border-gray-300'}`}>
                    {formData.paymentMethod === 'paypal' && <div className="w-3 h-3 bg-[#292077] rounded-full" />}
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                  <h3 className={`text-base font-bold ${formData.paymentMethod === 'paypal' ? 'text-[#292077]' : 'text-gray-900'}`}>PayPal</h3>
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>

      {renderSummarySidebar(goToConfirmation, "Review Order", null, ArrowRight)}
    </div>
  );

  // --- Step 3: Confirmation Order View ---
  const renderStep3_Confirm = () => (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex-1">
        <button onClick={() => setStep(2)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#d4af37] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Edit Information
        </button>

        <h1 className="text-3xl font-black text-[#292077] tracking-tight mb-8 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-[#d4af37]" /> Confirm Order
        </h1>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Shipping Address</h3>
            <p className="text-lg font-bold text-[#292077] mb-1">{formData.fullName}</p>
            <p className="text-gray-600 mb-1">{formData.address}</p>
            <p className="text-gray-600 font-medium">City: {formData.city} | Phone: {formData.phone}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                {formData.paymentMethod === 'cod' ? <Truck className="w-6 h-6 text-[#292077]" /> : 
                 formData.paymentMethod === 'cmi' ? <CreditCard className="w-6 h-6 text-[#292077]" /> :
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />}
              </div>
              <div>
                <p className="font-bold text-[#292077] text-lg uppercase">
                  {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                   formData.paymentMethod === 'cmi' ? 'Credit Card' : 'PayPal'}
                </p>
                {formData.paymentMethod === 'cod' && <p className="text-sm text-gray-500">Please prepare exact change for the courier.</p>}
                {formData.paymentMethod === 'paypal' && <p className="text-sm text-gray-500">You will be redirected to PayPal after confirmation.</p>}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Items ({cartItems.length})</h3>
             <ul className="space-y-3">
               {cartItems.map((item) => (
                 <li key={item.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                   <div className="flex items-center gap-3">
                     <span className="font-bold text-[#292077] w-6 text-center bg-gray-100 rounded px-1">{item.quantity}x</span>
                     <span className="text-gray-700 font-medium">{item.name}</span>
                   </div>
                   <span className="font-bold text-[#d4af37]">{(item.price * item.quantity).toLocaleString()} €</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {renderSummarySidebar(finalizeOrder, "Confirm Order", null, CheckCircle2)}
    </div>
  );

  // --- Step 4: Success View ---
  const renderStep4_Success = () => (
    <div className="mt-12 max-w-2xl mx-auto text-center px-4 animate-in zoom-in-95 duration-700">
      <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <CheckCircle2 className="w-14 h-14 text-green-500 z-10" />
        <div className="absolute inset-0 border-[6px] border-green-400 rounded-full animate-ping opacity-30"></div>
      </div>
      <h1 className="text-4xl font-black text-[#292077] tracking-tight mb-4">Order Confirmed! </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Thank you for your trust in <span className="font-bold text-[#d4af37]">Optistyle</span>, <span className="font-bold text-gray-900">{formData.fullName}</span>! <br/>
        Your order has been successfully placed and is being processed. 
      </p>
      
      <div className="bg-white border-2 border-[#292077]/10 shadow-sm rounded-3xl p-6 md:p-8 text-left mb-10 max-w-sm mx-auto">
        <h3 className="font-bold text-[#292077] border-b border-gray-100 pb-4 mb-4 text-center text-lg">Transaction Summary</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Amount paid:</span><span className="font-black text-lg text-[#d4af37]">{total.toLocaleString()} dh</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Payment:</span><span className="font-bold uppercase text-[#292077] bg-gray-100 px-3 py-1 rounded-full">{formData.paymentMethod}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Shipping to:</span><span className="font-bold text-gray-900">{formData.city}</span></div>
        </div>
      </div>

      <Link to="/" onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-3 bg-[#292077] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#d4af37] shadow-lg transition-all group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Shop
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step < 4 && renderStepsIndicator()}
        {step === 1 && renderStep1_Cart()}
        {step === 2 && renderStep2_Form()}
        {step === 3 && renderStep3_Confirm()}
        {step === 4 && renderStep4_Success()}
      </div>
    </div>
  );
};

export default Cart;