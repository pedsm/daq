export const assets: AssetSet[] = [
   {character: "one", name: "Idle"},
   {character: "one", name: "Jump"},
   {character: "one", name: "Stand"},
   {character: "one", name: "Walk1"},
   {character: "one", name: "Walk2"},
   {character: "one", name: "Sword"},
   {character: "ui", name: "Bg"},
   {character: "ui", name: "Fullbar"},
   {character: "ui", name: "Emptybar"},
]

export interface AssetSet {
    character: string
    name: string
}