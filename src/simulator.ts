import { Player, Opponent, MatchResult, MatchScorecardEntry, PlayerRole } from './types';
import { PLAYER_DATABASE } from './data';
import { isOverseasPlayer, isTenYearLoyalist } from './utils';

// Helper to generate a random number within a range
const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate simulated batting and bowling scores for each player
export function calculateSquadBalance(squad: Player[], activeThemeShortName?: string) {
  let batsmanCount = 0;
  let bowlerCount = 0;
  let allRounderCount = 0;
  let keeperCount = 0;

  squad.forEach(p => {
    if (p.role === 'Batsman') batsmanCount++;
    else if (p.role === 'Bowler') bowlerCount++;
    else if (p.role === 'All-Rounder') allRounderCount++;
    else if (p.role === 'Wicketkeeper') keeperCount++;
  });

  const errors: string[] = [];
  const warnings: string[] = [];

  if (keeperCount === 0) {
    errors.push('No Wicketkeeper! Add at least one Wicketkeeper to prevent a massive fielding penalty.');
  }
  const totalBowlers = bowlerCount + allRounderCount;
  if (totalBowlers < 5) {
    errors.push(`Only ${totalBowlers} bowling options! You need at least 5 bowlers/all-rounders to bowl the 20 overs without penalties.`);
  }
  
  const overseasCount = squad.filter(p => isOverseasPlayer(p.name, p.description)).length;
  if (overseasCount > 4) {
    errors.push(`Too many foreign players! You have drafted ${overseasCount} foreign players. IPL rules allow a maximum of 4 foreign players in your playing XI.`);
  }

  if (batsmanCount + keeperCount + allRounderCount < 5) {
    warnings.push('Weak batting lineup! Consider drafting more batsmen or all-rounders.');
  }

  // Base Strengths
  let battingSum = 0;
  let battingCount = 0;
  let bowlingSum = 0;
  let bowlingCount = 0;

  squad.forEach(p => {
    if (p.role === 'Batsman') {
      battingSum += p.rating;
      battingCount++;
    } else if (p.role === 'Wicketkeeper') {
      battingSum += p.rating;
      battingCount++;
    } else if (p.role === 'All-Rounder') {
      battingSum += p.rating;
      battingCount++;
      bowlingSum += p.rating;
      bowlingCount++;
    } else if (p.role === 'Bowler') {
      bowlingSum += p.rating;
      bowlingCount++;
    }
  });

  if (squad.length === 0) {
    return {
      battingStrength: 0,
      bowlingStrength: 0,
      overallStrength: 0,
      errors,
      warnings,
      distribution: { batsmanCount, bowlerCount, allRounderCount, keeperCount }
    };
  }

  let rawBatting = battingCount > 0 ? (battingSum / battingCount) : 0;
  let rawBowling = bowlingCount > 0 ? (bowlingSum / bowlingCount) : 0;

  // Apply composition modifiers
  let battingModifier = 1.0;
  let bowlingModifier = 1.0;

  if (keeperCount === 0) {
    // Serious fielding slip-ups increase opponent's runs
    bowlingModifier -= 0.15; 
    battingModifier -= 0.05;
  }
  if (totalBowlers < 5) {
    // Severe penalty for missing bowling options (part-timers leaking runs)
    const deficit = 5 - totalBowlers;
    bowlingModifier -= 0.12 * deficit;
  }

  // Balanced team bonus
  if (keeperCount >= 1 && totalBowlers >= 5 && batsmanCount >= 3) {
    battingModifier += 0.05;
    bowlingModifier += 0.05;
  }

  const finalBatting = battingCount > 0 ? Math.round(Math.min(99, Math.max(30, rawBatting * battingModifier))) : 0;
  const finalBowling = bowlingCount > 0 ? Math.round(Math.min(99, Math.max(30, rawBowling * bowlingModifier))) : 0;

  let overallStrength = 0;
  let finalBattingAdj = finalBatting;
  let finalBowlingAdj = finalBowling;
  
  if (finalBattingAdj > 0 && finalBowlingAdj > 0) {
    overallStrength = Math.round((finalBattingAdj + finalBowlingAdj) / 2);
  } else if (finalBattingAdj > 0) {
    overallStrength = finalBattingAdj;
  } else if (finalBowlingAdj > 0) {
    overallStrength = finalBowlingAdj;
  }
  
  if (activeThemeShortName) {
    const loyalPlayers = squad.filter(p => p.originalTeam === activeThemeShortName).length;
    if (loyalPlayers >= 3) {
      const bonus = Math.floor(loyalPlayers / 2); // 3 loyal -> +1, 4 -> +2, etc.
      overallStrength += bonus;
      finalBattingAdj += bonus;
      finalBowlingAdj += bonus;
    }
  }

  return {
    battingStrength: finalBattingAdj,
    bowlingStrength: finalBowlingAdj,
    overallStrength,
    errors,
    warnings,
    distribution: { batsmanCount, bowlerCount, allRounderCount, keeperCount }
  };
}

// Dynamically select the opponent's Playing XI based on their franchise and the year of the tournament
export function getOpponentPlayingXI(opponentShortName: string, year: number): Player[] {
  const squadPool = PLAYER_DATABASE.filter(
    p => p.originalTeam === opponentShortName && p.year === year
  );

  if (squadPool.length === 0) {
    // Fallback to any year if this specific year isn't in database, but it should be
    const fallbackPool = PLAYER_DATABASE.filter(p => p.originalTeam === opponentShortName);
    return fallbackPool.slice(0, 11);
  }

  // Choose a balanced XI matching the user's rules (including maximum 4 foreign/overseas players)
  const sortedPool = [...squadPool].sort((a, b) => b.rating - a.rating);
  const playingXI: Player[] = [];
  let overseasCount = 0;

  // 1. Pick a Wicketkeeper first
  const keepers = sortedPool.filter(p => p.role === 'Wicketkeeper');
  if (keepers.length > 0) {
    // Find first keeper that doesn't violate foreign limit
    const chosenKeeper = keepers.find(p => !isOverseasPlayer(p.name, p.description)) || keepers[0];
    playingXI.push(chosenKeeper);
    if (isOverseasPlayer(chosenKeeper.name, chosenKeeper.description)) {
      overseasCount++;
    }
  }

  // 2. We want to fill up to 11 players. Let's make sure we get a balance of batsmen, all-rounders, and bowlers
  // while strictly keeping overseas count <= 4
  const remainingSorted = sortedPool.filter(p => !playingXI.some(x => x.id === p.id));
  
  // Fill roles to ensure balance (ideal: at least 4 batsmen, 2 allrounders, 4 bowlers)
  const idealBatsmen = remainingSorted.filter(p => p.role === 'Batsman');
  const idealAR = remainingSorted.filter(p => p.role === 'All-Rounder');
  const idealBowlers = remainingSorted.filter(p => p.role === 'Bowler');

  // Helper to add a player to playingXI if they don't break overseas limit
  const tryAddPlayer = (p: Player) => {
    if (playingXI.length >= 11) return false;
    if (playingXI.some(x => x.id === p.id)) return false;
    
    const isOverseas = isOverseasPlayer(p.name, p.description);
    if (isOverseas && overseasCount >= 4) {
      return false; // Skip overseas player to preserve limits
    }

    playingXI.push(p);
    if (isOverseas) overseasCount++;
    return true;
  };

  // Add up to 4 batsmen
  let batsAdded = 0;
  for (const p of idealBatsmen) {
    if (batsAdded >= 4) break;
    if (tryAddPlayer(p)) batsAdded++;
  }

  // Add up to 2 all-rounders
  let arAdded = 0;
  for (const p of idealAR) {
    if (arAdded >= 2) break;
    if (tryAddPlayer(p)) arAdded++;
  }

  // Add up to 4 bowlers
  let bowlAdded = 0;
  for (const p of idealBowlers) {
    if (bowlAdded >= 4) break;
    if (tryAddPlayer(p)) bowlAdded++;
  }

  // Backfill up to 11 if we still need players (preferring Indian players if overseas limit is reached)
  const finalRemaining = sortedPool.filter(p => !playingXI.some(x => x.id === p.id));
  for (const p of finalRemaining) {
    if (playingXI.length >= 11) break;
    tryAddPlayer(p);
  }

  // In case of any extreme shortfall, fill with any player regardless of role but still respecting the limit
  if (playingXI.length < 11) {
    const finalFallback = sortedPool.filter(p => !playingXI.some(x => x.id === p.id));
    for (const p of finalFallback) {
      if (playingXI.length >= 11) break;
      const isOverseas = isOverseasPlayer(p.name, p.description);
      if (isOverseas && overseasCount >= 4) continue;
      playingXI.push(p);
      if (isOverseas) overseasCount++;
    }
  }

  // Sort: Batsmen, Keepers, All-rounders, Bowlers
  const roleOrder = { 'Batsman': 1, 'Wicketkeeper': 2, 'All-Rounder': 3, 'Bowler': 4 };
  return playingXI.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
}

/**
 * Mathematically sound, realistic scorecard generator for a T20 innings
 * Total balls faced = exactly the overs bowled (max 120, or less if all-out or successfully chased).
 * No bowler can bowl more than 4 overs (24 balls).
 * Batsmen runs sum to totalRuns, bowler wickets sum to totalWickets.
 */
function generateScorecardForInnings(
  batsmenSquad: Player[], // Batting order (11 players)
  bowlersSquad: Player[], // Bowling squad (11 players)
  totalRuns: number,
  totalWickets: number,
  isChasing: boolean,
  opponentScore?: number
): {
  battingScorecard: MatchScorecardEntry[];
  bowlingScorecard: { playerName: string; overs: number; wickets: number; runs: number }[];
  actualBallsFaced: number;
} {
  // 1. Determine exact total balls bowled in this innings
  let actualBallsFaced = 120;
  if (totalWickets === 10) {
    // If all out, they used fewer than 20 overs
    actualBallsFaced = randomInRange(75, 118);
  } else if (isChasing && opponentScore !== undefined && totalRuns > opponentScore) {
    // Chased down successfully, finished early
    const randomOvers = 15 + Math.random() * 4.8; // e.g. 15.0 to 19.5 overs
    actualBallsFaced = Math.min(120, Math.floor(randomOvers * 6));
  }

  // Ensure actualBallsFaced is at least 6 and max 120
  actualBallsFaced = Math.max(6, Math.min(120, actualBallsFaced));

  // 2. Identify bowling options
  let activeBowlers = bowlersSquad.filter(p => p.role === 'Bowler' || p.role === 'All-Rounder');
  if (activeBowlers.length === 0) {
    // Fallback: everyone except the wicketkeeper can bowl
    activeBowlers = bowlersSquad.filter(p => p.role !== 'Wicketkeeper');
  }

  // To bowl 20 overs, we need bowlers. If there are fewer than 5 bowlers, the rest of the squad contributes as part-timers
  let bowlersToUse = [...activeBowlers].sort((a, b) => b.rating - a.rating);
  if (bowlersToUse.length < 5) {
    const remainingInSquad = bowlersSquad.filter(
      p => !bowlersToUse.some(b => b.id === p.id) && p.role !== 'Wicketkeeper'
    );
    bowlersToUse = [...bowlersToUse, ...remainingInSquad];
  }

  // 3. Allocate exact over counts (max 4 overs / 24 balls per bowler)
  const totalOversToBowl = Math.ceil(actualBallsFaced / 6);
  const bowlerOversAllocated = Array(bowlersToUse.length).fill(0);

  for (let over = 0; over < totalOversToBowl; over++) {
    // Pick the bowler with the best combination of priority (specialist Bowler > All-Rounder > Batsman) and fewest overs
    const sortedIndices = Array.from({ length: bowlersToUse.length }, (_, i) => i)
      .sort((a, b) => {
        const scoreA = (bowlersToUse[a].role === 'Bowler' ? 0 : bowlersToUse[a].role === 'All-Rounder' ? 1 : 2) * 100 + bowlerOversAllocated[a];
        const scoreB = (bowlersToUse[b].role === 'Bowler' ? 0 : bowlersToUse[b].role === 'All-Rounder' ? 1 : 2) * 100 + bowlerOversAllocated[b];
        return scoreA - scoreB;
      });

    let draftedIdx = sortedIndices[0];
    for (const idx of sortedIndices) {
      if (bowlerOversAllocated[idx] < 4) {
        draftedIdx = idx;
        break;
      }
    }

    bowlerOversAllocated[draftedIdx]++;
  }

  // Convert allocated overs to exact balls bowled
  const bowlerBallsAllocated = bowlerOversAllocated.map(ov => ov * 6);
  let allocatedSum = bowlerBallsAllocated.reduce((a, b) => a + b, 0);

  // If actualBallsFaced is not a multiple of 6, subtract balls from the last bowlers until it matches
  while (allocatedSum > actualBallsFaced) {
    for (let i = bowlerBallsAllocated.length - 1; i >= 0; i--) {
      if (bowlerBallsAllocated[i] > 0) {
        bowlerBallsAllocated[i]--;
        allocatedSum--;
        break;
      }
    }
  }

  // 4. Distribute wickets among bowlers
  const bowlerWickets = Array(bowlersToUse.length).fill(0);
  let wicketsRemaining = totalWickets;

  const bowlerWicketWeights = bowlersToUse.map((b, idx) => {
    if (bowlerBallsAllocated[idx] === 0) return 0;
    let baseWt = b.rating;
    if (b.role === 'Bowler') baseWt *= 2.0;
    else if (b.role === 'All-Rounder') baseWt *= 1.2;
    else baseWt *= 0.1; // Part-timers rarely get wickets
    return baseWt;
  });

  const totalWicketWeight = bowlerWicketWeights.reduce((a, b) => a + b, 0) || 1;

  while (wicketsRemaining > 0) {
    let rand = Math.random() * totalWicketWeight;
    let chosenIdx = -1;
    for (let i = 0; i < bowlerWicketWeights.length; i++) {
      rand -= bowlerWicketWeights[i];
      if (rand <= 0 && bowlerBallsAllocated[i] > 0) {
        chosenIdx = i;
        break;
      }
    }

    if (chosenIdx === -1) {
      chosenIdx = bowlerBallsAllocated.findIndex(b => b > 0);
    }

    if (chosenIdx !== -1 && bowlerWickets[chosenIdx] < 6) {
      bowlerWickets[chosenIdx]++;
      wicketsRemaining--;
    } else {
      // Emergency breakout to prevent infinite loop
      const emergencyIdx = bowlerBallsAllocated.findIndex((b, idx) => b > 0 && bowlerWickets[idx] < 6);
      if (emergencyIdx !== -1) {
        bowlerWickets[emergencyIdx]++;
        wicketsRemaining--;
      } else {
        break; // can't take more
      }
    }
  }

  // 5. Distribute runs conceded among bowlers
  const bowlerRuns = Array(bowlersToUse.length).fill(0);
  let runsRemainingToConcede = totalRuns;

  const bowlerEconomyWeights = bowlersToUse.map((b, idx) => {
    if (bowlerBallsAllocated[idx] === 0) return 0;
    let baseEcon = 8.5;
    if (b.role === 'Bowler') baseEcon = 7.2;
    else if (b.role === 'All-Rounder') baseEcon = 8.4;
    else baseEcon = 11.5; // part-timer is expensive

    const adjustedEcon = baseEcon - (b.rating - 80) * 0.12 + randomInRange(-15, 15) / 10;
    return Math.max(4.5, adjustedEcon);
  });

  let totalPropRuns = 0;
  const propRuns = bowlersToUse.map((b, idx) => {
    if (bowlerBallsAllocated[idx] === 0) return 0;
    const overs = bowlerBallsAllocated[idx] / 6;
    const econ = bowlerEconomyWeights[idx];
    const val = overs * econ;
    totalPropRuns += val;
    return val;
  });

  bowlersToUse.forEach((b, idx) => {
    if (bowlerBallsAllocated[idx] === 0) return;
    const share = propRuns[idx] / (totalPropRuns || 1);
    let runs = Math.round(totalRuns * share);
    runs = Math.max(0, Math.min(runsRemainingToConcede, runs));
    bowlerRuns[idx] = runs;
    runsRemainingToConcede -= runs;
  });

  // Handle leftovers
  if (runsRemainingToConcede !== 0) {
    const validIdx = bowlerBallsAllocated.findIndex(b => b > 0);
    if (validIdx !== -1) {
      bowlerRuns[validIdx] = Math.max(0, bowlerRuns[validIdx] + runsRemainingToConcede);
    }
  }

  // 6. Distribute runs and balls to batsmen
  // Wickets fallen determines who actually gets to bat!
  // If 0 wickets down: batsmen 1 and 2 bat.
  // If W wickets down: batsmen 1 to W+2 bat (capped at 11).
  const batsmenWhoBatted = Math.min(11, totalWickets + 2);
  const batsmanBalls = Array(11).fill(0);
  let ballsRemainingToAssign = actualBallsFaced;

  // Distribute balls faced based on batting order weights (top order faces more balls)
  const battingWeights = batsmenSquad.map((p, idx) => {
    if (idx >= batsmenWhoBatted) return 0;
    let wt = p.rating;
    if (p.role === 'Batsman') wt *= 2.0;
    else if (p.role === 'Wicketkeeper') wt *= 1.5;
    else if (p.role === 'All-Rounder') wt *= 1.1;
    else wt *= 0.3; // bowlers face fewer balls

    // Order modifiers
    if (idx < 3) wt *= 1.6; // openers/No.3
    else if (idx < 5) wt *= 1.2;
    return wt;
  });

  const totalBatWeight = battingWeights.reduce((a, b) => a + b, 0) || 1;

  batsmenSquad.forEach((p, idx) => {
    if (idx >= batsmenWhoBatted) return;
    const share = battingWeights[idx] / totalBatWeight;
    let balls = Math.round(actualBallsFaced * share);
    balls = Math.max(1, Math.min(ballsRemainingToAssign, balls));
    batsmanBalls[idx] = balls;
    ballsRemainingToAssign -= balls;
  });

  // Clean up any remaining balls to assign
  if (ballsRemainingToAssign !== 0) {
    const activeIndices = Array.from({ length: batsmenWhoBatted }, (_, i) => i);
    while (ballsRemainingToAssign > 0) {
      const idx = activeIndices[Math.floor(Math.random() * activeIndices.length)];
      batsmanBalls[idx]++;
      ballsRemainingToAssign--;
    }
    while (ballsRemainingToAssign < 0) {
      const idx = activeIndices.find(i => batsmanBalls[i] > 1);
      if (idx !== -1) {
        batsmanBalls[idx]--;
        ballsRemainingToAssign++;
      } else {
        break;
      }
    }
  }

  // Distribute runs to batsmen corresponding to balls faced & strike rate
  const batsmanRuns = Array(11).fill(0);
  let runsRemainingToAssign = totalRuns;

  const batsmanSRs = batsmenSquad.map((p, idx) => {
    if (idx >= batsmenWhoBatted) return 0;
    let baseSR = 135;
    if (p.role === 'Batsman') baseSR = 145;
    else if (p.role === 'Wicketkeeper') baseSR = 138;
    else if (p.role === 'All-Rounder') baseSR = 132;
    else baseSR = 90; // Tailenders bat slower

    return baseSR + (p.rating - 80) * 0.6 + randomInRange(-20, 30);
  });

  let totalPropRunsBat = 0;
  const propRunsBat = batsmenSquad.map((p, idx) => {
    if (idx >= batsmenWhoBatted) return 0;
    const balls = batsmanBalls[idx];
    const sr = batsmanSRs[idx];
    const val = (balls * sr) / 100;
    totalPropRunsBat += val;
    return val;
  });

  batsmenSquad.forEach((p, idx) => {
    if (idx >= batsmenWhoBatted) return;
    const share = propRunsBat[idx] / (totalPropRunsBat || 1);
    let runs = Math.round(totalRuns * share);
    runs = Math.max(0, Math.min(runsRemainingToAssign, runs));
    batsmanRuns[idx] = runs;
    runsRemainingToAssign -= runs;
  });

  // Rounding errors add to the top batsman
  if (runsRemainingToAssign !== 0) {
    let topScorerIdx = 0;
    let maxB = -1;
    batsmanBalls.forEach((b, idx) => {
      if (b > maxB) {
        maxB = b;
        topScorerIdx = idx;
      }
    });
    batsmanRuns[topScorerIdx] = Math.max(0, batsmanRuns[topScorerIdx] + runsRemainingToAssign);
  }

  // 7. Format final results
  const battingScorecard: MatchScorecardEntry[] = [];
  batsmenSquad.forEach((p, idx) => {
    const isBatted = idx < batsmenWhoBatted;
    battingScorecard.push({
      playerName: p.name,
      role: p.role,
      runsScored: isBatted ? batsmanRuns[idx] : undefined,
      ballsFaced: isBatted ? batsmanBalls[idx] : undefined
    });
  });

  const bowlingScorecard = bowlersToUse.map((b, idx) => {
    const ballsBowled = bowlerBallsAllocated[idx];
    const completedOvers = Math.floor(ballsBowled / 6);
    const extraBalls = ballsBowled % 6;
    const oversAsDecimal = completedOvers + (extraBalls / 10);

    return {
      playerName: b.name,
      overs: oversAsDecimal,
      wickets: bowlerWickets[idx],
      runs: bowlerRuns[idx]
    };
  });

  return {
    battingScorecard,
    bowlingScorecard,
    actualBallsFaced
  };
}

export function simulateMatch(
  activeThemeShortName: string,
  matchNumber: number,
  squad: Player[],
  captainId: string | null,
  userTeamName: string,
  opponent: Opponent,
  isLongTournament: boolean = false
): MatchResult {
  // Determine tournament year from drafted squad players
  const tournamentYear = squad.length > 0 ? squad[0].year : 2024;

  // Build opponent Playing XI dynamically using actual squads from that season!
  const opponentPlayingXI = getOpponentPlayingXI(opponent.shortName, tournamentYear);

  // Scale opponent player ratings so that their average rating aligns with the opponent's balanced rating!
  // This ensures mathematical parity between the user and opponent teams for a fair 50-50 fight!
  // Form scaling: matches get progressively slightly harder (+0 to +3 OVR)
  const formBonus = Math.floor(matchNumber / (isLongTournament ? 4 : 3));
  const oppTargetRating = opponent.rating + formBonus;
  const initialOppBalance = calculateSquadBalance(opponentPlayingXI, opponent.shortName);
  const initialOppOverall = initialOppBalance.overallStrength;
  const scalingFactor = oppTargetRating / (initialOppOverall || 85);

  opponentPlayingXI.forEach(p => {
    p.rating = Math.max(70, Math.min(95, Math.round(p.rating * scalingFactor)));
  });

  // Recalculate strengths with the scaled player ratings
  const userBalance = calculateSquadBalance(squad, activeThemeShortName);
  const oppBalance = calculateSquadBalance(opponentPlayingXI, opponent.shortName);

  const userBatStrength = userBalance.battingStrength;
  const userBowlStrength = userBalance.bowlingStrength;
  const oppBatStrength = oppBalance.battingStrength;
  const oppBowlStrength = oppBalance.bowlingStrength;

  // Base Runs simulation
  const userBaseRuns = 165 + (userBatStrength - oppBowlStrength) * 1.5 + randomInRange(-20, 20);
  let userFinalRuns = Math.max(85, Math.round(userBaseRuns));

  const userWicketFactor = 5.0 + (oppBowlStrength - userBatStrength) * 0.08 + (randomInRange(-20, 20) / 10);
  let userWickets = Math.min(10, Math.max(0, Math.round(userWicketFactor)));

  const oppBaseRuns = 165 + (oppBatStrength - userBowlStrength) * 1.5 + randomInRange(-20, 20);
  let oppFinalRuns = Math.max(85, Math.round(oppBaseRuns));

  const oppWicketFactor = 5.0 + (userBowlStrength - oppBatStrength) * 0.08 + (randomInRange(-20, 20) / 10);
  let oppWickets = Math.min(10, Math.max(0, Math.round(oppWicketFactor)));

  // Target win probability to win the tournament ~1 in 15 runs:
  // Short (9 matches): p = 74%
  // Long (14 matches): p = 83%
  let winChance = isLongTournament ? 83 : 74;

  // 1. Squad strength bonus
  const userOvr = userBalance.overallStrength;
  const oppOvr = oppBalance.overallStrength;
  if (userOvr > oppOvr) {
    winChance += Math.min(5, Math.round((userOvr - oppOvr) * 1.5));
  } else {
    winChance -= Math.min(10, Math.round((oppOvr - userOvr) * 1.5));
  }

  // 2. Loyalty Boost: +3% per 10-year franchise loyalist!
  const loyalistCount = squad.filter(p => isTenYearLoyalist(p.name, p.originalTeam)).length;
  winChance += loyalistCount * 3;

  // 3. Balance Penalties: -15% per squad composition error
  if (userBalance.errors.length > 0) {
    winChance -= userBalance.errors.length * 15;
  }

  // Clamp win chance between 15% and 95%
  const finalWinChance = Math.max(15, Math.min(95, winChance));

  // Determine win outcome
  const won = randomInRange(1, 100) <= finalWinChance;

  // Toss: Determine who bats first at random
  const userBatsFirst = Math.random() > 0.5;

  if (userBatsFirst) {
    // User sets target, opponent chases
    if (won) {
      // User wins: opponent failed to chase, or opponent got all out.
      if (oppFinalRuns >= userFinalRuns) {
        oppFinalRuns = userFinalRuns - randomInRange(4, 22);
      }
    } else {
      // Opponent wins: opponent successfully chased.
      if (oppFinalRuns <= userFinalRuns) {
        oppFinalRuns = userFinalRuns + randomInRange(4, 22);
      }
      // Opponent can't be all out if they won chasing
      if (oppWickets === 10) {
        oppWickets = randomInRange(4, 9);
      }
    }
  } else {
    // Opponent sets target, user chases
    if (won) {
      // User wins: user successfully chased.
      if (userFinalRuns <= oppFinalRuns) {
        userFinalRuns = oppFinalRuns + randomInRange(4, 22);
      }
      // User can't be all out if they won chasing
      if (userWickets === 10) {
        userWickets = randomInRange(4, 9);
      }
    } else {
      // Opponent wins: user failed to chase, or user got all out.
      if (userFinalRuns >= oppFinalRuns) {
        userFinalRuns = oppFinalRuns - randomInRange(4, 22);
      }
    }
  }

  // Prevent ties (must have a decisive winner)
  if (userFinalRuns === oppFinalRuns) {
    if (won) {
      oppFinalRuns = Math.max(0, oppFinalRuns - 1);
    } else {
      userFinalRuns = Math.max(0, userFinalRuns - 1);
    }
  }

  // Generate User batting scorecard & Opponent bowling scorecard
  const userBattingData = generateScorecardForInnings(
    squad,
    opponentPlayingXI,
    userFinalRuns,
    userWickets,
    !userBatsFirst, // is user chasing?
    userBatsFirst ? undefined : oppFinalRuns
  );

  // Generate Opponent batting scorecard & User bowling scorecard
  const oppBattingData = generateScorecardForInnings(
    opponentPlayingXI,
    squad,
    oppFinalRuns,
    oppWickets,
    userBatsFirst, // is opponent chasing?
    userBatsFirst ? userFinalRuns : undefined
  );

  // Set captain status for user batting scorecard
  userBattingData.battingScorecard.forEach(entry => {
    const correspondingPlayer = squad.find(p => p.name === entry.playerName);
    if (correspondingPlayer && correspondingPlayer.id === captainId) {
      entry.isCaptain = true;
    }
  });

  // Map user bowling figures into userScorecard
  const finalUserScorecard: MatchScorecardEntry[] = userBattingData.battingScorecard.map(batEntry => {
    const bowlerData = oppBattingData.bowlingScorecard.find(b => b.playerName === batEntry.playerName);
    if (bowlerData) {
      return {
        ...batEntry,
        oversBowled: bowlerData.overs,
        wicketsTaken: bowlerData.wickets,
        runsConceded: bowlerData.runs
      };
    }
    return batEntry;
  });

  // Map opponent bowling figures into opponentScorecard
  const finalOpponentScorecard: MatchScorecardEntry[] = oppBattingData.battingScorecard.map(batEntry => {
    const bowlerData = userBattingData.bowlingScorecard.find(b => b.playerName === batEntry.playerName);
    if (bowlerData) {
      return {
        ...batEntry,
        oversBowled: bowlerData.overs,
        wicketsTaken: bowlerData.wickets,
        runsConceded: bowlerData.runs
      };
    }
    return batEntry;
  });

  // Calculate Man of the Match (MOTM) points
  let bestScore = -1;
  let motmName = 'No-one';
  let motmReason = 'Outstanding contribution';
  let motmPerformanceStr = '';
  let motmIsUser = true;

  // Process User scorecard points
  finalUserScorecard.forEach(entry => {
    let pts = 0;
    const runs = entry.runsScored || 0;
    const balls = entry.ballsFaced || 0;
    const wickets = entry.wicketsTaken || 0;
    const overs = entry.oversBowled || 0;
    const runsC = entry.runsConceded || 0;

    pts += runs;
    if (runs >= 100) pts += 60;
    else if (runs >= 50) pts += 30;
    else if (runs >= 30) pts += 15;

    if (runs > 0 && balls > 0) {
      const sr = (runs / balls) * 100;
      pts += (sr - 100) * 0.15;
    }

    pts += wickets * 25;
    if (wickets >= 5) pts += 50;
    else if (wickets >= 3) pts += 25;

    if (overs > 0) {
      const econ = runsC / overs;
      pts += (10 - econ) * 6;
    }

    if (won) pts += 15; // Winner's bonus

    if (pts > bestScore) {
      bestScore = pts;
      motmName = entry.playerName;
      motmIsUser = true;

      if (runs > 30 && wickets > 1) {
        motmReason = 'Fierce all-round display that totally dominated the opponent.';
        motmPerformanceStr = `${runs} (${balls} balls) & ${wickets}/${runsC} (${overs} overs)`;
      } else if (runs > wickets * 25) {
        motmReason = 'Masterful batting exhibition, pacing the innings with calculated risk.';
        motmPerformanceStr = `${runs} runs (${balls} balls) (SR: ${Math.round((runs / (balls || 1)) * 100)})`;
      } else {
        motmReason = 'Shattered the opponent with exceptional bowling variety and accuracy.';
        motmPerformanceStr = `${wickets}/${runsC} (${overs} overs)`;
      }
    }
  });

  // Process Opponent scorecard points
  finalOpponentScorecard.forEach(entry => {
    let pts = 0;
    const runs = entry.runsScored || 0;
    const balls = entry.ballsFaced || 0;
    const wickets = entry.wicketsTaken || 0;
    const overs = entry.oversBowled || 0;
    const runsC = entry.runsConceded || 0;

    pts += runs;
    if (runs >= 100) pts += 60;
    else if (runs >= 50) pts += 30;
    else if (runs >= 30) pts += 15;

    if (runs > 0 && balls > 0) {
      const sr = (runs / balls) * 100;
      pts += (sr - 100) * 0.15;
    }

    pts += wickets * 25;
    if (wickets >= 5) pts += 50;
    else if (wickets >= 3) pts += 25;

    if (overs > 0) {
      const econ = runsC / overs;
      pts += (10 - econ) * 6;
    }

    if (!won) pts += 15; // Winner's bonus

    if (pts > bestScore) {
      bestScore = pts;
      motmName = entry.playerName;
      motmIsUser = false;

      if (runs > 30 && wickets > 1) {
        motmReason = 'Incredible all-round fightback that posed a severe challenge.';
        motmPerformanceStr = `${runs} (${balls} balls) & ${wickets}/${runsC} (${overs} overs)`;
      } else if (runs > wickets * 25) {
        motmReason = 'Sensational batting under immense pressure, hitting exquisite boundaries.';
        motmPerformanceStr = `${runs} runs (${balls} balls)`;
      } else {
        motmReason = 'Extremely disciplined, economic spell that triggered batting collapses.';
        motmPerformanceStr = `${wickets}/${runsC} (${overs} overs)`;
      }
    }
  });

  // Format final match overs (e.g. convert total balls faced to classic overs representation)
  const userOversDecimal = Math.floor(userBattingData.actualBallsFaced / 6) + ((userBattingData.actualBallsFaced % 6) / 10);
  const oppOversDecimal = Math.floor(oppBattingData.actualBallsFaced / 6) + ((oppBattingData.actualBallsFaced % 6) / 10);

  return {
    matchNumber,
    opponent,
    userRuns: userFinalRuns,
    userWickets,
    userOvers: userOversDecimal,
    opponentRuns: oppFinalRuns,
    opponentWickets: oppWickets,
    opponentOvers: oppOversDecimal,
    won,
    manOfTheMatch: {
      playerName: motmName,
      reason: motmReason,
      performance: motmPerformanceStr,
      isUserPlayer: motmIsUser
    },
    userScorecard: finalUserScorecard,
    opponentScorecard: finalOpponentScorecard
  };
}
