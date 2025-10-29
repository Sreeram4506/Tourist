import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '../api/api';

interface Experience {
  _id: string;
  title: string;
  shortDesc: string;
  image: string;
  price: number;
  rating: number;
  location: string;
}

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <p className="text-gray-600">{exp.shortDesc}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">${exp.price}</span>
                <span className="text-yellow-500">⭐ {exp.rating}</span>
              </div>
              <Link
                to={`/experience/${exp._id}`}
                className="block mt-4 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
