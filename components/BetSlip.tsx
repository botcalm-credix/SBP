import React, { useState } from 'react';
import { X, Trash2, Info, Plus, Minus, ChevronDown } from 'lucide-react';
import { Bet } from '../types';

interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (id: string) => void;
  onPlaceBet: () => void;
  onClearBets: () => void;
  onClose?: () => void;
}

export const BetSlip: React.FC<BetSlipProps> = ({ bets, onRemoveBet, onPlaceBet, onClearBets, onClose }) => {
  const [stake, setStake] = useState<number>(10);
  
  const totalOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
  const potentialWin = (stake * totalOdds).toFixed(2);
  const totalFormattedOdds = totalOdds.toFixed(2);

  return (
    <div className="bg-dark-800 rounded-xl overflow-hidden flex flex-col h-full border border-dark-700">
      <div className="p-4 border-b border-dark-700 flex justify-between items-center bg-dark-800">
        <div className="flex items-center space-x-2">
          {onClose && (
            <button onClick={onClose} className="lg:hidden mr-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-dark-700 transition-colors">
              <ChevronDown size={20} />
            </button>
          )}
          <span className="bg-brand-blue w-2 h-2 rounded-full animate-pulse"></span>
          <h2 className="font-semibold text-white">Bet Slip</h2>
        </div>
        <div className="flex items-center text-xs bg-dark-700 px-2 py-1 rounded-full text-brand-blue font-bold">
           {bets.length}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {bets.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <div className="mb-2 flex justify-center">
              <Info size={32} opacity={0.5} />
            </div>
            <p className="text-sm">Your bet slip is empty.</p>
            <p className="text-xs mt-1">Select odds to start betting.</p>
          </div>
        ) : (
          bets.map((bet) => (
            <div key={bet.id} className="bg-dark-900 rounded-lg p-3 border border-dark-700 relative group">
              <button 
                onClick={() => onRemoveBet(bet.id)}
                className="absolute top-2 right-2 text-gray-600 hover:text-status-red transition-colors"
              >
                <X size={14} />
              </button>
              <div className="pr-6">
                <p className="text-xs text-gray-500 mb-1 line-clamp-1">{bet.matchTitle}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">
                    {bet.selection === '1' ? 'Home' : bet.selection === 'X' ? 'Draw' : 'Away'}
                  </span>
                  <span className="text-sm font-bold text-brand-blue bg-blue-500/10 px-2 py-0.5 rounded">
                    {bet.odds}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-dark-900 border-t border-dark-700">
         {bets.length > 0 && (
           <>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Total Odds</span>
                <span className="text-brand-blue font-bold">{totalFormattedOdds}</span>
              </div>
              <div className="flex items-center space-x-2 bg-dark-800 p-2 rounded-lg border border-dark-700">
                <button 
                  onClick={() => setStake(Math.max(1, stake - 5))}
                  className="w-8 h-8 flex items-center justify-center bg-dark-700 rounded hover:bg-dark-600 hover:text-white text-gray-400 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <input 
                    type="number" 
                    value={stake}
                    onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-transparent text-center text-white font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-xs text-gray-500">USD</span>
                </div>
                <button 
                  onClick={() => setStake(stake + 5)}
                  className="w-8 h-8 flex items-center justify-center bg-dark-700 rounded hover:bg-dark-600 hover:text-white text-gray-400 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-gray-400">Potential Win:</span>
              <span className="text-status-green font-bold text-lg">{potentialWin} USD</span>
            </div>
           </>
         )}

        <div className="flex space-x-2">
            {bets.length > 0 && (
                <button 
                    onClick={onClearBets}
                    className="p-3 rounded-lg bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            )}
            <button 
                onClick={onPlaceBet}
                disabled={bets.length === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
                    bets.length === 0 
                    ? 'bg-dark-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                }`}
            >
            Place Bet
            </button>
        </div>
      </div>
    </div>
  );
};