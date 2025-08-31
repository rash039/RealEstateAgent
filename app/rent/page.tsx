import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-green-600 text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">Rent A House</h1>
      </header>

      <main className="w-11/12 max-w-6xl mx-auto mt-8">
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Search for a House</h2>
          <form className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Min Price"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            />
            <select className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded">
              <option>Any Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>
        </section>

        {/* Listings */}
        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Available Houses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <Image
                src="/property_images/family-home.jpg"
                alt="Family House"
                width={800}
                height={150}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Beautiful Family House</h3>
                <p>Location: Downtown</p>
                <p>Price: $1500/month</p>
                <p>Bedrooms: 3</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <Image
                src="/property_images/modern-apartment.jpg"
                alt="Modern Apartment"
                width={800}
                height={150}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Modern Apartment</h3>
                <p>Location: Suburbs</p>
                <p>Price: $1200/month</p>
                <p>Bedrooms: 2</p>
              </div>
            </div>

            {/* Add more cards if needed */}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        &copy; 2025 House Rental Service
      </footer>
    </div>
  )
}
