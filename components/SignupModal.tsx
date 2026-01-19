import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Gift, Dices, CircleOff, ChevronDown } from 'lucide-react';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignup: () => void;
    onSwitchToLogin: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignup, onSwitchToLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedBonus, setSelectedBonus] = useState<'sports' | 'casino' | 'reject'>('sports');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-5xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 max-h-[90dvh] md:max-h-[90vh]">

                {/* Left Side - Promo/Branding with Background Image */}
                <div className="hidden md:flex flex-col justify-start p-10 w-5/12 relative overflow-hidden group">
                    {/* Background Image Layer */}
                    <div
                        className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Adjusted Overlays: More transparent to show image, but keeping text readable */}
                        <div className="absolute inset-0 bg-dark-900/40"></div>
                        <div className="absolute inset-0 bg-brand-blue/20 mix-blend-color-dodge opacity-40"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>

                        {/* Texture Overlay */}
                        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
                    </div>

                    {/* Decorative Light Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>

                    <div className="relative z-10 mt-4">
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight drop-shadow-xl tracking-tight">
                            Welcome to <br /> <span className="text-brand-blue">SBS</span>
                        </h2>
                        <p className="text-gray-100 text-lg opacity-95 drop-shadow-lg font-medium leading-relaxed">
                            Join the rhythm of innovation. Experience live betting with AI-powered insights.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 bg-dark-900 flex flex-col relative h-full p-6 min-h-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="flex flex-col justify-start md:justify-center min-h-full">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Create your account</h3>
                                <p className="text-sm text-gray-400">
                                    Enter your details to get started
                                </p>
                            </div>

                            {/* Bonus Selection */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Choose a welcome bonus</label>
                                <div className="space-y-3">
                                    {/* Sports Bonus */}
                                    <div
                                        onClick={() => setSelectedBonus('sports')}
                                        className={`cursor-pointer p-4 rounded-xl border relative flex items-center text-left transition-all group gap-4 ${selectedBonus === 'sports' ? 'bg-brand-blue/10 border-brand-blue ring-1 ring-brand-blue' : 'bg-dark-800 border-dark-700 hover:border-gray-600'}`}
                                    >
                                        <div className={`p-2.5 rounded-full shrink-0 ${selectedBonus === 'sports' ? 'bg-brand-blue text-white' : 'bg-dark-700 text-gray-500 group-hover:text-white'}`}>
                                            <Gift size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-white leading-tight">Bonus for sports</div>
                                            <div className="text-xs text-gray-400 mt-0.5">Up to 100 USD</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedBonus === 'sports' ? 'border-brand-blue bg-brand-blue' : 'border-dark-600'}`}>
                                            {selectedBonus === 'sports' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </div>

                                    {/* Casino Bonus */}
                                    <div
                                        onClick={() => setSelectedBonus('casino')}
                                        className={`cursor-pointer p-4 rounded-xl border relative flex items-center text-left transition-all group gap-4 ${selectedBonus === 'casino' ? 'bg-brand-blue/10 border-brand-blue ring-1 ring-brand-blue' : 'bg-dark-800 border-dark-700 hover:border-gray-600'}`}
                                    >
                                        <div className={`p-2.5 rounded-full shrink-0 ${selectedBonus === 'casino' ? 'bg-brand-blue text-white' : 'bg-dark-700 text-gray-500 group-hover:text-white'}`}>
                                            <Dices size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-white leading-tight">Casino + Games</div>
                                            <div className="text-xs text-gray-400 mt-0.5">Up to 1500 USD</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedBonus === 'casino' ? 'border-brand-blue bg-brand-blue' : 'border-dark-600'}`}>
                                            {selectedBonus === 'casino' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </div>

                                    {/* Reject Bonus */}
                                    <div
                                        onClick={() => setSelectedBonus('reject')}
                                        className={`cursor-pointer p-4 rounded-xl border relative flex items-center text-left transition-all group gap-4 ${selectedBonus === 'reject' ? 'bg-brand-blue/10 border-brand-blue ring-1 ring-brand-blue' : 'bg-dark-800 border-dark-700 hover:border-gray-600'}`}
                                    >
                                        <div className={`p-2.5 rounded-full shrink-0 ${selectedBonus === 'reject' ? 'bg-brand-blue text-white' : 'bg-dark-700 text-gray-500 group-hover:text-white'}`}>
                                            <CircleOff size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-white leading-tight">Reject bonuses</div>
                                            <div className="text-xs text-gray-400 mt-0.5">Decide later</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedBonus === 'reject' ? 'border-brand-blue bg-brand-blue' : 'border-dark-600'}`}>
                                            {selectedBonus === 'reject' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">

                                {/* Country & Currency Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all relative">
                                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5 uppercase">Country</label>
                                        <div className="flex items-center">
                                            <select className="w-full bg-transparent text-white outline-none text-sm appearance-none cursor-pointer z-10 relative">
                                                <option className="bg-dark-800">United States</option>
                                                <option className="bg-dark-800">United Kingdom</option>
                                                <option className="bg-dark-800">Germany</option>
                                                <option className="bg-dark-800">France</option>
                                            </select>
                                            <ChevronDown size={14} className="text-gray-500 absolute right-0" />
                                        </div>
                                    </div>

                                    <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all relative">
                                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5 uppercase">Currency</label>
                                        <div className="flex items-center">
                                            <select className="w-full bg-transparent text-white outline-none text-sm appearance-none cursor-pointer z-10 relative">
                                                <option className="bg-dark-800">USD</option>
                                                <option className="bg-dark-800">EUR</option>
                                                <option className="bg-dark-800">GBP</option>
                                                <option className="bg-dark-800">JPY</option>
                                            </select>
                                            <ChevronDown size={14} className="text-gray-500 absolute right-0" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all">
                                    <label className="block text-xs font-medium text-gray-500 mb-0.5">Email</label>
                                    <input type="email" placeholder="Enter your email" className="w-full bg-transparent text-white outline-none placeholder-gray-600 text-sm" />
                                </div>

                                <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all relative">
                                    <label className="block text-xs font-medium text-gray-500 mb-0.5">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        className="w-full bg-transparent text-white outline-none placeholder-gray-600 text-sm pr-8"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white mt-1"
                                        type="button"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all">
                                    <label className="block text-xs font-medium text-gray-500 mb-0.5">Promo code (optional)</label>
                                    <input type="text" placeholder="Enter promo code" className="w-full bg-transparent text-white outline-none placeholder-gray-600 text-sm" />
                                </div>
                            </div>

                            <button
                                onClick={onSignup}
                                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center mt-6"
                            >
                                Register
                            </button>

                            <p className="text-[11px] text-gray-500 text-center mt-4 leading-relaxed">
                                By clicking this button you confirm that you have read and agree to the <a href="#" className="underline hover:text-gray-300">Terms and Conditions</a> and <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
                            </p>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">
                                    Already registered? <button onClick={onSwitchToLogin} className="text-brand-blue hover:underline font-medium">Log In</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};