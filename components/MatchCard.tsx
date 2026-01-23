import React, { useState } from 'react';
import { Star, BarChart2, Tv } from 'lucide-react';
import { Match } from '../types';
import { getMatchInsight } from '../services/geminiService';

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onBetSelect: (selection: '1' | 'X' | '2', odds: number) => void;
  onToggleFavorite: (id: string) => void;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, isFavorite, onBetSelect, onToggleFavorite, onClick }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleAIInsight = async () => {
    if (insight) {
      setInsight(null); // Toggle off
      return;
    }
    setLoadingInsight(true);
    const text = await getMatchInsight(match);
    setInsight(text);
    setLoadingInsight(false);
  };

  return (
    <div
       onClick={onClick}
      className={`bg-dark-800 rounded-xl p-4 mb-3 border border-dark-700 hover:border-gray-600 transition-all shadow-lg hover:shadow-xl relative group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Match Info */}
        <div className="flex-1">
          <div className="flex justify-between md:justify-start items-center mb-2 md:mb-1 text-xs text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              {match.status === 'Live' && <span className="w-2 h-2 rounded-full bg-status-red animate-pulse"></span>}
              <span>{match.status === 'Live' ? `${match.minute}'` : match.startTime}</span>
            </div>
            <span>{match.league}</span>
          </div>

          <div className="flex flex-col space-y-2" >
            <div className="flex items-center justify-between md:justify-start md:space-x-8 "  onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${match.homeTeam.name}&background=fff&color=000&rounded=true`;
                    }}
                  />
                </div>
                <span className="font-medium text-gray-200">{match.homeTeam.name}</span>
              </div>
              {match.score && <span className="font-bold text-white">{match.score.home}</span>}
            </div>
            <div className="flex items-center justify-between md:justify-start md:space-x-8"  onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${match.awayTeam.name}&background=fff&color=000&rounded=true`;
                    }}
                  />
                </div>
                <span className="font-medium text-gray-200">{match.awayTeam.name}</span>
              </div>
              {match.score && <span className="font-bold text-white">{match.score.away}</span>}
            </div>
          </div>
        </div>

        {/* Actions & Odds */}
        <div className="flex items-center space-x-2 md:space-x-4 ">

          <div className="hidden md:flex space-x-2">
            <button
              onClick={(e) => e.stopPropagation()}
              className={`p-2 rounded-full hover:bg-dark-700 transition-colors ${insight ? 'text-brand-accent' : 'text-gray-500'}`}
              title="AI Insight"
            >
              <BarChart2 size={18} />
            </button>
            <button 
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full text-gray-500 hover:bg-dark-700 hover:text-gray-300 transition-colors">
              <Tv size={18} />
            </button>
          </div>

          <div className="flex items-center bg-dark-900 rounded-lg p-1 border border-dark-700">
            <button
             onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center w-14 h-10 hover:bg-dark-700 rounded transition-colors group/btn"
            >
              <span className="text-[10px] text-gray-500 group-hover/btn:text-gray-400">1</span>
              <span className="text-sm font-bold text-brand-blue">{match.odds.home}</span>
            </button>
            <div className="w-px h-6 bg-dark-700 mx-1"></div>
            <button
            onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center w-14 h-10 hover:bg-dark-700 rounded transition-colors group/btn"
            >
              <span className="text-[10px] text-gray-500 group-hover/btn:text-gray-400">X</span>
              <span className="text-sm font-bold text-brand-blue">{match.odds.draw}</span>
            </button>
            <div className="w-px h-6 bg-dark-700 mx-1"></div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center w-14 h-10 hover:bg-dark-700 rounded transition-colors group/btn"
            >
              <span className="text-[10px] text-gray-500 group-hover/btn:text-gray-400">2</span>
              <span className="text-sm font-bold text-brand-blue">{match.odds.away}</span>
            </button>
          </div>

          <button
           onClick={(e) => e.stopPropagation()}
            className={`transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}
          >
            <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* AI Insight Panel */}
      {(insight || loadingInsight) && (
        <div className="mt-3 bg-indigo-900/20 border border-brand-accent/20 rounded p-3 text-sm text-indigo-200 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start space-x-2">
            <BarChart2 size={16} className="mt-0.5 text-brand-accent shrink-0" />
            <div>
              {loadingInsight ? (
                <span className="animate-pulse">Analyzing match data with Gemini...</span>
              ) : (
                <p>{insight}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};