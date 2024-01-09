export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    bbox?:         number[];
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:           string;
    wikidata?:    Wikidata;
    short_code?:  ShortCode;
    text_es:      string;
    language_es?: Language;
    text:         string;
    language?:    Language;
}

export enum Language {
    Es = "es",
}

export enum ShortCode {
    ES = "es",
    ESB = "ES-B",
}

export enum Wikidata {
    Q5705 = "Q5705",    // Cataluña
    Q81949 = "Q81949",  // Provincia de Barcelona
    Q1492 = "Q1492",    // Barcelona
    Q13855 = "Q13855",  // Vic
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    foursquare?: string;
    landmark?:   boolean;
    category?:   string;
    maki?:       string;
    address?:    string;
}