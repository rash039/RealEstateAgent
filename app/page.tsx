'use client';
import { useEffect, ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Property = {
  property_id: number;
  title: string;
  price: number;
  location: string;
  main_image_url: string;
};

export default function Page() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/properties/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data: Property[]) => {
        setProperties(data);
        setAllProperties(data);
      })
      .catch((err) => console.error('Failed to fetch properties:', err));
  }, []);

  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    if (!search) return setProperties(allProperties);
    const filtered = allProperties.filter((p) =>
      p.title.toLowerCase().includes(search)
    );
    setProperties(filtered);
  }

  return (
    <>
      <style jsx>{`
        .page-container {
          max-width: 1265px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          font-family: 'Roboto', sans-serif;
          color: #374151;
        }

        .content {
          width: 100%;
          padding: 0 24px;
        }

        .search-bar {
          width: 100%;
          max-width: 1217px;
          height: 50px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          display: flex;
          align-items: center;
          padding-left: 16px;
          color: #9ca3af;
          font-size: 16px;
          margin-bottom: 24px;
          box-sizing: border-box;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 24px;
          max-width: 1217px;
        }

        .cards-container {
          max-width: 1217px;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .card {
          width: 32%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          height: 160px;
          background: linear-gradient(90deg, #e5e7eb, #9ca3af);
          position: relative;
        }

        .card-content {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .price {
          font-size: 16px;
          font-weight: 400;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .location {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .title-property {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }

         .view-details-btn {
          width: 120px;
          height: 40px;
          background-color: #10b981; /* Emerald green */
          border-radius: 6px;
          color: white;              /* ✅ Fix: make text visible */
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          line-height: 40px;
          user-select: none;
          transition: background-color 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }

        .view-details-btn:hover {
          background-color: #059669; /* Darker green on hover */
        }

      `}</style>

      <div className="page-container">
        <main className="content">
          <div className="relative">
            <input
              onChange={searchChangeHandler}
              type="search"
              className="search-bar mt-4"
              placeholder="Search properties..."
            />
          </div>

          <h1 className="title">Available Properties</h1>

          <div className="cards-container">
            {properties.map(({ property_id, title, price, location }) => (
              <div key={property_id} className="card">
                <div className="card-image w-full">
                  <Image
                    src={`/property_images/${property_id}.jpg`}
                    alt={title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full"
                />
                </div>
                <div className="card-content">
                  <div className="title-property">{title}</div>
                  <div className="price">₹{price.toLocaleString()}</div>
                  <div className="location">Location: {location}</div>
                  <Link
                    href={`/details/${property_id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            {properties.length === 0 && (
              <div className="w-full h-[250px] flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 text-lg font-medium">No properties found</p>
                <p className="text-gray-400 text-sm mt-1">Try looking up something else</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
