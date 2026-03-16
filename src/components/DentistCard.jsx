import { MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function DentistCard({ dentist, onBookAppointment }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={dentist.photo_url}
          alt={dentist.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{dentist.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-gray-600">
            <GraduationCap className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
            <span className="text-sm">{dentist.qualification}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase className="w-4 h-4 flex-shrink-0 text-green-600" />
            <span className="text-sm">{dentist.experience} experience</span>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            {dentist.clinic_name}
          </h4>
          <p className="text-sm text-gray-600 mb-1">{dentist.address}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{dentist.location}</span>
          </div>
        </div>

        <button
          onClick={() => onBookAppointment(dentist.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
