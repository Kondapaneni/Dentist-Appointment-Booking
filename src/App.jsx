import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import DentistList from "./components/DentistList.jsx";
import BookAppointment from "./components/BookAppointment.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { Stethoscope, Home, Settings } from "lucide-react";

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Stethoscope className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              DentalCare
            </span>
          </Link>

          <div className="flex gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Dentists</span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive("/admin")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<DentistList />} />
          <Route path="/book/:dentistId" element={<BookAppointment />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
