import { Player, IPLTeamTheme, Opponent, PlayerRole } from './types';

export const IPL_TEAMS: IPLTeamTheme[] = [
  {
    id: 'CSK',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    primaryColor: '#F9CD05', // Canary Yellow
    secondaryColor: '#E05A10', // Orange-Red
    accentColor: '#ECC82B', // Gold
    bgGradient: 'from-amber-950 via-yellow-950 to-amber-900',
    textColor: 'text-amber-950',
    emoji: '🦁'
  },
  {
    id: 'MI',
    name: 'Mumbai Indians',
    shortName: 'MI',
    primaryColor: '#004BA0', // Cobalt Blue
    secondaryColor: '#D1AB3A', // Gold
    accentColor: '#005EA6', // Teal Blue
    bgGradient: 'from-blue-800 via-blue-600 to-indigo-900',
    textColor: 'text-white',
    emoji: '🌀'
  },
  {
    id: 'RCB',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    primaryColor: '#EC1C24', // Crimson Red
    secondaryColor: '#E6B863', // Metallic Gold
    accentColor: '#2B2A29', // Dark Charcoal
    bgGradient: 'from-red-700 via-zinc-900 to-black',
    textColor: 'text-white',
    emoji: '👑'
  },
  {
    id: 'KKR',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    primaryColor: '#3A225D', // Royal Purple
    secondaryColor: '#ECC82B', // Gold
    accentColor: '#582F8E', // Violet
    bgGradient: 'from-purple-950 via-purple-800 to-amber-950',
    textColor: 'text-white',
    emoji: '⚔️'
  },
  {
    id: 'RR',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    primaryColor: '#EA1B8E', // Hot Pink
    secondaryColor: '#004B87', // Royal Blue
    accentColor: '#9E1062', // Dark Pink
    bgGradient: 'from-pink-600 via-indigo-950 to-blue-900',
    textColor: 'text-white',
    emoji: '🏰'
  },
  {
    id: 'SRH',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    primaryColor: '#FF822E', // Orange
    secondaryColor: '#000000', // Black
    accentColor: '#E14F10', // Dark Orange
    bgGradient: 'from-orange-600 via-zinc-900 to-black',
    textColor: 'text-white',
    emoji: '🦅'
  },
  {
    id: 'DC',
    name: 'Delhi Capitals',
    shortName: 'DC',
    primaryColor: '#005CA5', // Blue
    secondaryColor: '#EF3E42', // Red
    accentColor: '#D1D3D4', // Silver
    bgGradient: 'from-blue-700 via-blue-950 to-red-950',
    textColor: 'text-white',
    emoji: '🐯'
  },
  {
    id: 'PBKS',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    primaryColor: '#D71920', // Red
    secondaryColor: '#D1D3D4', // Silver
    accentColor: '#A0151B', // Dark Red
    bgGradient: 'from-red-600 via-red-900 to-zinc-900',
    textColor: 'text-white',
    emoji: '🦁'
  },
  {
    id: 'GT',
    name: 'Gujarat Titans',
    shortName: 'GT',
    primaryColor: '#0B1E36', // Royal Blue
    secondaryColor: '#E2B13C', // Gold
    accentColor: '#52C1F5', // Sky Blue
    bgGradient: 'from-slate-900 via-blue-900 to-slate-950',
    textColor: 'text-white',
    emoji: '⚡'
  },
  {
    id: 'LSG',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    primaryColor: '#D11A2A', // Red
    secondaryColor: '#002B49', // Dark Blue
    accentColor: '#FFD700', // Gold
    bgGradient: 'from-red-950 via-rose-950 to-slate-950',
    textColor: 'text-white',
    emoji: '🏹'
  },
  {
    id: 'DCH',
    name: 'Deccan Chargers',
    shortName: 'DCH',
    primaryColor: '#002D62', // Deep Navy Blue
    secondaryColor: '#C0C0C0', // Silver
    accentColor: '#002D62',
    bgGradient: 'from-blue-950 via-slate-900 to-zinc-900',
    textColor: 'text-white',
    emoji: '🛡️'
  },
  {
    id: 'KTK',
    name: 'Kochi Tuskers Kerala',
    shortName: 'KTK',
    primaryColor: '#FF6600', // Bright Orange
    secondaryColor: '#4B0082', // Purple
    accentColor: '#FF6600',
    bgGradient: 'from-orange-800 via-indigo-950 to-purple-950',
    textColor: 'text-white',
    emoji: '🐘'
  },
  {
    id: 'PWI',
    name: 'Pune Warriors India',
    shortName: 'PWI',
    primaryColor: '#008080', // Turquoise/Teal
    secondaryColor: '#D3D3D3', // Silver
    accentColor: '#008080',
    bgGradient: 'from-teal-900 via-teal-950 to-slate-950',
    textColor: 'text-white',
    emoji: '⚔️'
  },
  {
    id: 'GL',
    name: 'Gujarat Lions',
    shortName: 'GL',
    primaryColor: '#FF4500', // Bright Orange (Majority on left)
    secondaryColor: '#FFD700', // Gold/Yellow (Secondary on right)
    accentColor: '#FF4500',
    bgGradient: 'from-orange-600 via-amber-950 to-red-950',
    textColor: 'text-white',
    emoji: '🦁'
  },
  {
    id: 'RPS',
    name: 'Rising Pune Supergiant',
    shortName: 'RPS',
    primaryColor: '#0A1172', // Dark Royal Blue
    secondaryColor: '#FF007F', // Neon Rose/Pink
    accentColor: '#0A1172',
    bgGradient: 'from-indigo-900 via-purple-950 to-pink-950',
    textColor: 'text-white',
    emoji: '👑'
  }
];

export const OPPONENTS: Opponent[] = [
  { id: 'CSK_OPP', name: 'Chennai Super Kings', shortName: 'CSK', rating: 92, emoji: '🦁' },
  { id: 'MI_OPP', name: 'Mumbai Indians', shortName: 'MI', rating: 91, emoji: '🌀' },
  { id: 'RCB_OPP', name: 'Royal Challengers Bengaluru', shortName: 'RCB', rating: 89, emoji: '👑' },
  { id: 'KKR_OPP', name: 'Kolkata Knight Riders', shortName: 'KKR', rating: 93, emoji: '⚔️' },
  { id: 'RR_OPP', name: 'Rajasthan Royals', shortName: 'RR', rating: 90, emoji: '🏰' },
  { id: 'SRH_OPP', name: 'Sunrisers Hyderabad', shortName: 'SRH', rating: 92, emoji: '🦅' },
  { id: 'DC_OPP', name: 'Delhi Capitals', shortName: 'DC', rating: 86, emoji: '🐯' },
  { id: 'PBKS_OPP', name: 'Punjab Kings', shortName: 'PBKS', rating: 85, emoji: '🦁' },
  { id: 'GT_OPP', name: 'Gujarat Titans', shortName: 'GT', rating: 89, emoji: '⚡' },
  { id: 'LSG_OPP', name: 'Lucknow Super Giants', shortName: 'LSG', rating: 88, emoji: '🏹' }
];

const BASE_PLAYER_DATABASE: Player[] = [
  // --- 2024 SEASON ---
  {
    id: 'v_kohli_2024',
    name: 'Virat Kohli',
    role: 'Batsman',
    rating: 98,
    year: 2024,
    originalTeam: 'RCB',
    stats: { matches: 15, runs: 741, battingAvg: 61.75, battingSR: 154.69 },
    description: 'Claimed the Orange Cap. Unlocked a sweeping aggression against spin and anchored RCB with supreme authority.'
  },
  {
    id: 'j_bumrah_2024',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    rating: 99,
    year: 2024,
    originalTeam: 'MI',
    stats: { matches: 13, wickets: 20, bowlingEconomy: 6.48 },
    description: 'An absolute bowling masterclass. Maintained an impossible economy of under 6.5 in flat batting tracks.'
  },
  {
    id: 's_narine_2024',
    name: 'Sunil Narine',
    role: 'All-Rounder',
    rating: 99,
    year: 2024,
    originalTeam: 'KKR',
    stats: { matches: 14, runs: 488, battingAvg: 34.85, battingSR: 180.74, wickets: 17, bowlingEconomy: 6.69 },
    description: 'The Most Valuable Player of IPL 2024. Opened the batting with explosive power and choked runs in middle-overs.'
  },
  {
    id: 't_head_2024',
    name: 'Travis Head',
    role: 'Batsman',
    rating: 97,
    year: 2024,
    originalTeam: 'SRH',
    stats: { matches: 15, runs: 567, battingAvg: 40.50, battingSR: 191.55 },
    description: 'Redefined powerplay batting alongside Abhishek Sharma, decimating bowling line-ups within the first 6 overs.'
  },
  {
    id: 'h_klaasen_2024',
    name: 'Heinrich Klaasen',
    role: 'Wicketkeeper',
    rating: 96,
    year: 2024,
    originalTeam: 'SRH',
    stats: { matches: 16, runs: 479, battingAvg: 39.91, battingSR: 171.07 },
    description: 'The premier spin-basher in world cricket. Hit towering sixes against elite spin under heavy pressure.'
  },
  {
    id: 'n_pooran_2024',
    name: 'Nicholas Pooran',
    role: 'Wicketkeeper',
    rating: 95,
    year: 2024,
    originalTeam: 'LSG',
    stats: { matches: 14, runs: 499, battingAvg: 62.37, battingSR: 178.21 },
    description: 'LSG\'s clinical finisher. Displayed outstanding consistency alongside massive boundary-hitting rates.'
  },
  {
    id: 'a_russell_2024',
    name: 'Andre Russell',
    role: 'All-Rounder',
    rating: 96,
    year: 2024,
    originalTeam: 'KKR',
    stats: { matches: 14, runs: 222, battingAvg: 31.71, battingSR: 185.00, wickets: 19, bowlingEconomy: 10.05 },
    description: 'KKR\'s powerhouse. Crucial middle-overs breakthrough-taker and final-overs batting booster.'
  },
  {
    id: 'p_cummins_2024',
    name: 'Pat Cummins',
    role: 'Bowler',
    rating: 95,
    year: 2024,
    originalTeam: 'SRH',
    stats: { matches: 16, wickets: 18, bowlingEconomy: 9.27 },
    description: 'Inspirational captain who led SRH to the finals. Delivered key defensive spells on batting-friendly wickets.'
  },
  {
    id: 'y_samson_2024',
    name: 'Sanju Samson',
    role: 'Wicketkeeper',
    rating: 94,
    year: 2024,
    originalTeam: 'RR',
    stats: { matches: 15, runs: 531, battingAvg: 48.27, battingSR: 153.46 },
    description: 'Led Rajasthan Royals with style. Displayed serene maturity and exquisite cover drives in his best-ever IPL season.'
  },
  {
    id: 'h_patel_2024',
    name: 'Harshal Patel',
    role: 'Bowler',
    rating: 93,
    year: 2024,
    originalTeam: 'PBKS',
    stats: { matches: 14, wickets: 24, bowlingEconomy: 9.73 },
    description: 'Captured the Purple Cap using a deadly cocktail of dips, slower cutters, and accurate death-yorkers.'
  },
  {
    id: 'v_chakaravarthy_2024',
    name: 'Varun Chakaravarthy',
    role: 'Bowler',
    rating: 92,
    year: 2024,
    originalTeam: 'KKR',
    stats: { matches: 14, wickets: 21, bowlingEconomy: 8.04 },
    description: 'The mystery spinner who turned KKR\'s championship season with critical middle-overs double-strikes.'
  },
  {
    id: 'a_sharma_2024',
    name: 'Abhishek Sharma',
    role: 'All-Rounder',
    rating: 93,
    year: 2024,
    originalTeam: 'SRH',
    stats: { matches: 16, runs: 484, battingAvg: 32.26, battingSR: 204.21, wickets: 2, bowlingEconomy: 8.40 },
    description: 'Registered a jaw-dropping 200+ strike rate. Took apart bowlers with zero fear and picked handy left-arm spin wickets.'
  },
  {
    id: 'r_pant_2024',
    name: 'Rishabh Pant',
    role: 'Wicketkeeper',
    rating: 92,
    year: 2024,
    originalTeam: 'DC',
    stats: { matches: 13, runs: 446, battingAvg: 40.54, battingSR: 155.40 },
    description: 'An emotional and powerful comeback story. Guided DC with fearless match-winning middle-overs assaults.'
  },
  {
    id: 's_dube_2024',
    name: 'Shivam Dube',
    role: 'Batsman',
    rating: 91,
    year: 2024,
    originalTeam: 'CSK',
    stats: { matches: 14, runs: 396, battingAvg: 36.00, battingSR: 162.29 },
    description: 'CSK\'s specialized spin destroyer. Cleared the ropes with ease against any spinner on Chennai\'s turning tracks.'
  },
  {
    id: 'k_yadav_2024',
    name: 'Kuldeep Yadav',
    role: 'Bowler',
    rating: 92,
    year: 2024,
    originalTeam: 'DC',
    stats: { matches: 11, wickets: 16, bowlingEconomy: 8.65 },
    description: 'The deceptive left-arm wrist spinner. Out-thought world-class batsmen with his refined drifts and googlies.'
  },
  {
    id: 'm_dhoni_2024',
    name: 'MS Dhoni',
    role: 'Wicketkeeper',
    rating: 90,
    year: 2024,
    originalTeam: 'CSK',
    stats: { matches: 14, runs: 161, battingAvg: 53.66, battingSR: 220.55 },
    description: 'Emerged as the ultimate death-overs cameos specialist. Struck blistering sixes to send fans into absolute raptures.'
  },
  {
    id: 'jf_mcgurk_2024',
    name: 'Jake Fraser-McGurk',
    role: 'Batsman',
    rating: 90,
    year: 2024,
    originalTeam: 'DC',
    stats: { matches: 9, runs: 330, battingAvg: 36.66, battingSR: 234.04 },
    description: 'An explosive Australian teenager who shocked the league with immediate boundary hitting on almost every ball.'
  },

  // --- 2023 SEASON ---
  {
    id: 's_gill_2023',
    name: 'Shubman Gill',
    role: 'Batsman',
    rating: 99,
    year: 2023,
    originalTeam: 'GT',
    stats: { matches: 17, runs: 890, battingAvg: 59.33, battingSR: 157.80 },
    description: 'Amassed the second highest individual run tally in IPL history. Made batting look elegant and incredibly simple.'
  },
  {
    id: 'r_khan_2023',
    name: 'Rashid Khan',
    role: 'All-Rounder',
    rating: 97,
    year: 2023,
    originalTeam: 'GT',
    stats: { matches: 17, runs: 130, battingAvg: 32.50, battingSR: 216.66, wickets: 27, bowlingEconomy: 8.24 },
    description: 'Struck key blows with the ball and nearly chased down games with insane late-order snake shots.'
  },
  {
    id: 'y_jaiswal_2023',
    name: 'Yashasvi Jaiswal',
    role: 'Batsman',
    rating: 95,
    year: 2023,
    originalTeam: 'RR',
    stats: { matches: 14, runs: 625, battingAvg: 48.07, battingSR: 163.61 },
    description: 'Blazed his way to prominence with an electric 13-ball fifty. Put bowlers under immediate pressure.'
  },
  {
    id: 'sk_yadav_2023',
    name: 'Suryakumar Yadav',
    role: 'Batsman',
    rating: 97,
    year: 2023,
    originalTeam: 'MI',
    stats: { matches: 16, runs: 605, battingAvg: 43.21, battingSR: 181.13 },
    description: 'The world\'s premier 360-degree batsman. Whipped balls from outside off-stump over fine leg for absurd sixes.'
  },
  {
    id: 'm_shami_2023',
    name: 'Mohammed Shami',
    role: 'Bowler',
    rating: 97,
    year: 2023,
    originalTeam: 'GT',
    stats: { matches: 17, wickets: 28, bowlingEconomy: 8.03 },
    description: 'Wreaked absolute havoc in the powerplay. Maintained an impeccable, upright seam position to dismantle openers.'
  },
  {
    id: 'r_jadeja_2023',
    name: 'Ravindra Jadeja',
    role: 'All-Rounder',
    rating: 95,
    year: 2023,
    originalTeam: 'CSK',
    stats: { matches: 16, runs: 190, battingAvg: 23.75, battingSR: 142.85, wickets: 20, bowlingEconomy: 7.56 },
    description: 'Wrote CSK folklore by hitting a 6 and 4 on the last two balls of the final to lift their 5th IPL title.'
  },
  {
    id: 'r_singh_2023',
    name: 'Rinku Singh',
    role: 'Batsman',
    rating: 93,
    year: 2023,
    originalTeam: 'KKR',
    stats: { matches: 14, runs: 474, battingAvg: 59.25, battingSR: 149.52 },
    description: 'Executed the greatest chase in cricket, hitting 5 consecutive sixes off Yash Dayal when KKR needed 28 off 5 balls.'
  },
  {
    id: 'm_pathirana_2023',
    name: 'Matheesha Pathirana',
    role: 'Bowler',
    rating: 92,
    year: 2023,
    originalTeam: 'CSK',
    stats: { matches: 12, wickets: 19, bowlingEconomy: 7.96 },
    description: 'Nurtured by MS Dhoni. Handled death-overs with a slinging, unplayable yorker-first action.'
  },
  {
    id: 'f_duplessis_2023',
    name: 'Faf du Plessis',
    role: 'Batsman',
    rating: 94,
    year: 2023,
    originalTeam: 'RCB',
    stats: { matches: 14, runs: 730, battingAvg: 56.15, battingSR: 153.68 },
    description: 'Led RCB from the front, constructing superb opening partnerships with Virat Kohli.'
  },

  // --- 2022 SEASON ---
  {
    id: 'j_buttler_2022',
    name: 'Jos Buttler',
    role: 'Wicketkeeper',
    rating: 99,
    year: 2022,
    originalTeam: 'RR',
    stats: { matches: 17, runs: 863, battingAvg: 57.53, battingSR: 149.05 },
    description: 'Scored an incredible 4 centuries in a single season, powering RR to their first finals since 2008.'
  },
  {
    id: 'y_chahal_2022',
    name: 'Yuzvendra Chahal',
    role: 'Bowler',
    rating: 96,
    year: 2022,
    originalTeam: 'RR',
    stats: { matches: 17, wickets: 27, bowlingEconomy: 7.75 },
    description: 'Crafted loops and turning webs to capture the Purple Cap, including a thrilling hat-trick.'
  },
  {
    id: 'h_pandya_2022',
    name: 'Hardik Pandya',
    role: 'All-Rounder',
    rating: 96,
    year: 2022,
    originalTeam: 'GT',
    stats: { matches: 15, runs: 487, battingAvg: 44.27, battingSR: 131.26, wickets: 8, bowlingEconomy: 7.27 },
    description: 'Captained the debutants GT to immediate IPL glory. Played a robust anchor role and bowled with severe discipline.'
  },
  {
    id: 'd_karthik_2022',
    name: 'Dinesh Karthik',
    role: 'Wicketkeeper',
    rating: 93,
    year: 2022,
    originalTeam: 'RCB',
    stats: { matches: 16, runs: 330, battingAvg: 55.00, battingSR: 183.33 },
    description: 'RCB\'s ice-cool finisher. Maintained a monumental 183+ strike rate to script heroic late wins.'
  },
  {
    id: 'l_livingstone_2022',
    name: 'Liam Livingstone',
    role: 'All-Rounder',
    rating: 92,
    year: 2022,
    originalTeam: 'PBKS',
    stats: { matches: 14, runs: 437, battingAvg: 36.41, battingSR: 182.08, wickets: 6, bowlingEconomy: 8.73 },
    description: 'Sent jaws dropping with a massive 117-meter six, providing raw all-round fire for Punjab.'
  },
  {
    id: 'q_dekock_2022',
    name: 'Quinton de Kock',
    role: 'Wicketkeeper',
    rating: 91,
    year: 2022,
    originalTeam: 'LSG',
    stats: { matches: 15, runs: 508, battingAvg: 36.28, battingSR: 148.97 },
    description: 'Blazed a historic unbeaten 140* off 70 balls, leading LSG into the playoffs in their first year.'
  },
  {
    id: 'd_warner_2022',
    name: 'David Warner',
    role: 'Batsman',
    rating: 91,
    year: 2022,
    originalTeam: 'DC',
    stats: { matches: 12, runs: 432, battingAvg: 48.00, battingSR: 150.52 },
    description: 'Carried Delhi\'s batting with fiery, consistent half-centuries, proving his enduring class.'
  },

  // --- 2021 SEASON ---
  {
    id: 'r_gaikwad_2021',
    name: 'Ruturaj Gaikwad',
    role: 'Batsman',
    rating: 94,
    year: 2021,
    originalTeam: 'CSK',
    stats: { matches: 16, runs: 635, battingAvg: 45.35, battingSR: 136.26 },
    description: 'Won the Orange Cap at just 24 years old, executing classical elegant shots to power CSK to their 4th title.'
  },
  {
    id: 'h_patel_2021',
    name: 'Harshal Patel',
    role: 'Bowler',
    rating: 96,
    year: 2021,
    originalTeam: 'RCB',
    stats: { matches: 15, wickets: 32, bowlingEconomy: 8.14 },
    description: 'Equalled the all-time record for most wickets in a single IPL season. Outsmarted the world with his slow dippers.'
  },
  {
    id: 'kl_rahul_2021',
    name: 'KL Rahul',
    role: 'Wicketkeeper',
    rating: 94,
    year: 2021,
    originalTeam: 'PBKS',
    stats: { matches: 13, runs: 626, battingAvg: 62.60, battingSR: 138.80 },
    description: 'Carried the Punjab Kings single-handedly, boasting a ridiculous average of over 60 across the tournament.'
  },
  {
    id: 'g_maxwell_2021',
    name: 'Glenn Maxwell',
    role: 'All-Rounder',
    rating: 93,
    year: 2021,
    originalTeam: 'RCB',
    stats: { matches: 15, runs: 513, battingAvg: 42.75, battingSR: 144.10, wickets: 3, bowlingEconomy: 8.43 },
    description: 'Thrived in RCB red, switching stances and reverse sweeping spinners at will in a majestic middle-order campaign.'
  },
  {
    id: 'v_iyer_2021',
    name: 'Venkatesh Iyer',
    role: 'All-Rounder',
    rating: 89,
    year: 2021,
    originalTeam: 'KKR',
    stats: { matches: 10, runs: 370, battingAvg: 41.11, battingSR: 128.47, wickets: 3, bowlingEconomy: 8.12 },
    description: 'Turned KKR\'s UAE leg around completely, transforming them into aggressive finalists with his bold opening.'
  },
  {
    id: 'm_dhoni_2021',
    name: 'MS Dhoni',
    role: 'Wicketkeeper',
    rating: 89,
    year: 2021,
    originalTeam: 'CSK',
    stats: { matches: 16, runs: 114, battingAvg: 16.28, battingSR: 106.54 },
    description: 'Led CSK to their comeback title after the nightmare 2020 campaign, marshaling tactical plays and finishing key playoff games.'
  },

  // --- 2025 SEASON (RECONSTRUCTED HISTORICAL) ---
  {
    id: 'v_kohli_2025',
    name: 'Virat Kohli',
    role: 'Batsman',
    rating: 96,
    year: 2025,
    originalTeam: 'RCB',
    stats: { matches: 14, runs: 680, battingAvg: 48.50, battingSR: 151.00 },
    description: 'Remained RCB\'s eternal batting heartbeat, pacing chases perfectly and leading with supreme passion.'
  },
  {
    id: 't_head_2025',
    name: 'Travis Head',
    role: 'Batsman',
    rating: 96,
    year: 2025,
    originalTeam: 'SRH',
    stats: { matches: 14, runs: 610, battingAvg: 43.57, battingSR: 198.50 },
    description: 'Continued his demolition of white-ball cricket. Cleared ropes at will inside powerplays.'
  },
  {
    id: 'r_pant_2025',
    name: 'Rishabh Pant',
    role: 'Wicketkeeper',
    rating: 94,
    year: 2025,
    originalTeam: 'LSG',
    stats: { matches: 15, runs: 510, battingAvg: 42.50, battingSR: 165.00 },
    description: 'A blockbuster debut campaign in Lucknow blue, leading the side as captain and hammering destructive middle-overs runs.'
  },
  {
    id: 'j_bumrah_2025',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    rating: 99,
    year: 2025,
    originalTeam: 'MI',
    stats: { matches: 14, wickets: 22, bowlingEconomy: 6.30 },
    description: 'Kept batsmen completely blindfolded, picking key middle-overs breakthroughs with his lethal bowling actions.'
  },
  {
    id: 'r_gaikwad_2025',
    name: 'Ruturaj Gaikwad',
    role: 'Batsman',
    rating: 93,
    year: 2025,
    originalTeam: 'CSK',
    stats: { matches: 15, runs: 580, battingAvg: 41.42, battingSR: 142.00 },
    description: 'Anchored the CSK batting with clinical perfection, leading them deep into playoffs with technical brilliance.'
  },
  {
    id: 's_gill_2025',
    name: 'Shubman Gill',
    role: 'Batsman',
    rating: 95,
    year: 2025,
    originalTeam: 'GT',
    stats: { matches: 14, runs: 610, battingAvg: 46.92, battingSR: 148.00 },
    description: 'The master of classical boundaries, Gill kept Gujarat competitive with supreme opening templates.'
  },
  {
    id: 'r_khan_2025',
    name: 'Rashid Khan',
    role: 'Bowler',
    rating: 95,
    year: 2025,
    originalTeam: 'GT',
    stats: { matches: 14, wickets: 21, bowlingEconomy: 7.10 },
    description: 'Remained an absolute lock in GT\'s bowling attack, spinning bats into tight, frustrating corners.'
  },

  // --- 2026 SEASON (LATEST RECONSTRUCTED) ---
  {
    id: 'v_kohli_2026',
    name: 'Virat Kohli',
    role: 'Batsman',
    rating: 95,
    year: 2026,
    originalTeam: 'RCB',
    stats: { matches: 14, runs: 650, battingAvg: 50.00, battingSR: 148.00 },
    description: 'The maestro continued his legendary legacy with highly consistent runs and absolute on-field leadership.'
  },
  {
    id: 'y_jaiswal_2026',
    name: 'Yashasvi Jaiswal',
    role: 'Batsman',
    rating: 96,
    year: 2026,
    originalTeam: 'RR',
    stats: { matches: 14, runs: 640, battingAvg: 45.71, battingSR: 168.00 },
    description: 'Emerged as RR\'s prime destroyer, combining raw athletic muscle with majestic stroke play.'
  },
  {
    id: 'j_bumrah_2026',
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    rating: 99,
    year: 2026,
    originalTeam: 'MI',
    stats: { matches: 14, wickets: 24, bowlingEconomy: 6.15 },
    description: 'Set a benchmark of masterclass defensive bowling, saving games singlehandedly in high-scoring formats.'
  },
  {
    id: 'a_sharma_2026',
    name: 'Abhishek Sharma',
    role: 'Batsman',
    rating: 94,
    year: 2026,
    originalTeam: 'SRH',
    stats: { matches: 14, runs: 510, battingAvg: 36.42, battingSR: 210.00 },
    description: 'Achieved an electric strike rate, hitting maximum-six boundaries in the powerplay.'
  },
  {
    id: 'm_yadav_2026',
    name: 'Mayank Yadav',
    role: 'Bowler',
    rating: 91,
    year: 2026,
    originalTeam: 'LSG',
    stats: { matches: 12, wickets: 18, bowlingEconomy: 8.20 },
    description: 'Scorched the speedguns at 156+ km/h, breaking opposition batting spine with severe raw pace.'
  }
];

interface PlayerTemplate {
  name: string;
  role: PlayerRole;
  baseRating: number;
  description: string;
  startYear?: number;
  endYear?: number;
}

const CSK_POOL: PlayerTemplate[] = [
  { name: 'Ravichandran Ashwin', role: 'All-Rounder', baseRating: 91, description: 'Master off-spinner and tactical genius.', startYear: 2025 },
  { name: 'Sam Curran', role: 'All-Rounder', baseRating: 91, description: 'Skilled English all-rounder.', startYear: 2025 },
  { name: 'MS Dhoni', role: 'Wicketkeeper', baseRating: 91, description: 'The legendary Thala who marshals CSK with unparalleled tactical brilliance.', startYear: 2008 },
  { name: 'Ruturaj Gaikwad', role: 'Batsman', baseRating: 93, description: 'Classy opening batsman and captain who anchors the CSK lineup with supreme timing.', startYear: 2020 },
  { name: 'Ravindra Jadeja', role: 'All-Rounder', baseRating: 95, description: 'Exceptional three-dimensional player, spinning tight webs and finishing games under pressure.', startYear: 2012 },
  { name: 'Shivam Dube', role: 'All-Rounder', baseRating: 91, description: 'Powerhouse spin-crusher who clears boundaries at will in the middle overs.', startYear: 2022 },
  { name: 'Ajinkya Rahane', role: 'Batsman', baseRating: 87, description: 'Experienced campaigner who unlocked an elegant, aggressive scoring template.', startYear: 2023 },
  { name: 'Deepak Chahar', role: 'Bowler', baseRating: 88, description: 'Elite powerplay swing bowler who consistently delivers early breakthroughs.', startYear: 2018 },
  { name: 'Matheesha Pathirana', role: 'Bowler', baseRating: 92, description: 'Slinging death-overs specialist with lethal yorkers modeled after Malinga.', startYear: 2022 },
  { name: 'Moeen Ali', role: 'All-Rounder', baseRating: 88, description: 'Smooth off-spinning all-rounder who provides vital top-order batting impetus.', startYear: 2021 },
  { name: 'Devon Conway', role: 'Wicketkeeper', baseRating: 92, description: 'Prolific New Zealand opener who scores consistently across all conditions.', startYear: 2022 },
  { name: 'Tushar Deshpande', role: 'Bowler', baseRating: 86, description: 'Hard-working medium-pacer who picks up crucial wickets in high-pressure overs.', startYear: 2022 },
  { name: 'Shardul Thakur', role: 'Bowler', baseRating: 87, description: "The 'Lord' who breaks partnerships with his golden arm and hits handy runs.", startYear: 2018 },
  { name: 'Maheesh Theekshana', role: 'Bowler', baseRating: 89, description: 'Mystery spinner who bowls tight defensive lines in powerplays and middle overs.', startYear: 2022 },
  // Historic CSK Legends
  { name: 'Suresh Raina', role: 'Batsman', baseRating: 93, description: 'Mr. IPL, iconic elegant left-handed batsman who dominated CSK middle order.', startYear: 2008, endYear: 2021 },
  { name: 'Matthew Hayden', role: 'Batsman', baseRating: 91, description: 'Fearless Australian opener who decimated bowling attacks with extreme power.', startYear: 2008, endYear: 2010 },
  { name: 'Michael Hussey', role: 'Batsman', baseRating: 92, description: 'Mr. Dependable, incredibly consistent left-handed opener who anchored CSK innings.', startYear: 2008, endYear: 2015 },
  { name: 'Albie Morkel', role: 'All-Rounder', baseRating: 89, description: 'Elite South African pace all-rounder who smashed massive finishes at death.', startYear: 2008, endYear: 2013 },
  { name: 'Ravichandran Ashwin', role: 'Bowler', baseRating: 90, description: 'Tactical spin maestro who excelled in powerplays and choked batsmen.', startYear: 2009, endYear: 2015 },
  { name: 'Dwayne Bravo', role: 'All-Rounder', baseRating: 91, description: 'The ultimate death-overs specialist with iconic dipping slower balls and celebrations.', startYear: 2011, endYear: 2022 },
  { name: 'Faf du Plessis', role: 'Batsman', baseRating: 91, description: 'Classy batsman and athletic fielder who delivered numerous clutch playoff innings.', startYear: 2011, endYear: 2021 },
  { name: 'Murali Vijay', role: 'Batsman', baseRating: 86, description: 'Sublime, elegant opener who played spectacular matchwinning centuries.', startYear: 2009, endYear: 2020 }
];

const MI_POOL: PlayerTemplate[] = [
  { name: 'Will Jacks', role: 'All-Rounder', baseRating: 90, description: 'Explosive English batsman.', startYear: 2025 },
  { name: 'Trent Boult', role: 'Bowler', baseRating: 93, description: 'Left-arm swing maestro.', startYear: 2025 },
  { name: 'Rohit Sharma', role: 'Batsman', baseRating: 95, description: 'The Hitman, legendary elegant opener who pulls short balls with effortless grace.', startYear: 2011 },
  { name: 'Suryakumar Yadav', role: 'Batsman', baseRating: 96, description: 'The premier 360-degree batsman in world cricket, hitting impossible boundaries.', startYear: 2018 },
  { name: 'Jasprit Bumrah', role: 'Bowler', baseRating: 99, description: 'Unplayable spearhead bowler, the absolute gold standard of speed, swing, and accuracy.', startYear: 2013 },
  { name: 'Ishan Kishan', role: 'Wicketkeeper', baseRating: 91, description: 'Dynamic left-handed opener who destroys bowling attacks in the powerplay.', startYear: 2018, endYear: 2024 },
  { name: 'Hardik Pandya', role: 'All-Rounder', baseRating: 94, description: 'Fast-bowling all-rounder and leader who provides vital balance to the Mumbai core.', startYear: 2015, endYear: 2021 },
  { name: 'Hardik Pandya', role: 'All-Rounder', baseRating: 94, description: 'Fast-bowling all-rounder and leader who provides vital balance to the Mumbai core.', startYear: 2024 },
  { name: 'Tilak Varma', role: 'Batsman', baseRating: 91, description: 'Serene young left-hander who anchors and finishes matches with supreme maturity.', startYear: 2022 },
  { name: 'Tim David', role: 'Batsman', baseRating: 88, description: 'Colossal powerhouse finisher who clears ropes in the final overs with brute force.', startYear: 2022 },
  { name: 'Piyush Chawla', role: 'Bowler', baseRating: 87, description: 'Veteran leg-spinner who outsmarts batters with his experience and slides.', startYear: 2023 },
  { name: 'Gerald Coetzee', role: 'Bowler', baseRating: 89, description: 'Fiery South African speedster who bowls with extreme passion and express pace.', startYear: 2024 },
  { name: 'Akash Madhwal', role: 'Bowler', baseRating: 86, description: 'Local engineer-turned-cricketer who has a knack for bowling accurate death yorkers.', startYear: 2023 },
  { name: 'Krunal Pandya', role: 'All-Rounder', baseRating: 88, description: 'Reliable left-arm spinner and handy batsman who performs in key clutch matches.', startYear: 2016, endYear: 2021 },
  { name: 'Quinton de Kock', role: 'Wicketkeeper', baseRating: 93, description: 'Elite South African keeper-batsman who gets MI off to blazing, classy starts.', startYear: 2019, endYear: 2021 },
  // Historic MI Legends
  { name: 'Sachin Tendulkar', role: 'Batsman', baseRating: 96, description: 'The Master Blaster, iconic legend who captained and anchored MI in the early years.', startYear: 2008, endYear: 2013 },
  { name: 'Sanath Jayasuriya', role: 'Batsman', baseRating: 92, description: 'Aggressive Sri Lankan legend who decimated bowlers in the powerplays.', startYear: 2008, endYear: 2010 },
  { name: 'Kieron Pollard', role: 'All-Rounder', baseRating: 94, description: 'Colossal powerhouse and matchwinner who finished games and caught blinders.', startYear: 2010, endYear: 2022 },
  { name: 'Lasith Malinga', role: 'Bowler', baseRating: 98, description: 'Slinging legend, the greatest death bowler in IPL history with toe-crushing yorkers.', startYear: 2009, endYear: 2019 },
  { name: 'Harbhajan Singh', role: 'Bowler', baseRating: 91, description: 'Turbanator, lead off-spinner who took critical wickets and hit massive boundaries.', startYear: 2008, endYear: 2017 },
  { name: 'Ambati Rayudu', role: 'Batsman', baseRating: 89, description: 'Highly versatile middle-order batsman who rescued MI in countless matches.', startYear: 2010, endYear: 2017 },
  { name: 'Zaheer Khan', role: 'Bowler', baseRating: 91, description: 'Masterful left-arm swing king who spearheaded the MI bowling attack.', startYear: 2009, endYear: 2014 },
  { name: 'Dwayne Smith', role: 'Batsman', baseRating: 88, description: 'Aggressive West Indian opener who struck explosive boundaries in the powerplay.', startYear: 2012, endYear: 2013 }
];

const RCB_POOL: PlayerTemplate[] = [
  { name: 'Krunal Pandya', role: 'All-Rounder', baseRating: 90, description: 'Tactical left-arm spinner and reliable batsman.', startYear: 2025 },
  { name: 'Bhuvneshwar Kumar', role: 'Bowler', baseRating: 91, description: 'Seam king whose legendary swing position earns wickets.', startYear: 2025 },
  { name: 'Phil Salt', role: 'Wicketkeeper', baseRating: 91, description: 'Aggressive English wicketkeeper-batsman.', startYear: 2025 },
  { name: 'Liam Livingstone', role: 'All-Rounder', baseRating: 92, description: 'Destructive hitter and useful spin bowler.', startYear: 2025 },
  { name: 'Virat Kohli', role: 'Batsman', baseRating: 97, description: 'The King, a legendary batsman who chases down targets with unparalleled physical and mental stamina.', startYear: 2008 },
  { name: 'Faf du Plessis', role: 'Batsman', baseRating: 93, description: 'Inspirational athletic captain who plays majestic lofted drives and fields superbly.', startYear: 2022, endYear: 2024 },
  { name: 'Glenn Maxwell', role: 'All-Rounder', baseRating: 94, description: "The 'Big Show', a terrifying switch-hitting gamechanger who also bowls handy off-spin.", startYear: 2021, endYear: 2024 },
  { name: 'Dinesh Karthik', role: 'Wicketkeeper', baseRating: 90, description: 'Veteran finisher who utilizes scoop shots and calm nerves to steal impossible wins.', startYear: 2015, endYear: 2024 },
  { name: 'Mohammed Siraj', role: 'Bowler', baseRating: 92, description: 'Miyaan Bhai, a high-intensity fast bowler who dismantles batting lineups when on song.', startYear: 2018, endYear: 2024 },
  { name: 'Rajat Patidar', role: 'Batsman', baseRating: 89, description: 'Sleek right-hander who dominates spinners in the middle-overs with lofted hits.', startYear: 2021 },
  { name: 'Cameron Green', role: 'All-Rounder', baseRating: 91, description: 'Towering Australian powerhouse who bowls heavy balls and bats with massive reach.', startYear: 2024 },
  { name: 'Yash Dayal', role: 'Bowler', baseRating: 86, description: 'Skilful left-arm pacer who possesses excellent control and swing in powerplays.', startYear: 2024 },
  { name: 'Will Jacks', role: 'All-Rounder', baseRating: 90, description: 'Explosive English batsman who scores massive centuries and bowls useful spin.', startYear: 2024, endYear: 2024 },
  { name: 'Karn Sharma', role: 'Bowler', baseRating: 85, description: 'Experienced leg-spinner who breaks crucial middle-overs partnerships.', startYear: 2022 },
  { name: 'Harshal Patel', role: 'Bowler', baseRating: 91, description: 'Slower-ball specialist who bowls deceptive dipping deliveries to claim key wickets.', startYear: 2012, endYear: 2023 },
  { name: 'AB de Villiers', role: 'Wicketkeeper', baseRating: 96, description: 'The ultimate MR. 360, an iconic legend who turns any game into a batting masterclass.', startYear: 2011, endYear: 2021 },
  // Historic RCB Legends
  { name: 'Anil Kumble', role: 'Bowler', baseRating: 94, description: 'Legendary captain and leg-spinner who bowled with supreme bounce and accuracy.', startYear: 2008, endYear: 2010 },
  { name: 'Rahul Dravid', role: 'Batsman', baseRating: 90, description: 'The Wall, icon player who anchored RCB in early years with classical technique.', startYear: 2008, endYear: 2010 },
  { name: 'Chris Gayle', role: 'Batsman', baseRating: 97, description: 'The Universe Boss, greatest T20 opener of all time who hit a historic 175* for RCB.', startYear: 2011, endYear: 2017 },
  { name: 'Jacques Kallis', role: 'All-Rounder', baseRating: 93, description: 'The premium South African all-rounder who opened both batting and bowling.', startYear: 2008, endYear: 2010 },
  { name: 'Mitchell Starc', role: 'Bowler', baseRating: 94, description: 'Lethal left-arm speedster whose swinging yorkers made RCB bowling terrifying.', startYear: 2014, endYear: 2015 },
  { name: 'Yuvraj Singh', role: 'All-Rounder', baseRating: 92, description: 'Explosive left-hander who smashed massive sixes during the 2014 season.', startYear: 2014, endYear: 2014 },
  { name: 'Robin Uthappa', role: 'Batsman', baseRating: 88, description: 'Aggressive top-order batsman who provided quick starts in early campaigns.', startYear: 2009, endYear: 2010 },
  { name: 'Ross Taylor', role: 'Batsman', baseRating: 89, description: 'Destructive New Zealand middle-order batsman known for his lethal leg-side slog sweeps.', startYear: 2008, endYear: 2010 }
];

const KKR_POOL: PlayerTemplate[] = [
  { name: 'Shreyas Iyer', role: 'Batsman', baseRating: 92, description: 'Inspirational captain who anchors the middle-order and handles spin with expert control.', startYear: 2022, endYear: 2024 },
  { name: 'Sunil Narine', role: 'All-Rounder', baseRating: 97, description: 'The ultimate mystery spinner and explosive opening bat, a perennial matchwinner.', startYear: 2012 },
  { name: 'Andre Russell', role: 'All-Rounder', baseRating: 96, description: 'Dre Russ, a muscular colossus who hits mammoth sixes and bowls heavy death overs.', startYear: 2014 },
  { name: 'Rinku Singh', role: 'Batsman', baseRating: 92, description: 'Ice-cool left-handed finisher who rose to fame with historic clutch final-over displays.', startYear: 2018 },
  { name: 'Varun Chakaravarthy', role: 'Bowler', baseRating: 91, description: 'Deceptive mystery spinner who operates with clinical control in middle-overs.', startYear: 2020 },
  { name: 'Venkatesh Iyer', role: 'All-Rounder', baseRating: 90, description: 'Elegant tall batsman and useful bowler who delivers key knocks in playoff matches.', startYear: 2021 },
  { name: 'Mitchell Starc', role: 'Bowler', baseRating: 94, description: 'World-class left-arm speedster whose lethal swinging yorkers dismantle stumps.', startYear: 2024, endYear: 2024 },
  { name: 'Phil Salt', role: 'Wicketkeeper', baseRating: 92, description: 'Fearless English wicketkeeper-batsman who decimates bowlers inside the powerplay.', startYear: 2024, endYear: 2024 },
  { name: 'Harshit Rana', role: 'Bowler', baseRating: 88, description: 'Young aggressive speedster who bowls clever slower balls and celebrates with fire.', startYear: 2022 },
  { name: 'Vaibhav Arora', role: 'Bowler', baseRating: 86, description: 'Skilful swing bowler who moves the ball both ways in the powerplay.', startYear: 2023 },
  { name: 'Ramandeep Singh', role: 'All-Rounder', baseRating: 85, description: 'Dynamic utility player who fields like a demon and strikes quick boundaries.', startYear: 2024 },
  { name: 'Nitish Rana', role: 'Batsman', baseRating: 88, description: 'Reliable left-hander who anchors KKR and bowls handy part-time off-spin.', startYear: 2018 },
  // Historic KKR Legends
  { name: 'Gautam Gambhir', role: 'Batsman', baseRating: 94, description: 'Iconic, fiery captain who led KKR to titles in 2012 and 2014 with gritty batting.', startYear: 2011, endYear: 2017 },
  { name: 'Brendon McCullum', role: 'Batsman', baseRating: 93, description: 'Smashed the legendary 158* in the very first match of IPL history back in 2008.', startYear: 2008, endYear: 2013 },
  { name: 'Sourav Ganguly', role: 'Batsman', baseRating: 90, description: 'The Dada of Kolkata, captained and anchored the team during its formative years.', startYear: 2008, endYear: 2010 },
  { name: 'Jacques Kallis', role: 'All-Rounder', baseRating: 93, description: 'Classic South African who provided elite top-order runs and seam bowling in title wins.', startYear: 2011, endYear: 2014 },
  { name: 'Yusuf Pathan', role: 'All-Rounder', baseRating: 91, description: 'Powerhouse batsman who could destroy any spinner in middle-overs, starring in title campaigns.', startYear: 2011, endYear: 2017 },
  { name: 'Robin Uthappa', role: 'Batsman', baseRating: 92, description: 'Won Orange Cap in 2014, playing with sublime walking-down-the-pitch timing.', startYear: 2014, endYear: 2019 },
  { name: 'Shakib Al Hasan', role: 'All-Rounder', baseRating: 91, description: 'World-class left-arm spinner and batsman who gave KKR supreme squad balance.', startYear: 2011, endYear: 2021 },
  { name: 'Manish Pandey', role: 'Batsman', baseRating: 88, description: 'Clutch playoff performer who scored a matchwinning 94 in the 2014 IPL final.', startYear: 2014, endYear: 2017 }
];

const RR_POOL: PlayerTemplate[] = [
  { name: 'Sanju Samson', role: 'Wicketkeeper', baseRating: 93, description: 'Sublimely gifted captain and keeper who makes batting look incredibly effortless.', startYear: 2013 },
  { name: 'Jos Buttler', role: 'Wicketkeeper', baseRating: 97, description: 'World-class English destroyer who scores massive centuries with clean hitting.', startYear: 2018, endYear: 2024 },
  { name: 'Yashasvi Jaiswal', role: 'Batsman', baseRating: 94, description: 'Electric young left-hander who attacks from ball one with pure aggression.', startYear: 2020 },
  { name: 'Yuzvendra Chahal', role: 'Bowler', baseRating: 93, description: 'Master tactician leg-spinner who lures batsmen to their doom with loops.', startYear: 2022, endYear: 2024 },
  { name: 'Trent Boult', role: 'Bowler', baseRating: 94, description: 'Elite left-arm swing bowler who specializes in taking wickets in the very first over.', startYear: 2022, endYear: 2024 },
  { name: 'Riyan Parag', role: 'All-Rounder', baseRating: 90, description: 'Talented batsman who unlocked supreme consistency and hits massive sixes.', startYear: 2019 },
  { name: 'Ravichandran Ashwin', role: 'All-Rounder', baseRating: 91, description: 'Tactical genius off-spinner who outsmarts batters with Carrom balls and variations.', startYear: 2022, endYear: 2024 },
  { name: 'Sandeep Sharma', role: 'Bowler', baseRating: 88, description: 'Unsung hero pacer who bowls clutch defensive lines in powerplays and death.', startYear: 2023 },
  { name: 'Dhruv Jurel', role: 'Wicketkeeper', baseRating: 88, description: 'Calm keeper-batsman who excels in finishing difficult, high-pressure chases.', startYear: 2023 },
  { name: 'Avesh Khan', role: 'Bowler', baseRating: 87, description: 'High-intensity fast bowler who hits hard lengths and bowls defensive death yorkers.', startYear: 2024 },
  { name: 'Shimron Hetmyer', role: 'Batsman', baseRating: 89, description: 'Explosive Guyanese finisher who wins matches with quick late boundary assaults.', startYear: 2022 },
  { name: 'Rahul Tewatia', role: 'All-Rounder', baseRating: 88, description: 'Famous finisher who wrote legacy with consecutive sixes in final-over chases.', startYear: 2020, endYear: 2021 },
  // Historic RR Legends
  { name: 'Shane Warne', role: 'Bowler', baseRating: 95, description: 'Legendary captain-coach who engineered the historic 2008 title win with master tactician leg spin.', startYear: 2008, endYear: 2011 },
  { name: 'Shane Watson', role: 'All-Rounder', baseRating: 95, description: 'Iconic Australian MVP of 2008 who opened the batting and bowled with destructive seam.', startYear: 2008, endYear: 2015 },
  { name: 'Yusuf Pathan', role: 'All-Rounder', baseRating: 91, description: 'Smashed the fastest century of his era and was the crown jewel of the 2008 RR champions.', startYear: 2008, endYear: 2010 },
  { name: 'Steve Smith', role: 'Batsman', baseRating: 92, description: 'Gritty, unorthodox captain who anchored the RR top-order with brilliant maneuvers.', startYear: 2014, endYear: 2020 },
  { name: 'Karun Nair', role: 'Batsman', baseRating: 88, description: 'Highly talented Indian batsman who played elegant, sweep-heavy innings in 2014-2015.', startYear: 2014, endYear: 2015 },
  { name: 'James Faulkner', role: 'All-Rounder', baseRating: 90, description: 'Elite Australian all-rounder, famous for taking 5-wicket hauls with slower-ball variations.', startYear: 2013, endYear: 2015 },
  { name: 'Ajinkya Rahane', role: 'Batsman', baseRating: 91, description: 'Classy elegant opener who was the batting pillar of RR, hitting beautiful orthodox drives.', startYear: 2011, endYear: 2019 },
  { name: 'Stuart Binny', role: 'All-Rounder', baseRating: 86, description: 'Invaluable Indian swing-bowling all-rounder who played several dynamic finishes.', startYear: 2011, endYear: 2019 },
  { name: 'Pravin Tambe', role: 'Bowler', baseRating: 87, description: '41-year-old leg-spin sensation who won a hattrick and captured hearts with his fairy-tale spells.', startYear: 2013, endYear: 2015 },
  { name: 'Deepak Hooda', role: 'All-Rounder', baseRating: 86, description: 'Vibrant young batsman who announced himself with massive sixes for RR in 2015.', startYear: 2015, endYear: 2015 }
];

const SRH_POOL: PlayerTemplate[] = [
  { name: 'Ishan Kishan', role: 'Wicketkeeper', baseRating: 92, description: 'Dynamic left-handed opening batsman.', startYear: 2025 },
  { name: 'Travis Head', role: 'Batsman', baseRating: 95, description: 'Dynamic Australian left-hander who hits boundaries at an astronomical rate.', startYear: 2024 },
  { name: 'Abhishek Sharma', role: 'All-Rounder', baseRating: 91, description: 'Electric young left-hander who strikes sixes cleanly and bowls handy spin.', startYear: 2019 },
  { name: 'Heinrich Klaasen', role: 'Wicketkeeper', baseRating: 95, description: 'The most destructive spin-basher in world cricket, hitting towering sixes.', startYear: 2023 },
  { name: 'Pat Cummins', role: 'Bowler', baseRating: 95, description: 'Inspirational Australian leader and bowler who silences opposing crowds.', startYear: 2024 },
  { name: 'Bhuvneshwar Kumar', role: 'Bowler', baseRating: 91, description: 'Seam king whose legendary swing position earns wickets and maiden overs.', startYear: 2014, endYear: 2024 },
  { name: 'T Natarajan', role: 'Bowler', baseRating: 90, description: 'The yorker sensation from Salem, delivering laser-guided defensive death overs.', startYear: 2018 },
  { name: 'Aiden Markram', role: 'Batsman', baseRating: 90, description: 'Technically solid South African captain who anchors and bowls useful off-spin.', startYear: 2022 },
  { name: 'Nitish Kumar Reddy', role: 'All-Rounder', baseRating: 87, description: 'Talented young seam-bowling all-rounder who plays fearless matchwinning knocks.', startYear: 2023 },
  { name: 'Mayank Markande', role: 'Bowler', baseRating: 85, description: 'Skilful leg-spinner who bowls tricky googlies in middle-overs.', startYear: 2023 },
  { name: 'Jaydev Unadkat', role: 'Bowler', baseRating: 86, description: 'Veteran left-arm bowler who outsmarts batsmen with deceptive off-cutters.', startYear: 2024 },
  { name: 'Glenn Phillips', role: 'Wicketkeeper', baseRating: 88, description: 'Hyper-athletic Kiwi who bats explosively, fields phenomenally, and bowls spin.', startYear: 2022 },
  { name: 'Abdul Samad', role: 'Batsman', baseRating: 85, description: 'Hard-hitting middle-order player who scores high-impact late boundaries.', startYear: 2020 },
  // Historic SRH Legends (2013-2021)
  { name: 'David Warner', role: 'Batsman', baseRating: 96, description: 'Iconic, record-breaking captain who carried the SRH batting on his shoulders and won the 2016 title.', startYear: 2014, endYear: 2021 },
  { name: 'Shikhar Dhawan', role: 'Batsman', baseRating: 91, description: 'Dynamic left-handed opener who formed a legendary, prolific partnership with Warner.', startYear: 2013, endYear: 2018 },
  { name: 'Rashid Khan', role: 'Bowler', baseRating: 96, description: 'Deceptive leg-spinner who became a global superstar with his lightning quick googlies for SRH.', startYear: 2017, endYear: 2021 },
  { name: 'Kane Williamson', role: 'Batsman', baseRating: 93, description: 'Ice-cool captain and batting technician who anchored SRH and won the Orange Cap in 2018.', startYear: 2015, endYear: 2022 },
  { name: 'Mustafizur Rahman', role: 'Bowler', baseRating: 91, description: 'The Fizz, whose unplayable cutters drove SRH to their fairy-tale 2016 championship.', startYear: 2016, endYear: 2017 },
  { name: 'Dale Steyn', role: 'Bowler', baseRating: 94, description: 'Fiery South African speed king who led the early SRH pace attack with raw aggression.', startYear: 2013, endYear: 2015 },
  { name: 'Moises Henriques', role: 'All-Rounder', baseRating: 88, description: 'Highly dependable Australian all-rounder who played crucial balancing roles in the 2016 squad.', startYear: 2014, endYear: 2017 },
  { name: 'Amit Mishra', role: 'Bowler', baseRating: 89, description: 'Wily leg-spinner who claimed a hattrick and spun webs in the early SRH years.', startYear: 2013, endYear: 2014 }
];

const DC_POOL: PlayerTemplate[] = [
  { name: 'Mitchell Starc', role: 'Bowler', baseRating: 95, description: 'Lethal left-arm fast bowler.', startYear: 2025 },
  { name: 'Faf du Plessis', role: 'Batsman', baseRating: 93, description: 'Inspirational athletic batsman who plays majestic lofted drives.', startYear: 2025 },
  { name: 'KL Rahul', role: 'Wicketkeeper', baseRating: 94, description: 'Sleek opening batsman, possessing sublime strokeplay and safe keeping.', startYear: 2025 },
  { name: 'Rishabh Pant', role: 'Wicketkeeper', baseRating: 94, description: 'Fearless captain and keeper, famous for playing audacious, jaw-dropping boundaries.', startYear: 2016, endYear: 2024 },
  { name: 'David Warner', role: 'Batsman', baseRating: 93, description: 'Legendary Australian opener, one of the most consistent scorers in IPL history.', startYear: 2009, endYear: 2013 },
  { name: 'David Warner', role: 'Batsman', baseRating: 93, description: 'Legendary Australian opener, one of the most consistent scorers in IPL history.', startYear: 2022, endYear: 2024 },
  { name: 'Axar Patel', role: 'All-Rounder', baseRating: 93, description: 'Highly reliable left-arm spinner and batsman who delivers elite, consistent performance.', startYear: 2019 },
  { name: 'Kuldeep Yadav', role: 'Bowler', baseRating: 93, description: 'Crafty left-arm wristspinner who outwits batsmen with dip, drift, and turn.', startYear: 2022 },
  { name: 'Jake Fraser-McGurk', role: 'Batsman', baseRating: 90, description: 'Young Australian sensation who bats with unmatched, explosive hand-speed.', startYear: 2024 },
  { name: 'Mitchell Marsh', role: 'All-Rounder', baseRating: 90, description: 'Powerful Australian all-rounder who bowls hard lengths and hits towering sixes.', startYear: 2022 },
  { name: 'Khaleel Ahmed', role: 'Bowler', baseRating: 88, description: 'Skilful left-arm pacer who bowls with excellent swing in early overs.', startYear: 2022 },
  { name: 'Mukesh Kumar', role: 'Bowler', baseRating: 87, description: 'Consistent right-arm medium-pacer who specializes in bowling tight death yorkers.', startYear: 2023 },
  { name: 'Prithvi Shaw', role: 'Batsman', baseRating: 88, description: 'Dynamic opening batsman who hits boundaries in rapid, beautiful strokes.', startYear: 2018 },
  { name: 'Anrich Nortje', role: 'Bowler', baseRating: 90, description: 'Fiery South African speed merchant who regularly bowls at over 150 km/h.', startYear: 2020 },
  { name: 'Abishek Porel', role: 'Wicketkeeper', baseRating: 86, description: 'Talented young left-hander who plays quick, high-impact counter-attacking knocks.', startYear: 2023 },
  { name: 'Ishant Sharma', role: 'Bowler', baseRating: 86, description: 'Veteran tall pacer who utilizes his experience and height for early bounce.', startYear: 2019 },
  // Historic DC/DD Legends (2008-2018)
  { name: 'Virender Sehwag', role: 'Batsman', baseRating: 94, description: 'Iconic, explosive opener who destroyed bowling attacks with his minimalist hand-eye coordination.', startYear: 2008, endYear: 2013 },
  { name: 'Gautam Gambhir', role: 'Batsman', baseRating: 91, description: 'Gritty left-handed opener who led from the front with classical, elegant run chases.', startYear: 2008, endYear: 2010 },
  { name: 'Gautam Gambhir', role: 'Batsman', baseRating: 91, description: 'Gritty left-handed opener who led from the front with classical, elegant run chases.', startYear: 2018, endYear: 2018 },
  { name: 'AB de Villiers', role: 'Batsman', baseRating: 93, description: 'Began his spectacular IPL journey at Delhi, playing mind-blowing knocks early on.', startYear: 2008, endYear: 2010 },
  { name: 'Amit Mishra', role: 'Bowler', baseRating: 90, description: 'All-time legendary leg-spinner who took multiple historic hattricks for Delhi.', startYear: 2008, endYear: 2020 },
  { name: 'Zaheer Khan', role: 'Bowler', baseRating: 90, description: 'Veteran mastermind fast-bowler who captained and mentored a young Delhi squad.', startYear: 2015, endYear: 2017 },
  { name: 'Dinesh Karthik', role: 'Wicketkeeper', baseRating: 89, description: 'Dynamic keeper-batsman who played versatile middle-order roles for Delhi.', startYear: 2008, endYear: 2014 },
  { name: 'Shreyas Iyer', role: 'Batsman', baseRating: 91, description: 'Young captain who rebuilt the franchise with his elegant strokeplay and solid leadership.', startYear: 2015, endYear: 2021 },
  { name: 'Kagiso Rabada', role: 'Bowler', baseRating: 93, description: 'Purple Cap winner who bowled searing death yorkers for the capitals.', startYear: 2017, endYear: 2021 }
];

const PBKS_POOL: PlayerTemplate[] = [
  { name: 'Glenn Maxwell', role: 'All-Rounder', baseRating: 94, description: "The 'Big Show', a terrifying switch-hitting gamechanger who also bowls handy off-spin.", startYear: 2025 },
  { name: 'Yuzvendra Chahal', role: 'Bowler', baseRating: 94, description: 'Crafty leg-spinner and leading wicket-taker.', startYear: 2025 },
  { name: 'Marcus Stoinis', role: 'All-Rounder', baseRating: 93, description: 'The Hulk, a powerful Australian all-rounder.', startYear: 2025 },
  { name: 'Shreyas Iyer', role: 'Batsman', baseRating: 92, description: 'Stylish middle-order batsman and leadership figure.', startYear: 2025 },
  { name: 'Shikhar Dhawan', role: 'Batsman', baseRating: 92, description: 'Gabbar, an incredibly consistent opening veteran who scores elegant boundaries.', startYear: 2022, endYear: 2024 },
  { name: 'Jonny Bairstow', role: 'Wicketkeeper', baseRating: 91, description: 'Powerful English keeper-batsman who decimates new balls in powerplays.', startYear: 2022 },
  { name: 'Liam Livingstone', role: 'All-Rounder', baseRating: 91, description: 'English brute force batsman who bowls both off-spin and leg-spin, hitting mammoth sixes.', startYear: 2022, endYear: 2024 },
  { name: 'Sam Curran', role: 'All-Rounder', baseRating: 92, description: 'Feisty English bowling all-rounder and leader who performs in clutch moments.', startYear: 2019, endYear: 2024 },
  { name: 'Arshdeep Singh', role: 'Bowler', baseRating: 92, description: 'Elite left-arm pacer who excels in swinging new balls and executing death overs.', startYear: 2019 },
  { name: 'Shashank Singh', role: 'Batsman', baseRating: 88, description: 'The sensational finisher who shocked the league with consistent high-impact chases.', startYear: 2024 },
  { name: 'Ashutosh Sharma', role: 'Batsman', baseRating: 87, description: 'Young explosive batsman who hits unbelievable boundaries under high pressure.', startYear: 2024 },
  { name: 'Jitesh Sharma', role: 'Wicketkeeper', baseRating: 88, description: 'Aggressive keeper-batsman who finishes games with rapid strike-rate cameos.', startYear: 2022 },
  { name: 'Kagiso Rabada', role: 'Bowler', baseRating: 93, description: 'World-class South African speed demon who bowls with rapid speed and deadly yorkers.', startYear: 2022, endYear: 2024 },
  { name: 'Rahul Chahar', role: 'Bowler', baseRating: 88, description: 'Quick, energetic leg-spinner who bowls flat defensive lines in middle overs.', startYear: 2022 },
  { name: 'Harpreet Brar', role: 'Bowler', baseRating: 87, description: 'Clever left-arm spinner who bowls tight defensive spells and hits quick boundaries.', startYear: 2019 },
  { name: 'Prabhsimran Singh', role: 'Wicketkeeper', baseRating: 86, description: 'Fearless young opener who attacks bowling from the first ball.', startYear: 2019 },
  // Historic KXIP Legends (2008-2018)
  { name: 'Shaun Marsh', role: 'Batsman', baseRating: 94, description: 'The inaugural Orange Cap winner in 2008, remained the ultimate run machine for Punjab.', startYear: 2008, endYear: 2017 },
  { name: 'Yuvraj Singh', role: 'All-Rounder', baseRating: 92, description: 'Icon player and captain who led Punjab to the 2008 semi-finals with flamboyant hitting.', startYear: 2008, endYear: 2010 },
  { name: 'Yuvraj Singh', role: 'All-Rounder', baseRating: 92, description: 'Icon player and captain who led Punjab to the 2008 semi-finals with flamboyant hitting.', startYear: 2018, endYear: 2018 },
  { name: 'Glenn Maxwell', role: 'All-Rounder', baseRating: 94, description: 'Unleashed extreme carnage in 2014, winning matches single-handedly with reverse sweeps.', startYear: 2014, endYear: 2020 },
  { name: 'David Miller', role: 'Batsman', baseRating: 92, description: 'Killer Miller, who smashed an iconic 38-ball century and served as Punjab star finisher.', startYear: 2013, endYear: 2019 },
  { name: 'Virender Sehwag', role: 'Batsman', baseRating: 91, description: 'Veteran opener who smashed a legendary, destructive century in the 2014 playoff match.', startYear: 2014, endYear: 2015 },
  { name: 'Piyush Chawla', role: 'Bowler', baseRating: 88, description: 'Consistent leg-spinner who spearheaded the spin department in the early campaigns.', startYear: 2008, endYear: 2013 },
  { name: 'Mitchell Johnson', role: 'Bowler', baseRating: 91, description: 'Fearsome Australian pacer who bowled rapid, aggressive spells in the 2014 final run.', startYear: 2014, endYear: 2016 },
  { name: 'KL Rahul', role: 'Wicketkeeper', baseRating: 94, description: 'Incredibly consistent captain and opener who scored over 500 runs every season for Punjab.', startYear: 2018, endYear: 2021 }
];

const GT_POOL: PlayerTemplate[] = [
  { name: 'Jos Buttler', role: 'Wicketkeeper', baseRating: 95, description: 'World-class English destroyer who scores massive centuries with clean hitting.', startYear: 2025 },
  { name: 'Hardik Pandya', role: 'All-Rounder', baseRating: 95, description: 'Inspirational captain who led GT to their maiden title in 2022.', startYear: 2022, endYear: 2023 },
  { name: 'Kagiso Rabada', role: 'Bowler', baseRating: 94, description: 'Fierce South African fast bowler with extreme pace.', startYear: 2025 },
  { name: 'Mohammed Siraj', role: 'Bowler', baseRating: 92, description: 'Miyaan Bhai, a high-intensity fast bowler who dismantles batting lineups when on song.', startYear: 2025 },
  { name: 'Shubman Gill', role: 'Batsman', baseRating: 95, description: 'The Prince, an exceptionally elegant batsman who glides into sublime batting forms.' },
  { name: 'Rashid Khan', role: 'Bowler', baseRating: 97, description: "Afghan superstar, the world's most desired leg-spinner and explosive late hitter." },
  { name: 'David Miller', role: 'Batsman', baseRating: 91, description: 'Killer Miller, a legendary South African finisher who chases scores under heavy pressure.' },
  { name: 'Sai Sudharsan', role: 'Batsman', baseRating: 90, description: 'Technically immaculate young left-hander who anchors innings with supreme class.' },
  { name: 'Mohit Sharma', role: 'Bowler', baseRating: 89, description: "Deceptive veteran bowler whose back-of-the-hand slower balls claim key wickets.", startYear: 2023 },
  { name: 'Rahul Tewatia', role: 'All-Rounder', baseRating: 88, description: 'Clutch finisher who plays ice-cool cameos in difficult runs-to-win situations.' },
  { name: 'Wriddhiman Saha', role: 'Wicketkeeper', baseRating: 87, description: 'Agile veteran keeper-batsman who scores quick runs and has safe gloves.', endYear: 2024 },
  { name: 'Sai Kishore', role: 'Bowler', baseRating: 87, description: 'Tall, clever left-arm spinner who bowls extremely tight defensive lines.' },
  { name: 'Noor Ahmad', role: 'Bowler', baseRating: 88, description: "Young Afghan left-arm wristspinner who matches Rashid's spin and creates webs.", startYear: 2023 },
  { name: 'Vijay Shankar', role: 'All-Rounder', baseRating: 85, description: 'Experienced medium-pacing all-rounder who plays solid knocks in middle overs.' },
  { name: 'Spencer Johnson', role: 'Bowler', baseRating: 87, description: 'Left-arm express Australian bowler who delivers sharp bounce and raw speed.', startYear: 2024 },
  { name: 'Shahrukh Khan', role: 'All-Rounder', baseRating: 85, description: 'Powerhouse finisher who strikes massive, high-impact boundaries in late overs.', startYear: 2024 }
];

const LSG_POOL: PlayerTemplate[] = [
  { name: 'Quinton de Kock', role: 'Wicketkeeper', baseRating: 91, description: 'Dynamic South African opener who provides massive powerplay starts.', startYear: 2022, endYear: 2024 },
  { name: 'Rishabh Pant', role: 'Wicketkeeper', baseRating: 96, description: 'Explosive wicketkeeper-batsman and match-winner.', startYear: 2025 },
  { name: 'KL Rahul', role: 'Wicketkeeper', baseRating: 94, description: 'Sleek opening batsman and captain, possessing sublime strokeplay and safe keeping.', endYear: 2024 },
  { name: 'Nicholas Pooran', role: 'Wicketkeeper', baseRating: 95, description: "LSG's premier middle-overs finisher and vibrant Trinidadian powerhouse.", startYear: 2023 },
  { name: 'Marcus Stoinis', role: 'All-Rounder', baseRating: 93, description: 'The Hulk, a powerful Australian all-rounder who wins matches with bat and ball.', endYear: 2024 },
  { name: 'Krunal Pandya', role: 'All-Rounder', baseRating: 90, description: 'Tactical left-arm spinner and reliable batsman who controls matches beautifully.', endYear: 2024 },
  { name: 'Ravi Bishnoi', role: 'Bowler', baseRating: 91, description: 'Quick leg-spinner who bowls dangerous, unplayable googlies at rapid speeds.' },
  { name: 'Mayank Yadav', role: 'Bowler', baseRating: 91, description: 'Lightning fast bowling sensation who crosses 156+ km/h with pin-point accuracy.', startYear: 2023 },
  { name: 'Ayush Badoni', role: 'Batsman', baseRating: 87, description: 'The baby AB, a creative young batsman who sweeps and lofts with pure imagination.' },
  { name: 'Naveen-ul-Haq', role: 'Bowler', baseRating: 88, description: 'Afghan medium-pacer who bowls extremely clever slower balls and cutters in death.', startYear: 2023 },
  { name: 'Yash Thakur', role: 'Bowler', baseRating: 86, description: 'Reliable medium pacer who took a historic five-wicket haul and bowls accurate lines.', startYear: 2023 },
  { name: 'Devdutt Padikkal', role: 'Batsman', baseRating: 87, description: 'Classy left-handed top-order batsman who strokes elegant boundaries on off-side.', startYear: 2024 },
  { name: 'Deepak Hooda', role: 'All-Rounder', baseRating: 86, description: 'Experienced batsman who scores quick runs and bowls handy off-spin.' },
  { name: 'Kyle Mayers', role: 'All-Rounder', baseRating: 89, description: 'Powerhouse West Indian opener who plays aggressive, muscle-bound shots early on.' }
];

const DCH_POOL: PlayerTemplate[] = [
  { name: 'Adam Gilchrist', role: 'Wicketkeeper', baseRating: 95, description: 'Legendary Australian keeper-batsman who captained Deccan to the 2009 trophy with explosive hitting.', startYear: 2008, endYear: 2011 },
  { name: 'Rohit Sharma', role: 'Batsman', baseRating: 92, description: 'A young batting phenom who starred for Deccan Chargers, scoring crucial runs and taking hat-tricks.', startYear: 2008, endYear: 2010 },
  { name: 'Herschelle Gibbs', role: 'Batsman', baseRating: 91, description: 'Aggressive South African opener who provided blistering starts and brilliant outfielding.', startYear: 2008, endYear: 2011 },
  { name: 'Andrew Symonds', role: 'All-Rounder', baseRating: 93, description: 'Powerhouse Australian all-rounder who destroyed bowling units and bowled clever spin and medium pace.', startYear: 2008, endYear: 2011 },
  { name: 'RP Singh', role: 'Bowler', baseRating: 92, description: 'Slingy left-arm fast bowler who won the Purple Cap in 2009 with swing and deadly yorkers.', startYear: 2008, endYear: 2011 },
  { name: 'Pragyan Ojha', role: 'Bowler', baseRating: 90, description: 'Crafty left-arm spinner who choked batsmen in the middle overs and took key wickets.', startYear: 2008, endYear: 2011 },
  { name: 'Venugopal Rao', role: 'Batsman', baseRating: 85, description: 'Solid middle-order batsman who anchored several tight chases for Deccan.', startYear: 2008, endYear: 2011 },
  { name: 'Chaminda Vaas', role: 'Bowler', baseRating: 89, description: 'Veteran Sri Lankan left-arm maestro who bowled extremely accurate opening spells.', startYear: 2008, endYear: 2011 },
  { name: 'Tirumalasetti Suman', role: 'Batsman', baseRating: 86, description: 'Aggressive and reliable top-order batsman who played key roles in the 2009 campaign.', startYear: 2008, endYear: 2011 },
  { name: 'Fidel Edwards', role: 'Bowler', baseRating: 88, description: 'Express West Indian fast bowler who generated extreme pace and raw bounce.', startYear: 2008, endYear: 2011 }
];

const KTK_POOL: PlayerTemplate[] = [
  { name: 'Mahela Jayawardene', role: 'Batsman', baseRating: 93, description: 'Classy Sri Lankan masterclass batsman who captained KTK with elegant shot-making.' },
  { name: 'Brendon McCullum', role: 'Wicketkeeper', baseRating: 94, description: 'Kiwi destroyer who played explosive, high-risk knocks at the top of the order.' },
  { name: 'Ravindra Jadeja', role: 'All-Rounder', baseRating: 91, description: 'A young rising superstar all-rounder who was bought for a record price and starred with bat and ball.' },
  { name: 'Brad Hodge', role: 'Batsman', baseRating: 89, description: 'Highly experienced T20 specialist from Australia who anchored the middle order beautifully.' },
  { name: 'Parthiv Patel', role: 'Wicketkeeper', baseRating: 86, description: 'Plucky opening keeper-batsman who scored quick runs in the powerplay.' },
  { name: 'S Sreesanth', role: 'Bowler', baseRating: 88, description: 'Fiery Indian swing bowler who bowled beautiful outswingers and celebrated passionately.' },
  { name: 'Muttiah Muralitharan', role: 'Bowler', baseRating: 95, description: 'The greatest spinner of all time, casting a web of mystery over batsmen in the twilight of his career.' },
  { name: 'Thisara Perera', role: 'All-Rounder', baseRating: 87, description: 'Hard-hitting Sri Lankan finish specialist who bowled handy medium-pace cutters.' },
  { name: 'RVinay Kumar', role: 'Bowler', baseRating: 86, description: 'Skilled domestic medium-pacer who bowled clever variations at the death.' },
  { name: 'RP Singh', role: 'Bowler', baseRating: 88, description: 'Left-arm swing bowler who brought plenty of experience and wickets to KTK.' }
];

const PWI_POOL: PlayerTemplate[] = [
  { name: 'Yuvraj Singh', role: 'All-Rounder', baseRating: 95, description: 'Iconic left-handed powerhouse, a massive match-winner with spectacular six-hitting and smart spin.', startYear: 2011, endYear: 2013 },
  { name: 'Sourav Ganguly', role: 'Batsman', baseRating: 90, description: 'The legendary Dada who brought his immense leadership and classy off-side drives to Pune.', startYear: 2011, endYear: 2013 },
  { name: 'Robin Uthappa', role: 'Wicketkeeper', baseRating: 91, description: 'Highly explosive keeper-batsman who walking-charged pacers with immense flair.', startYear: 2011, endYear: 2013 },
  { name: 'Steve Smith', role: 'Batsman', baseRating: 92, description: 'Unorthodox Australian batsman who started his rise to global fame with quirky, high-value knocks.', startYear: 2011, endYear: 2013 },
  { name: 'Angelo Mathews', role: 'All-Rounder', baseRating: 90, description: 'Stalwart Sri Lankan all-rounder who provided elite finishing and steady medium-pace overs.', startYear: 2011, endYear: 2013 },
  { name: 'Bhuvneshwar Kumar', role: 'Bowler', baseRating: 89, description: 'A young swing prodigy who began showcasing his world-class control and death-bowling skill.', startYear: 2011, endYear: 2013 },
  { name: 'Mitchell Marsh', role: 'All-Rounder', baseRating: 87, description: 'Powerful young Australian who contributed heavy hits and useful seam bowling.', startYear: 2011, endYear: 2013 },
  { name: 'Manish Pandey', role: 'Batsman', baseRating: 87, description: 'Talented young batsman who scored elegant, fluid runs in the middle order.', startYear: 2011, endYear: 2013 },
  { name: 'Ashish Nehra', role: 'Bowler', baseRating: 88, description: 'Veteran left-arm speedster who bowled extremely clever lines under pressure.', startYear: 2011, endYear: 2013 },
  { name: 'Wayne Parnell', role: 'Bowler', baseRating: 86, description: 'South African left-arm pacer who bowled quick and offered handy lower-order hitting.', startYear: 2011, endYear: 2013 }
];

const GL_POOL: PlayerTemplate[] = [
  { name: 'Suresh Raina', role: 'Batsman', baseRating: 94, description: 'Mr. IPL, captain of Gujarat Lions, who dominated the tournament with fluent left-handed strokeplay.' },
  { name: 'Ravindra Jadeja', role: 'All-Rounder', baseRating: 93, description: 'Direct hit master and elite left-arm spinner who starred in GL colors.' },
  { name: 'Brendon McCullum', role: 'Batsman', baseRating: 92, description: 'Fearless Kiwi legend who batted with blazing aggression alongside Dwayne Smith.' },
  { name: 'Dwayne Bravo', role: 'All-Rounder', baseRating: 93, description: 'The champion bowler who bowled slower-ball yorkers and danced after every wicket.' },
  { name: 'Aaron Finch', role: 'Batsman', baseRating: 90, description: 'Bullish Australian opener who powered GL to the playoffs with brute force.' },
  { name: 'Dinesh Karthik', role: 'Wicketkeeper', baseRating: 89, description: 'Highly skilled keeper-batsman who finished games with calm, high-IQ strokeplay.' },
  { name: 'James Faulkner', role: 'All-Rounder', baseRating: 89, description: 'Elite Australian bowling all-rounder who bowled deceptive slower back-of-the-hand balls.' },
  { name: 'Andrew Tye', role: 'Bowler', baseRating: 88, description: 'Knuckle-ball pioneer who took a famous hat-trick on his debut for GL.' },
  { name: 'Praveen Kumar', role: 'Bowler', baseRating: 86, description: 'Swing maestro who swung the ball both ways in the powerplay.' },
  { name: 'Dhawal Kulkarni', role: 'Bowler', baseRating: 86, description: 'Accurate medium-pacer who consistently picked up early wickets with the new ball.' }
];

const RPS_POOL: PlayerTemplate[] = [
  { name: 'MS Dhoni', role: 'Wicketkeeper', baseRating: 94, description: 'The legendary finisher and master strategist who steered RPS to the 2017 grand final.' },
  { name: 'Steve Smith', role: 'Batsman', baseRating: 95, description: 'Inspirational Australian captain who led RPS in 2017 with prolific, high-class run-scoring.' },
  { name: 'Ben Stokes', role: 'All-Rounder', baseRating: 96, description: 'MVP of the 2017 season, scoring a historic hundred and delivering incredible clutch bowling.', startYear: 2017, endYear: 2017 },
  { name: 'Ajinkya Rahane', role: 'Batsman', baseRating: 90, description: 'Elegant and highly reliable opener who anchored the top order with classy placement.' },
  { name: 'Imran Tahir', role: 'Bowler', baseRating: 91, description: 'Energetic South African leg-spinner who celebrated wickets with a famous lap of honor.', startYear: 2017, endYear: 2017 },
  { name: 'Manoj Tiwary', role: 'Batsman', baseRating: 87, description: 'Valuable middle-order crisis man who finished many tight games for RPS.' },
  { name: 'Washington Sundar', role: 'All-Rounder', baseRating: 88, description: 'Teenage off-spinning sensation who bowled highly economical powerplay spells in 2017.', startYear: 2017, endYear: 2017 },
  { name: 'Jaydev Unadkat', role: 'Bowler', baseRating: 90, description: 'Slower-ball specialist who took a five-for and a hat-trick in a stellar 2017 campaign.', startYear: 2017, endYear: 2017 },
  { name: 'Dan Christian', role: 'All-Rounder', baseRating: 86, description: 'Experienced Australian finisher who provided clutch support with bat and ball.' },
  { name: 'Adam Zampa', role: 'Bowler', baseRating: 88, description: 'Skilled leg-spinner who claimed historic 6-wicket figures in the 2016 season.', startYear: 2016, endYear: 2017 }
];

export const IPL_WINNERS_MAP: Record<number, string> = {
  2008: 'RR',
  2009: 'DCH',
  2010: 'CSK',
  2011: 'CSK',
  2012: 'KKR',
  2013: 'MI',
  2014: 'KKR',
  2015: 'MI',
  2016: 'SRH',
  2017: 'MI',
  2018: 'CSK',
  2019: 'MI',
  2020: 'MI',
  2021: 'CSK',
  2022: 'GT',
  2023: 'CSK',
  2024: 'KKR',
  2025: 'RCB', // User explicitly mentioned: "rcb(2025) there will be a symbol so i know that they are the winners of 2025 ipl"
  2026: 'RCB'
};

export function getActiveYearsForTeam(teamId: string): number[] {
  const allYears = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2008 + i);
  if (teamId === 'DCH') {
    return [2008, 2009, 2010, 2011, 2012];
  }
  if (teamId === 'KTK') {
    return [2011];
  }
  if (teamId === 'PWI') {
    return [2011, 2012, 2013];
  }
  if (teamId === 'GL') {
    return [2016, 2017];
  }
  if (teamId === 'RPS') {
    return [2016, 2017];
  }
  if (teamId === 'GT' || teamId === 'LSG') {
    return [2022, 2023, 2024, 2025, 2026];
  }
  if (teamId === 'SRH') {
    return allYears.filter(y => y >= 2013);
  }
  if (teamId === 'CSK' || teamId === 'RR') {
    return allYears.filter(y => y !== 2016 && y !== 2017);
  }
  return allYears;
}

export function getOpponentsForYear(year: number, userTeamId: string): Opponent[] {
  const activeTeams = IPL_TEAMS.filter(team => {
    const activeYears = getActiveYearsForTeam(team.id);
    return activeYears.includes(year);
  });
  
  return activeTeams
    .filter(team => team.id !== userTeamId)
    .map(team => {
      let baseRating = 88;
      if (IPL_WINNERS_MAP[year] === team.id) {
        baseRating = 94;
      } else if (['CSK', 'MI', 'KKR', 'SRH'].includes(team.id)) {
        baseRating = 90 + (year % 3);
      } else {
        baseRating = 85 + (year % 4);
      }
      return {
        id: `${team.id}_OPP`,
        name: team.name,
        shortName: team.id,
        rating: baseRating,
        emoji: team.emoji
      };
    });
}

export function generateFullPlayerDatabase(baseDatabase: Player[]): Player[] {
  const finalDatabase = [...baseDatabase];
  const years = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2008 + i);
  
  const pools: Record<string, PlayerTemplate[]> = {
    CSK: CSK_POOL,
    MI: MI_POOL,
    RCB: RCB_POOL,
    KKR: KKR_POOL,
    RR: RR_POOL,
    SRH: SRH_POOL,
    DC: DC_POOL,
    PBKS: PBKS_POOL,
    GT: GT_POOL,
    LSG: LSG_POOL,
    DCH: DCH_POOL,
    KTK: KTK_POOL,
    PWI: PWI_POOL,
    GL: GL_POOL,
    RPS: RPS_POOL
  };

  for (const teamId of Object.keys(pools)) {
    const templates = pools[teamId];
    for (const year of years) {
      // Skip year if team was not active in this season
      const activeYears = getActiveYearsForTeam(teamId);
      if (!activeYears.includes(year)) continue;

      // Find existing players for this team and year
      const existing = finalDatabase.filter(p => p.originalTeam === teamId && p.year === year);
      const existingNames = new Set(existing.map(p => p.name.toLowerCase().trim()));
      
      let squadCount = existing.length;
      
      for (const template of templates) {
        if (squadCount >= 15) break;
        if (existingNames.has(template.name.toLowerCase().trim())) continue;

        // Filter out based on template active years if present
        if (template.startYear && year < template.startYear) continue;
        if (template.endYear && year > template.endYear) continue;
        
        // Pseudo-random deterministic generator based on name length and year
        const yearOffset = (year - 2024) * 0.5;
        const randomFactor = Math.floor(Math.sin(year + template.name.length) * 2);
        const rating = Math.min(98, Math.max(78, template.baseRating + randomFactor + Math.round(yearOffset)));
        
        const stats: any = { matches: Math.floor(10 + Math.abs(Math.sin(year + rating) * 6)) };
        if (template.role === 'Batsman' || template.role === 'Wicketkeeper') {
          const avg = 22 + Math.abs(Math.sin(rating) * 25);
          const sr = 125 + Math.abs(Math.cos(rating) * 45);
          stats.battingAvg = parseFloat(avg.toFixed(2));
          stats.battingSR = parseFloat(sr.toFixed(2));
          stats.runs = Math.floor(stats.matches * avg * 0.85);
        } else if (template.role === 'Bowler') {
          stats.wickets = Math.floor(stats.matches * (0.8 + Math.abs(Math.sin(rating) * 0.8)));
          stats.bowlingEconomy = parseFloat((9.5 - Math.abs(Math.cos(rating) * 2.5)).toFixed(2));
        } else if (template.role === 'All-Rounder') {
          const avg = 18 + Math.abs(Math.sin(rating) * 20);
          const sr = 130 + Math.abs(Math.cos(rating) * 50);
          stats.battingAvg = parseFloat(avg.toFixed(2));
          stats.battingSR = parseFloat(sr.toFixed(2));
          stats.runs = Math.floor(stats.matches * avg * 0.7);
          stats.wickets = Math.floor(stats.matches * (0.5 + Math.abs(Math.cos(rating) * 0.7)));
          stats.bowlingEconomy = parseFloat((10.0 - Math.abs(Math.sin(rating) * 2.2)).toFixed(2));
        }
        
        finalDatabase.push({
          id: `${template.name.toLowerCase().replace(/[^a-z]/g, '_')}_${year}`,
          name: template.name,
          role: template.role,
          rating,
          year,
          originalTeam: teamId,
          stats,
          description: template.description
        });
        
        existingNames.add(template.name.toLowerCase().trim());
        squadCount++;
      }

      // If squad size is below 15 (due to historical filters), generate realistic domestic talents to fill the bench
      const domesticSurnames = ['Sharma', 'Singh', 'Patel', 'Kumar', 'Yadav', 'Joshi', 'Chaudhary', 'Mishra', 'Reddy', 'Gowda', 'Rao', 'Iyer', 'Sen', 'Dutta'];
      const domesticFirstnames = ['Amit', 'Rahul', 'Sanjay', 'Vikram', 'Rohan', 'Aditya', 'Abhishek', 'Vijay', 'Praveen', 'Suresh', 'Manish', 'Deepak', 'Arun', 'Piyush'];
      
      let fillerIndex = 0;
      while (squadCount < 15) {
        const firstName = domesticFirstnames[(year + fillerIndex + teamId.charCodeAt(0)) % domesticFirstnames.length];
        const lastName = domesticSurnames[(year * 3 + Math.floor(fillerIndex / domesticFirstnames.length) + teamId.charCodeAt(1)) % domesticSurnames.length];
        if (fillerIndex > 100) break;
        const fullName = `${firstName} ${lastName}`;
        
        if (existingNames.has(fullName.toLowerCase().trim())) {
          fillerIndex++;
          continue;
        }
        
        // Dynamic role balancing based on current team makeup
        const currentPlayers = finalDatabase.filter(p => p.originalTeam === teamId && p.year === year);
        const batsCount = currentPlayers.filter(p => p.role === 'Batsman' || p.role === 'Wicketkeeper').length;
        const bowlsCount = currentPlayers.filter(p => p.role === 'Bowler').length;
        
        let role: PlayerRole = 'All-Rounder';
        if (batsCount < bowlsCount) {
          role = fillerIndex % 3 === 0 ? 'Wicketkeeper' : 'Batsman';
        } else if (bowlsCount < batsCount) {
          role = 'Bowler';
        } else {
          role = 'All-Rounder';
        }
        
        const baseRating = 76 + (year % 3);
        const rating = Math.min(84, Math.max(74, baseRating + (fillerIndex % 3)));
        
        const stats: any = { matches: Math.floor(4 + (fillerIndex % 5)) };
        if (role === 'Batsman' || role === 'Wicketkeeper') {
          stats.battingAvg = parseFloat((18.5 + (fillerIndex % 10)).toFixed(2));
          stats.battingSR = parseFloat((112 + (fillerIndex % 20)).toFixed(2));
          stats.runs = Math.floor(stats.matches * stats.battingAvg * 0.8);
        } else if (role === 'Bowler') {
          stats.wickets = Math.floor(stats.matches * 0.85);
          stats.bowlingEconomy = parseFloat((8.2 + (fillerIndex % 5) * 0.2).toFixed(2));
        } else {
          stats.battingAvg = parseFloat((15.0 + (fillerIndex % 6)).toFixed(2));
          stats.battingSR = parseFloat((118 + (fillerIndex % 15)).toFixed(2));
          stats.runs = Math.floor(stats.matches * stats.battingAvg * 0.7);
          stats.wickets = Math.floor(stats.matches * 0.65);
          stats.bowlingEconomy = parseFloat((8.4 + (fillerIndex % 4) * 0.2).toFixed(2));
        }
        
        finalDatabase.push({
          id: `${fullName.toLowerCase().replace(/[^a-z]/g, '_')}_${year}`,
          name: fullName,
          role,
          rating,
          year,
          originalTeam: teamId,
          stats,
          description: `A promising uncapped domestic player representing ${teamId} in the ${year} season.`
        });
        
        existingNames.add(fullName.toLowerCase().trim());
        squadCount++;
        fillerIndex++;
      }
    }
  }

  // Apply programmatic rating adjustments to ensure high realism, remove rating inflation and enforce the squad OVR challenge
  const adjustedDatabase = finalDatabase.map(player => {
    let r = player.rating;
    
    // Explicit requested override for Klaasen
    if (player.name === 'Heinrich Klaasen' || player.name === 'Heinrich Klaasen') {
      r = 91;
    } else if (r >= 99) {
      r = 95; // Bumrah, Narine peak
    } else if (r >= 97) {
      r = 94; // Kohli, Gill elite peak
    } else if (r >= 95) {
      r = 92; // Buttler, Russell, Head, etc.
    } else if (r >= 93) {
      r = 90; // Samson, Pant, etc.
    } else if (r >= 91) {
      r = 89; // Class stars
    } else if (r >= 88) {
      r = 87; // Reliable players
    }
    
    return {
      ...player,
      rating: r
    };
  });

  return adjustedDatabase;
}

export const PLAYER_DATABASE: Player[] = generateFullPlayerDatabase(BASE_PLAYER_DATABASE);
