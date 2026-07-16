import React from 'react';
import { Player } from '../types';
import { Star, Lock } from 'lucide-react';
import { IPL_TEAMS, IPL_WINNERS_MAP } from '../data';
import { isLegendPlayer, isStarPlayer, isEmergingPlayer } from '../utils';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  isCaptain?: boolean;
  onMakeCaptain?: () => void;
  showCaptainOption?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  isLocked?: boolean;
  lockReason?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onClick,
  isSelected = false,
  isCaptain = false,
  onMakeCaptain,
  showCaptainOption = false,
  hoverable = true,
  compact = false,
  isLocked = false,
  lockReason
}) => {
  const teamTheme = IPL_TEAMS.find(t => t.id === player.originalTeam);
  
  // Card tier styles based on overall rating, dynamically styled according to the player's team colors
  let tierStyle = 'border-zinc-700 bg-zinc-900 text-zinc-100 shadow-md';
  let glowStyle = '';
  let badgeStyle = 'bg-zinc-800 text-zinc-300';
  let ratingColor = 'text-white';
  let titleColor = 'text-white';
  let descColor = 'text-zinc-400';
  let statBoxStyle = 'bg-black/20 text-zinc-300 border-zinc-850';
  let statLabelColor = 'text-zinc-500';
  let statValColor = 'text-white';
  let teamBadgeStyle = 'bg-black/40 border-zinc-800/80';

  const isDarkText = player.originalTeam === 'CSK' || player.originalTeam === 'SRH';
  const customCardStyle: React.CSSProperties = {};
  const isLegend = isLegendPlayer(player);
    const isTopTier = player.rating >= 94;
  const isStar = isStarPlayer(player);
  const isEmerging = isEmergingPlayer(player);

  if (teamTheme) {
    if (isLegend) {
      // Magnificent Special Legendary Glow with Aurora Gradient!
      // 🌈 Aurora: #00F5D4 → #9B5DE5 → #FEE440
      customCardStyle.background = `linear-gradient(135deg, #00F5D4 0%, #9B5DE5 50%, #FEE440 100%)`;
      customCardStyle.borderColor = '#fbbf24'; // Gold border
      customCardStyle.color = '#000814'; // Highly legible deep text on vibrant aurora background
      customCardStyle.boxShadow = '0 0 20px rgba(155, 93, 229, 0.45), 4px 4px 0px #fbbf24'; // Rich colorful neon block shadow

      badgeStyle = 'bg-black/90 text-amber-300 font-black border border-amber-400/50 uppercase tracking-widest';
      ratingColor = 'text-zinc-950 font-black';
      titleColor = 'text-zinc-950 font-black';
      descColor = 'text-zinc-900/90 font-medium';
      statBoxStyle = 'bg-black/95 text-zinc-100 border-zinc-800';
      statLabelColor = 'text-amber-400 font-bold';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-black/95 border-zinc-800 text-amber-300';
    } else if (isTopTier) {
      customCardStyle.backgroundColor = teamTheme.primaryColor;
      customCardStyle.borderColor = '#ffffff';
      customCardStyle.color = isDarkText ? '#000814' : '#ffffff';
      customCardStyle.boxShadow = `4px 4px 0px ${teamTheme.secondaryColor || '#000000'}`;

      badgeStyle = isDarkText ? 'bg-[#000814]/12 text-[#000814] font-black' : 'bg-white/20 text-white font-black';
      ratingColor = isDarkText ? 'text-[#000814] font-black' : 'text-white font-black';
      titleColor = isDarkText ? 'text-[#000814]' : 'text-white';
      descColor = isDarkText ? 'text-[#000814]/85' : 'text-white/85';
      statBoxStyle = isDarkText ? 'bg-[#000814]/08 text-[#000814] border-[#000814]/15' : 'bg-white/10 text-white border-white/15';
      statLabelColor = isDarkText ? 'text-[#000814]/60' : 'text-white/60';
      statValColor = isDarkText ? 'text-[#000814]' : 'text-white';
      teamBadgeStyle = isDarkText ? 'bg-[#000814]/08 border-[#000814]/15' : 'bg-white/10 border-white/15';
    } else if (isStar) {
      // Special Star Glow with Team's primary color!
      customCardStyle.background = `linear-gradient(135deg, rgba(0, 8, 20, 0.96) 0%, ${teamTheme.primaryColor}1a 60%, rgba(0, 8, 20, 0.98) 100%)`;
      customCardStyle.borderColor = teamTheme.primaryColor;
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = `0 0 22px ${teamTheme.primaryColor}55, inset 0 0 10px ${teamTheme.primaryColor}20, 4px 4px 0px rgba(0, 0, 0, 0.6)`;

      badgeStyle = 'bg-amber-500/10 text-amber-300 border border-amber-500/40 font-black shadow-[0_0_8px_rgba(245,158,11,0.25)]';
      ratingColor = 'text-white font-black';
      titleColor = 'text-white font-bold';
      descColor = 'text-zinc-300';
      statBoxStyle = 'bg-white/5 text-zinc-200 border-white/10';
      statLabelColor = 'text-zinc-400';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/10';
    } else if (player.rating >= 90) {
      customCardStyle.background = `linear-gradient(135deg, ${teamTheme.primaryColor}35, rgba(0, 8, 20, 0.95))`;
      customCardStyle.borderColor = `${teamTheme.primaryColor}99`;
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = `4px 4px 0px ${teamTheme.primaryColor}22`;

      badgeStyle = 'bg-white/15 text-white font-bold';
      ratingColor = 'text-white font-extrabold';
      titleColor = 'text-white';
      descColor = 'text-zinc-300';
      statBoxStyle = 'bg-white/5 text-zinc-200 border-white/10';
      statLabelColor = 'text-zinc-400';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/10';
    } else if (isEmerging) {
      customCardStyle.background = `linear-gradient(135deg, rgba(0, 8, 20, 0.96) 0%, ${teamTheme.primaryColor}0d 50%, rgba(16, 185, 129, 0.05) 100%)`;
      customCardStyle.borderColor = 'rgba(16, 185, 129, 0.5)';
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = `inset 0 0 8px rgba(16, 185, 129, 0.1), 4px 4px 0px rgba(0, 0, 0, 0.5)`;

      badgeStyle = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-black';
      ratingColor = 'text-emerald-400 font-extrabold';
      titleColor = 'text-zinc-100';
      descColor = 'text-zinc-400';
      statBoxStyle = 'bg-white/5 text-zinc-300 border-white/5';
      statLabelColor = 'text-zinc-500';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/5';
    } else {
      customCardStyle.background = `linear-gradient(135deg, ${teamTheme.primaryColor}10, rgba(0, 8, 20, 0.98))`;
      customCardStyle.borderColor = `${teamTheme.primaryColor}30`;
      customCardStyle.color = '#d4d4d8';
      customCardStyle.boxShadow = '4px 4px 0px rgba(0, 0, 0, 0.5)';

      badgeStyle = 'bg-white/10 text-zinc-300';
      ratingColor = 'text-white/90 font-bold';
      titleColor = 'text-zinc-100';
      descColor = 'text-zinc-400';
      statBoxStyle = 'bg-white/5 text-zinc-300 border-white/5';
      statLabelColor = 'text-zinc-500';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/5';
    }
  } else {
    // Fallback if no teamTheme
    if (isTopTier) {
      // Gold Glowing Tier (matching Jasprit Bumrah's active card style in Design HTML)
      tierStyle = 'border-2 border-white bg-[#FFC300] text-[#001D3D] shadow-[4px_4px_0px_#003566]';
      glowStyle = '';
      badgeStyle = 'bg-[#001D3D]/10 text-[#001D3D] font-black';
      ratingColor = 'text-[#001D3D] font-black';
      titleColor = 'text-[#001D3D]';
      descColor = 'text-[#001D3D]/80';
      statBoxStyle = 'bg-[#001D3D]/10 text-[#001D3D] border-[#001D3D]/15';
      statLabelColor = 'text-[#001D3D]/60';
      statValColor = 'text-[#001D3D]';
      teamBadgeStyle = 'bg-[#001D3D]/10 border-[#001D3D]/15';
    } else if (isLegend) {
      // Fallback Special Legendary Glow
      customCardStyle.background = 'linear-gradient(135deg, #120224 0%, #290b4e 50%, #0d011a 100%)';
      customCardStyle.borderColor = '#fbbf24';
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = '0 0 15px rgba(217, 70, 239, 0.4), 4px 4px 0px #fbbf24';

      badgeStyle = 'bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white font-black border border-amber-300';
      ratingColor = 'text-amber-400 font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]';
      titleColor = 'text-white font-black';
      descColor = 'text-zinc-200';
      statBoxStyle = 'bg-fuchsia-950/20 text-zinc-100 border-fuchsia-500/20';
      statLabelColor = 'text-fuchsia-300';
      statValColor = 'text-amber-300';
      teamBadgeStyle = 'bg-fuchsia-950/30 border-fuchsia-500/20 text-amber-300';
    } else if (isStar) {
      // Fallback Star Glow (using amber/gold theme fallback)
      customCardStyle.background = 'linear-gradient(135deg, rgba(0, 8, 20, 0.97) 0%, rgba(245, 158, 11, 0.1) 60%, rgba(0, 8, 20, 0.99) 100%)';
      customCardStyle.borderColor = '#fbbf24';
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = '0 0 20px rgba(245, 158, 11, 0.4), inset 0 0 10px rgba(245, 158, 11, 0.15), 4px 4px 0px rgba(0,0,0,0.6)';

      badgeStyle = 'bg-amber-500/10 text-amber-300 border border-amber-500/40 font-black shadow-[0_0_8px_rgba(245,158,11,0.25)]';
      ratingColor = 'text-amber-400 font-black';
      titleColor = 'text-white';
      descColor = 'text-zinc-300';
      statBoxStyle = 'bg-white/5 text-zinc-200 border-amber-500/15';
      statLabelColor = 'text-zinc-400';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-amber-500/15';
    } else if (player.rating >= 90) {
      // Silver Sleek Tier
      tierStyle = 'border-2 border-slate-300 bg-white/10 text-white shadow-[4px_4px_0px_#003566]';
      glowStyle = '';
      badgeStyle = 'bg-white/20 text-white font-bold';
      ratingColor = 'text-white font-extrabold';
      titleColor = 'text-white';
      descColor = 'text-zinc-300';
      statBoxStyle = 'bg-white/5 text-zinc-200 border-white/10';
      statLabelColor = 'text-zinc-400';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/10';
    } else if (isEmerging) {
      customCardStyle.background = 'linear-gradient(135deg, rgba(0, 8, 20, 0.98) 0%, rgba(16, 185, 129, 0.08) 100%)';
      customCardStyle.borderColor = '#10b981';
      customCardStyle.color = '#ffffff';
      customCardStyle.boxShadow = '4px 4px 0px rgba(0, 0, 0, 0.5)';

      badgeStyle = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold';
      ratingColor = 'text-emerald-400 font-bold';
      titleColor = 'text-zinc-100';
      descColor = 'text-zinc-400';
      statBoxStyle = 'bg-white/5 text-zinc-300 border-white/5';
      statLabelColor = 'text-zinc-500';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/5';
    } else {
      // Bronze Slate Tier
      tierStyle = 'border border-white/10 bg-white/5 text-zinc-300 shadow-[4px_4px_0px_#000814]';
      glowStyle = '';
      badgeStyle = 'bg-white/10 text-zinc-300';
      ratingColor = 'text-white/90 font-bold';
      titleColor = 'text-zinc-100';
      descColor = 'text-zinc-400';
      statBoxStyle = 'bg-white/5 text-zinc-300 border-white/5';
      statLabelColor = 'text-zinc-500';
      statValColor = 'text-white';
      teamBadgeStyle = 'bg-white/5 border-white/5';
    }
  }

  const roleEmoji = player.role === 'Batsman' ? '🏏' 
    : player.role === 'Bowler' ? '🔴' 
    : player.role === 'All-Rounder' ? '⚡' 
    : '🧤';

  if (compact) {
    return (
      <div
        onClick={isLocked ? undefined : onClick}
        className={`relative flex items-center gap-3 p-3 rounded-none border ${tierStyle} ${
          isLocked ? 'opacity-40 cursor-not-allowed' : hoverable ? 'hover:scale-[0.98] cursor-pointer transition-all duration-200' : ''
        } ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#001D3D]' : ''}`}
        style={customCardStyle}
        id={`compact-player-card-${player.id}`}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-between px-4 z-10 select-none">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-white/95" />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-white/60">LOCKED:</span>
              <span className="text-[10px] uppercase tracking-wider font-sans font-black text-[#FFC300]">{lockReason || 'Ineligible'}</span>
            </div>
            <span className="text-xl font-mono text-white/40">{player.rating}</span>
          </div>
        )}

        <div className={`flex flex-col items-center justify-center min-w-12 h-12 rounded-none border ${teamBadgeStyle}`}>
          <span className={`text-2xl font-mono ${ratingColor} leading-none font-black`} style={isStar && teamTheme ? { color: teamTheme.primaryColor, textShadow: `0 0 8px ${teamTheme.primaryColor}80` } : undefined}>{player.rating}</span>
          <span className={`text-[9px] tracking-wider font-semibold ${statLabelColor}`}>OVR</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className={`font-sans font-black uppercase text-sm truncate ${titleColor}`}>
              {isLegend ? `👑 ${player.name}` : isStar ? `⭐ ${player.name}` : isEmerging ? `🌱 ${player.name}` : player.name}
            </h4>
            
            {isCaptain && (
              <span className="px-1.5 py-0.5 rounded-none text-[10px] bg-red-600 text-white font-black tracking-wider leading-none">
                C
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 mt-0.5 text-xs font-mono opacity-80 ${descColor}`}>
            <span>{player.year}</span>
            {IPL_WINNERS_MAP[player.year] === player.originalTeam && (
              <span className="text-amber-500 font-bold" title={`${player.year} IPL Winner!`}>🏆</span>
            )}
            <span>•</span>
            <span className="font-semibold">{player.originalTeam}</span>
            <span>•</span>
            <span>{roleEmoji} {isLegend ? 'LEGEND' : isStar ? 'STAR' : isEmerging ? 'EMERGING' : player.role}</span>
          </div>
        </div>

        {showCaptainOption && onMakeCaptain && !isCaptain && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMakeCaptain();
            }}
            className="px-3 py-1.5 rounded-none text-xs bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-white font-black uppercase tracking-wider"
            style={player.rating >= 94 ? { backgroundColor: '#ffffff', color: teamTheme?.primaryColor || '#001D3D' } : undefined}
          >
            Cap
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={isLocked ? undefined : onClick}
      className={`relative rounded-none border p-6 flex flex-col justify-between min-h-[320px] h-auto overflow-hidden ${tierStyle} ${glowStyle} ${
        isLocked ? 'opacity-40 cursor-not-allowed' : hoverable ? 'hover:-translate-y-1 cursor-pointer transition-all duration-300' : ''
      } ${isSelected ? 'ring-4 ring-white ring-offset-4 ring-offset-[#001D3D] scale-[1.02]' : ''}`}
      style={customCardStyle}
      id={`player-card-${player.id}`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 z-10 text-center select-none">
          <Lock className="w-8 h-8 text-white/90 mb-2" />
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-white/50">DRAFT LOCK</span>
          <span className="text-xs uppercase tracking-wider font-sans font-black text-[#FFC300] mt-1">{lockReason || 'Ineligible'}</span>
        </div>
      )}

      {/* Dynamic Original Team Theme Watermark Accent */}
      {teamTheme && (
        <div 
          className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 pointer-events-none blur-xl"
          style={{ backgroundColor: teamTheme.primaryColor }}
        />
      )}

      {/* Card Header: Rating & Logo */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center">
          <div className={`text-4xl font-mono ${ratingColor} leading-none tracking-tight font-black`} style={isStar && teamTheme ? { color: teamTheme.primaryColor, textShadow: `0 0 8px ${teamTheme.primaryColor}80` } : undefined}>
            {player.rating}
          </div>
          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold mt-1 ${statLabelColor}`}>OVR</span>
        </div>

        <div className="flex flex-col items-end text-right">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-none border text-xs font-mono ${teamBadgeStyle}`}>
            <span className="font-bold" style={{ color: player.rating >= 94 ? (isDarkText ? '#000814' : '#ffffff') : teamTheme?.primaryColor }}>
              {player.originalTeam}
            </span>
            <span className="opacity-70">'{String(player.year).slice(2)}</span>
            <span className="text-lg leading-none">{teamTheme?.emoji}</span>
            {IPL_WINNERS_MAP[player.year] === player.originalTeam && (
              <span className="text-amber-400 font-bold ml-1 animate-pulse" title={`${player.year} IPL Winner!`}>🏆</span>
            )}
          </div>
          
          <span className={`mt-2 px-2 py-0.5 rounded-none text-[10px] tracking-wider uppercase font-black ${badgeStyle}`}>
            {isLegend ? `👑 LEGEND` : isStar ? `⭐ STAR ${player.role.toUpperCase()}` : isEmerging ? `🌱 EMERGING` : player.role}
          </span>
          
        </div>
      </div>

      {/* Captain Ribbon */}
      {isCaptain && (
        <div className="absolute left-0 top-16 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-r-none shadow-md tracking-widest flex items-center gap-1">
          <Star className="w-3 h-3 fill-white" /> CAPTAIN
        </div>
      )}

      {/* Card Body: Player Name & Slogan */}
      <div className="mt-4 flex-1 flex flex-col justify-end">
        <h3 className={`font-sans font-black text-xl leading-tight tracking-tight uppercase ${titleColor}`}>
          {isLegend ? `👑 ${player.name}` : isStar ? `⭐ ${player.name}` : isEmerging ? `🌱 ${player.name}` : player.name}
        </h3>
        <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${descColor}`}>
          {player.description}
        </p>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-white/10" />

      {/* Card Footer: Monospace Stats Grid */}
      <div className={`grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs p-2.5 rounded-none border ${statBoxStyle}`}>
                        {/* Batting Stats */}
        {player.role !== 'Bowler' ? (
          <>
            <div className="flex justify-between items-center border-r border-white/10 pr-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>AVG:</span>
              <span className={`text-sm font-black ${statValColor}`}>{player.stats.battingAvg || '-'}</span>
            </div>
            <div className="flex justify-between items-center pl-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>SR:</span>
              <span className={`text-sm font-black ${statValColor}`}>{player.stats.battingSR || '-'}</span>
            </div>
            <div className="flex justify-between items-center border-r border-white/10 pr-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>RUNS:</span>
              <span className={`text-sm font-black ${player.rating >= 94 ? statValColor : (teamTheme ? teamTheme.primaryColor : '#FFC300')}`}>{player.stats.runs || '-'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center border-r border-white/10 pr-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>WKT:</span>
              <span className={`text-sm font-black ${player.rating >= 94 ? statValColor : (teamTheme ? teamTheme.primaryColor : '#FFC300')}`}>{player.stats.wickets || '-'}</span>
            </div>
            <div className="flex justify-between items-center pl-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>SR:</span>
              <span className={`text-sm font-black ${statValColor}`}>{player.stats.bowlingSR || '-'}</span>
            </div>
            <div className="flex justify-between items-center border-r border-white/10 pr-2">
              <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>ECON:</span>
              <span className={`text-sm font-black ${statValColor}`}>{player.stats.bowlingEconomy || '-'}</span>
            </div>
          </>
        )}
        {/* Dynamic Secondary display for All-rounders or bowling stats */}
        {player.role === 'All-Rounder' && (
          <div className="flex justify-between items-center pl-2 col-span-1">
            <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>WKT:</span>
            <span className={`text-sm font-black ${player.rating >= 94 ? statValColor : (teamTheme ? teamTheme.primaryColor : '#FFC300')}`}>{player.stats.wickets || '0'}</span>
          </div>
        )}
        {player.role === 'Wicketkeeper' && (
          <div className="flex justify-between items-center pl-2 col-span-1">
            <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>MAT:</span>
            <span className={`text-sm font-black ${statValColor}`}>{player.stats.matches}</span>
          </div>
        )}
        {player.role === 'Batsman' && (
          <div className="flex justify-between items-center pl-2 col-span-1">
            <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>MAT:</span>
            <span className={`text-sm font-black ${statValColor}`}>{player.stats.matches}</span>
          </div>
        )}
        {player.role === 'Bowler' && (
          <div className="flex justify-between items-center pl-2 col-span-1">
            <span className={`text-[10px] tracking-wider uppercase font-bold ${statLabelColor}`}>MAT:</span>
            <span className={`text-sm font-black ${statValColor}`}>{player.stats.matches}</span>
          </div>
        )}
      </div>

      {/* Make Captain overlay option when hovering in specific configurations */}
      {showCaptainOption && onMakeCaptain && !isCaptain && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMakeCaptain();
          }}
          className="absolute inset-x-0 bottom-0 py-2 bg-emerald-500 text-zinc-950 font-black text-xs text-center uppercase tracking-wider opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        >
          Promote to Captain
        </button>
      )}
    </div>
  );
};
