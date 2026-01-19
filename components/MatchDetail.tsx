import React, { useState } from 'react';
import { ArrowLeft, Clock, BarChart2, Info, ChevronDown } from 'lucide-react';
import { Match } from '../types';

interface MatchDetailProps {
    match: Match;
    onBack: () => void;
    onBetSelect: (selection: string, odds: number, marketName: string) => void;
}

export const MatchDetail: React.FC<MatchDetailProps> = ({ match, onBack, onBetSelect }) => {
    const [activeTab, setActiveTab] = useState('main');

    // Mock extended markets
    const markets = [
        {
            id: '1x2',
            name: 'Match Winner (1x2)',
            options: [
                { label: '1', odds: match.odds.home },
                { label: 'X', odds: match.odds.draw },
                { label: '2', odds: match.odds.away },
            ]
        },
        {
            id: 'dc',
            name: 'Double Chance',
            options: [
                { label: '1X', odds: 1.25 },
                { label: '12', odds: 1.33 },
                { label: '2X', odds: 1.80 },
            ]
        },
        {
            id: 'goals',
            name: 'Total Goals (Over/Under 2.5)',
            options: [
                { label: 'Over 2.5', odds: 1.95 },
                { label: 'Under 2.5', odds: 1.85 },
            ]
        },
        {
            id: 'btts',
            name: 'Both Teams To Score',
            options: [
                { label: 'Yes', odds: 1.70 },
                { label: 'No', odds: 2.10 },
            ]
        },
        {
            id: 'handicap',
            name: 'Handicap (0:1)',
            options: [
                { label: '1', odds: 4.50 },
                { label: 'X', odds: 3.80 },
                { label: '2', odds: 1.65 },
            ]
        },
        {
            id: 'score',
            name: 'Correct Score',
            options: [
                { label: '1-0', odds: 7.50 },
                { label: '2-0', odds: 11.00 },
                { label: '2-1', odds: 9.00 },
                { label: '0-1', odds: 10.00 },
                { label: '1-1', odds: 6.50 },
                { label: '0-0', odds: 12.00 },
            ]
        }
    ];

    const [timeLeft, setTimeLeft] = React.useState<string>('');

    React.useEffect(() => {
        if (match.status !== 'Scheduled') return;

        // Simple countdown simulation for demo purposes
        // In a real app, this would parse match.startTime
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 2); // Mock: match is in 2 hours

        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft('Starting...');
                clearInterval(timer);
                return;
            }

            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [match]);

    return (
        <div className="flex flex-col bg-dark-900 animate-in fade-in duration-300 min-h-full">

            {/* Header with Hero Banner Style */}
            <div className="relative min-h-[180px] md:min-h-[320px] rounded-b-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-3 md:p-6 mb-4">

                {/* Background Layer */}
                <div
                    className="absolute inset-0 transform scale-105"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/80 to-dark-900/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-black/60"></div>
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 mix-blend-overlay pointer-events-none"></div>

                {/* Navigation */}
                <button
                    onClick={onBack}
                    className="relative z-10 flex items-center text-gray-300 hover:text-white transition-colors group self-start backdrop-blur-md bg-black/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10"
                >
                    <ArrowLeft size={16} className="mr-1 md:mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs md:text-sm font-bold">Back</span>
                </button>

                {/* Match Content */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-1 mt-4">
                    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 md:px-12">

                        <div className="flex flex-col items-center flex-1 max-w-[30%]">
                            <div className="w-12 h-12 md:w-28 md:h-28 rounded-full border-2 md:border-4 border-brand-blue/30 bg-white/5 backdrop-blur-sm p-2 md:p-4 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)] md:shadow-[0_0_30px_rgba(59,130,246,0.2)] mb-2 md:mb-4">
                                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain drop-shadow-md" />
                            </div>
                            <h2 className="text-xs md:text-3xl font-bold md:font-black text-white text-center tracking-tight drop-shadow-md leading-tight break-words w-full px-1">{match.homeTeam.name}</h2>
                        </div>

                        {/* Center Info */}
                        <div className="flex flex-col items-center justify-center mx-1 md:mx-12 min-w-[80px] md:min-w-[140px] shrink-0">
                            {match.status === 'Live' ? (
                                <div className="text-center">
                                    <div className="text-[10px] md:text-xs font-bold text-status-red uppercase tracking-widest mb-1 md:mb-2 flex items-center justify-center gap-1.5 md:gap-2">
                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-status-red animate-pulse"></span>
                                        Live
                                    </div>
                                    <div className="text-3xl md:text-7xl font-black text-white tracking-tighter flex items-center gap-1 md:gap-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        <span>{match.score?.home ?? 0}</span>
                                        <span className="text-gray-400/50">:</span>
                                        <span>{match.score?.away ?? 0}</span>
                                    </div>
                                    <div className="mt-1 md:mt-2 text-brand-blue font-bold text-xs md:text-lg">{match.minute}'</div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-2xl md:text-6xl font-black text-white/20 tracking-wider">VS</div>
                                    {timeLeft ? (
                                        <div className="mt-2 md:mt-4 flex flex-col items-center">
                                            <div className="text-[10px] md:text-xs uppercase text-brand-blue font-bold tracking-widest mb-1">Starts In</div>
                                            <div className="font-mono text-sm md:text-3xl font-bold text-white tabular-nums tracking-wider bg-black/30 backdrop-blur px-2 py-0.5 md:px-3 md:py-1 rounded md:rounded-lg border border-white/10">
                                                {timeLeft}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-2 md:mt-4 flex items-center justify-center text-gray-300 font-medium bg-black/30 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/10 text-[10px] md:text-base whitespace-nowrap">
                                            <Clock size={12} className="mr-1 md:mr-1.5 text-brand-blue" />
                                            {match.startTime}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Away Team */}
                        <div className="flex flex-col items-center flex-1 max-w-[30%]">
                            <div className="w-12 h-12 md:w-28 md:h-28 rounded-full border-2 md:border-4 border-brand-accent/30 bg-white/5 backdrop-blur-sm p-2 md:p-4 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] md:shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-2 md:mb-4">
                                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain drop-shadow-md" />
                            </div>
                            <h2 className="text-xs md:text-3xl font-bold md:font-black text-white text-center tracking-tight drop-shadow-md leading-tight break-words w-full px-1">{match.awayTeam.name}</h2>
                        </div>
                    </div>
                </div>

                {/* Stats / League Info */}
                <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4 mt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                        <span className="bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded text-xs border border-brand-blue/20">LEAGUE</span>
                        {match.league}
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                            <BarChart2 size={16} className="mr-2" />
                            Match Stats
                        </div>
                        <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                            <Info size={16} className="mr-2" />
                            H2H
                        </div>
                    </div>
                </div>
            </div>

            {/* Markets Tabs (Sticky) */}
            <div className="sticky top-16 z-40 bg-dark-900 border-b border-dark-700 shadow-md">
                <div className="flex px-4 overflow-x-auto no-scrollbar">
                    {['Main', 'First Half', 'Second Half', 'Corners', 'Yellow Cards', 'Player Props'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-4 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.toLowerCase()
                                ? 'border-brand-blue text-brand-blue'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Markets Grid */}
            <div className="flex-1 pt-6 md:pt-6 space-y-4 pb-0 px-0 md:px-0">
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {markets.map((market) => (
                        <div key={market.id} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 w-full min-w-0">
                            <div className="bg-dark-700/50 px-3 py-2 md:px-4 md:py-3 flex justify-between items-center">
                                <span className="text-xs md:text-sm font-bold text-white">{market.name}</span>
                                <ChevronDown size={14} className="text-gray-500" />
                            </div>
                            <div className={`p-2 md:p-4 grid gap-1.5 md:gap-2 ${market.options.length > 3
                                ? 'grid-cols-2 md:grid-cols-3'
                                : market.options.length === 3
                                    ? 'grid-cols-3'
                                    : market.options.length === 2
                                        ? 'grid-cols-2'
                                        : 'grid-cols-1'
                                }`}>
                                {market.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => onBetSelect(option.label, option.odds, market.name)}
                                        className="flex flex-col items-center justify-center bg-dark-900 hover:bg-dark-700 border border-dark-700 hover:border-brand-blue/50 rounded-lg p-2 md:p-3 transition-all group w-full min-w-0"
                                    >
                                        <span className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1 group-hover:text-white truncate w-full text-center">{option.label}</span>
                                        <span className="text-xs md:text-sm font-bold text-brand-blue">{option.odds.toFixed(2)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
