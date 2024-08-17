export const fetchPastLeaderboardData = async ({ page, filters, sorts, round, ghostLegion, year }) => {
    const round2Path = ghostLegion == true ? '/ghost-legion' : '/final';
    const path = `${year}/round${round}${round == 1 ? '': round2Path}`
    const data = await import(`../../data/annual-leaderboard/${path}.json`)
    console.log('HOF data', data);
    console.log('Unused yet', page, filters, sorts);
};