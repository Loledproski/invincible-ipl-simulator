import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Users,
  Play,
  RotateCcw,
  Star,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock,
  User,
  Shield,
  Zap,
  Info,
  Sparkles,
  Calendar,
  CheckCircle2,
  Lock,
  Eye,
  Menu,
  X,
  HelpCircle,
  Palette,
  Home,
  ChevronUp,
  ChevronDown,
  Shuffle
} from 'lucide-react';
import { Player, IPLTeamTheme, Opponent, MatchResult, CampaignState, PlayerRole } from './types';
import { IPL_TEAMS, OPPONENTS, PLAYER_DATABASE, IPL_WINNERS_MAP, getActiveYearsForTeam, getOpponentsForYear } from './data';
import { PlayerCard } from './components/PlayerCard';
import { calculateSquadBalance, simulateMatch } from './simulator';
import { loadHallOfFame, saveToHallOfFame, getTeamStyleProperties, getVibrantTeamColor, HallOfFameEntry, isOverseasPlayer, isTenYearLoyalist } from './utils';

// Helper to roll random franchise and its available players
function rollTeamAndGetOptions(squad: Player[], excludeTeamId?: string): { teamId: string; year: number; options: Player[] } {
  const draftedNames = squad.map(p => p.name.toLowerCase().trim());
  const draftedTeams = squad.map(p => p.originalTeam);
  
  // Count how many drafted players from each team.
  // In a standard IPL team, there are 10 teams. Since we draft 11 players, we can have at most 2 players from any team, and ideally we prefer teams we haven't drafted from yet.
  const teamCounts: Record<string, number> = {};
  draftedTeams.forEach(t => {
    teamCounts[t] = (teamCounts[t] || 0) + 1;
  });

  const availableFranchises = Array.from(new Set(PLAYER_DATABASE.map(p => p.originalTeam)));
  
  const combinations: { teamId: string; year: number; weight: number }[] = [];
  for (const teamId of availableFranchises) {
    if (teamId === excludeTeamId) continue;
    
    // We restrict a team if we already have 2 or more players from it
    const count = teamCounts[teamId] || 0;
    if (count >= 2) continue; // max 2 players from any franchise in the squad!
    
    // Weight can be higher for teams we have NOT drafted any players from yet!
    const weight = count === 0 ? 10 : 1; 

    const activeYears = getActiveYearsForTeam(teamId);
    for (const yr of activeYears) {
      combinations.push({ teamId, year: yr, weight });
    }
  }
  
  // Shuffle combinations with weighting
  const shuffledCombs = [...combinations].sort((a, b) => {
    const scoreA = Math.random() * a.weight;
    const scoreB = Math.random() * b.weight;
    return scoreB - scoreA;
  });
  
  for (const comb of shuffledCombs) {
    const options = PLAYER_DATABASE.filter(
      p => p.originalTeam === comb.teamId && 
           p.year === comb.year
    );
    if (options.length > 0) {
      const sortedOptions = [...options].sort((a, b) => b.rating - a.rating);
      return { teamId: comb.teamId, year: comb.year, options: sortedOptions };
    }
  }
  
  // Fallback if somehow everything is filtered out
  for (const teamId of availableFranchises) {
    const activeYears = getActiveYearsForTeam(teamId);
    for (const yr of activeYears) {
      const options = PLAYER_DATABASE.filter(
        p => p.originalTeam === teamId && 
             p.year === yr
      );
      if (options.length > 0) {
        const sortedOptions = [...options].sort((a, b) => b.rating - a.rating);
        return { teamId, year: yr, options: sortedOptions };
      }
    }
  }
  
  return { teamId: 'RCB', year: 2024, options: [] };
}

// Generate the list of campaign opponents
function generateOpponentsList(length: 'Short' | 'Long', userTeamId: string, year: number): Opponent[] {
  // Use dynamically active opponents for this specific historical year!
  const opps = getOpponentsForYear(year, userTeamId);
  const targetCount = length === 'Short' ? 9 : 14;
  
  if (opps.length === 0) {
    // Fallback
    const fallback = OPPONENTS.filter(o => o.shortName !== userTeamId);
    const result: Opponent[] = [];
    while (result.length < targetCount) {
      result.push(...[...fallback].sort(() => 0.5 - Math.random()));
    }
    return result.slice(0, targetCount);
  }
  
  const result: Opponent[] = [];
  while (result.length < targetCount) {
    result.push(...[...opps].sort(() => 0.5 - Math.random()));
  }
  return result.slice(0, targetCount);
}

const IPL_TRIVIA_FACTS = [
  "Virat Kohli is the only player in IPL history to play for the same franchise (RCB) since the inaugural 2008 season!",
  "Chris Gayle holds the record for the highest individual score in IPL history: an unbeaten 175 off 66 balls in 2013!",
  "Praveen Kumar bowled the first-ever delivery in IPL history to Sourav Ganguly in 2008.",
  "MS Dhoni has played the most matches as an IPL captain, leading CSK in over 220 matches with legendary success!",
  "Amit Mishra has taken three hat-tricks in IPL history—the most by any bowler!",
  "KKR holds the record for the longest winning streak in IPL, winning 14 consecutive matches across the 2014-15 seasons.",
  "Alzarri Joseph holds the best bowling figures in IPL: 6/12 on his MI debut against SRH in 2019!",
  "AB de Villiers has won the most Player of the Match awards in IPL history (25 times).",
  "Rajasthan Royals were the inaugural IPL Champions in 2008, led by the late Shane Warne.",
  "KL Rahul holds the record for the fastest IPL fifty, reaching it in just 14 balls against DC in 2018!",
  "Suresh Raina was nicknamed 'Mr. IPL' for his unmatched consistency and consecutive games played for CSK.",
  "Harshal Patel and Dwayne Bravo share the record for the most wickets in a single IPL season, with 32 wickets each!",
  "The highest team score in IPL history is 287/3, scored by SRH against RCB in the 2024 season!",
  "Yuzvendra Chahal is the leading wicket-taker in IPL history with over 200 scalps!",
  "Shikhar Dhawan is the first batsman in IPL history to hit back-to-back centuries (2020 season).",
  "In 2017, Mumbai Indians defeated Pune by exactly 1 run in a low-scoring thriller to lift their 3rd trophy!",
  "The first-ever IPL century was scored by Brendon McCullum for KKR against RCB on the opening night in 2008!",
  "Rohit Sharma has won 6 IPL titles as a player—5 as captain of Mumbai Indians and 1 with Deccan Chargers in 2009!",
  "The lowest team score in IPL history is 49 all out, scored by Royal Challengers Bengaluru against KKR in 2017.",
  "Pat Cummins was bought by Sunrisers Hyderabad for a whopping ₹20.5 Crore in the 2024 auction, briefly becoming the second-most expensive player ever!",
  "Mitchell Starc became the most expensive player in IPL history when KKR acquired him for ₹24.75 Crore in the 2024 auction!",
  "Anil Kumble holds the record for the best bowling spell by a captain in IPL, taking 5 wickets for just 5 runs against RR in 2009!",
  "Lasith Malinga was the first bowler in IPL history to reach 150 and 170 wickets, establishing himself as a Yorker King.",
  "Sunil Narine has scored one of the fastest IPL fifties in just 15 balls, and also has 180+ wickets in his legendary career!",
  "Piyush Chawla bowled for more than 380 overs in the IPL before bowling his first-ever no-ball in 2016!",
  "The highest match aggregate in IPL history is 549 runs, scored during the RCB vs SRH clash in Bengaluru in 2024!",
  "Sachin Tendulkar was the first Indian player to win the Orange Cap, scoring 618 runs in the 2010 season for Mumbai Indians.",
  "Shaun Marsh won the inaugural IPL Orange Cap in 2008 while playing for Kings XI Punjab (now PBKS), scoring 616 runs.",
  "Sohail Tanvir won the first-ever Purple Cap in 2008, picking up 22 wickets in just 11 matches for Rajasthan Royals.",
  "CSK has qualified for the IPL playoffs/semifinals in 12 of their first 14 seasons—the most consistent run by any franchise!",
  "Bhuvneshwar Kumar is the only bowler in IPL history to win back-to-back Purple Caps (2016 and 2017 seasons).",
  "The IPL has been hosted in three countries outside India: South Africa (2009), UAE (2014, 2020, 2021), and South Africa/UAE.",
  "Only three players have scored more than 7,000 runs in IPL history: Virat Kohli, Shikhar Dhawan, and David Warner!",
  "Deccan Chargers went from finishing last in 2008 to becoming the tournament champions in 2009 under Adam Gilchrist's captaincy!",
  "Rashid Khan holds the record for the most economical 4-over spell in an IPL playoff match, conceding just 6 runs in 2022.",
  "Kieron Pollard played 189 matches for Mumbai Indians, the most by an overseas player for a single IPL franchise!",
  "Jos Buttler equaled Virat Kohli's record for the most centuries in a single IPL season, smashing 4 hundreds in the 2022 season.",
  "Kagiso Rabada is the fastest bowler to reach 100 IPL wickets, achieving the milestone in just 64 matches!",
  "Zaheer Khan bowled the first-ever maiden over in IPL history, playing for RCB against KKR in the inaugural game of 2008.",
  "MS Dhoni holds the record for the most dismissals by a wicketkeeper in IPL history, with over 180 catches and stumpings!"
];

export default function App() {
  // --- CORE STATE ---
  const [gameState, setGameState] = useState<CampaignState>({
    status: 'LOBBY',
    selectedTeamId: 'RCB', // default starting theme preview
    tournamentYear: 2024,
    tournamentLength: 'Short',
    currentMatchNumber: 1,
    squad: [],
    captainId: null,
    history: [],
    draftRound: 1,
    currentDraftOptions: [],
    rerollsLeft: 3
  });

  // Active hover team for the TEAM_SELECT screen
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);
  
  // Drafting Screen selection state
  const [selectedDraftPlayer, setSelectedDraftPlayer] = useState<Player | null>(null);
  const [draftCategoryTab, setDraftCategoryTab] = useState<'All' | PlayerRole>('All');

  // Match Simulation animation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessageIndex, setSimMessageIndex] = useState(0);
  const [lastMatchResult, setLastMatchResult] = useState<MatchResult | null>(null);
  const [showScorecardModal, setShowScorecardModal] = useState(false);

  // Hall of Fame cache
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>([]);

  // Sound/Vibe mute toggle (cosmetic only for sensory engagement)
  const [vibeMode, setVibeMode] = useState(true);

  // IPL Trivia facts state
  const [triviaIndex, setTriviaIndex] = useState(() => Math.floor(Math.random() * IPL_TRIVIA_FACTS.length));

  const handleNextTrivia = () => {
    let nextIdx = Math.floor(Math.random() * IPL_TRIVIA_FACTS.length);
    while (nextIdx === triviaIndex && IPL_TRIVIA_FACTS.length > 1) {
      nextIdx = Math.floor(Math.random() * IPL_TRIVIA_FACTS.length);
    }
    setTriviaIndex(nextIdx);
  };

  // Load Hall of Fame on mount
  useEffect(() => {
    setHallOfFame(loadHallOfFame());
  }, []);

  // Sync active UI theme with selection/hover
  const activeTeamId = useMemo(() => {
    if (gameState.status === 'TEAM_SELECT' && hoveredTeamId) {
      return hoveredTeamId;
    }
    return gameState.selectedTeamId;
  }, [gameState.status, gameState.selectedTeamId, hoveredTeamId]);

  const activeTheme = useMemo(() => {
    return IPL_TEAMS.find(t => t.id === activeTeamId) || IPL_TEAMS[0];
  }, [activeTeamId]);

  // Squad calculation
  const squadBalance = useMemo(() => {
    return calculateSquadBalance(gameState.squad, activeTheme.shortName);
  }, [gameState.squad]);

  // Campaign Opponents list for active run
  const [opponentsList, setOpponentsList] = useState<Opponent[]>([]);

  // Simulation Messages for realistic match build-up
  const simulationMessages = [
    "🏏 The captains have met at the pitch for the coin toss...",
    "⚡ Openers are marching out onto the field with loud stadium roars!",
    "🥎 Powerplay overs: Batsmen looking to clear boundaries while bowler swings the ball...",
    "🎯 Middle-overs squeeze: Spinners pitching deep webs to dry up run-scoring...",
    "🔥 Death overs carnage! Batters striking long sixes, bowlers aiming for crushing yorkers...",
    "📈 Compiling final run-rate matrices and crowning Man of the Match..."
  ];

  // Simulation Message loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      setSimMessageIndex(0);
      interval = setInterval(() => {
        setSimMessageIndex(prev => {
          if (prev < simulationMessages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  // --- ACTIONS ---


  const [shareText, setShareText] = useState('Share Campaign Result');
  const handleShareResult = () => {
    const wins = gameState.history.filter(h => h.won).length;
    const total = gameState.history.length;
    const isWinner = gameState.status === 'WINNER';
    const captain = gameState.squad.find(p => p.id === gameState.captainId)?.name || 'None';
    
    let text = `🏏 Invincible IPL Simulator\n`;
    text += `Franchise: ${activeTheme.shortName} (${gameState.tournamentYear})\n`;
    text += `Captain: ${captain}\n`;
    text += `Record: ${wins} W - ${total - wins} L\n`;
    text += isWinner ? `👑 UNDEFEATED CHAMPIONS!` : `💔 Streak broken at Match ${total}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setShareText('Copied to Clipboard!');
      setTimeout(() => setShareText('Share Campaign Result'), 2000);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  };

  const handleStartTeamSelect = () => {

    setGameState(prev => ({
      ...prev,
      status: 'TEAM_SELECT'
    }));
  };

  const handleSelectTeam = (teamId: string) => {
    const activeYears = getActiveYearsForTeam(teamId);
    const defaultYear = activeYears.includes(2024) ? 2024 : activeYears[0];
    setGameState(prev => ({
      ...prev,
      selectedTeamId: teamId,
      tournamentYear: defaultYear,
      status: 'TOURNAMENT_CONFIG'
    }));
  };

  const handleConfigureTournament = (year: number, length: 'Short' | 'Long') => {
    // Generate the opponents
    const generatedOpps = generateOpponentsList(length, gameState.selectedTeamId, year);
    setOpponentsList(generatedOpps);

    // Prepare initial draft options
    const { teamId: rolledTeamId, year: rolledYear, options: firstOptions } = rollTeamAndGetOptions([]);

    setGameState(prev => ({
      ...prev,
      tournamentYear: year,
      tournamentLength: length,
      status: 'DRAFTING',
      squad: [],
      captainId: null,
      history: [],
      draftRound: 1,
      currentDraftOptions: firstOptions,
      currentDraftFranchiseId: rolledTeamId,
      currentDraftYear: rolledYear,
      rerollsLeft: 3
    }));
    setSelectedDraftPlayer(null);
    setDraftCategoryTab('All');
  };

  const handleSelectDraftPlayer = (player: Player) => {
    setSelectedDraftPlayer(player);
  };

  const handleConfirmDraftSelection = () => {
    if (!selectedDraftPlayer) return;

    const updatedSquad = [...gameState.squad, selectedDraftPlayer];
    const nextRound = gameState.draftRound + 1;

    if (nextRound <= 11) {
      const { teamId: rolledTeamId, year: rolledYear, options: nextOptions } = rollTeamAndGetOptions(updatedSquad);
      setGameState(prev => ({
        ...prev,
        squad: updatedSquad,
        draftRound: nextRound,
        currentDraftOptions: nextOptions,
        currentDraftFranchiseId: rolledTeamId,
        currentDraftYear: rolledYear,
        rerollsLeft: 3
      }));
      setSelectedDraftPlayer(null);
      setDraftCategoryTab('All');
    } else {
      // Squad drafting complete, go to Captain Selection screen
      setGameState(prev => ({
        ...prev,
        squad: updatedSquad,
        status: 'SQUAD_PREVIEW'
      }));
    }
  };

  const handleRerollDraftYear = () => {
    if ((gameState.rerollsLeft ?? 0) <= 0) return;
    const currentTeam = gameState.currentDraftFranchiseId;
    if (!currentTeam) return;

    const activeYears = getActiveYearsForTeam(currentTeam);
    let availableYears = activeYears.filter(yr => yr !== gameState.currentDraftYear);
    if (availableYears.length === 0) {
      availableYears = activeYears; // fallback if only one year is active
    }

    const randomYear = availableYears[Math.floor(Math.random() * availableYears.length)];
    const draftedNames = new Set(gameState.squad.map(p => p.name.toLowerCase().trim()));
    
    // Fetch all players for this team and year that have NOT been drafted
    const options = PLAYER_DATABASE.filter(
      p => p.originalTeam === currentTeam && 
           p.year === randomYear &&
           !draftedNames.has(p.name.toLowerCase().trim())
    );

    const sortedOptions = [...options].sort((a, b) => b.rating - a.rating);

    setGameState(prev => ({
      ...prev,
      currentDraftOptions: sortedOptions,
      currentDraftYear: randomYear,
      rerollsLeft: (prev.rerollsLeft ?? 3) - 1
    }));
    setSelectedDraftPlayer(null);
    setDraftCategoryTab('All');
  };

  const handleRerollDraftTeam = () => {
    if ((gameState.rerollsLeft ?? 0) <= 0) return;
    const currentYear = gameState.currentDraftYear;
    if (!currentYear) return;

    const draftedNames = new Set(gameState.squad.map(p => p.name.toLowerCase().trim()));
    const draftedTeams = gameState.squad.map(p => p.originalTeam);
    const teamCounts: Record<string, number> = {};
    draftedTeams.forEach(t => {
      teamCounts[t] = (teamCounts[t] || 0) + 1;
    });

    const availableFranchises = Array.from(new Set(PLAYER_DATABASE.map(p => p.originalTeam)));
    let validFranchises = availableFranchises.filter(teamId => {
      if (teamId === gameState.currentDraftFranchiseId) return false;
      const count = teamCounts[teamId] || 0;
      if (count >= 2) return false; // max 2 players from any franchise

      const activeYears = getActiveYearsForTeam(teamId);
      if (!activeYears.includes(currentYear)) return false;

      const options = PLAYER_DATABASE.filter(
        p => p.originalTeam === teamId && 
             p.year === currentYear &&
             !draftedNames.has(p.name.toLowerCase().trim())
      );
      return options.length > 0;
    });

    if (validFranchises.length === 0) {
      // fallback without team count limit
      validFranchises = availableFranchises.filter(teamId => {
        if (teamId === gameState.currentDraftFranchiseId) return false;
        const activeYears = getActiveYearsForTeam(teamId);
        if (!activeYears.includes(currentYear)) return false;
        const options = PLAYER_DATABASE.filter(
          p => p.originalTeam === teamId && 
               p.year === currentYear &&
               !draftedNames.has(p.name.toLowerCase().trim())
        );
        return options.length > 0;
      });
    }

    if (validFranchises.length === 0) return;

    const randomTeam = validFranchises[Math.floor(Math.random() * validFranchises.length)];
    const options = PLAYER_DATABASE.filter(
      p => p.originalTeam === randomTeam && 
           p.year === currentYear &&
           !draftedNames.has(p.name.toLowerCase().trim())
    );
    const sortedOptions = [...options].sort((a, b) => b.rating - a.rating);

    setGameState(prev => ({
      ...prev,
      currentDraftOptions: sortedOptions,
      currentDraftFranchiseId: randomTeam,
      rerollsLeft: (prev.rerollsLeft ?? 3) - 1
    }));
    setSelectedDraftPlayer(null);
    setDraftCategoryTab('All');
  };

  const handleSelectCaptain = (playerId: string) => {
    setGameState(prev => ({
      ...prev,
      captainId: playerId
    }));
  };

  const handleMoveSquadPlayer = (idx: number, direction: 'UP' | 'DOWN') => {
    if (direction === 'UP' && idx === 0) return;
    if (direction === 'DOWN' && idx === gameState.squad.length - 1) return;

    const newIndex = direction === 'UP' ? idx - 1 : idx + 1;
    const updatedSquad = [...gameState.squad];
    // Swap
    const temp = updatedSquad[idx];
    updatedSquad[idx] = updatedSquad[newIndex];
    updatedSquad[newIndex] = temp;

    setGameState(prev => ({
      ...prev,
      squad: updatedSquad
    }));
  };

  const handleConfirmCaptain = () => {
    if (!gameState.captainId) return;

    // Scale all opponent ratings in opponentsList to match the user's squad overall OVR
    // so they are similar and the match simulation is a balanced 50-50 battle!
    const userOvr = squadBalance.overallStrength;
    setOpponentsList(prevOpps => prevOpps.map(opp => {
      // Create a balanced rating within +/- 2 of the user's rating
      const randomOffset = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
      const balancedRating = Math.max(75, Math.min(95, userOvr + randomOffset));
      return {
        ...opp,
        rating: balancedRating
      };
    }));

    setGameState(prev => ({
      ...prev,
      status: 'PLAYING',
      currentMatchNumber: 1,
      history: []
    }));
  };

  const handleSimulateMatch = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);

    // Delay to allow dramatic ticker effect
    setTimeout(() => {
      const activeOpponent = opponentsList[gameState.currentMatchNumber - 1];
      const result = simulateMatch(
        activeTheme.shortName,
        gameState.currentMatchNumber,
        gameState.squad,
        gameState.captainId,
        activeTheme.name,
        activeOpponent,
        gameState.tournamentLength === 'Long'
      );

      setLastMatchResult(result);
      setIsSimulating(false);
      setShowScorecardModal(true);
    }, 3000);
  };

  const handleCloseScorecard = () => {
    if (!lastMatchResult) return;

    // Capture the match result and immediately clear the state to prevent double clicks/saves
    const result = lastMatchResult;
    setLastMatchResult(null);
    setShowScorecardModal(false);

    // Save history
    const updatedHistory = [...gameState.history, result];
    
    if (result.won) {
      const nextMatchNumber = gameState.currentMatchNumber + 1;
      const totalMatches = gameState.tournamentLength === 'Short' ? 9 : 14;

      if (nextMatchNumber > totalMatches) {
        // Complete Clean Sweep! INVINCIBLE!
        // Save to Hall of Fame
        const captainName = gameState.squad.find(p => p.id === gameState.captainId)?.name || 'Unknown';
        saveToHallOfFame({
          teamId: activeTheme.id,
          teamName: activeTheme.name,
          teamEmoji: activeTheme.emoji,
          tournamentYear: gameState.tournamentYear,
          length: gameState.tournamentLength,
          winsCount: updatedHistory.length,
          captainName,
          squadNames: gameState.squad.map(p => p.name)
        });

        // Update list
        setHallOfFame(loadHallOfFame());

        setGameState(prev => ({
          ...prev,
          history: updatedHistory,
          status: 'WINNER'
        }));
      } else {
        // Continue to next match
        setGameState(prev => ({
          ...prev,
          history: updatedHistory,
          currentMatchNumber: nextMatchNumber
        }));
      }
    } else {
      // Game Over, run failed!
      setGameState(prev => ({
        ...prev,
        history: updatedHistory,
        status: 'GAME_OVER'
      }));
    }
  };

  const handleResetToLobby = () => {
    setGameState({
      status: 'LOBBY',
      selectedTeamId: 'RCB',
      tournamentYear: 2024,
      tournamentLength: 'Short',
      currentMatchNumber: 1,
      squad: [],
      captainId: null,
      history: [],
      draftRound: 1,
      currentDraftOptions: [],
      rerollsLeft: 3
    });
    setLastMatchResult(null);
    setSelectedDraftPlayer(null);
  };

  // Filter rolled players by selected role tab
  const filteredDraftOptions = useMemo(() => {
    if (draftCategoryTab === 'All') return gameState.currentDraftOptions;
    return gameState.currentDraftOptions.filter(p => p.role === draftCategoryTab);
  }, [gameState.currentDraftOptions, draftCategoryTab]);

  const rolledFranchise = useMemo(() => {
    return IPL_TEAMS.find(t => t.id === gameState.currentDraftFranchiseId);
  }, [gameState.currentDraftFranchiseId]);

  return (
    <div
      className={`min-h-screen bg-theme-bg text-white flex flex-col selection:bg-theme-accent selection:text-theme-dark transition-all duration-500 relative border-4 sm:border-[12px] ${
        (gameState.status === 'LOBBY' || gameState.status === 'TEAM_SELECT') ? 'border-black' : 'border-theme-border'
      }`}
      style={getTeamStyleProperties((gameState.status === 'LOBBY' || (gameState.status === 'TEAM_SELECT' && !hoveredTeamId)) ? undefined : activeTheme)}
    >
      {/* Abstract Background Theme Grid */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--theme-accent,transparent),transparent_60%)] pointer-events-none z-0 transition-all duration-700 ${vibeMode ? 'opacity-35' : 'opacity-0'}`} 
      />
      {vibeMode && (
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 transition-all duration-700" 
        />
      )}

      {/* --- SITE HEADER --- */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-b-2 border-theme-border bg-theme-bg relative z-30 gap-4">
        <div className="flex flex-col cursor-pointer text-center sm:text-left" onClick={handleResetToLobby} id="header-logo-container">
          <h1 className="text-5xl sm:text-7xl font-black italic tracking-tighter leading-none text-theme-accent hover:opacity-90 transition-opacity">
            INVINCIBLE
          </h1>
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase opacity-60 mt-1">
            Cricket Strategy Engine // v1.0.4
          </p>
        </div>

        {/* Clickable IPL Trivia Card inside header blank space */}
        <div 
          onClick={handleNextTrivia}
          className="flex-1 max-w-xl mx-6 hidden md:flex items-center gap-3 bg-[#000814]/80 border border-white/10 p-3 hover:border-theme-accent/60 transition-all cursor-pointer group select-none relative overflow-hidden"
          title="Click to see another random IPL fact!"
          id="header-ipl-trivia"
        >
          {/* Subtle colored side accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-theme-accent group-hover:bg-[#FFC300] transition-colors" />
          
          <div className="px-2 py-1 bg-theme-accent/15 border border-theme-accent/30 text-theme-accent text-[9px] font-mono font-black tracking-widest shrink-0 uppercase">
            💡 IPL TRIVIA
          </div>
          
          <div 
            className="text-xs text-white/80 font-medium leading-normal flex-1 pr-2 max-h-[38px] overflow-y-auto italic font-mono transition-all custom-scrollbar select-text cursor-text"
            onClick={(e) => e.stopPropagation()}
            title="Scroll to read if text is long"
          >
            "{IPL_TRIVIA_FACTS[triviaIndex]}"
          </div>
          
          <div className="text-[9px] font-mono font-bold text-white/30 group-hover:text-theme-accent transition-colors shrink-0 uppercase whitespace-nowrap flex items-center gap-1">
            Next Fact 🔄
          </div>
        </div>

        <div className="flex items-center gap-6">
          {gameState.status !== 'LOBBY' && gameState.status !== 'TEAM_SELECT' && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-bold opacity-40 leading-none mb-1">Active Franchise</p>
              <p className="text-xl font-black text-theme-accent leading-none uppercase">{activeTheme.name}</p>
            </div>
          )}
          <div className="flex items-center gap-4">
            {gameState.status !== 'LOBBY' && gameState.status !== 'TEAM_SELECT' && (
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative"
                style={{
                  backgroundColor: 'var(--theme-accent)',
                  boxShadow: '0 0 25px var(--theme-accent), inset 0 0 10px rgba(0,0,0,0.3)',
                }}
              >
                <div 
                  className="w-8 h-8 border-4 rounded-full flex items-center justify-center text-lg transition-all duration-500" 
                  style={{ 
                    borderColor: 'var(--theme-bg)', 
                    backgroundColor: 'var(--theme-accent)' 
                  }} 
                  title={activeTheme.name}
                >
                  {activeTheme.emoji}
                </div>
              </div>
            )}
            
            {gameState.status !== 'LOBBY' && (

              <button


                onClick={handleResetToLobby}
                className="px-4 py-2.5 rounded-none text-xs font-black uppercase tracking-wider bg-rose-600 hover:bg-white text-white hover:text-rose-600 border border-rose-500 shadow-[3px_3px_0px_#4c0519] hover:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
                title="Return to Main Lobby (Resets current campaign)"
              >
                <Home className="w-3.5 h-3.5" /> Return Lobby
              </button>
            )}

            <button
              onClick={() => setVibeMode(!vibeMode)}
              className="p-3 rounded-none bg-white/10 hover:bg-theme-accent text-white hover:text-theme-dark border border-white/20 transition-colors"
              title="Toggle visual accents"
            >
              <Sparkles className={`w-4 h-4 ${vibeMode ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* --- CORE ROUTER SCREENS --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 z-10 flex flex-col justify-center">
        
        {/* ==================== 1. LOBBY ==================== */}
        {gameState.status === 'LOBBY' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-12 gap-8 items-stretch my-auto py-6"
            id="lobby-screen"
          >
            {/* Promo / Mission Statement */}
            <div className="lg:col-span-7 min-w-0 flex flex-col justify-center pr-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-theme-secondary text-theme-accent text-xs font-mono border border-white/10 mb-6 w-fit uppercase font-bold tracking-widest">
                <Zap className="w-3.5 h-3.5 fill-theme-accent stroke-none" /> Offline Cricket Simulator
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter text-white leading-none uppercase italic">
                BUILD THE TEAM THAT <span className="text-theme-accent block">CANNOT BE BEATEN</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl font-medium">
                Draft a perfect 11-player cricket squad from randomized historical IPL rosters. Represent your favorite franchise, test your squad's balanced ratings, and simulate an undefeated campaign.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTeamSelect}
                  className="px-8 py-5 bg-theme-accent hover:bg-white text-theme-dark font-black uppercase tracking-widest text-sm hover:scale-[0.98] transition-all brutalist-shadow-gold flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-play-game"
                >
                  <Play className="w-4 h-4 fill-theme-dark stroke-none" /> Initialize Draft Run
                </button>
              </div>

              {/* Game Mechanics Grid */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t-2 border-white/10 pt-8">
                <div>
                  <h4 className="font-display font-black text-theme-accent text-sm uppercase tracking-wide">1. Choose Franchise</h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">Adapts the entire user interface to match your team's visual identity.</p>
                </div>
                <div>
                  <h4 className="font-display font-black text-theme-accent text-sm uppercase tracking-wide">2. Roll & Select XI</h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">Receive historical IPL packs. Filter by role to draft your playing XI.</p>
                </div>
                <div>
                  <h4 className="font-display font-black text-theme-accent text-sm uppercase tracking-wide">3. Perfect Campaign</h4>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">A single defeat ends your run. Sweep the bracket to earn the Invincible title.</p>
                </div>
              </div>
            </div>

            {/* Hall of Fame / Saved runs */}
            <div className="lg:col-span-5 min-w-0 bg-theme-dark border-2 border-theme-border p-6 flex flex-col justify-between shadow-[6px_6px_0px_var(--theme-border)]">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                  <Trophy className="w-5 h-5 text-theme-accent" />
                  <h3 className="font-display font-black text-white text-lg uppercase tracking-tight">Invincible Hall of Fame</h3>
                </div>

                {hallOfFame.length === 0 ? (
                  <div className="text-center py-16 px-4 border-2 border-dashed border-white/10 bg-white/5">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-5 h-5 text-theme-accent" />
                    </div>
                    <h4 className="text-sm font-black text-theme-accent uppercase tracking-wide">The Hall is Empty</h4>
                    <p className="text-xs text-white/60 mt-2 max-w-xs mx-auto leading-relaxed">
                      No flawless campaigns registered yet. Draft your squad, sweep a 9 or 14-match tournament, and secure your place here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    {hallOfFame.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 bg-theme-bg border border-white/10 hover:border-theme-accent transition-colors flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg leading-none">{entry.teamEmoji}</span>
                            <span className="font-black text-xs text-theme-accent uppercase tracking-wider">{entry.teamName}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-none text-[9px] bg-emerald-500/20 text-emerald-400 font-mono font-bold uppercase tracking-widest">
                            {entry.length === 'Short' ? '9 matches' : '14 matches'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 text-xs text-white/75 font-mono gap-y-1">
                          <div>Captain: <span className="text-white font-bold">{entry.captainName}</span></div>
                          <div className="text-right">Season: <span className="text-theme-accent font-bold">{entry.tournamentYear}</span></div>
                          <div>Win Streak: <span className="text-emerald-400 font-bold">★ {entry.winsCount} - 0</span></div>
                          <div className="text-right text-[10px] opacity-40">{entry.date}</div>
                        </div>

                        <div className="mt-2 border-t border-white/10 pt-2">
                          <p className="text-[10px] text-white/50 truncate">
                            Squad: {entry.squadNames.slice(0, 5).join(', ')}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 leading-relaxed uppercase">
                🏆 TOURNAMENT STANDARD // LOSE ONCE AND THE DRAFT CAMPAIGN ENDS IMMEDIATELY.
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 2. TEAM_SELECT ==================== */}
        {gameState.status === 'TEAM_SELECT' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col max-w-5xl mx-auto w-full py-6"
            id="team-select-screen"
          >
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-theme-accent uppercase tracking-[0.25em] font-black">STAGE 1</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-1 uppercase italic tracking-tighter leading-none">
                CHOOSE YOUR FRANCHISE
              </h2>
              <p className="text-white/70 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                Represent an iconic IPL club. The entire hub layout, custom headers, and secondary buttons will transform to reflect your chosen team.
              </p>
            </div>

            {/* Franchise Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {IPL_TEAMS.map((team) => {
                const isHovered = hoveredTeamId === team.id;
                return (
                  <div
                    key={team.id}
                    onMouseEnter={() => setHoveredTeamId(team.id)}
                    onMouseLeave={() => setHoveredTeamId(null)}
                    onClick={() => handleSelectTeam(team.id)}
                    className="relative p-5 rounded-none border-2 bg-theme-dark cursor-pointer transition-all duration-300 flex flex-col justify-between h-[160px] overflow-hidden"
                    style={{
                      borderColor: isHovered ? getVibrantTeamColor(team.id) : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: isHovered ? `0 0 30px ${getVibrantTeamColor(team.id)}, inset 0 0 12px ${getVibrantTeamColor(team.id)}40` : 'none',
                      background: isHovered ? `linear-gradient(135deg, ${getVibrantTeamColor(team.id)}30, ${team.secondaryColor || '#000000'}10)` : undefined
                    }}
                    id={`team-option-${team.id}`}
                  >
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full opacity-15 pointer-events-none blur-lg"
                      style={{ backgroundColor: getVibrantTeamColor(team.id) }}
                    />
                    
                    <div className="flex justify-between items-start">
                      <span className="text-3xl leading-none">{team.emoji}</span>
                      <span className="font-mono text-xs text-white/40 font-black tracking-widest">{team.shortName}</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-display font-black text-base text-white leading-tight uppercase tracking-tight">{team.name}</h4>
                      <div className="flex gap-2 mt-2">
                        <span className="w-4 h-4 rounded-none border border-white/20" style={{ backgroundColor: team.primaryColor }} />
                        <span className="w-4 h-4 rounded-none border border-white/20" style={{ backgroundColor: team.secondaryColor }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={handleResetToLobby}
                className="px-6 py-3.5 rounded-none bg-white/10 hover:bg-theme-accent text-white hover:text-theme-dark text-xs font-mono border border-theme-border uppercase font-black tracking-widest transition-colors"
              >
                ← Back to main lobby
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== 3. TOURNAMENT_CONFIG ==================== */}
        {gameState.status === 'TOURNAMENT_CONFIG' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto w-full bg-theme-dark border-2 border-theme-border p-4 sm:p-8 shadow-[6px_6px_0px_var(--theme-border)] my-auto"
            id="tournament-config-screen"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-none bg-theme-bg flex items-center justify-center mx-auto mb-3 border border-theme-border">
                <span className="text-3xl">{activeTheme.emoji}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-theme-accent uppercase tracking-tight italic">REPRESENTING: {activeTheme.name}</h3>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-bold">Configure campaign parameters below</p>
            </div>

            <div className="space-y-6">
              {/* Year Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-white/70 uppercase tracking-widest mb-3">
                  Select Opponent Season Database
                </label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5">
                  {getActiveYearsForTeam(gameState.selectedTeamId).map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setGameState(prev => ({ ...prev, tournamentYear: yr }))}
                      className={`py-2 rounded-none border text-xs font-mono font-bold transition-all ${
                        gameState.tournamentYear === yr
                          ? 'border-white bg-theme-accent text-theme-dark shadow-[2px_2px_0px_var(--theme-border)] font-black scale-[1.02]'
                          : 'border-white/10 bg-theme-bg text-white/70 hover:border-theme-accent hover:text-white'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/50 mt-2 leading-relaxed uppercase font-semibold">
                  Your team will play against historical rosters from this year. Rating values reflect actual seasonal stats.
                </p>
              </div>

              {/* Length Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-white/70 uppercase tracking-widest mb-3">
                  Choose Tournament Length
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, tournamentLength: 'Short' }))}
                    className={`p-4 rounded-none border text-left flex flex-col justify-between transition-all h-[140px] ${
                      gameState.tournamentLength === 'Short'
                        ? 'border-white bg-theme-accent text-theme-dark shadow-[3px_3px_0px_var(--theme-border)]'
                        : 'border-white/10 bg-theme-bg text-white/70 hover:border-theme-accent'
                    }`}
                  >
                    <span className={`font-display font-black text-sm uppercase tracking-tight ${gameState.tournamentLength === 'Short' ? 'text-theme-dark' : 'text-white'}`}>Short Campaign</span>
                    <span className={`text-[10px] mt-1 uppercase font-semibold leading-relaxed ${gameState.tournamentLength === 'Short' ? 'text-theme-dark/80' : 'text-white/50'}`}>9 matches. Sweep all 9 opposing teams once to win. Fast pace.</span>
                  </button>

                  <button
                    onClick={() => setGameState(prev => ({ ...prev, tournamentLength: 'Long' }))}
                    className={`p-4 rounded-none border text-left flex flex-col justify-between transition-all h-[140px] ${
                      gameState.tournamentLength === 'Long'
                        ? 'border-white bg-theme-accent text-theme-dark shadow-[3px_3px_0px_var(--theme-border)]'
                        : 'border-white/10 bg-theme-bg text-white/70 hover:border-theme-accent'
                    }`}
                  >
                    <span className={`font-display font-black text-sm uppercase tracking-tight ${gameState.tournamentLength === 'Long' ? 'text-theme-dark' : 'text-white'}`}>Long Campaign</span>
                    <span className={`text-[10px] mt-1 uppercase font-semibold leading-relaxed ${gameState.tournamentLength === 'Long' ? 'text-theme-dark/80' : 'text-white/50'}`}>14 matches. Full home-and-away schedule. Elite challenge.</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleConfigureTournament(gameState.tournamentYear, gameState.tournamentLength)}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-white text-theme-dark hover:bg-theme-accent transition-colors flex items-center justify-center gap-2 mt-4 shadow-[4px_4px_0px_var(--theme-border)] border-2 border-white cursor-pointer"
              >
                Proceed to Draft Room <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setGameState(prev => ({ ...prev, status: 'TEAM_SELECT' }))}
                className="w-full py-3 rounded-none border border-white/10 text-xs font-mono text-white/50 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider font-bold"
              >
                Change Selected Franchise
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== 4. DRAFTING ==================== */}
        {gameState.status === 'DRAFTING' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-12 gap-8 items-start py-6"
            id="drafting-screen"
          >
            {/* Left/Center: The Roll Options & Tabs */}
            <div className="lg:col-span-8 min-w-0 flex flex-col gap-6">
              
              {/* Draft Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-theme-dark border-2 border-theme-border rounded-none shadow-[4px_4px_0px_var(--theme-border)]">
                <div>
                  <span className="text-xs font-mono text-theme-accent uppercase tracking-[0.2em] font-black">
                    STAGE 2: SQUAD BUILDING
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-1 uppercase italic tracking-tighter leading-none">
                    ROUND {gameState.draftRound} OF 11
                  </h2>
                  <p className="text-xs text-white/70 mt-1 uppercase font-semibold">
                    Select exactly one player from the rolled pack to lock into your playing XI.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-theme-bg border border-theme-border rounded-none shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-theme-accent animate-ping" />
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">Pack Unlocked</span>
                </div>
              </div>

              {/* ROLLED TEAM SHOWCASE BANNER */}
              {rolledFranchise && (
                <div 
                  className="p-6 border-2 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none transition-all duration-300 bg-theme-dark/40"
                  style={{
                    borderColor: rolledFranchise.primaryColor,
                    boxShadow: `4px 4px 0px ${rolledFranchise.primaryColor}`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{rolledFranchise.emoji}</span>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-black" style={{ color: rolledFranchise.primaryColor }}>
                        FRANCHISE PACK UNLOCKED
                      </span>
                      <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight leading-none mt-1 flex flex-wrap items-center gap-2">
                        <span>{rolledFranchise.name}</span>
                        {IPL_WINNERS_MAP[gameState.currentDraftYear] === rolledFranchise.id && (
                          <span className="text-xl inline-flex items-center gap-1 text-amber-400 font-mono font-black animate-bounce" title={`${gameState.currentDraftYear} IPL Champions!`}>
                            🏆 <span className="text-[10px] tracking-wider uppercase font-sans font-black bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded-none border border-amber-400/30">CHAMPIONS</span>
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-white/60 font-mono mt-1 uppercase font-bold">
                        Browse roster to draft a player from this team's records ({gameState.currentDraftYear})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div 
                      className="px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-widest border"
                      style={{
                        color: '#ffffff',
                        borderColor: rolledFranchise.primaryColor + '40',
                        backgroundColor: rolledFranchise.primaryColor + '20'
                      }}
                    >
                      ★ {rolledFranchise.shortName} ({gameState.currentDraftYear}) Pool
                    </div>

                    {gameState.rerollsLeft > 0 ? (
                      <button
                        onClick={handleRerollDraftYear}
                        className="px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-widest border-2 border-solid bg-amber-500 text-black border-amber-500 hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5"
                        id="btn-reroll-year"
                        title={`Keep ${rolledFranchise.shortName}, change to another random year`}
                      >
                        <Calendar className="w-3.5 h-3.5" /> Change Year ({gameState.rerollsLeft} Left)
                      </button>
                    ) : (
                      <div className="px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-widest border border-white/10 bg-white/5 text-white/40 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 opacity-40" /> Year Locked (0 Left)
                      </div>
                    )}

                    {gameState.rerollsLeft > 0 ? (
                      <button
                        onClick={handleRerollDraftTeam}
                        className="px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-widest border-2 border-solid bg-[#00f5ff] text-black border-[#00f5ff] hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5"
                        id="btn-reroll-team"
                        title={`Keep ${gameState.currentDraftYear}, change to another random team`}
                      >
                        <Shuffle className="w-3.5 h-3.5 animate-spin-hover" /> Change Franchise ({gameState.rerollsLeft} Left)
                      </button>
                    ) : (
                      <div className="px-4 py-2 rounded-none text-xs font-mono font-black uppercase tracking-widest border border-white/10 bg-white/5 text-white/40 flex items-center gap-1.5">
                        <Shuffle className="w-3.5 h-3.5 opacity-40" /> Team Locked (0 Left)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Categorization Tabs */}
              <div className="flex overflow-x-auto gap-2 pb-2 border-b-2 border-theme-border">
                {(['All', 'Batsman', 'Wicketkeeper', 'All-Rounder', 'Bowler'] as const).map((tab) => {
                  const count = tab === 'All' 
                    ? gameState.currentDraftOptions.length 
                    : gameState.currentDraftOptions.filter(o => o.role === tab).length;

                  return (
                    <button
                      key={tab}
                      onClick={() => setDraftCategoryTab(tab)}
                      className={`px-4 py-2.5 rounded-none text-xs font-mono font-black transition-all whitespace-nowrap border uppercase tracking-wider ${
                        draftCategoryTab === tab
                          ? 'border-white bg-theme-accent text-theme-dark shadow-[2px_2px_0px_var(--theme-border)]'
                          : 'border-theme-border/50 bg-theme-bg text-white/70 hover:border-theme-accent hover:text-white'
                      }`}
                    >
                      {tab === 'All' ? 'All Roles' : `${tab}s`} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Confirm / Draft Locked bar */}
              <div className="sticky top-4 z-20 p-5 bg-theme-dark border-2 border-theme-border rounded-none backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_var(--theme-border)]">
                <div className="flex items-center gap-3">
                  {selectedDraftPlayer ? (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-theme-accent flex items-center justify-center border border-white">
                        <span className="text-sm">🏏</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Selected Option</p>
                        <h4 className="font-sans font-black text-sm text-white uppercase tracking-tight">{selectedDraftPlayer.name}</h4>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-white/60 uppercase font-semibold tracking-wider">
                      💡 Click on a player card above to inspect stats and select.
                    </p>
                  )}
                </div>

                <button
                  onClick={handleConfirmDraftSelection}
                  disabled={!selectedDraftPlayer}
                  className={`px-8 py-4 rounded-none font-display font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                    selectedDraftPlayer
                      ? 'bg-white text-theme-dark border-white hover:bg-theme-accent hover:text-theme-dark shadow-[2px_2px_0px_var(--theme-border)] cursor-pointer'
                      : 'bg-white/10 text-white/30 border-white/5 cursor-not-allowed'
                  }`}
                  id="btn-confirm-draft"
                >
                  Confirm Selection <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {/* Render Selected Pack Cards */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                {filteredDraftOptions.map((player) => {
                  const isAlreadyDrafted = gameState.squad.some(p => p.id === player.id || p.name.toLowerCase().trim() === player.name.toLowerCase().trim());
                  const isPlayerOverseas = isOverseasPlayer(player.name, player.description);
                  const overseasCount = gameState.squad.filter(p => isOverseasPlayer(p.name, p.description)).length;
                  const isOverseasLimitReached = overseasCount >= 4 && !gameState.squad.some(p => p.id === player.id);
                  const isLocked = isAlreadyDrafted || (isPlayerOverseas && isOverseasLimitReached);
                  const lockReason = isAlreadyDrafted ? 'Already Drafted' : (isPlayerOverseas && isOverseasLimitReached) ? 'Foreign Limit (Max 4)' : undefined;

                  return (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      isSelected={selectedDraftPlayer?.id === player.id}
                      onClick={() => handleSelectDraftPlayer(player)}
                      isLocked={isLocked}
                      lockReason={lockReason}
                    />
                  );
                })}

                {filteredDraftOptions.length === 0 && (
                  <div className="col-span-full py-16 text-center border-2 border-dashed border-theme-border rounded-none bg-white/5">
                    <Info className="w-8 h-8 text-theme-accent mx-auto mb-2" />
                    <h4 className="text-sm font-black text-theme-accent uppercase tracking-wide">No Players in this Category</h4>
                    <p className="text-xs text-white/60 mt-1 uppercase font-semibold">Switch to "All Roles" or another tab to review other options in this pack.</p>
                  </div>
                )}
              </div>

              

            </div>

            {/* Right Side: Squad Balance & Playing XI list */}
            <div className="lg:col-span-4 min-w-0 bg-theme-dark border-2 border-theme-border rounded-none p-6 flex flex-col gap-6 shadow-[6px_6px_0px_var(--theme-border)]">
              
              <div>
                <h3 className="font-display font-black text-white text-base uppercase tracking-wider">Your Drafted XI</h3>
                <p className="text-xs text-white/60 mt-0.5 uppercase font-semibold">Playing squad progress ({gameState.squad.length} / 11)</p>
                
                <div className="mt-4 bg-theme-bg p-3 rounded-none border border-theme-border">
                  <div className="flex justify-between text-xs font-mono mb-1 text-white/70 uppercase font-bold tracking-wider">
                    <span>Draft Completed</span>
                    <span className="font-black text-theme-accent">{Math.round((gameState.squad.length / 11) * 100)}%</span>
                  </div>
                  <div className="w-full bg-theme-dark h-3 rounded-none overflow-hidden border border-white/5">
                    <div
                      className="bg-theme-accent h-full transition-all duration-300"
                      style={{ width: `${(gameState.squad.length / 11) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Strengths Monitor */}
              <div className="border-t-2 border-theme-border pt-4">
                <h4 className="text-xs font-mono font-black text-theme-accent uppercase tracking-widest mb-3">Live Team Strengths</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5 uppercase font-bold tracking-wider">
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-theme-accent fill-theme-accent stroke-none" /> BATTING OVR</span>
                      <span className="font-black text-theme-accent">{squadBalance.battingStrength}</span>
                    </div>
                    <div className="w-full bg-theme-bg h-2.5 rounded-none overflow-hidden border border-white/5">
                      <div className="bg-theme-accent h-full" style={{ width: `${squadBalance.battingStrength}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5 uppercase font-bold tracking-wider">
                      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-white fill-white stroke-none" /> BOWLING OVR</span>
                      <span className="font-black text-white">{squadBalance.bowlingStrength}</span>
                    </div>
                    <div className="w-full bg-theme-bg h-2.5 rounded-none overflow-hidden border border-white/5">
                      <div className="bg-white h-full" style={{ width: `${squadBalance.bowlingStrength}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-theme-bg border border-theme-border rounded-none flex items-center justify-between">
                    <span className="text-xs font-mono text-white/60 uppercase font-black tracking-wider">Squad Balance OVR</span>
                    <span className="text-2xl font-display font-black text-theme-accent italic leading-none">{squadBalance.overallStrength}</span>
                  </div>
                </div>
              </div>

              {/* Squad warnings & Alert box */}
              <div className="border-t-2 border-theme-border pt-4">
                <h4 className="text-xs font-mono font-black text-white/70 uppercase tracking-widest mb-2">Tactical Draft Warnings</h4>
                
                <div className="space-y-2">
                  {squadBalance.errors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-cyan-950/20 border border-cyan-400/30 text-cyan-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                      <span>{err}</span>
                    </div>
                  ))}

                  {squadBalance.warnings.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-fuchsia-950/20 border border-fuchsia-400/30 text-fuchsia-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-fuchsia-400" />
                      <span>{warn}</span>
                    </div>
                  ))}

                  {squadBalance.errors.length === 0 && squadBalance.warnings.length === 0 && gameState.squad.length > 0 && (
                    <div className="p-3 rounded-none bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 flex items-center gap-2 text-xs uppercase font-bold tracking-wider">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Draft fully optimized!</span>
                    </div>
                  )}

                  {gameState.squad.length === 0 && (
                    <p className="text-xs text-white/40 italic uppercase tracking-wider font-semibold">No drafted players yet.</p>
                  )}
                </div>
              </div>

              {/* Active list representation */}
              <div className="border-t-2 border-white/10 pt-4 flex-1 overflow-y-auto max-h-[250px] space-y-2 pr-1">
                <h4 className="text-xs font-mono font-black text-white/70 uppercase tracking-widest mb-2">Active Lineup List</h4>
                {gameState.squad.map((p, idx) => (
                  <div key={p.id} className="flex justify-between items-center bg-[#001D3D] px-3 py-2.5 rounded-none border border-white/10 text-xs font-mono">
                    <span className="text-white/40 font-black w-4">{idx + 1}.</span>
                    <span className="font-bold text-white flex-1 truncate uppercase">{p.name}</span>
                    <span className="text-white/50 pr-2">{p.originalTeam}</span>
                    <span className="px-2 py-0.5 rounded-none text-[9px] font-black bg-white/10 text-white uppercase tracking-wider">
                      {p.role}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================== 5. SQUAD_PREVIEW ==================== */}
        {gameState.status === 'SQUAD_PREVIEW' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col max-w-5xl mx-auto w-full gap-8 py-6"
            id="squad-preview-screen"
          >
            <div className="text-center">
              <span className="text-xs font-mono text-[#FFC300] uppercase tracking-[0.2em] font-black">STAGE 3: FINALIZATION</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-1 uppercase italic tracking-tighter leading-none">LINEUP & CAPTAINCY</h2>
              <p className="text-sm text-white/70 mt-3 max-w-2xl mx-auto leading-relaxed">
                Review your final 11-player roster. Appoint your team captain and organize your starting batting order to maximize strategic effectiveness in upcoming simulations.
              </p>
            </div>

            {/* Split Section: Left is Captain Grid, Right is Lineup Adjuster */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Captain Selection (7 cols) */}
              <div className="lg:col-span-7 min-w-0 flex flex-col gap-4">
                <div className="border-b border-white/10 pb-2">
                  <h3 className="font-display font-black text-white text-lg uppercase tracking-tight">1. Appoint Your Captain</h3>
                  <p className="text-xs text-white/50">Click on any player card below to hand them the captain's armband.</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {gameState.squad.map((player) => {
                    const isCap = gameState.captainId === player.id;
                    return (
                      <div
                        key={player.id}
                        onClick={() => handleSelectCaptain(player.id)}
                        className={`relative p-3 rounded-none border-2 cursor-pointer transition-all flex flex-col justify-between h-[150px] ${
                          isCap 
                            ? 'border-white bg-[#FFC300] text-[#001D3D] shadow-[3px_3px_0px_#003566]' 
                            : 'border-white/10 bg-[#000814] text-white hover:border-[#FFC300]'
                        }`}
                        id={`captain-select-card-${player.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-lg font-black" style={{ color: isCap ? '#001D3D' : '#FFC300' }}>
                            {player.rating}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 font-bold">{player.originalTeam}</span>
                        </div>

                        <div>
                          <h4 className="font-display font-black text-xs uppercase line-clamp-2 leading-tight">{player.name}</h4>
                          <p className={`text-[9px] mt-1 uppercase font-mono ${isCap ? 'text-[#001D3D]/70' : 'text-white/50'}`}>{player.role}</p>
                        </div>

                        {isCap && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-[8px] font-black tracking-widest px-1 py-0.5 rounded-none leading-none">
                            C
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Lineup Manager (5 cols) */}
              
              <div className="lg:col-span-5 min-w-0 flex flex-col gap-4">
                <div className="border-b border-white/10 pb-2">
                  <h3 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">2. Tactical Warnings</h3>
                  <p className="text-xs text-white/50">Review any imbalances before confirming your lineup.</p>
                </div>
                
                <div className="space-y-2 bg-[#000814] border border-white/10 p-4 shadow-[3px_3px_0px_#003566]">
                  {squadBalance.errors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-red-950/20 border border-red-500/30 text-red-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                  {squadBalance.warnings.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-fuchsia-950/20 border border-fuchsia-400/30 text-fuchsia-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                  {squadBalance.errors.length === 0 && squadBalance.warnings.length === 0 && (
                    <div className="p-3 rounded-none bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 flex items-center gap-2 text-xs uppercase font-bold tracking-wider">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Draft fully optimized!</span>
                    </div>
                  )}
                </div>

                <div className="border-b border-white/10 pb-2 mt-4">
                  <h3 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">3. Set Batting Order</h3>
                  <p className="text-xs text-white/50">Rearrange players (1 to 11). Place batsmen in the top order, and bowlers lower down.</p>
                </div>


                <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 bg-[#000814] border border-white/10 p-3 rounded-none shadow-[3px_3px_0px_#003566]">
                  {gameState.squad.map((player, idx) => {
                    const isCap = gameState.captainId === player.id;
                    const isFirst = idx === 0;
                    const isLast = idx === gameState.squad.length - 1;
                    const isLoyal = isTenYearLoyalist(player.name, player.originalTeam);
                    return (
                      <div 
                        key={player.id} 
                        className={`flex items-center justify-between p-2.5 border uppercase text-xs font-mono font-medium ${
                          isCap ? 'bg-[#FFC300]/10 border-[#FFC300]/30 text-[#FFC300]' : 'bg-[#001D3D]/40 border-white/5 text-white/80'
                        }`}
                      >
                        {/* Batting Position Indicator */}
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 shrink-0 text-center font-black text-[#FFC300] text-sm">#{idx + 1}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-sans font-black text-sm text-white flex items-center gap-1.5 leading-none truncate">
                              {player.name}
                              {isCap && <span className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-none shrink-0">C</span>}
                              {isLoyal && <span className="bg-emerald-600 text-white text-[8px] px-1 py-0.5 rounded-none shrink-0" title="10+ Year Franchise Loyalist">🛡️ LOYAL</span>}
                            </span>
                            <span className="text-[10px] text-white/50 mt-1 truncate">
                              {player.role} • {player.originalTeam} ({player.rating} OVR)
                            </span>
                          </div>
                        </div>

                        {/* Swap Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleMoveSquadPlayer(idx, 'UP')}
                            disabled={isFirst}
                            className={`p-1.5 border transition-colors ${
                              isFirst 
                                ? 'border-white/5 text-white/10 cursor-not-allowed' 
                                : 'border-white/10 text-white/60 hover:bg-[#FFC300] hover:text-[#001D3D] hover:border-white cursor-pointer'
                            }`}
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveSquadPlayer(idx, 'DOWN')}
                            disabled={isLast}
                            className={`p-1.5 border transition-colors ${
                              isLast 
                                ? 'border-white/5 text-white/10 cursor-not-allowed' 
                                : 'border-white/10 text-white/60 hover:bg-[#FFC300] hover:text-[#001D3D] hover:border-white cursor-pointer'
                            }`}
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Confirmation Area */}
            <div className="bg-[#000814] border-2 border-white/10 rounded-none p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[4px_4px_0px_#003566]">
              <div>
                <h4 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">
                  {gameState.captainId 
                    ? `Captain Assigned: ${gameState.squad.find(p => p.id === gameState.captainId)?.name}`
                    : '🚨 Appoint a Captain to Proceed'}
                </h4>
                <p className="text-xs text-white/70 mt-1 max-w-xl font-medium leading-relaxed">
                  {gameState.captainId 
                    ? 'Excellent choice! Your leader will anchor the scorecard headers and wear the (C) armband throughout the tournament.'
                    : 'Click on any player card above to promote them to the squad captaincy.'}
                </p>
              </div>

              <div className="flex gap-4 shrink-0">
                <button
                  onClick={handleConfirmCaptain}
                  disabled={!gameState.captainId}
                  className={`px-8 py-4 rounded-none font-display font-black text-sm uppercase tracking-widest transition-all border-2 border-white ${
                    gameState.captainId
                      ? 'bg-white text-[#001D3D] border-white hover:bg-[#FFC300] hover:text-[#001D3D] shadow-[4px_4px_0px_#003566] cursor-pointer'
                      : 'bg-white/10 text-white/30 border-white/5 cursor-not-allowed'
                  }`}
                  id="btn-confirm-captain"
                >
                  Enter Tournament
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 6. PLAYING (THE CAMPAIGN) ==================== */}
        {gameState.status === 'PLAYING' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-12 gap-8 items-start py-6"
            id="campaign-screen"
          >
            {/* Left side: Match timeline */}
            <div className="lg:col-span-4 min-w-0 bg-[#000814] border-2 border-white/10 rounded-none p-6 flex flex-col gap-6 shadow-[6px_6px_0px_#003566]">
              <div>
                <h3 className="font-display font-black text-white text-base uppercase tracking-wider">Campaign Schedule</h3>
                <p className="text-xs text-white/60 mt-0.5 uppercase font-semibold">
                  Type: {gameState.tournamentLength === 'Short' ? 'Short Sweep' : 'Long schedule'} ({opponentsList.length} matches)
                </p>
              </div>

              {/* Linear timeline */}
              <div className="space-y-2 overflow-y-auto max-h-[450px] pr-1">
                {opponentsList.map((opp, idx) => {
                  const matchNum = idx + 1;
                  const isCurrent = gameState.currentMatchNumber === matchNum;
                  const isPast = gameState.currentMatchNumber > matchNum;
                  const isPending = gameState.currentMatchNumber < matchNum;
                  
                  const historyResult = gameState.history.find(h => h.matchNumber === matchNum);

                  return (
                    <div
                      key={matchNum}
                      className={`p-3 rounded-none border-2 flex items-center justify-between text-xs transition-colors ${
                        isCurrent 
                          ? 'border-white bg-[#001D3D] text-[#FFC300] shadow-[2px_2px_0px_#003566]' 
                          : isPast 
                            ? 'border-emerald-800/40 bg-[#000814] opacity-80 text-emerald-400' 
                            : 'border-white/5 bg-[#000814] opacity-50'
                      }`}
                      id={`schedule-match-${matchNum}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/40 font-black">M{matchNum}</span>
                        <span className="text-xl leading-none">{opp.emoji}</span>
                        <div>
                          <h4 className="font-display font-black text-white uppercase tracking-tight">{opp.name}</h4>
                          <span className="text-[10px] text-white/40 font-mono font-bold uppercase">STRENGTH: {opp.rating} OVR</span>
                        </div>
                      </div>

                      <div>
                        {isPast && historyResult && (
                          <span className="px-2 py-0.5 rounded-none text-[9px] font-mono font-black bg-emerald-500/10 text-emerald-400 flex items-center gap-1 border border-emerald-500/20">
                            WON ({historyResult.userRuns}/{historyResult.userWickets})
                          </span>
                        )}
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-none text-[9px] font-mono font-black bg-[#FFC300] text-[#001D3D] animate-pulse">
                            ACTIVE
                          </span>
                        )}
                        {isPending && (
                          <span className="font-mono text-[9px] text-white/30 uppercase font-black tracking-wide">
                            LOCKED
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Active central match card */}
            <div className="lg:col-span-8 min-w-0 flex flex-col gap-6">
              
              {/* Score summary panel */}
              <div className="p-6 bg-[#000814] border-2 border-white/10 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[4px_4px_0px_#003566]">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-black">
                    Active Run Standings
                  </span>
                  <h3 className="text-2xl font-display font-black text-white mt-1 uppercase italic tracking-tight">
                    ★ {gameState.history.length} - 0 (STREAK)
                  </h3>
                  <p className="text-xs text-white/60 mt-1 uppercase font-semibold">
                    Keep the clean sheet. One loss instantly breaks your sweep!
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="px-3 py-2.5 bg-[#001D3D] rounded-none border border-white/10 text-center min-w-[60px] sm:min-w-20">
                    <span className="text-[10px] text-white/50 block uppercase font-mono font-bold">Bat OVR</span>
                    <span className="text-lg font-display font-black text-white">{squadBalance.battingStrength}</span>
                  </div>
                  <div className="px-3 py-2.5 bg-[#001D3D] rounded-none border border-white/10 text-center min-w-[60px] sm:min-w-20">
                    <span className="text-[10px] text-white/50 block uppercase font-mono font-bold">Bowl OVR</span>
                    <span className="text-lg font-display font-black text-white">{squadBalance.bowlingStrength}</span>
                  </div>
                  <div className="px-3 py-2.5 bg-[#001D3D] rounded-none border border-white/10 text-center min-w-[60px] sm:min-w-20">
                    <span className="text-[10px] text-white/50 block uppercase font-mono font-bold">Team OVR</span>
                    <span className="text-lg font-display font-black text-[#FFC300]">{squadBalance.overallStrength}</span>
                  </div>
                </div>
              </div>

              {/* Active match play area */}
              {opponentsList[gameState.currentMatchNumber - 1] && (
                <div className="border-2 border-white/10 rounded-none p-4 sm:p-8 bg-[#000814] relative overflow-hidden flex flex-col items-center justify-center min-h-[350px] text-center shadow-[6px_6px_0px_#003566]">
                  
                  {isSimulating ? (
                    <div className="flex flex-col items-center py-8">
                      {/* Loading/Calculator animation */}
                      <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                        <div className="absolute inset-0 border-4 border-[#FFC300] border-t-transparent rounded-full animate-spin" />
                      </div>
                      
                      <h3 className="text-lg font-display font-black text-[#FFC300] uppercase tracking-wider italic">
                        CRUNCHING MATCH DATA MATRIX
                      </h3>
                      <p className="text-xs text-white/60 mt-3 font-mono uppercase font-semibold h-8 flex items-center justify-center max-w-md">
                        {simulationMessages[simMessageIndex]}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-lg w-full">
                      <div className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-[0.2em]">
                        MATCH {gameState.currentMatchNumber} OF {opponentsList.length}
                      </div>

                      {/* Versus Faceoff */}
                      <div className="flex items-center justify-between gap-4 py-6 border-y border-white/10 my-4">
                        {/* User Team */}
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-3xl bg-[#001D3D] w-14 h-14 rounded-none flex items-center justify-center border-2 border-white/10 shadow-[2px_2px_0px_#003566]">
                            {activeTheme.emoji}
                          </span>
                          <span className="font-display font-black text-sm text-white mt-2 tracking-wide truncate max-w-28 text-center uppercase">
                            {activeTheme.shortName}
                          </span>
                          <span className="text-[10px] text-white/50 font-mono font-bold mt-1 uppercase">OVR: {squadBalance.overallStrength}</span>
                        </div>

                        {/* VS Divider */}
                        <div className="flex flex-col items-center">
                          <span className="px-3 py-1.5 rounded-none bg-[#001D3D] text-xs font-mono text-white/50 border border-white/10 uppercase tracking-widest font-black shadow-[1px_1px_0px_#003566]">
                            VS
                          </span>
                        </div>

                        {/* Opponent Team */}
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-3xl bg-[#001D3D] w-14 h-14 rounded-none flex items-center justify-center border-2 border-white/10 shadow-[2px_2px_0px_#003566]">
                            {opponentsList[gameState.currentMatchNumber - 1].emoji}
                          </span>
                          <span className="font-display font-black text-sm text-white mt-2 tracking-wide truncate max-w-28 text-center uppercase">
                            {opponentsList[gameState.currentMatchNumber - 1].shortName}
                          </span>
                          <span className="text-[10px] text-white/50 font-mono font-bold mt-1 uppercase">OVR: {opponentsList[gameState.currentMatchNumber - 1].rating}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display font-black text-white text-lg uppercase italic tracking-tight">
                          READY FOR MATCH INCEPTION
                        </h4>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed uppercase font-semibold">
                          Processes player cards' ratings, wicket chances, boundary rates, and output scorecards instantly.
                        </p>
                      </div>

                      <button
                        onClick={handleSimulateMatch}
                        className="px-8 py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-white text-[#001D3D] hover:bg-[#FFC300] hover:text-[#001D3D] transition-colors border-2 border-white shadow-[4px_4px_0px_#003566] cursor-pointer w-full"
                        id="btn-simulate-match"
                      >
                        ⚡ Simulate Match Day
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* Roster overview under card */}
              <div className="bg-[#000814] border-2 border-white/10 rounded-none p-6 shadow-[4px_4px_0px_#003566]">
                <h4 className="text-xs font-mono font-black text-white/70 uppercase tracking-widest mb-3">Playing XI Sheet</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {gameState.squad.map((p) => (
                    <div key={p.id} className="p-3 rounded-none bg-[#001D3D] border border-white/10 text-left relative flex flex-col justify-between h-[85px]">
                      <div>
                        <h5 className="font-sans font-black text-xs truncate text-white leading-tight uppercase tracking-tight">
                          {p.name}
                          {p.id === gameState.captainId && ' (C)'}
                        </h5>
                        <p className="text-[9px] text-white/55 font-mono mt-0.5 uppercase font-bold">{p.role}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-white/30 font-mono font-black">'{String(p.year).slice(2)}</span>
                        <span className="text-xs font-mono font-black text-[#FFC300]">{p.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================== 7. GAME_OVER ==================== */}
        {gameState.status === 'GAME_OVER' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto w-full bg-[#000814] border-2 border-white/10 rounded-none p-4 sm:p-8 text-center shadow-[6px_6px_0px_#003566] my-auto"
            id="game-over-screen"
          >
            <div className="w-16 h-16 rounded-none bg-red-950/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>

            <span className="text-xs font-mono text-red-400 uppercase tracking-[0.25em] font-black">CAMPAIGN ENDED</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-1 uppercase italic tracking-tighter leading-none">UNINVINCIBLE!</h2>
            <p className="text-sm text-white/70 mt-3 leading-relaxed font-semibold uppercase">
              A single defeat has broken your win streak. To achieve Invincibility, your playing XI must remain absolutely flawless and undefeated.
            </p>

            <div className="my-6 p-4 rounded-none bg-[#001D3D] border border-white/10 text-left space-y-2 font-mono uppercase">
              <h4 className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-widest border-b border-white/10 pb-1 mb-2">Run Statistics</h4>
              <div className="grid grid-cols-2 text-xs font-mono text-white/70 gap-y-1.5 font-bold">
                <div>Matches Played:</div>
                <div className="text-right text-white font-black">{gameState.history.length}</div>
                
                <div>Final Record:</div>
                <div className="text-right text-red-400 font-black">{gameState.history.filter(h => h.won).length} W - 1 L</div>
                
                <div>Representative:</div>
                <div className="text-right text-white font-black">{activeTheme.shortName}</div>

                <div>Season Database:</div>
                <div className="text-right text-white font-black">{gameState.tournamentYear}</div>
              </div>
            </div>

            <div className="space-y-3">

              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>
              <button
                onClick={handleResetToLobby}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-white text-[#001D3D] hover:bg-[#FFC300] hover:text-[#001D3D] border-2 border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
                id="btn-restart-run"
              >
                Try Drafting Again
              </button>
              
              <button
                onClick={() => {
                  // Review last match scorecard
                  if (gameState.history.length > 0) {
                    setLastMatchResult(gameState.history[gameState.history.length - 1]);
                    setShowScorecardModal(true);
                  }
                }}
                className="w-full py-3 rounded-none border border-white/10 text-xs font-mono text-white/50 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider font-bold"
              >
                Review Defeat Scorecard
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== 8. WINNER (INVINCIBLE CHAMPION) ==================== */}
        {gameState.status === 'WINNER' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto w-full border-2 border-white/20 bg-[#000814] p-4 sm:p-8 rounded-none text-center shadow-[8px_8px_0px_#003566] my-auto"
            id="winner-screen"
          >
            {/* Crown star icon */}
            <div className="w-20 h-20 rounded-none bg-[#001D3D] border-2 border-[#FFC300] flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#003566]">
              <Trophy className="w-10 h-10 text-[#FFC300]" />
            </div>

            <span className="text-xs font-mono text-[#FFC300] uppercase tracking-[0.2em] font-black">CLEAN SWEEP IMMORTALITY</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-1 uppercase italic tracking-tighter leading-none">🏆 YOU ARE INVINCIBLE!</h2>
            
            <p className="text-sm text-white/70 mt-3 leading-relaxed max-w-lg mx-auto font-semibold uppercase">
              Outstanding strategic planning! Your playing XI has successfully completed a flawless <span className="text-white font-black font-mono">{gameState.history.length}</span> matches clean sweep against the toughest records of the <span className="text-white font-black">{gameState.tournamentYear}</span> season!
            </p>

            {/* Immortalized stats block */}
            <div className="my-8 p-5 rounded-none bg-[#001D3D] border border-white/10 text-left space-y-4 shadow-[4px_4px_0px_#003566]">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h4 className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-wider">Immortalized Squad</h4>
                <span className="text-xs font-mono text-emerald-400 font-black uppercase">{gameState.tournamentLength === 'Short' ? '9-0 Streak' : '14-0 Streak'}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gameState.squad.map((p) => (
                  <div key={p.id} className="p-2 rounded-none bg-[#000814] border border-white/10">
                    <h5 className="font-sans font-black text-xs truncate text-white uppercase tracking-tight">{p.name}</h5>
                    <p className="text-[9px] text-white/50 uppercase mt-0.5 font-bold font-mono">{p.role}</p>
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono text-white/60 pt-2 border-t border-white/10 flex justify-between uppercase font-bold">
                <span>Appointed Captain:</span>
                <span className="text-white font-black">{gameState.squad.find(p => p.id === gameState.captainId)?.name} (C)</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleResetToLobby}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-[#FFC300]/90 border-2 border-[#FFC300] transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
                id="btn-victory-lobby"
              >
                Return to Lobby
              </button>
              
              <button
                onClick={() => {
                  if (gameState.history.length > 0) {
                    setLastMatchResult(gameState.history[gameState.history.length - 1]);
                    setShowScorecardModal(true);
                  }
                }}
                className="w-full py-2.5 rounded-none border border-white/10 text-xs font-mono text-white/50 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider font-bold"
              >
                Review Championship Scorecard
              </button>
            </div>
          </motion.div>
        )}

      </main>

      {/* --- SCORECARD MODAL / POST-MATCH WRAPPER --- */}
      <AnimatePresence>
        {showScorecardModal && lastMatchResult && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#000814] border-2 border-white/20 max-w-4xl w-full rounded-none overflow-hidden shadow-[8px_8px_0px_#003566] flex flex-col my-auto max-h-[90vh]"
              id="scorecard-modal"
            >
              
              {/* Header result banner */}
              <div className={`p-6 text-center border-b-2 border-white/10 ${
                lastMatchResult.won 
                  ? 'bg-[#001D3D]' 
                  : 'bg-red-950/40'
              }`}>
                <span className="text-[10px] font-mono font-black tracking-widest text-[#FFC300] uppercase">
                  MATCH {lastMatchResult.matchNumber} OUTCOME
                </span>
                
                <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-1 leading-none uppercase italic tracking-tighter">
                  {lastMatchResult.won ? '🏆 MATCH WON!' : '🚨 MATCH LOST!'}
                </h2>

                <p className="text-xs text-white/70 mt-3 font-mono font-semibold uppercase">
                  {lastMatchResult.won 
                    ? `${activeTheme.shortName} scored ${lastMatchResult.userRuns}/${lastMatchResult.userWickets} vs ${lastMatchResult.opponent.shortName} ${lastMatchResult.opponentRuns}/${lastMatchResult.opponentWickets}.`
                    : `${lastMatchResult.opponent.shortName} scored ${lastMatchResult.opponentRuns}/${lastMatchResult.opponentWickets} vs ${activeTheme.shortName} ${lastMatchResult.userRuns}/${lastMatchResult.userWickets}.`
                  }
                </p>
              </div>

              {/* Scrollable scorecard content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#000814]">

                {/* MOTM Featured star section */}
                <div className="bg-[#001D3D] border border-[#FFC300]/30 rounded-none p-5 relative overflow-hidden shadow-[3px_3px_0px_#003566]">
                  <div className="absolute right-3 top-3 opacity-10">
                    <Star className="w-16 h-16 fill-amber-400 stroke-none" />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-none bg-[#FFC300] flex items-center justify-center shrink-0 border border-white">
                      <Star className="w-5 h-5 text-[#001D3D] fill-[#001D3D]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black text-[#FFC300] uppercase tracking-wider">
                        MAN OF THE MATCH
                      </span>
                      <h4 className="font-display font-black text-base text-white mt-0.5 uppercase tracking-tight">
                        {lastMatchResult.manOfTheMatch.playerName}
                        {lastMatchResult.manOfTheMatch.isUserPlayer && ' (Your Team)'}
                      </h4>
                      <p className="text-xs text-[#FFC300] font-mono mt-1 font-black uppercase">
                        ★ {lastMatchResult.manOfTheMatch.performance}
                      </p>
                      <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-semibold uppercase">
                        {lastMatchResult.manOfTheMatch.reason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scorecard grid side-by-side */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Left: User Team Scorecard */}
                  <div className="bg-[#001D3D] border border-white/10 p-4 rounded-none flex flex-col shadow-[3px_3px_0px_#003566]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                      <h3 className="font-display font-black text-white text-sm uppercase tracking-tight">{activeTheme.name}</h3>
                      <span className="font-mono text-sm font-black text-[#FFC300]">
                        {lastMatchResult.userRuns}/{lastMatchResult.userWickets} ({lastMatchResult.userOvers} ov)
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-1 mb-1">Batting</h4>
                      {lastMatchResult.userScorecard.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-mono py-1 border-b border-white/5 uppercase font-medium">
                          <span className="truncate max-w-[150px] text-white/70">
                            {item.playerName}
                            {item.isCaptain && ' (C)'}
                          </span>
                          <span className="text-white/40">
                            <span className="text-white font-black">{item.runsScored}</span>
                            <span className="text-[9px] text-white/40 font-normal pl-1">({item.ballsFaced})</span>
                          </span>
                        </div>
                      ))}

                      <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-1 mt-4 mb-1">Bowling</h4>
                      {lastMatchResult.userScorecard
                        .filter(item => (item.oversBowled || 0) > 0)
                        .map((item, idx) => {
                          return (
                            <div key={idx} className="flex justify-between text-xs font-mono py-1 border-b border-white/5 uppercase font-medium">
                              <span className="truncate max-w-[150px] text-white/70">{item.playerName}</span>
                              <span className="text-white/40">
                                <span className="text-emerald-400 font-black">{item.wicketsTaken}</span>
                                <span className="text-white/40 font-normal">/{item.runsConceded}</span>
                                <span className="text-[9px] text-white/30 pl-1">({item.oversBowled})</span>
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Right: Opponent Scorecard */}
                  <div className="bg-[#001D3D] border border-white/10 p-4 rounded-none flex flex-col shadow-[3px_3px_0px_#003566]">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                      <h3 className="font-display font-black text-white text-sm uppercase tracking-tight">{lastMatchResult.opponent.name}</h3>
                      <span className="font-mono text-sm font-black text-white/40">
                        {lastMatchResult.opponentRuns}/{lastMatchResult.opponentWickets} ({lastMatchResult.opponentOvers} ov)
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-1 mb-1">Batting</h4>
                      {lastMatchResult.opponentScorecard.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-mono py-1 border-b border-white/5 uppercase font-medium">
                          <span className="truncate max-w-[150px] text-white/70">
                            {item.playerName}
                            {item.isCaptain && ' (C)'}
                          </span>
                          <span className="text-white/40">
                            <span className="text-white font-black">{item.runsScored}</span>
                            <span className="text-[9px] text-white/40 font-normal pl-1">({item.ballsFaced})</span>
                          </span>
                        </div>
                      ))}

                      <h4 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-1 mt-4 mb-1">Bowling</h4>
                      {lastMatchResult.opponentScorecard
                        .filter(item => (item.oversBowled || 0) > 0)
                        .map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-mono py-1 border-b border-white/5 uppercase font-medium">
                            <span className="truncate max-w-[150px] text-white/70">{item.playerName}</span>
                            <span className="text-white/40">
                              <span className="text-red-400 font-black">{item.wicketsTaken}</span>
                              <span className="text-white/40 font-normal">/{item.runsConceded}</span>
                              <span className="text-[9px] text-white/30 pl-1">({item.oversBowled})</span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Proceed bar */}
              <div className="p-5 bg-[#001D3D] border-t-2 border-white/10 flex justify-end">
                <button
                  onClick={handleCloseScorecard}
                  className="px-6 py-3 rounded-none font-display font-black text-xs uppercase tracking-widest bg-white text-[#001D3D] hover:bg-[#FFC300] hover:text-[#001D3D] border-2 border-white shadow-[3px_3px_0px_#003566] cursor-pointer transition-colors"
                  id="btn-close-scorecard"
                >
                  {lastMatchResult.won ? 'Continue Campaign' : 'View Tournament Summary'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FOOTER SITE META --- */}
      <footer className="border-t-2 border-white/10 bg-[#000814] py-6 text-center z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-mono font-semibold uppercase tracking-wider">
            Invincible v1.1.0 (IPL All-Time Franchise & Legends Database) • Offline Engine.
          </p>
          <div className="flex gap-4 text-xs font-mono text-white/50 uppercase font-bold">
            <span className="hover:text-[#FFC300] cursor-pointer transition-colors" onClick={handleResetToLobby}>Lobby</span>
            <span className="text-white/20">•</span>
            <span className="text-white/30 font-semibold normal-case">No telemetry or logs gathered.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
