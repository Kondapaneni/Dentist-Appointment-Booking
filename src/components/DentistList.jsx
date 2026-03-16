import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DentistCard from "./DentistCard.jsx";
import { api } from "../services/api.js";
import { Stethoscope, Loader2 } from "lucide-react";

export default function DentistList() {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDentists();
  }, []);

  const loadDentists = async () => {
    try {
      setLoading(true);
      const data = await api.getDentists();
      setDentists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (dentistId) => {
    navigate(`/book/${dentistId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dentists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Find Your Dentist
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our network of experienced dental professionals and book your
            appointment today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              dentist={dentist}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
