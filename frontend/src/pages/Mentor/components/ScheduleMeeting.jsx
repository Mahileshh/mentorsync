// src/pages/mentor/components/ScheduleMeetingModal.jsx
import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  AlertCircle,
  Search,
  ChevronRight,
  Award,
  User,
  Mail,
  Phone
} from 'lucide-react';

const ScheduleMeeting = ({ isOpen, onClose, mentees = [] }) => {
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    platform: 'Google Meet',
    agenda: ''
  });
  const [activeTab, setActiveTab] = useState('at-risk'); // 'at-risk' or 'all'

  // Categorize mentees
  const atRiskMentees = mentees.filter(m => m.status === 'at-risk' || m.status === 'warning');
  const otherMentees = mentees.filter(m => m.status !== 'at-risk' && m.status !== 'warning');

  // Filter mentees based on search
  const filterMentees = (menteeList) => {
    return menteeList.filter(mentee => 
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleMentee = (mentee) => {
    setSelectedMentees(prev => {
      const exists = prev.find(m => m.id === mentee.id);
      if (exists) {
        return prev.filter(m => m.id !== mentee.id);
      } else {
        return [...prev, mentee];
      }
    });
  };

  const selectAllAtRisk = () => {
    setSelectedMentees(atRiskMentees);
  };

  const clearSelection = () => {
    setSelectedMentees([]);
  };

  const handleSchedule = () => {
    // Here you'll integrate with your backend/Google Sheets
    console.log('Scheduling meeting:', {
      mentees: selectedMentees,
      meetingDetails
    });
    
    // Show success message
    alert(`Meeting scheduled with ${selectedMentees.length} mentee(s)`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Schedule Meeting</h2>
                <p className="text-sm text-white/80">Select mentees and set meeting details</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column - Mentee Selection */}
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search mentees by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('at-risk')}
                    className={`px-4 py-2 text-sm font-medium relative ${
                      activeTab === 'at-risk'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      At Risk & Warning
                      {atRiskMentees.length > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                          {atRiskMentees.length}
                        </span>
                      )}
                    </div>
                  </button>
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
                      All Mentees
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {otherMentees.length}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Quick Actions */}
                {activeTab === 'at-risk' && atRiskMentees.length > 0 && (
                  <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-amber-700">
                        {atRiskMentees.length} mentee(s) need attention
                      </span>
                    </div>
                    <button
                      onClick={selectAllAtRisk}
                      className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition"
                    >
                      Select All
                    </button>
                  </div>
                )}

                {/* Mentees List */}
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {activeTab === 'at-risk' 
                    ? filterMentees(atRiskMentees).map(mentee => (
                        <MenteeCheckbox
                          key={mentee.id}
                          mentee={mentee}
                          isSelected={selectedMentees.some(m => m.id === mentee.id)}
                          onToggle={() => toggleMentee(mentee)}
                        />
                      ))
                    : filterMentees(otherMentees).map(mentee => (
                        <MenteeCheckbox
                          key={mentee.id}
                          mentee={mentee}
                          isSelected={selectedMentees.some(m => m.id === mentee.id)}
                          onToggle={() => toggleMentee(mentee)}
                        />
                      ))
                  }
                </div>

                {/* Selected Count */}
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold">{selectedMentees.length}</span> mentee(s) selected
                  </span>
                  {selectedMentees.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column - Meeting Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Meeting Details
                </h3>

                <div className="space-y-4">
                  {/* Meeting Title */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Meeting Title
                    </label>
                    <input
                      type="text"
                      value={meetingDetails.title}
                      onChange={(e) => setMeetingDetails({...meetingDetails, title: e.target.value})}
                      placeholder="e.g., DSA Session, Resume Review, Mock Interview"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={meetingDetails.date}
                        onChange={(e) => setMeetingDetails({...meetingDetails, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={meetingDetails.time}
                        onChange={(e) => setMeetingDetails({...meetingDetails, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Duration & Platform */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <select
                        value={meetingDetails.duration}
                        onChange={(e) => setMeetingDetails({...meetingDetails, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Platform
                      </label>
                      <select
                        value={meetingDetails.platform}
                        onChange={(e) => setMeetingDetails({...meetingDetails, platform: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom">Zoom</option>
                        <option value="Microsoft Teams">Microsoft Teams</option>
                        <option value="In-Person">In-Person</option>
                      </select>
                    </div>
                  </div>

                  {/* Agenda */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Agenda / Notes
                    </label>
                    <textarea
                      value={meetingDetails.agenda}
                      onChange={(e) => setMeetingDetails({...meetingDetails, agenda: e.target.value})}
                      placeholder="What will be covered in this session?"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Selected Mentees Preview */}
                  {selectedMentees.length > 0 && (
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-teal-700 mb-2">
                        Meeting with:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMentees.slice(0, 3).map(mentee => (
                          <span key={mentee.id} className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full text-xs">
                            <User className="w-3 h-3 text-teal-600" />
                            {mentee.name.split(' ')[0]}
                          </span>
                        ))}
                        {selectedMentees.length > 3 && (
                          <span className="text-xs text-teal-600">
                            +{selectedMentees.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              disabled={selectedMentees.length === 0 || !meetingDetails.title || !meetingDetails.date || !meetingDetails.time}
              className="px-6 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mentee Checkbox Component
const MenteeCheckbox = ({ mentee, isSelected, onToggle }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'at-risk': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div 
      onClick={onToggle}
      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="flex-shrink-0 mr-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
        />
      </div>
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full flex items-center justify-center">
          <span className="text-xs font-semibold text-teal-700">
            {mentee.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{mentee.name}</p>
          {mentee.status && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(mentee.status)}`}>
              {mentee.status}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{mentee.rollNo} · {mentee.branch}</p>
      </div>
      <div className="flex-shrink-0 ml-2">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ScheduleMeeting;