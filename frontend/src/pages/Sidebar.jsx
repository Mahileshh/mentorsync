import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `block px-3 py-2 rounded-md text-sm transition 
     ${
       location.pathname === path
         ? "bg-white/10 text-white font-medium"
         : "text-white/80 hover:bg-white/5 hover:text-white"
     }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 px-6 py-8 flex flex-col">
      {/* Logo & Mentor Info - Make this dynamic with props or context */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          MentorFlow
        </h2>
        <p className="text-xs text-white/70 mt-1">
          Mentor · Dr. John {/* You can make this dynamic later */}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        <Link to="/" className={linkStyle("/")}>
          Dashboard
        </Link>
        <Link to="/mentees" className={linkStyle("/mentees")}>
          Mentees
        </Link>
        <Link to="/progress" className={linkStyle("/progress")}>
          Progress
        </Link>
        <Link to="/meetings" className={linkStyle("/meetings")}>
          Meetings
        </Link>
        <Link to="/feedback" className={linkStyle("/feedback")}>
          Feedback
        </Link>
      </nav>

      {/* Divider */}
      <div className="my-8 border-t border-white/10" />

      {/* Logout Button */}
      <Link
        to="/signin"
        className="text-sm text-red-400 hover:text-red-300 transition flex items-center gap-2"
      >
        <span>←</span> Logout
      </Link>
    </div>
  );
}

export default Sidebar;