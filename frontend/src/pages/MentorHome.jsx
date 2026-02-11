import MenteesList from "./MenteesList";
import ProgressGraph from "./ProgressGraph";
import ScheduleMeeting from "./ScheduleMeeting";
import StudentFeedback from "./StudentFeedback";

function MentorHome() {
  return (
    <div className="flex-1 bg-cream-50 min-h-screen p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-teal-800">
          Mentor Dashboard
        </h1>
        <span className="text-sm text-gray-500">
          Welcome back, Mentor
        </span>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressGraph />
        <ScheduleMeeting />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MenteesList showAdd={false} />
      
      </div>

    </div>
  );
}

export default MentorHome;
