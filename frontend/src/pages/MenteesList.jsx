// src/pages/mentor/MenteesList.jsx
import { useState, useEffect } from 'react';
import { 
  Search, 
  Trophy, 
  Crown,
  Medal,
  ChevronRight,
  UserPlus,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  GraduationCap,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';

function MenteesList({ showAdd = true, menteesData = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rp");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'csbs'

  // Get CSBS students (first 5 from sheet)
  const csbsStudents = menteesData
    .filter(m => m.branch === 'CSBS')
    .slice(0, 5); // FIRST 5 ONLY
  
  // Get other students (non-CSBS)
  const otherStudents = menteesData.filter(m => m.branch !== 'CSBS');
  
  // Combine: FIRST 5 CSBS + other students sorted by RP
  const displayMentees = () => {
    if (activeTab === 'csbs') {
      return csbsStudents.map((mentee, index) => ({
        ...mentee,
        rank: index + 1,
        isFirstFive: true
      }));
    }
    
    // For 'all' tab: Show CSBS first 5, then others sorted by RP
    const sortedOthers = [...otherStudents]
      .sort((a, b) => (b.rp || 0) - (a.rp || 0))
      .map((mentee, index) => ({
        ...mentee,
        rank: csbsStudents.length + index + 1,
        isFirstFive: false
      }));
    
    const csbsWithRank = csbsStudents.map((mentee, index) => ({
      ...mentee,
      rank: index + 1,
      isFirstFive: true
    }));
    
    return [...csbsWithRank, ...sortedOthers];
  };

  // Filter based on search
  const filteredMentees = displayMentees()
    .filter(mentee => 
      mentee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.branch?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-700";
      case "warning": return "bg-yellow-100 text-yellow-700";
      case "at-risk": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Get RP color
  const getRpColor = (rp) => {
    if (rp >= 2000) return "text-green-600 bg-green-50";
    if (rp >= 1500) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  // Add new mentee
  const addMentee = () => {
    const name = prompt("Enter mentee name:");
    if (name && name.trim() !== "") {
      alert("In real app, this would add to Google Sheets");
    }
  };

  return (
    <div className="space-y-4">
      {/* Department Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 border-b border-gray-200 pb-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === 'all'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              All Students
            </div>
          </button>
          <button
            onClick={() => setActiveTab('csbs')}
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === 'csbs'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              CSBS First 5
              <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full">
                {csbsStudents.length}
              </span>
            </div>
          </button>
        </div>
        
        {/* CSBS First 5 Badge */}
        {activeTab === 'all' && csbsStudents.length > 0 && (
          <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-medium text-teal-700">
              First 5 CSBS students from sheet
            </span>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, roll number, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm"
          >
            <option value="rp">Sort by RP (Highest)</option>
            <option value="name">Sort by Name</option>
          </select>
          
          {showAdd && (
            <button
              onClick={addMentee}
              className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Mentee</span>
            </button>
          )}
        </div>
      </div>

      {/* CSBS First 5 Highlight Banner - Only show in 'all' tab */}
      {activeTab === 'all' && csbsStudents.length > 0 && (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  CSBS Department - First 5 Students from Google Sheets
                  <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">
                    Live Data
                  </span>
                </h3>
                <p className="text-xs text-teal-100 mt-0.5">
                  These are rows 1-5 from the CSBS tab • Updates every 5 minutes
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {csbsStudents.map((_, i) => (
                <div key={i} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  #{i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Mentee</div>
          <div className="col-span-2">RP Total</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1"></div>
        </div>

        {/* Mentee Rows */}
        <div className="divide-y divide-gray-100">
          {filteredMentees.slice(0, activeTab === 'csbs' ? 5 : 10).map((mentee) => (
            <div 
              key={mentee.id || mentee.rollNo} 
              className={`grid grid-cols-12 gap-4 p-4 transition items-center ${
                mentee.isFirstFive 
                  ? 'bg-gradient-to-r from-teal-50/50 to-white hover:from-teal-100/50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                {mentee.rank === 1 ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : mentee.rank === 2 ? (
                  <Medal className="w-5 h-5 text-gray-400" />
                ) : mentee.rank === 3 ? (
                  <Medal className="w-5 h-5 text-amber-600" />
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">#{mentee.rank}</span>
                    {mentee.isFirstFive && (
                      <Sparkles className="w-3 h-3 text-teal-500" />
                    )}
                  </div>
                )}
              </div>

              {/* Mentee Info */}
              <div className="col-span-4 flex items-center gap-3">
                <div className={`relative ${
                  mentee.isFirstFive ? 'ring-2 ring-teal-400 ring-offset-2' : ''
                } rounded-full`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    mentee.branch === 'CSBS' 
                      ? 'bg-gradient-to-br from-teal-100 to-teal-50' 
                      : 'bg-gradient-to-br from-indigo-100 to-purple-100'
                  }`}>
                    <span className={`text-sm font-semibold ${
                      mentee.branch === 'CSBS' ? 'text-teal-700' : 'text-indigo-700'
                    }`}>
                      {mentee.avatar || mentee.name?.split(' ').map(n => n[0]).join('') || '?'}
                    </span>
                  </div>
                  {mentee.isFirstFive && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">{mentee.rank}</span>
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{mentee.name || 'Unknown'}</p>
                    {mentee.branch === 'CSBS' && mentee.isFirstFive && (
                      <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        Row {mentee.rank}
                      </span>
                    )}
                    {mentee.branch === 'CSBS' && !mentee.isFirstFive && (
                      <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                        CSBS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{mentee.rollNo || 'N/A'}</p>
                  {mentee.isFirstFive && mentee.email && (
                    <p className="text-[10px] text-teal-600 mt-0.5 truncate max-w-[150px]">
                      {mentee.email}
                    </p>
                  )}
                </div>
              </div>

              {/* RP Total */}
              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className={`text-lg font-bold ${
                    mentee.isFirstFive ? 'text-teal-700' : 'text-gray-900'
                  }`}>
                    {mentee.rp || 0}
                  </span>
                  <span className="text-xs text-gray-500">RP</span>
                </div>
                {mentee.isFirstFive && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${getRpColor(mentee.rp)}`}>
                    {mentee.rp >= 2000 ? '🏆 Active' : mentee.rp >= 1500 ? '⚠️ Warning' : '🔴 At Risk'}
                  </span>
                )}
              </div>

              {/* Department */}
              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  {mentee.branch === 'CSBS' && <GraduationCap className="w-3 h-3 text-teal-600" />}
                  <p className={`text-sm ${
                    mentee.branch === 'CSBS' ? 'font-medium text-teal-600' : 'text-gray-900'
                  }`}>
                    {mentee.branch || 'N/A'}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{mentee.year || '3rd Year'}</p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(mentee.status)}`}>
                  {mentee.status || 'active'}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 flex justify-end">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredMentees.length === 0 && (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No mentees found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>

      {/* CSBS First 5 Summary */}
      {activeTab === 'all' && csbsStudents.length > 0 && (
        <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-teal-800 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              CSBS First 5 Students - Real-time from Sheet
            </h4>
            <span className="text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
              Rows 1-5
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {csbsStudents.map((student, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-teal-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium text-gray-900 truncate">
                    {student.name?.split(' ')[0] || 'Student'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500">RP</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    student.rp >= 2000 ? 'bg-green-100 text-green-700' :
                    student.rp >= 1500 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {student.rp || 0}
                  </span>
                </div>
                <p className="text-[8px] text-gray-400 mt-1 truncate">
                  {student.rollNo || 'N/A'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-teal-600 mt-3 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            These are the actual first 5 rows from the CSBS tab in Google Sheets • Auto-updates every 5 min
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Students</p>
          <p className="text-xl font-bold text-gray-900">{menteesData.length}</p>
          <p className="text-xs text-gray-400 mt-1">across all departments</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Average RP</p>
          <p className="text-xl font-bold text-gray-900">
            {Math.round(menteesData.reduce((sum, s) => sum + (s.rp || 0), 0) / (menteesData.length || 1))}
          </p>
          <p className="text-xs text-gray-400 mt-1">college-wide</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">CSBS Total</p>
          <p className="text-xl font-bold text-teal-600">
            {menteesData.filter(m => m.branch === 'CSBS').length}
          </p>
          <p className="text-xs text-gray-400 mt-1">students in department</p>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-white/80">CSBS First 5</p>
          <p className="text-xl font-bold text-white">
            {csbsStudents.length} Students
          </p>
          <p className="text-xs text-white/80 mt-1">Rows 1-5 from sheet</p>
          <p className="text-[10px] text-white/60 mt-1">
            Avg RP: {Math.round(csbsStudents.reduce((sum, s) => sum + (s.rp || 0), 0) / (csbsStudents.length || 1))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenteesList;