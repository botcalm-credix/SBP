import React from 'react';
import { useEffect } from 'react';
import { Trophy, Globe, Activity, Star, LayoutGrid, Calendar } from 'lucide-react';

export type ViewType = 'overview' | 'live' | 'schedule' | 'favorites' | 'betslip' | 'match-detail';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onNavigate }) => {

  

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);

  const popularLeagues = [
    { name: 'Champions League', count: 38, logo: 'https://crests.football-data.org/CL.png' },
    { name: 'Premier League', count: 153, logo: 'https://crests.football-data.org/PL.png' },
    { name: 'La Liga', count: 156, logo: 'https://crests.football-data.org/PD.png' },
    { name: 'Serie A', count: 148, logo: 'https://crests.football-data.org/SA.png' },
    { name: 'Bundesliga', count: 150, logo: 'https://crests.football-data.org/BL1.png' },
    { name: 'Ligue 1', count: 159, logo: 'https://crests.football-data.org/FL1.png' },
  ];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky md:top-16 z-40 w-64 h-[calc(100vh-64px)] bg-dark-900 border-r border-dark-700 overflow-y-auto transition-transform duration-300 ease-in-out`}>
      <div className="p-4 space-y-6">

        {/* Main Nav */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Menu</h3>
          <nav className="space-y-1">
            <NavItem
              icon={<LayoutGrid size={18} />}
              label="Overview"
              active={currentView === 'overview'}
              onClick={() => onNavigate('overview')}
            />
            <NavItem
              icon={<Activity size={18} />}
              label="Live Games"
              active={currentView === 'live'}
              onClick={() => onNavigate('live')}
            />
            <NavItem
              icon={<Calendar size={18} />}
              label="Schedule"
              active={currentView === 'schedule'}
              onClick={() => onNavigate('schedule')}
            />
            <NavItem
              icon={<Star size={18} />}
              label="Favorites"
              active={currentView === 'favorites'}
              onClick={() => onNavigate('favorites')}
            />
          </nav>
        </div>

        {/* Popular Leagues */}
        <div>
          <div className="flex justify-between items-center px-2 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular Leagues</h3>
            <span className="text-xs text-gray-600 bg-dark-800 px-1.5 py-0.5 rounded">845</span>
          </div>
          <nav className="space-y-1">
            {popularLeagues.map((league) => (
              <a
                key={league.name}
                href="#"
                className="flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white rounded-md group"
              >
                <div className="flex items-center">
                  {league.logo ? (
                    <div className="w-6 h-6 mr-3 rounded-full bg-white p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={league.logo} alt={league.name} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <Trophy size={16} className="mr-3 text-gray-600 group-hover:text-brand-blue" />
                  )}
                  {league.name}
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-400">{league.count}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Countries */}
        <div>
          <div className="flex justify-between items-center px-2 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular Countries</h3>
            <span className="text-xs text-gray-600 bg-dark-800 px-1.5 py-0.5 rounded">1095</span>
          </div>
          <nav className="space-y-1">
            <CountryItem name="Germany" count={220} flagUrl="https://flagcdn.com/w40/de.png" />
            <CountryItem name="France" count={190} flagUrl="https://flagcdn.com/w40/fr.png" />
            <CountryItem name="Spain" count={310} flagUrl="https://flagcdn.com/w40/es.png" />
            <CountryItem name="England" count={215} flagUrl="https://flagcdn.com/w40/gb-eng.png" />
            <CountryItem name="Italy" count={160} flagUrl="https://flagcdn.com/w40/it.png" />
          </nav>
        </div>

      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${active
      ? 'bg-dark-800 text-brand-blue'
      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
      }`}
  >
    <span className={`mr-3 ${active ? 'text-brand-blue' : 'text-gray-500'}`}>{icon}</span>
    {label}
  </button>
);

const CountryItem = ({ name, count, flagUrl }: { name: string, count: number, flagUrl?: string }) => (
  <a
    href="#"
    className="flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white rounded-md group"
  >
    <div className="flex items-center">
      {flagUrl ? (
        <img src={flagUrl} alt={name} className="w-5 h-5 mr-3 object-cover rounded-full shadow-sm flex-shrink-0" />
      ) : (
        <Globe size={16} className="mr-3 text-gray-600 group-hover:text-brand-blue" />
      )}
      {name}
    </div>
    <span className="text-xs text-gray-600 group-hover:text-gray-400">{count}</span>
  </a>
)