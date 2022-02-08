export type rank = '8 kyu' | '7 kyu' | '6 kyu' | '5 kyu' | '4 kyu' | '3 kyu' | '2 kyu' | '1 kyu' | '1 dan' | '2 dan' | '3 dan' | '4 dan' |
'5 dan' | '6 dan' | '7 dan' | '8 dan' 

export interface CodewarsUserAPI {

    username: string,
    name: string,
    honor: number,
    clan: string | null,
    leaderboardPosition: number | null,
    skills: string[],
    ranks: {
        overall: {
            rank: number,
            name: rank,
            color: string,
            score: number
        },
        languages: {
            [key: string]: {
                rank: number,
                name: rank,
                color: string,
                score: number
            }
        }
    },
    codeChallenges: {
        totalAuthored: number,
        totalCompleted: number
    }
}