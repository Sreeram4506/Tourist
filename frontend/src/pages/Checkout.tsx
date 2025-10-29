import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getExperience, validatePromo, createBooking } from '../api/api';

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

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoValid, setPromoValid] = useState(false);
  const [promoAmount, setPromoAmount] = useState(0);
  const [promoType, setPromoType] = useState<'flat' | 'percent'>('flat');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    seats: 1
  });
  const [submitting, setSubmitting] = useState(false);

  const experienceId = searchParams.get('experienceId');
  const slotId = searchParams.get('slotId');

  useEffect(() => {
    const fetchData = async () => {
      if (!experienceId || !slotId) return;
      try {
        const response = await getExperience(experienceId);
        setExperience(response.data);
        const slot = response.data.slots.find((s: Slot) => s.slotId === slotId);
        setSelectedSlot(slot);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [experienceId, slotId]);

  const handlePromoValidate = async () => {
    if (!promoCode) return;
    try {
      const response = await validatePromo(promoCode);
      if (response.data.valid) {
        setPromoValid(true);
        setPromoAmount(response.data.amount);
        setPromoType(response.data.type);
      } else {
        setPromoValid(false);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error validating promo:', error);
    }
  };

  const calculateTotal = () => {
    if (!selectedSlot) return 0;
    const base = selectedSlot.price * formData.seats;
    if (promoValid) {
      if (promoType === 'percent') {
        return base * (1 - promoAmount / 100);
      } else {
        return Math.max(0, base - promoAmount);
      }
    }
    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience || !selectedSlot) return;

    setSubmitting(true);
    try {
      const payload = {
        experienceId: experience._id,
        slotId: selectedSlot.slotId,
        date: selectedSlot.date,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        seats: formData.seats,
        promoCode: promoValid ? promoCode : '',
        amountPaid: calculateTotal()
      };

      const response = await createBooking(payload);
      if (response.data.success) {
        navigate('/result?success=true&bookingId=' + response.data.bookingId);
      } else {
        navigate('/result?success=false');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      navigate('/result?success=false');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!experience || !selectedSlot) return <div className="text-center py-10">Invalid booking details</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{experience.title}</h2>
        <p>Slot: {selectedSlot.date} {selectedSlot.startTime} - {selectedSlot.endTime}</p>
        <p>Price per seat: ${selectedSlot.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Number of Seats</label>
          <input
            type="number"
            min="1"
            max={selectedSlot.capacity - selectedSlot.booked}
            required
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Promo Code</label>
          <div className="flex">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 p-2 border rounded-l"
            />
            <button
              type="button"
              onClick={handlePromoValidate}
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
          {promoValid && <p className="text-green-600 mt-1">Promo applied!</p>}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
          <p>Subtotal: ${(selectedSlot.price * formData.seats).toFixed(2)}</p>
          {promoValid && <p>Discount: -${promoType === 'percent' ? ((selectedSlot.price * formData.seats * promoAmount / 100)).toFixed(2) : promoAmount.toFixed(2)}</p>}
          <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {submitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
