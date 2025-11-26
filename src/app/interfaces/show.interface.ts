export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres?: string[];
  status: string;
  runtime?: number;
  averageRuntime: number;
  premiered: string;
  ended?: string;
  officialSite?: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average?: number;
  };
  weight: number;
  network?: {
    id: number;
    name: string;
    country: Country;
    officialSite?: string;
  };
  webChannel?: {
    id: number;
    name: string;
    country?: Country;
    officialSite?: string;
  };
  dvdCountry?: Country;
  externals: {
    tvrage: number;
    thetvdb?: number;
    imdb?: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: Links;
}

export interface Links {
  self: {
    href: string;
  };
  previousepisode: Previousepisode;
  nextepisode?: Previousepisode;
}

export interface Previousepisode {
  href: string;
  name: string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}
