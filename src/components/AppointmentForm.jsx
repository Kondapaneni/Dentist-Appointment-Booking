import { useState } from 'react';
import { Calendar, User, Hash, Users } from 'lucide-react';

export default function AppointmentForm({ dentist, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    gender: '',
    appointment_date: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h2>
        {dentist && (
          <div className="text-gray-600">
            <p className="font-medium">{dentist.name}</p>
            <p className="text-sm">{dentist.clinic_name}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700 mb-1.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Name
            </div>
          </label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter patient name"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1.5">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Age
            </div>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1.5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Gender
            </div>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700 mb-1.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointment Date
            </div>
          </label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            min={today}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
