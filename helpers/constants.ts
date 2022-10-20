import { Point } from "pigeon-maps"
import { OptionType } from "types"

export const defaultCenter: Point = [53.549294, 9.992907] // Hamburg city center

export const defaultError: string = "Laden der Daten nicht möglich"

export const controlsHeight: number = 250

export const options: { [key in OptionType]: string } = {
  Papier: 'abfall_recycling_1_papier',
  Glas: 'abfall_recycling_2_glas',
  Leichtverpackungen: 'abfall_recycling_3_lvp',
  Textil: 'abfall_recycling_4_textil',
  Elektrogeräte: 'abfall_recycling_5_elektro',
  Recyclinghöfe: 'abfall_recycling_6_recyhof',
}

export const colorOptions: { [key in OptionType]: string } = {
  Papier: '#8a8a8a',
  Glas: '#1900FF',
  Leichtverpackungen: '#e0d900',
  Textil: '#25e000',
  Elektrogeräte: '#00d9e0',
  Recyclinghöfe: '#e05200',
}

export const hamburgPostcodes = [
  20095, 20097, 20099, 20144, 20146, 20148, 20149, 20249, 20251, 20253, 20255, 20257, 20259, 20354, 20355, 20357, 20359, 20457, 20459, 20535, 20537, 20539, 21029, 21031, 21033, 21035, 21037, 21039, 21073, 21075, 21077, 21079, 21107, 21109, 21129, 21147, 21149, 22041, 22043, 22045, 22047, 22049, 22081, 22083, 22085, 22087, 22089, 22111, 22113, 22115, 22117, 22119, 22143, 22145, 22147, 22149, 22159, 22175, 22177, 22179, 22297, 22299, 22301, 22303, 22305, 22307, 22309, 22335, 22337, 22339, 22359, 22391, 22393, 22395, 22397, 22399, 22415, 22417, 22419, 22453, 22455, 22457, 22459, 22523, 22525, 22527, 22529, 22547, 22549, 22559, 22587, 22589, 22605, 22607, 22609, 22761, 22763, 22765, 22767, 22769
]
