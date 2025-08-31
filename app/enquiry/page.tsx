'use client';
import React, { useState } from 'react';
import { sendRequest } from '../login/page';
import { request } from 'http';

function createCustomerID(phoneNo: number): number{
  const phonePart = phoneNo.toString().slice(-4); // Last 4 digits of phone number
  return Number(phonePart);
}

const emptyQuery = {
  customer_name: '',
  request_type: '',
  phone: '',
  property_type: '',
  min_price: '',
  max_price: '',
  area_sqft: '',
  bedrooms: '',
  bathrooms: '',
  location: '',
  comments: ''
}

const BuyForm: React.FC = () => {
  const [query, setQuery] = useState(emptyQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuery(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form data here
    console.log('Form submitted:', query);

    // You can send this data to your API or handle it as needed

    const customerID = createCustomerID(parseInt(query.phone));
    console.log('Generated Customer ID:', customerID);  

    const response = await sendRequest('POST', 'http://localhost:8000/api/enquiries/', {
      customer_id: customerID,
      request_type: query.request_type,
      property_type: query.property_type,
      location: query.location,
      min_price: parseInt(query.min_price),
      max_price: parseInt(query.max_price),
      bedrooms: parseInt(query.bedrooms),
      bathrooms: parseInt(query.bathrooms),
      area_sqft: parseInt(query.area_sqft),
      description: query.comments,
    })

    console.log('Response from API:', response);
    alert('✅ Enquiry submitted successfully!');

    const form = e.target as HTMLFormElement;
    form.reset(); // Reset the form after submission
    setQuery(emptyQuery);
  };



  return (
    <>
    <header className="bg-green-600 text-white py-6 text-center">
      <h1 className="text-3xl font-semibold">Add Customer Enquiry</h1>
    </header>
    <div className="w-[80%] md:w-[95%] max-w-3xl mx-auto mt-6 mb-10 bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="customer_name" className="text-gray-700 mt-2">Customer Name:</label>
        <input
          onChange={handleChange}
          type="text"
          id="customer_name"
          name="customer_name"
          placeholder="Customer Name"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        
    <label className="text-gray-700" htmlFor="request_type">Request Type:</label>
        <select onChange={handleChange} id="request_type" name="request_type" required
        className="p-3 mt-1 mb-4 border border-gray-300 rounded-md">
          <option defaultValue="">-- Select Type --</option>
          <option defaultValue="buy">Buy</option>
          <option defaultValue="sell">Sell</option>
          <option defaultValue="rent">Rent</option>
        </select>

        <label htmlFor="phone" className="text-gray-700">Phone Number:</label>
        <input
          onChange={handleChange}
          type="tel"
          id="phone"
          name="phone"
          placeholder="Customer Phone Number"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="property_type" className="text-gray-700">Select Property:</label>
        <select
          onChange={handleChange}
          id="property_type"
          name="property_type"
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        >
          <option defaultValue="house" selected>House</option>
          <option defaultValue="apartment">Apartment</option>
          <option defaultValue="townhouse">Townhouse</option>
          <option defaultValue="condo">Condo</option>
          <option defaultValue="land">Land</option>
        </select>

        <label htmlFor="location" className="text-gray-700">Location:</label>
        <input
          onChange={handleChange}
          type="text"
          id="location"
          name="location"
          placeholder="City, State, or Zip Code"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="phone" className="text-gray-700">Area in Sq Ft:</label>
        <input
          onChange={handleChange}
          type="tel"
          id="area_sqft"
          name="area_sqft"
          placeholder="Ex: 1500"
          required
          className="p-3 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <div className='flex gap-2.5 mb-4'>
          <div className='flex flex-col flex-1'>
            <label htmlFor="bedrooms" className="text-gray-700">Bedrooms:</label>
            <input
              name='bedrooms'
              id='bedrooms'
              type="number"
              onChange={handleChange}
              placeholder="Ex: 3"
              max={5}
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className='flex flex-col flex-1'>
            <label htmlFor="bathrooms" className="text-gray-700">Bathrooms:</label>
            <input
              name='bathrooms'
              type="number"
              max={5}
              onChange={handleChange}
              placeholder="Ex: 2"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
          
        
        <div className='flex gap-2.5 mb-4'>
          <div className='flex flex-col flex-1'>
            <label htmlFor="min_price" className="text-gray-700">Min Price:</label>
            <input
              name='min_price'
              type="number"
              onChange={handleChange}
              placeholder="Ex: 100000"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
          </div>

          <div className='flex flex-col flex-1'>
            <label htmlFor="max_price" className="text-gray-700">Min Price:</label>
            <input
              name='max_price'
              type="number"
              onChange={handleChange}
              placeholder="Ex: 1000000"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <label htmlFor="comments" className="text-gray-700">Additional Comments:</label>
        <textarea
          onChange={handleChange}
          id="comments"
          name="comments"
          rows={4}
          placeholder="Any specific requirements?"
          className="p-3 mt-1 mb-6 border border-gray-300 rounded-md"
        ></textarea>

        <input
          onChange={handleChange}
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
