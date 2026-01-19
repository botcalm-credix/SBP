import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, Wallet, Settings } from 'lucide-react';
import { Sidebar, ViewType } from './components/Sidebar';
import { BetSlip } from './components/BetSlip';
import { MatchCard } from './components/MatchCard';
import { AIAssistant } from './components/AIAssistant';
import { InteractiveBanner } from './components/InteractiveBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LoginModal } from './components/LoginModal';
import { SignupModal } from './components/SignupModal';
import { Match, Bet, SportType } from './types';

// Extended Mock Data
const MOCK_MATCHES: Match[] = [
  // Live Matches
  {
    id: 'live1',
    league: 'Premier League',
    homeTeam: { name: 'Liverpool FC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png' },
    awayTeam: { name: 'Man United', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png' },
    startTime: 'Live',
    status: 'Live',
    minute: 74,
    score: { home: 1, away: 1 },
    odds: { home: 2.80, draw: 2.10, away: 3.50 }
  },
  {
    id: 'live2',
    league: 'Serie A',
    homeTeam: { name: 'Napoli', logo: '/napoli.png' },
    awayTeam: { name: 'Inter Milan', logo: 'https://crests.football-data.org/108.svg' },
    startTime: 'Live',
    status: 'Live',
    minute: 62,
    score: { home: 2, away: 1 },
    odds: { home: 2.10, draw: 2.80, away: 3.70 }
  },
  {
    id: 'live3',
    league: 'Ligue 1',
    homeTeam: { name: 'PSG', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png' },
    awayTeam: { name: 'Marseille', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png' },
    startTime: 'Live',
    status: 'Live',
    minute: 12,
    score: { home: 0, away: 0 },
    odds: { home: 1.40, draw: 4.50, away: 7.00 }
  },
  // Upcoming Today
  {
    id: 'up1',
    league: 'La Liga',
    homeTeam: { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' },
    awayTeam: { name: 'Atletico', logo: 'https://crests.football-data.org/78.svg' },
    startTime: 'Today, 10:00 PM',
    status: 'Scheduled',
    odds: { home: 1.70, draw: 4.10, away: 2.05 }
  },
  {
    id: 'up2',
    league: 'Bundesliga',
    homeTeam: { name: 'Leverkusen', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png' },
    awayTeam: { name: 'RB Leipzig', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png' },
    startTime: 'Today, 08:45 PM',
    status: 'Scheduled',
    odds: { home: 2.20, draw: 3.50, away: 3.00 }
  },
  // Schedule Tomorrow
  {
    id: 'sch1',
    league: 'Bundesliga',
    homeTeam: { name: 'B. Dortmund', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png' },
    awayTeam: { name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' },
    startTime: 'Tomorrow, 05:30 PM',
    status: 'Scheduled',
    odds: { home: 3.20, draw: 3.80, away: 1.95 }
  },
  {
    id: 'sch2',
    league: 'Premier League',
    homeTeam: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png' },
    awayTeam: { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png' },
    startTime: 'Tomorrow, 02:00 PM',
    status: 'Scheduled',
    odds: { home: 1.90, draw: 3.60, away: 3.80 }
  },
  // Schedule Weekend
  {
    id: 'sch3',
    league: 'Serie A',
    homeTeam: { name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png' },
    awayTeam: { name: 'AC Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png' },
    startTime: 'Sat, 18:00',
    status: 'Scheduled',
    odds: { home: 2.40, draw: 3.10, away: 2.90 }
  }
];

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<SportType>(SportType.FOOTBALL);
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Authentication Handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfileMenuOpen(false);
    setBets([]); // Clear bets on logout
  };

  // Handle betting logic
  const handleBetSelect = (match: Match, selection: '1' | 'X' | '2', odds: number) => {
    // Optional: Trigger login if trying to bet while logged out
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    const existingBetIndex = bets.findIndex(b => b.matchId === match.id);
    const newBet: Bet = {
      id: Math.random().toString(36).substr(2, 9),
      matchId: match.id,
      matchTitle: `${match.homeTeam.name} - ${match.awayTeam.name}`,
      selection,
      odds,
      stake: 10
    };

    if (existingBetIndex >= 0) {
      const updatedBets = [...bets];
      updatedBets[existingBetIndex] = newBet;
      setBets(updatedBets);
    } else {
      setBets([...bets, newBet]);
    }
  };

  const removeBet = (id: string) => {
    setBets(bets.filter(b => b.id !== id));
  };

  const handlePlaceBet = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    alert('Bets placed successfully! Good luck!');
    setBets([]);
  };

  // Handle Favorites
  const toggleFavorite = (id: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) {
      newFavs.delete(id);
    } else {
      newFavs.add(id);
    }
    setFavorites(newFavs);
  };

  // View Logic
  const getFilteredMatches = () => {
    switch (currentView) {
      case 'live':
        return MOCK_MATCHES.filter(m => m.status === 'Live');
      case 'schedule':
        return MOCK_MATCHES.filter(m => m.status === 'Scheduled');
      case 'favorites':
        return MOCK_MATCHES.filter(m => favorites.has(m.id));
      case 'overview':
      case 'betslip': // bets handled separately, matches generic
      default:
        // For overview, we show all, or a mix.
        return MOCK_MATCHES;
    }
  };

  const renderContent = () => {
    if (currentView === 'betslip') {
      return (
        <div className="h-full flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">My Bet Slip</h2>
          <div className="flex-1">
            <BetSlip
              bets={bets}
              onRemoveBet={removeBet}
              onPlaceBet={handlePlaceBet}
              onClearBets={() => setBets([])}
            />
          </div>
        </div>
      );
    }

    const matches = getFilteredMatches();

    if (currentView === 'overview') {
      const liveMatches = MOCK_MATCHES.filter(m => m.status === 'Live');
      const upcomingMatches = MOCK_MATCHES.filter(m => m.status === 'Scheduled' && m.startTime.includes('Today'));

      return (
        <>
          {/* Hero Banner with Interactive Tilt & AI Generation */}
          <InteractiveBanner />

          <h2 className="text-xl font-bold text-white mb-4">Live Now</h2>
          <div className="space-y-3 mb-8">
            {liveMatches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                isFavorite={favorites.has(match.id)}
                onToggleFavorite={toggleFavorite}
                onBetSelect={(sel, odds) => handleBetSelect(match, sel, odds)}
              />
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Highlights Today</h2>
          <div className="space-y-3">
            {upcomingMatches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                isFavorite={favorites.has(match.id)}
                onToggleFavorite={toggleFavorite}
                onBetSelect={(sel, odds) => handleBetSelect(match, sel, odds)}
              />
            ))}
          </div>
        </>
      );
    }

    // Generic List for other views
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white capitalize">{currentView} Matches</h2>
          <span className="text-sm text-gray-500">{matches.length} Games</span>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No matches found in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                isFavorite={favorites.has(match.id)}
                onToggleFavorite={toggleFavorite}
                onBetSelect={(sel, odds) => handleBetSelect(match, sel, odds)}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 font-sans text-gray-300 flex flex-col">

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Header */}
      <header className="h-16 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-400">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center font-bold text-white text-xs">SBS</div>
            <span className="font-bold text-white text-lg hidden sm:block">SBS</span>
          </div>

          <nav className="hidden md:flex ml-8 space-x-1">
            {Object.values(SportType).map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSport === sport
                  ? 'bg-brand-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
                  }`}
              >
                {sport}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center bg-dark-800 rounded-full px-3 py-1.5 border border-dark-700">
                <span className="text-gray-400 text-xs mr-2">Balance:</span>
                <span className="text-white font-bold text-sm">1,500.00 USD</span>
                <button className="ml-2 w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-600">+</button>
              </div>

              <button className="text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-status-red rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-dark-800 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/20">GC</div>
                  <span className="hidden md:block text-sm text-white font-medium">George</span>
                  <ChevronDown size={14} className={`hidden md:block transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <>
                    {/* Invisible backdrop to close menu */}
                    <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)}></div>

                    <div className="absolute right-0 top-full mt-2 w-56 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden ring-1 ring-white/5">
                      <div className="p-4 border-b border-dark-700 bg-dark-900/50">
                        <p className="text-sm font-bold text-white">George C.</p>
                        <p className="text-xs text-gray-500 truncate">george@example.com</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white rounded-lg flex items-center transition-colors">
                          <User size={16} className="mr-3 text-gray-500" /> My Profile
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white rounded-lg flex items-center transition-colors">
                          <Wallet size={16} className="mr-3 text-gray-500" /> Wallet
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white rounded-lg flex items-center transition-colors">
                          <Settings size={16} className="mr-3 text-gray-500" /> Settings
                        </button>
                      </div>
                      <div className="border-t border-dark-700 p-2 bg-dark-900/30">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm text-status-red hover:bg-status-red/10 rounded-lg flex items-center transition-colors font-medium"
                        >
                          <LogOut size={16} className="mr-3" /> Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="bg-brand-blue hover:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 relative">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            setSidebarOpen(false); // Close sidebar on mobile on nav
          }}
        />

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:mr-80 pb-24 md:pb-6">
          {renderContent()}
        </main>

        {/* Right Sidebar - Bet Slip & Widgets */}
        <aside className="hidden lg:flex flex-col w-80 fixed right-0 top-16 bottom-0 bg-dark-900 border-l border-dark-700 p-6 space-y-6 overflow-y-auto">

          {/* Popular Live Match Widget */}
          <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white">Popular Live</h3>
              <span className="text-xs text-brand-blue cursor-pointer" onClick={() => setCurrentView('live')}>View All</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center mb-1 mx-auto border border-blue-500/20 overflow-hidden">
                  <img
                    src="/napoli.png"
                    alt="Napoli"
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Napoli&background=fff&color=000&rounded=true`; }}
                  />
                </div>
                <span className="text-xs text-gray-400">Napoli</span>
              </div>
              <div className="text-center flex flex-col items-center">
                <span className="text-xs text-status-red font-bold animate-pulse mb-1">Live</span>
                <span className="text-2xl font-bold text-white">2 : 1</span>
                <span className="text-xs text-gray-500">62'</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center mb-1 mx-auto border border-indigo-500/20 overflow-hidden">
                  <img
                    src="https://crests.football-data.org/108.svg"
                    alt="Inter"
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Inter&background=fff&color=000&rounded=true`; }}
                  />
                </div>
                <span className="text-xs text-gray-400">Inter</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-dark-900 rounded p-2 text-center cursor-pointer hover:bg-dark-700">
                <div className="text-xs text-gray-500">1</div>
                <div className="text-sm font-bold text-white">2.10</div>
              </div>
              <div className="bg-dark-900 rounded p-2 text-center cursor-pointer hover:bg-dark-700">
                <div className="text-xs text-gray-500">X</div>
                <div className="text-sm font-bold text-white">2.80</div>
              </div>
              <div className="bg-dark-900 rounded p-2 text-center cursor-pointer hover:bg-dark-700">
                <div className="text-xs text-gray-500">2</div>
                <div className="text-sm font-bold text-white">3.70</div>
              </div>
            </div>
          </div>

          {/* Bet Slip Component */}
          <div className="flex-1">
            <BetSlip
              bets={bets}
              onRemoveBet={removeBet}
              onPlaceBet={handlePlaceBet}
              onClearBets={() => setBets([])}
            />
          </div>

        </aside>

      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        betCount={bets.length}
      />

      {/* AI Chat Bot */}
      <AIAssistant />

    </div>
  );
};

export default App;