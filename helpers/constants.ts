import { Point } from "pigeon-maps"

export const defaultCenter: Point = [53.549294, 9.992907] // Hamburg city center

export const defaultError: string = "Laden der Daten nicht möglich"

export const controlsHeight: number = 250

export const options: { [key: string]: string } = {
  Papier: 'abfall_recycling_1_papier',
  Glas: 'abfall_recycling_2_glas',
  Leichtverpackungen: 'abfall_recycling_3_lvp',
  Textil: 'abfall_recycling_4_textil',
  Elektrogeräte: 'abfall_recycling_5_elektro',
  Recyclinghöfe: 'abfall_recycling_6_recyhof',
}
