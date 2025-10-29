import { useSearchParams, Link } from 'react-router-dom';

const Result = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-lg mb-4">Your experience has been successfully booked.</p>
          {bookingId && <p className="text-sm">Booking ID: {bookingId}</p>}
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <h1 className="text-3xl font-bold mb-4">Booking Failed</h1>
          <p className="text-lg mb-4">There was an issue with your booking. Please try again.</p>
        </div>
      )}

      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Result;
