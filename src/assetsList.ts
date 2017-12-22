export const assets: AssetSet[] = [
   {character: "one", name: "Idle"},
   {character: "one", name: "Jump"},
   {character: "one", name: "Stand"},
   {character: "one", name: "Walk1"},
   {character: "one", name: "Walk2"},
]

export interface AssetSet {
    character: string
    name: string
}