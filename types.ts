export interface AmiiboI {
    amiiboSeries: string;
    character: string;
    gameSeries: string;
    games3DS: GameI[];
    gamesSwitch: GameI[];
    gamesWiiU: GameI[];
    head: string;
    image: string;
    name: string;
    release: ReleaseI;
    tail: string;
    type: string;
}

export interface ParsedAmiiboI extends AmiiboI {
    flagReleases: ReleaseI;
}

export interface ReleaseI {
    au: string | null;
    eu: string | null;
    jp: string | null;
    na: string | null;
}

export interface GameI {
    amiiboUsage: UsageI[];
    gameID: string[];
    gameName: string;
}

export interface UsageI {
    Usage: string;
    write: boolean;
}