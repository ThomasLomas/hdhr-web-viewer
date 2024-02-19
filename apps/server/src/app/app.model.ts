export interface LineupResponse {
  GuideNumber: string;
  GuideName: string;
  VideoCodec: string;
  AudioCodec: string;
  HD: number;
  URL: string;
}

export interface Lineup {
  name: string;
  number: string;
  url: string;
  hd: boolean;
  videoCodec: string;
  audioCodec: string;
}
