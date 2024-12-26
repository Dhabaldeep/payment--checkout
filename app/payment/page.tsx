"use client";

import Image from "next/image";
import { useState } from "react";

const CheckoutForm = () => {
  // Form state
  interface FormData {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    cardholderName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }

  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Error messages
  interface FormErrors {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    cardholderName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);

  // Simple form validation
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.cardholderName)
      newErrors.cardholderName = "Cardholder name is required";
    if (!formData.cardNumber || formData.cardNumber.length !== 16)
      newErrors.cardNumber = "Invalid card number";
    if (!formData.expiry || formData.expiry.length !== 5)
      newErrors.expiry = "Invalid expiry date";
    if (!formData.cvc || formData.cvc.length !== 3)
      newErrors.cvc = "Invalid CVC";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors: FormErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      // Simulate a successful payment process
      setIsSuccess(true);
      setTimeout(() => {
        // Reset form after success
        setFormData({
          address: "",
          city: "",
          state: "",
          postalCode: "",
          cardholderName: "",
          cardNumber: "",
          expiry: "",
          cvc: "",
        });
        setIsSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 md:p-8 lg:p-8">
        <div className="flex flex-wrap flex-col lg:flex-row lg:justify-between lg:items-center m-auto lg:p-8">
          {/* Left Section */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center text-center lg:text-left">
              <Image src="icon.svg" width={128} height={146} alt="logo" />
              <h1 className="text-[#12372A] text-2xl lg:text-3xl font-bold mt-5">
                Payment Gateway
              </h1>
              <p className="text-sm lg:text-base text-[#A3AED0] mt-2 font-semibold">
                Enter school location details!
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 w-full max-w-7xl mx-auto">
            <h1 className="text-[24px] md:text-[30px] font-bold text-left mb-6 text-black">
              Complete registration payment
            </h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Personal Details */}
              <h3 className="text-lg md:text-xl font-semibold text-black tracking-wide">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                <div className="inputGroup">
                  <label htmlFor="address" className="label">
                    Address line
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="P.o.Box 1223"
                    className="input"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">{errors.address}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="city" className="label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="input"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="state" className="label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="input"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs">{errors.state}</p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="postal-code" className="label">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="9090"
                    className="input"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-lg md:text-xl font-semibold text-black tracking-wide">
                Payment Methods
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Image src="visa.svg" width={70} height={48} alt="Visa" />
                <Image src="stripe.svg" width={70} height={48} alt="Stripe" />
                <Image src="paypal.svg" width={70} height={48} alt="Paypal" />
                <Image
                  src="masterCard.svg"
                  width={70}
                  height={48}
                  alt="Mastercard"
                />
                <Image src="gPay.svg" width={70} height={48} alt="gPay" />
              </div>

              {/* Card Details */}
              <h3 className="text-lg md:text-xl font-semibold text-black tracking-wide">
                Card Details
              </h3>
              <div className="space-y-3">
                <div className="inputGroup">
                  <label htmlFor="name" className="label">
                    Cardholder&apos;s name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    placeholder="Seen on your card"
                    className="input"
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-xs">
                      {errors.cardholderName}
                    </p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="card-number" className="label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Seen on your card"
                    className="input"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="inputGroup">
                    <label htmlFor="expiry" className="label">
                      Expiry
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="input text-[#A3AED0]"
                      placeholder="MM / YY"
                      maxLength={7}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-xs">{errors.expiry}</p>
                    )}
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="cvc" className="label">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="654"
                      className="input"
                    />
                    {errors.cvc && (
                      <p className="text-red-500 text-xs">{errors.cvc}</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full h-[54px] bg-[#12372A] text-white py-2 rounded-md font-semibold text-sm md:text-base"
              >
                {isSuccess ? "Payment Successful!" : "Next"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-gray-200 mb-5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-around items-center gap-4 px-6">
          <p className="text-[#A3AED0] text-sm md:text-base flex-1 text-center md:text-left">
            © 2024. All Rights Reserved. Made by{" "}
            <span className="font-semibold">Switcher.faiz!</span>
          </p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-[#12372A] text-sm md:text-base font-semibold">
            <li className="from-footer">Instruction</li>
            <li className="from-footer">License</li>
            <li className="from-footer">Terms of Use</li>
            <li className="from-footer">Privacy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutForm;
