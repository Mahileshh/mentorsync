// src/components/mentee/MenteeDashboard.jsx
import { useState } from 'react';
import { 
  Calendar, 
  Briefcase, 
  Target, 
  User,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  MessageSquare,
  Bell,
  Search,
  Star,
  FileText,
  ExternalLink
} from 'lucide-react';

const MenteeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const menteeData = {
    name: "Sarah Johnson",
    avatar: "SJ",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    rollNo: "CS2025-042",
    
    upcomingSession: {
      with: "Dr. Robert Chen",
      topic: "System Design Interview Prep",
      date: "Today, Feb 12",
      time: "4:00 PM - 5:00 PM",
      platform: "Google Meet"
    },

    placementStats: {
      applied: 12,
      assessments: 6,
      interviews: 3,
      offers: 1,
      profileStrength: 75
    },

    recentOffers: [
      { company: "StartupX", role: "SDE Intern", ctc: "₹12 LPA", date: "Feb 10, 2024" }
    ],

    activeApplications: [
      { 
        company: "Google", 
        role: "SWE Intern", 
        status: "Interview", 
        date: "Feb 15, 2024",
        icon: "🎯",
        color: "bg-blue-100 text-blue-700"
      },
      { 
        company: "Microsoft", 
        role: "Frontend Developer", 
        status: "Assessment", 
        date: "Feb 18, 2024",
        icon: "📝",
        color: "bg-yellow-100 text-yellow-700"
      },
      { 
        company: "Amazon", 
        role: "SDE", 
        status: "Applied", 
        date: "Jan 30, 2024",
        icon: "⏳",
        color: "bg-gray-100 text-gray-700"
      }
    ],

    companiesAttended: [
      { 
        name: "Google", 
        date: "Jan 15, 2024", 
        status: "Rejected", 
        round: "Technical Round 2",
        feedback: "Good DSA, need more system design"
      },
      { 
        name: "Microsoft", 
        date: "Dec 10, 2023", 
        status: "Offer Declined", 
        round: "Final Round",
        feedback: "Strong problem solving skills"
      },
      { 
        name: "Amazon", 
        date: "Nov 28, 2023", 
        status: "Interviewed", 
        round: "Hiring Committee",
        feedback: "Leadership principles need work"
      }
    ],

    goals: [
      { id: 1, title: "Complete 5 LeetCode problems daily", progress: 80, due: "Daily" },
      { id: 2, title: "System Design mock interview", progress: 60, due: "Feb 15" },
      { id: 3, title: "Resume review with mentor", progress: 100, due: "Completed" }
    ],

    mentorFeedback: [
      { 
        id: 1, 
        from: "Dr. Robert Chen", 
        message: "Great progress in DSA! Let's focus on DP this week.",
        date: "2 days ago",
        type: "praise"
      },
      { 
        id: 2, 
        from: "Dr. Robert Chen", 
        message: "Your resume is much stronger now. Ready for Amazon!",
        date: "1 week ago",
        type: "milestone"
      }
    ],

    upcomingDeadlines: [
      { company: "Salesforce", task: "Online Assessment", date: "Feb 20", priority: "high" },
      { company: "Adobe", task: "Application Deadline", date: "Feb 25", priority: "medium" },
      { company: "NVIDIA", task: "Resume Submission", date: "Mar 1", priority: "low" }
    ],

    skillProgress: [
      { skill: "Data Structures", level: 75, target: 90 },
      { skill: "System Design", level: 45, target: 80 },
      { skill: "DBMS", level: 60, target: 75 },
      { skill: "Aptitude", level: 85, target: 90 }
    ]
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'offer': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-yellow-100 text-yellow-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'offer declined': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">MentorConnect</span>
            </div>
            <div className="hidden md:flex ml-10 space-x-6">
              <a href="#" className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">My Mentor</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Sessions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Goals</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Placement</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-700 font-semibold text-sm">{menteeData.avatar}</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{menteeData.name}</p>
                <p className="text-xs text-gray-500">{menteeData.rollNo}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {menteeData.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600 mt-1">{menteeData.course} · {menteeData.year}</p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{menteeData.placementStats.applied}</p>
            <p className="text-sm text-gray-600">Applied</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Pending</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{menteeData.placementStats.assessments}</p>
            <p className="text-sm text-gray-600">Assessments</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded">Scheduled</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{menteeData.placementStats.interviews}</p>
            <p className="text-sm text-gray-600">Interviews</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded">Received</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{menteeData.placementStats.offers}</p>
            <p className="text-sm text-gray-600">Offers</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-end gap-1">
              <p className="text-2xl font-bold text-gray-900">{menteeData.placementStats.profileStrength}%</p>
              <span className="text-xs text-gray-500 mb-1">Profile</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${menteeData.placementStats.profileStrength}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Session Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Upcoming Session
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{menteeData.upcomingSession.topic}</h3>
                    <p className="text-sm text-gray-600">with {menteeData.upcomingSession.with}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {menteeData.upcomingSession.time}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Video className="w-3 h-3" />
                        {menteeData.upcomingSession.platform}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2">
                  Join Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Active Applications
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {menteeData.activeApplications.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{app.company}</p>
                        <p className="text-sm text-gray-600">{app.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${app.color}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-gray-500">{app.date}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies Attended */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-indigo-600" />
                  Placement History
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Company</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Round</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {menteeData.companiesAttended.map((company, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{company.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{company.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{company.round}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2.5 py-1.5 rounded-full ${getStatusColor(company.status)}`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{company.feedback}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Recent Offer Card */}
            {menteeData.recentOffers.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs text-green-700 font-medium">New Offer!</p>
                    <p className="text-sm font-semibold text-gray-900">{menteeData.recentOffers[0].company}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{menteeData.recentOffers[0].ctc}</p>
                <p className="text-sm text-gray-600 mb-4">{menteeData.recentOffers[0].role} · {menteeData.recentOffers[0].date}</p>
                <button className="w-full bg-white text-green-700 border border-green-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition">
                  View Offer Details
                </button>
              </div>
            )}

            {/* Goals Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  Goals
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Add New</button>
              </div>
              <div className="space-y-4">
                {menteeData.goals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                      <span className="text-xs text-gray-500">{goal.due}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${goal.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{goal.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-600" />
                Upcoming Deadlines
              </h2>
              <div className="space-y-3">
                {menteeData.upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.company}</p>
                      <p className="text-xs text-gray-600">{deadline.task}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high' ? 'bg-red-100 text-red-700' :
                        deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {deadline.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Feedback */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  Mentor Feedback
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {menteeData.mentorFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{feedback.from}</p>
                      <p className="text-sm text-gray-600 mt-1">{feedback.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{feedback.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Progress Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Skills Progress
              </h2>
              <div className="space-y-3">
                {menteeData.skillProgress.slice(0, 3).map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">{skill.skill}</p>
                      <span className="text-xs text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center justify-center gap-1">
                View Detailed Progress <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Building icon since it's used but not imported
const Building = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="10"></line>
    <line x1="15" y1="22" x2="15" y2="10"></line>
    <line x1="8" y1="6" x2="8" y2="6"></line>
    <line x1="12" y1="6" x2="12" y2="6"></line>
    <line x1="16" y1="6" x2="16" y2="6"></line>
    <line x1="8" y1="10" x2="8" y2="10"></line>
    <line x1="12" y1="10" x2="12" y2="10"></line>
    <line x1="16" y1="10" x2="16" y2="10"></line>
  </svg>
);

export default MenteeDashboard;