// 'use client';
import React from 'react';

const BuyForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form data here
  };

  return (
    <>
    <header className="bg-green-600 text-white py-6 text-center">
      <h1 className="text-3xl font-semibold">Buy A House</h1>
    </header>
    <div className="w-[80%] md:w-[95%] max-w-3xl mx-auto mt-6 mb-10 bg-white p-6 rounded-lg shadow-md">
      <form className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 mt-2">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Full Name"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="email" className="text-gray-700">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email Address"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="phone" className="text-gray-700">Your Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your Phone Number"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="property_type" className="text-gray-700">Property Type:</label>
        <select
          id="property_type"
          name="property_type"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>

        <label htmlFor="location" className="text-gray-700">Preferred Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="City, State, or Zip Code"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="price_range" className="text-gray-700">Price Range:</label>
        <select
          id="price_range"
          name="price_range"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        >
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000-300000">$200,000 - $300,000</option>
          <option value="300000-400000">$300,000 - $400,000</option>
          <option value="400000+">$400,000+</option>
        </select>

        <label htmlFor="bedrooms" className="text-gray-700">Number of Bedrooms:</label>
        <select
          id="bedrooms"
          name="bedrooms"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5+</option>
        </select>

        <label htmlFor="comments" className="text-gray-700">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          placeholder="Any specific requirements?"
          className="p-3 mt-1 mb-6 border border-gray-300 rounded-md"
        ></textarea>

        <input
          type="submit"
          value="Submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md cursor-pointer transition-colors duration-300"
        />
      </form>
    </div>
  </>
  );
};

export default BuyForm;
