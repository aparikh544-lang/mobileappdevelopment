import React, { useState, useEffect } from 'react';
import { Home, Calendar, Users, FileText, Newspaper, Share2, Menu, X, LogIn, User, ChevronRight, Edit2, Save } from 'lucide-react';

const FBLAApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    chapter: '',
    role: '',
    joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  });

  // Load Google Sign-In API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      setUserData({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
      setIsLoggedIn(true);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error processing Google Sign-In:', error);
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      alert('Google Sign-In is still loading. Please wait a moment and try again.');
    }
  };

  const handleSignOut = () => {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    setIsLoggedIn(false);
    setUserData(null);
    setProfileData({
      chapter: '',
      role: '',
      joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
  };

  // Mock events data
  const events = [
    { id: 1, name: 'Business Presentation', type: 'presentation', date: '2026-03-15', description: 'Individual presentation on business topics' },
    { id: 2, name: 'Introduction to Business', type: 'test', date: '2026-03-15', description: 'Objective test covering business fundamentals' },
    { id: 3, name: 'Banking & Financial Systems', type: 'roleplay', date: '2026-03-16', description: 'Roleplay event in financial services' },
    { id: 4, name: 'Marketing', type: 'presentation', date: '2026-03-16', description: 'Team presentation on marketing strategies' },
    { id: 5, name: 'Economics', type: 'test', date: '2026-03-17', description: 'Objective test on economic principles' },
    { id: 6, name: 'Management Decision Making', type: 'roleplay', date: '2026-03-17', description: 'Roleplay focused on management scenarios' },
    { id: 7, name: 'Entrepreneurship', type: 'presentation', date: '2026-03-18', description: 'Individual presentation on entrepreneurial ventures' },
    { id: 8, name: 'Business Law', type: 'test', date: '2026-03-18', description: 'Objective test covering business legal concepts' },
  ];

  // Mock resources data
  const resources = [
    { id: 1, title: 'Competitive Events Guidelines', category: 'Competitions', link: '#' },
    { id: 2, title: 'Parliamentary Procedure Guide', category: 'Leadership', link: '#' },
    { id: 3, title: 'Business Ethics Case Studies', category: 'Learning', link: '#' },
    { id: 4, title: 'National Conference Information', category: 'Events', link: '#' },
    { id: 5, title: 'Chapter Management Handbook', category: 'Leadership', link: '#' },
    { id: 6, title: 'Test Preparation Materials', category: 'Competitions', link: '#' },
  ];

  // Mock news data
  const newsItems = [
    { 
      id: 1, 
      title: 'FBLA National Leadership Conference Registration Open', 
      date: '2026-02-10',
      summary: 'Registration is now open for the 2026 National Leadership Conference in Atlanta, GA. Early bird pricing available until March 1st.',
      image: '🏆'
    },
    { 
      id: 2, 
      title: 'New Competitive Events Added for 2026', 
      date: '2026-02-05',
      summary: 'FBLA announces three new competitive events focusing on digital marketing, cryptocurrency, and sustainable business practices.',
      image: '📢'
    },
    { 
      id: 3, 
      title: 'State Leadership Conference Results', 
      date: '2026-01-28',
      summary: 'Congratulations to all participants in the State Leadership Conference. National qualifiers have been announced.',
      image: '🎉'
    },
  ];

  // Social media accounts
  const socialMedia = [
    { platform: 'Instagram', handle: '@fbla_national', url: '#', color: 'bg-gradient-to-br from-purple-600 to-pink-500', icon: '📷' },
    { platform: 'Twitter/X', handle: '@FBLA_National', url: '#', color: 'bg-black', icon: '𝕏' },
    { platform: 'LinkedIn', handle: 'FBLA-PBL', url: '#', color: 'bg-blue-700', icon: '💼' },
    { platform: 'Facebook', handle: '/FutureBusinessLeaders', url: '#', color: 'bg-blue-600', icon: '📘' },
    { platform: 'TikTok', handle: '@fbla_national', url: '#', color: 'bg-gradient-to-br from-black to-cyan-400', icon: '🎵' },
    { platform: 'YouTube', handle: '@FBLANational', url: '#', color: 'bg-red-600', icon: '▶️' },
  ];

  const navigation = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'Events', icon: Calendar, id: 'events' },
    { name: 'Profile', icon: Users, id: 'profile' },
    { name: 'Resources', icon: FileText, id: 'resources' },
    { name: 'News', icon: Newspaper, id: 'news' },
    { name: 'Social', icon: Share2, id: 'social' },
  ];

  const renderCalendar = () => {
    const daysInMonth = 31;
    const firstDay = 5;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const eventDates = events.map(e => new Date(e.date).getDate());

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">March 2026</h3>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const hasEvent = eventDates.includes(day);
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                  ${hasEvent ? 'bg-blue-600 text-white font-bold hover:bg-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                  ${selectedDate === day ? 'ring-2 ring-blue-400' : ''}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to FBLA Connect</h1>
        <p className="text-lg mb-6 leading-relaxed">
          Future Business Leaders of America is the premier student business organization for high school and middle school students. 
          FBLA helps students prepare for careers in business through academic competitions, leadership development, and networking opportunities.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl font-bold">230,000+</div>
            <div className="text-sm">Members</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl font-bold">6,500+</div>
            <div className="text-sm">Chapters</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl font-bold">60+</div>
            <div className="text-sm">Events</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setCurrentPage('events')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">Upcoming Events</h3>
          <p className="text-gray-600 text-sm">View and register for competitive events</p>
        </button>

        <button 
          onClick={() => setCurrentPage('resources')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">Resources</h3>
          <p className="text-gray-600 text-sm">Access guides, documents, and study materials</p>
        </button>

        <button 
          onClick={() => setCurrentPage('news')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <Newspaper className="w-8 h-8 text-blue-600" />
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">Latest News</h3>
          <p className="text-gray-600 text-sm">Stay updated with FBLA announcements</p>
        </button>

        <button 
          onClick={() => setCurrentPage('social')}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <Share2 className="w-8 h-8 text-blue-600" />
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-1">Connect With Us</h3>
          <p className="text-gray-600 text-sm">Follow FBLA on social media</p>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          FBLA inspires and prepares students to become community-minded business leaders in a global society through relevant career preparation and leadership experiences.
        </p>
      </div>
    </div>
  );

  const renderEvents = () => {
    const eventsByType = {
      presentation: events.filter(e => e.type === 'presentation'),
      test: events.filter(e => e.type === 'test'),
      roleplay: events.filter(e => e.type === 'roleplay'),
    };

    const selectedDayEvents = selectedDate ? events.filter(e => new Date(e.date).getDate() === selectedDate) : [];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Competitive Events</h1>
          <p className="mt-2">Explore FBLA's diverse competitive events and mark your calendar</p>
        </div>

        {renderCalendar()}

        {selectedDate && selectedDayEvents.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <h3 className="font-bold text-blue-900 mb-2">Events on March {selectedDate}</h3>
            {selectedDayEvents.map(event => (
              <div key={event.id} className="text-sm text-blue-800 py-1">
                • {event.name} ({event.type})
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2">
                {eventsByType.presentation.length}
              </span>
              Presentation Events
            </h2>
            <div className="grid gap-3">
              {eventsByType.presentation.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{event.name}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-2">
                {eventsByType.test.length}
              </span>
              Test Events
            </h2>
            <div className="grid gap-3">
              {eventsByType.test.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{event.name}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2">
                {eventsByType.roleplay.length}
              </span>
              Roleplay Events
            </h2>
            <div className="grid gap-3">
              {eventsByType.roleplay.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{event.name}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> For the complete list of all FBLA competitive events and detailed guidelines, visit the official FBLA website.
          </p>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in with your Google account to view your profile</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
              <p className="text-sm text-blue-900 font-semibold mb-2">🔒 Setup Instructions:</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                To enable real Google authentication, you'll need to create a Google Cloud project and get OAuth credentials. 
                Check the documentation in the code comments for step-by-step setup instructions.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Member Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            {userData.picture ? (
              <img 
                src={userData.picture} 
                alt={userData.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">{profileData.role || 'Member'}</p>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isEditingProfile ? <Save className="w-5 h-5 text-blue-600" /> : <Edit2 className="w-5 h-5 text-gray-600" />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-800">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chapter</p>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.chapter}
                      onChange={(e) => setProfileData({...profileData, chapter: e.target.value})}
                      placeholder="Enter your chapter"
                      className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{profileData.chapter || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                      placeholder="Enter your role"
                      className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{profileData.role || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-semibold text-gray-800">{profileData.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {isEditingProfile && (
            <button
              onClick={handleProfileUpdate}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">My Events</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-gray-700">Business Presentation</span>
              <span className="text-sm text-gray-600">March 15, 2026</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-gray-700">Economics Test</span>
              <span className="text-sm text-gray-600">March 17, 2026</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  };

  const renderResources = () => {
    const resourcesByCategory = resources.reduce((acc, resource) => {
      if (!acc[resource.category]) acc[resource.category] = [];
      acc[resource.category].push(resource);
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Resources & Documents</h1>
          <p className="mt-2">Access FBLA guides, handbooks, and educational materials</p>
        </div>

        {Object.entries(resourcesByCategory).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{category}</h2>
            <div className="bg-white rounded-lg shadow-md divide-y">
              {items.map(resource => (
                <a
                  key={resource.id}
                  href={resource.link}
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600">
                      {resource.title}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> All resources are available for download. Check back regularly for updated materials and new study guides.
          </p>
        </div>
      </div>
    );
  };

  const renderNews = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold">FBLA News Feed</h1>
        <p className="mt-2">Stay updated with the latest announcements and updates</p>
      </div>

      <div className="space-y-4">
        {newsItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.summary}</p>
                  <button className="mt-3 text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800 text-center">
          For more news and updates, visit the official FBLA website and subscribe to our newsletter.
        </p>
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Connect With FBLA</h1>
        <p className="mt-2">Follow us on social media to stay connected with the FBLA community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialMedia.map(social => (
          <a
            key={social.platform}
            href={social.url}
            className={`${social.color} text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-4xl">{social.icon}</div>
              <div>
                <h3 className="text-xl font-bold">{social.platform}</h3>
                <p className="text-white/90 text-sm">{social.handle}</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">Follow for updates, events, and community highlights</p>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Why Follow Us?</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-gray-700">Get real-time updates on competitions and events</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-gray-700">Connect with FBLA members across the country</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-gray-700">Access exclusive content and success stories</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-gray-700">Stay inspired with leadership tips and business insights</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'events': return renderEvents();
      case 'profile': return renderProfile();
      case 'resources': return renderResources();
      case 'news': return renderNews();
      case 'social': return renderSocial();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <h1 className="text-xl font-bold text-gray-800">FBLA Connect</h1>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden lg:flex space-x-1">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navigation.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2026 Future Business Leaders of America. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">Empowering tomorrow's business leaders today.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FBLAApp;

/*
 * GOOGLE OAUTH SETUP INSTRUCTIONS
 * ================================
 * 
 * To enable real Google Sign-In, follow these steps:
 * 
 * 1. Create a Google Cloud Project:
 *    - Go to https://console.cloud.google.com/
 *    - Create a new project or select an existing one
 * 
 * 2. Enable Google+ API:
 *    - In the Google Cloud Console, go to "APIs & Services" > "Library"
 *    - Search for "Google+ API" and enable it
 * 
 * 3. Create OAuth 2.0 Credentials:
 *    - Go to "APIs & Services" > "Credentials"
 *    - Click "Create Credentials" > "OAuth client ID"
 *    - Choose "Web application"
 *    - Add authorized JavaScript origins (e.g., http://localhost:3000, https://yourdomain.com)
 *    - Add authorized redirect URIs if needed
 *    - Copy the Client ID
 * 
 * 4. Replace the Client ID:
 *    - Find the line with: client_id: '1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com'
 *    - Replace it with your actual Client ID from step 3
 * 
 * 5. Security Notes:
 *    - NEVER commit your real Client ID to public repositories
 *    - Use environment variables for production (e.g., process.env.REACT_APP_GOOGLE_CLIENT_ID)
 *    - The Client ID is safe to use in client-side code (it's designed for that)
 *    - Keep your Client Secret secure (not used in this implementation)
 * 
 * 6. Testing:
 *    - The app will work once you replace the Client ID
 *    - You'll be able to sign in with any Google account
 *    - User data (name, email, profile picture) will be pulled from Google
 * 
 * 7. For Production Deployment:
 *    - Update authorized origins to include your production domain
 *    - Consider adding additional OAuth scopes if needed
 *    - Implement proper error handling for failed authentication
 * 
 * Need help? Check the Google Identity Services documentation:
 * https://developers.google.com/identity/gsi/web/guides/overview
 */