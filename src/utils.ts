import React from 'react';
import { IPLTeamTheme } from './types';

// Hall of Fame structures
export interface HallOfFameEntry {
  id: string;
  date: string;
  teamId: string;
  teamName: string;
  teamEmoji: string;
  tournamentYear: number;
  length: 'Short' | 'Long';
  winsCount: number;
  captainName: string;
  squadNames: string[];
}

export function loadHallOfFame(): HallOfFameEntry[] {
  try {
    const saved = localStorage.getItem('invincible_hall_of_fame');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load Hall of Fame', e);
    return [];
  }
}

export function saveToHallOfFame(entry: Omit<HallOfFameEntry, 'id' | 'date'>) {
  try {
    const records = loadHallOfFame();
    const newEntry: HallOfFameEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    };
    records.unshift(newEntry);
    localStorage.setItem('invincible_hall_of_fame', JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save to Hall of Fame', e);
  }
}

export function getVibrantTeamColor(teamId: string): string {
  switch (teamId) {
    case 'CSK': return '#FFD700'; // Vibrant Golden Yellow
    case 'MI': return '#0099FF';  // Vibrant Cobalt Blue
    case 'RCB': return '#FF1E27'; // Vibrant Crimson Red
    case 'KKR': return '#B026FF'; // Vibrant Neon Purple
    case 'RR': return '#FF1493';  // Vibrant Neon Pink
    case 'SRH': return '#FF6600'; // Vibrant Neon Orange
    case 'DC': return '#00A2FF';  // Vibrant Sky Blue
    case 'PBKS': return '#FF1B24'; // Vibrant Red
    case 'GT': return '#00F5FF';  // Vibrant Neon Cyan / Sky Blue (super glow for GT)
    case 'LSG': return '#FF2E2E'; // Vibrant Neon Red
    case 'DCH': return '#0077FF'; // Vibrant Navy/Cobalt Blue
    case 'KTK': return '#FF6600'; // Vibrant Neon Orange
    case 'PWI': return '#00BFA5'; // Vibrant Teal/Turquoise
    case 'GL': return '#FF4500';  // Vibrant Neon Orange
    case 'RPS': return '#4D4DFF'; // Vibrant Royal Blue
    default: return '#ffffff';
  }
}

// Generate the inline styles dynamically for the chosen team
// This guarantees we can do custom team-theming perfectly without needing compilation-limited Tailwind classes.
export function getTeamStyleProperties(theme: IPLTeamTheme | undefined) {
  if (!theme) {
    // Ultra-sleek, premium brutalist black-and-white theme
    return {
      '--theme-bg': '#000000',
      '--theme-border': '#ffffff',
      '--theme-accent': '#ffffff',
      '--theme-dark': '#000000',
      '--theme-secondary': '#1a1a1a',
      '--team-primary': '#ffffff',
      '--team-secondary': '#000000',
      '--team-accent': '#ffffff',
      '--team-text': '#ffffff',
    } as React.CSSProperties;
  }

  // Active theme: 90% vibrant first color, 10% black
  const vibrantColor = getVibrantTeamColor(theme.id);
  
  // Custom dark panel backgrounds based on the team's first color mixed with black
  let secondaryBg = '#121212';
  switch (theme.id) {
    case 'CSK': secondaryBg = '#141200'; break;
    case 'MI': secondaryBg = '#000c1c'; break;
    case 'RCB': secondaryBg = '#140002'; break;
    case 'KKR': secondaryBg = '#0a0014'; break;
    case 'RR': secondaryBg = '#14000a'; break;
    case 'SRH': secondaryBg = '#140800'; break;
    case 'DC': secondaryBg = '#000a14'; break;
    case 'PBKS': secondaryBg = '#140002'; break;
    case 'GT': secondaryBg = '#000d1c'; break;
    case 'LSG': secondaryBg = '#140002'; break;
    case 'DCH': secondaryBg = '#000a1c'; break;
    case 'KTK': secondaryBg = '#140500'; break;
    case 'PWI': secondaryBg = '#001414'; break;
    case 'GL': secondaryBg = '#140500'; break;
    case 'RPS': secondaryBg = '#020014'; break;
  }

  return {
    '--theme-bg': '#000000',          // Pitch black background (10% black)
    '--theme-border': vibrantColor,   // Vibrant glowing team color
    '--theme-accent': vibrantColor,   // Vibrant glowing team color (90% dominant)
    '--theme-dark': '#000000',
    '--theme-secondary': secondaryBg, // Dark custom-tinted panels
    '--team-primary': theme.primaryColor,
    '--team-secondary': theme.secondaryColor,
    '--team-accent': theme.accentColor,
    '--team-text': '#ffffff',
  } as React.CSSProperties;
}

/**
 * Determine if an IPL player is an overseas (foreign) player based on their name and description.
 */
export function isOverseasPlayer(player: { name: string; description?: string; isOverseas?: boolean } | string, description?: string): boolean {
  if (typeof player !== 'string' && player.isOverseas !== undefined) return player.isOverseas;
  const name = typeof player === 'string' ? player : player.name;
  description = typeof player === 'string' ? description : player.description;
  const normalizedName = name.toLowerCase();
  const desc = (description || '').toLowerCase();
  
  // High-reliability nationality/geographical mentions
  if (desc.includes('overseas') || desc.includes('australian') || desc.includes('english') || desc.includes('kiwi') || 
      desc.includes('west indian') || desc.includes('guyanese') || desc.includes('south african') || 
      desc.includes('afghan') || desc.includes('sri lankan') || desc.includes('caribbean') ||
      desc.includes('new zealand') || desc.includes('england') || desc.includes('australia') ||
      desc.includes('afghanistan') || desc.includes('sri lanka')) {
    return true;
  }

  const overseasKeywords = [
    'villiers', 'maxwell', 'plessis', 'gayle', 'starc', 'salt', 'narine', 'russell', 'buttler', 'boult', 
    'hetmyer', 'head', 'cummins', 'klaasen', 'markram', 'phillips', 'warner', 'marsh', 'nortje', 'stubbs', 
    'mcgurk', 'kock', 'stoinis', 'pooran', 'mayers', 'naveen', 'livingstone', 'bairstow', 'curran', 'rabada', 
    'miller', 'rashid', 'williamson', 'pathirana', 'conway', 'santner', 'moeen', 'theekshana', 'david', 
    'shepherd', 'coetzee', 'pollard', 'malinga', 'bravo', 'watson', 'joseph', 'wood', 'madushanka', 'shamar', 
    'mustafizur', 'rachin', 'ravindra', 'daryl', 'raza', 'woakes', 'hendricks', 'green', 'jacks', 'ferguson', 
    'hope', 'hazlewood', 'hasaranga', 'mujeeb', 'johnson', 'noor', 'omarzai', 'wade', 'powell', 'ferreira', 
    'burger', 'jansen', 'farooqi', 'behrendorff', 'chameera', 'topley', 'mills', 'gurney', 'overton', 'scurran',
    'glen phillips'
  ];

  return overseasKeywords.some(keyword => normalizedName.includes(keyword));
}

/**
 * Determine if an IPL player is a legendary player.
 */
export function isLegendPlayer(player: { name: string; year?: number; rating?: number; tier?: string } | string, year?: number, rating?: number): boolean {
  if (typeof player !== 'string' && player.tier === 'Legend') return true;
  if (typeof player !== 'string' && player.tier && player.tier !== 'Legend') return false;
  const name = typeof player === 'string' ? player : player.name;
  year = typeof player === 'string' ? year : player.year;
  rating = typeof player === 'string' ? rating : player.rating;
  if (rating !== undefined) {
    return rating >= 94;
  }
  const normalized = name.toLowerCase().trim();
  if (year === 2008) {
    const legends2008 = [
      'ms dhoni', 'adam gilchrist', 'sachin tendulkar', 'shane warne',
      'rahul dravid', 'sourav ganguly', 'yuvraj singh', 'virender sehwag'
    ];
    return legends2008.some(legend => normalized.includes(legend) || legend.includes(normalized));
  }

  const legendNames = [
    'ms dhoni', 'm.s. dhoni', 'dhoni',
    'virat kohli', 'v kohli', 'kohli',
    'rohit sharma', 'r sharma', 'rohit',
    'sachin tendulkar', 's tendulkar', 'tendulkar',
    'ab de villiers', 'de villiers', 'abd',
    'suresh raina', 's raina', 'raina',
    'lasith malinga', 'l malinga', 'malinga',
    'sunil narine', 's narine', 'narine',
    'gautam gambhir', 'g gambhir', 'gambhir',
    'chris gayle', 'c gayle', 'gayle',
    'shane watson', 's watson', 'watson',
    'yuvraj singh', 'yuvraj',
    'david warner', 'd warner', 'warner',
    'jasprit bumrah', 'j bumrah', 'bumrah',
    'ravindra jadeja', 'r jadeja', 'jadeja',
    'shane warne', 's warne', 'warne',
    'kieron pollard', 'k pollard', 'pollard',
    'bhuvneshwar singh', 'bhuvneshwar',
    'adam gilchrist', 'gilchrist',
    'brendon mccullum', 'mccullum',
    'sourav ganguly', 'ganguly',
    'anil kumble', 'kumble',
    'matthew hayden', 'hayden',
    'jacques kallis', 'kallis',
    'virender sehwag', 'sehwag',
    'rahul dravid', 'dravid',
    'shikhar dhawan', 'dhawan',
    'zaheer khan', 'zaheer',
    'harbhajan singh', 'harbhajan',
    'ben stokes'
  ];
  return legendNames.some(legend => {
    if (normalized === legend) return true;
    if (normalized.includes(legend) && legend.length >= 5) {
      const idx = normalized.indexOf(legend);
      // Ensure it's matching on a word boundary (e.g. to prevent "joginder sharma" from matching "r sharma")
      if (idx === 0 || normalized.charAt(idx - 1) === ' ') {
        return true;
      }
    }
    return false;
  });
}

/**
 * Determine if an IPL player is a star player.
 */
export function isStarPlayer(player: { name: string; rating: number; description: string; year?: number; tier?: string }): boolean {
  if (player.tier === 'Star') return true;
  if (player.tier && player.tier !== 'Star') return false;
  if (player.year === 2008) {
    return player.rating === 89;
  }

  if (isLegendPlayer(player.name, player.year, player.rating)) return false;
  if (player.rating >= 94) return false;

  // Star players are defined by their rating tier (88-93)
  return player.rating >= 88 && player.rating <= 93;
}

/**
 * Determine if an IPL player is an emerging player.
 */
export function isEmergingPlayer(player: { name: string; rating: number; year?: number; tier?: string }): boolean {
  if (player.tier === 'Emerging') return true;
  if (player.tier && player.tier !== 'Emerging') return false;
  if (player.year === 2008) {
    return player.rating === 77;
  }
  return player.rating <= 80;
}

