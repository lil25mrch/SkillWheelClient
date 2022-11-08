export interface structureModel {
  sections: sectionModel[]
}

export interface sectionModel {
  section_id: number,
  level_depth: levelModel[]
}

export interface levelModel {
  id: number,
  count: number,
  spells: spellInterface[]
}

export interface spellInterface {
  id: number,
  spell_id: string | undefined,
  name: string | undefined,
  description: string | undefined,
  image: string | undefined,
  style: string,
  style_one?: string,
  style_two?: string,
  style_three: string,
  style_four: string,
  style_five: string,
  state: "" | "show" | "hide" | "selected" | "not_selected",
  color: string
}
