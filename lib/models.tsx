export interface NameData {
    name: string
}

export interface IdData {
    _id: string,
}

export interface Region extends NameData, IdData {
    subregions: []
}

export interface SubRegion extends NameData, IdData {
    region: string
    countries: []
}

export interface Country extends NameData, IdData {
    subRegion: string
}