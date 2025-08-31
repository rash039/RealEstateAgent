'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';


export interface PropertyDetails {
    user_id:        number;
    title:          string;
    location:       string;
    price:          number;
    price_unit:     string;
    bedrooms:       number;
    bathrooms:      number;
    area_sqft:      number;
    type:           string;
    purpose:        string;
    description:    string;
    main_image_url: string;
    property_id:    number;
    listed_at:      Date;
}



export default function PropertyDetails({params}: { params: Promise<{ slug: string }> }) {
  const {slug} = use(params);
  const [details, setDetails] = useState<PropertyDetails>();
  const [gallery, setGallery] = useState([
    { image_url: '/property_images/prop1.jpg', alt_text: 'Property Image 1' , property_id: 1 },
    { image_url: '/property_images/prop2.jpg', alt_text: 'Property Image 2' , property_id: 2 },

  ]);
  const [features, setFeatures] = useState([
  {
    "property_id": 1,
    "feature": "Balcony",
    "feature_id": 1
  },
  {
    "property_id": 1,
    "feature": "Gym",
    "feature_id": 2
  },
  {
    "property_id": 2,
    "feature": "Garden",
    "feature_id": 3
  },
  {
    "property_id": 2,
    "feature": "Swimming Pool",
    "feature_id": 4
  }
]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');  

  const openModal = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    async function getDetails() {
      const response = await fetch(`http://localhost:8000/api/properties/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch property details');
      }
      const data = await response.json();
      return data;
    }

    async function getImages() {
      const images =await fetch('http://localhost:8000/api/images/');
      const galleryImages = await images.json();
      return galleryImages;
    }

    async function getFeatures() {
      const featuresResponse = await fetch(`http://localhost:8000/api/features`);
      const featuresData = await featuresResponse.json();
      return featuresData;
    }

    console.log(slug, 'slug from params');

    getDetails().then((details) => {
      setDetails(details);
      console.log('Property details fetched successfully',details);
    }).catch(err => {
      console.error('Error fetching property details:', err);
    });

    getImages().then(images => {
      setGallery(images);
      console.log('Gallery images fetched successfully', images);
    }).catch(err => {
      console.error('Error fetching images:', err);
    });

    getFeatures().then(featuresData => {
      setFeatures(featuresData);
    }).catch(err => {
      console.error('Error fetching features:', err);
    });
  }, []);
  

  return (
    <main className="bg-green-100 min-h-screen text-gray-800">
      <header className="bg-green-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">{details && details.title}</h1>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src="/property_images/prop1.jpg"
              alt="Main Property"
              className="rounded-lg w-full"
            />
          </div>

          <div className="md:w-1/2">
            {details && (
              <>
                <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
                <div className="text-xl text-green-700 mb-2">{details.price}</div>
                <div className="italic mb-4">Location: {details.location}</div>
                <p className="mb-4">{details.description}</p>  
              </>
            )}
            

            <h3 className="text-lg font-semibold mb-2">Features:</h3>
            <ul className="space-y-2">
              {features.filter(object => object.property_id === Number(slug)).map((obj) => (
                <li key={obj.feature_id} className="bg-green-200 px-4 py-2 rounded">{obj.feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.filter(object => object.property_id === Number(slug)).map((img, idx) => (
              <Image
                width={500}
                height={500}
                key={idx}
                src={img.image_url}
                alt={img.alt_text}
                onClick={() => openModal(img.image_url)}
                className="h-full rounded cursor-pointer hover:scale-105 transition-transform"
                onError={null}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img src={modalImg} alt="Enlarged" className="max-w-4xl w-full rounded-lg" />
        </div>
      )}
    </main>
  );
}
