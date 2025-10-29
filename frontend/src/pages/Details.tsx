import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperience } from '../api/api';

interface Slot {
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  price: number;
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  location: string;
  slots: Slot[];
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      try {
        const response = await getExperience(id);
        setExperience(response.data);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!experience) return <div className="text-center py-10">Experience not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img src={experience.images[0]} alt={experience.title} className="w-full rounded-lg" />
        </div>
        <div>
          <p className="text-gray-600 mb-4">{experience.description}</p>
          <p className="text-lg font-semibold mb-4">Location: {experience.location}</p>
          <p className="text-lg font-semibold mb-4">Price: ${experience.price}</p>

          <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
          <div className="space-y-2">
            {experience.slots.map((slot) => (
              <div key={slot.slotId} className="border p-4 rounded">
                <p>Date: {slot.date}</p>
                <p>Time: {slot.startTime} - {slot.endTime}</p>
                <p>Available: {slot.capacity - slot.booked} / {slot.capacity}</p>
                <button
                  onClick={() => setSelectedSlot(slot.slotId)}
                  disabled={slot.capacity - slot.booked === 0}
                  className={`mt-2 px-4 py-2 rounded ${
                    selectedSlot === slot.slotId
                      ? 'bg-green-500 text-white'
                      : slot.capacity - slot.booked === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {selectedSlot === slot.slotId ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          {selectedSlot && (
            <Link
              to={`/checkout?experienceId=${experience._id}&slotId=${selectedSlot}`}
              className="block mt-6 bg-green-500 text-white text-center py-3 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
