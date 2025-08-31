'use client';
import React from 'react';

type Enquiry = {
  request_id: number;
  request_type: string;
  property_type?: string;
  location?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqft?: number;
  description?: string;
  submitted_at?: string;
};

type Customer = {
  customer_id: number;
  name: string;
  email?: string;
  phone?: string;
  inquiries: Enquiry[];
};

const CustomerDetailsPage: React.FC = () => {
  const customer: Customer = {
    customer_id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    inquiries: [
      {
        request_id: 101,
        request_type: 'buy',
        property_type: 'Apartment',
        location: 'Downtown',
        min_price: 200000,
        max_price: 300000,
        bedrooms: 2,
        bathrooms: 2,
        area_sqft: 900,
        description: 'Looking for a modern apartment in downtown.',
        submitted_at: '2025-07-01',
      },
    ],
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">View Customer Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">{customer.name}</h2>
        <p className="text-gray-700"><strong>Email:</strong> {customer.email}</p>
        <p className="text-gray-700"><strong>Phone:</strong> {customer.phone}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-green-700">Enquiries</h2>
      {customer.inquiries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 border">Request ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Property Type</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Price Range</th>
                <th className="p-2 border">Bedrooms</th>
                <th className="p-2 border">Bathrooms</th>
                <th className="p-2 border">Area (sq ft)</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {customer.inquiries.map((inq) => (
                <tr key={inq.request_id} className="hover:bg-gray-50">
                  <td className="p-2 border">{inq.request_id}</td>
                  <td className="p-2 border capitalize">{inq.request_type}</td>
                  <td className="p-2 border">{inq.property_type || '-'}</td>
                  <td className="p-2 border">{inq.location || '-'}</td>
                  <td className="p-2 border">
                    ${inq.min_price?.toLocaleString()} - ${inq.max_price?.toLocaleString()}
                  </td>
                  <td className="p-2 border">{inq.bedrooms ?? '-'}</td>
                  <td className="p-2 border">{inq.bathrooms ?? '-'}</td>
                  <td className="p-2 border">{inq.area_sqft ?? '-'}</td>
                  <td className="p-2 border">{inq.description}</td>
                  <td className="p-2 border">{inq.submitted_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No inquiries found for this customer.</p>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
