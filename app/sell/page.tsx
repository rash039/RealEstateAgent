import Image from "next/image";

export default function SellProperty() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="bg-green-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Sell Your Property</h1>
      </header>

      <main className="w-11/12 max-w-6xl mx-auto mt-8">
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Find Your Buyer</h2>
          <form className="flex flex-wrap items-center gap-4">
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
              <option>Property Type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>
        </section>

        {/* Property Listings */}
        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Properties for Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1">
              <Image
                src="/property_images/modern-apartment.jpg"
                alt="Luxury Apartment"
                width={800}
                height={180}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Luxury Apartment</h3>
                <p>Location: Downtown</p>
                <p>Price: $250,000</p>
                <p>Type: Apartment</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1">
              <Image
                src="/property_images/family-home.jpg"
                alt="Spacious Villa"
                width={800}
                height={180}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Spacious Villa</h3>
                <p>Location: Suburbs</p>
                <p>Price: $850,000</p>
                <p>Type: Villa</p>
              </div>
            </div>

            {/* Add more property cards as needed */}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        &copy; 2025 Property Sales Platform
      </footer>
    </div>
  );
}
