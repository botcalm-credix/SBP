import React from 'react';
import { LayoutGrid, Activity, Calendar, Star, Ticket } from 'lucide-react';
import { ViewType } from './Sidebar';

interface MobileBottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  betCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate, betCount }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-700 z-50 px-6 py-3 safe-area-pb">
      <div className="flex justify-between items-center">
        <NavItem 
          icon={<LayoutGrid size={24} />} 
          label="Home" 
          active={currentView === 'overview'} 
          onClick={() => onNavigate('overview')}
        />
        <NavItem 
          icon={<Activity size={24} />} 
          label="Live" 
          active={currentView === 'live'} 
          onClick={() => onNavigate('live')}
        />
        
        {/* Bet Slip Item - Now a Page */}
        <NavItem 
          icon={<Ticket size={24} />} 
          label="Slip" 
          active={currentView === 'betslip'} 
          onClick={() => onNavigate('betslip')}
          badge={betCount}
        />

        <NavItem 
          icon={<Calendar size={24} />} 
          label="Schedule" 
          active={currentView === 'schedule'} 
          onClick={() => onNavigate('schedule')}
        />
        <NavItem 
          icon={<Star size={24} />} 
          label="Favorites" 
          active={currentView === 'favorites'} 
          onClick={() => onNavigate('favorites')}
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 w-14 transition-all duration-200 active:scale-95 ${active ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-300'} relative`}
  >
    <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-brand-blue/10 transform -translate-y-1' : 'bg-transparent'} relative`}>
        {icon}
        {badge !== undefined && badge > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-red text-[10px] font-bold text-white ring-2 ring-dark-900 animate-bounce-short">
                {badge}
            </span>
        )}
    </div>
    <span className={`text-[10px] font-medium transition-opacity ${active ? 'opacity-100 font-bold' : 'opacity-80'}`}>{label}</span>
  </button>
);