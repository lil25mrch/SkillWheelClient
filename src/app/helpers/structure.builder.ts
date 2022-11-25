import spellModel from "../data/spell.json";
import humans from "../data/humans.json";
import { structureModel } from "../models/structure.model";

export function structureBuild(structure:structureModel, race: typeof humans): structureModel  {
  for (let i = 0; i < structure.sections.length; i++) {
    let spells_zero_lvl = race.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[0].id == spell.DepthLevel);
    structure.sections[i].level_depth[0].spells.forEach((spell, index) => {
      if(spells_zero_lvl[index]) {
        let model = spellModel.find(id => spells_zero_lvl[index].SkillId == id.Id);
        spell.spell_id = model?.Id ?? "";
        spell.name = model?.Name;
        spell.description = model?.Description;
        spell.image = model?.Image;
        spell.state = "show";
        spell.required_skills = spells_zero_lvl[index].RequiredSkillIds;
        spell.required_skills.forEach(ds => structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
          spell.required_skills = sp.spell_id == ds ? spell.required_skills.concat(sp.required_skills) : spell.required_skills;
        }))));
        if (i != 0 && spells_zero_lvl.length == 4) {
          spells_zero_lvl.length = 3
        }
        switch (spells_zero_lvl.length) {
          case 4: {
            spell.style = spell.style_four;
            break;
          }
        }
      }
    })

    let spells_first_lvl = race.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[1].id == spell.DepthLevel);
    structure.sections[i].level_depth[1].count = spells_first_lvl.length;
    structure.sections[i].level_depth[1].spells.forEach((spell, index) => {
      if(spells_first_lvl[index]){
        let model = spellModel.find(id => {
          return spells_first_lvl[index].SkillId == id.Id;
        });
        spell.spell_id = model?.Id ?? "";
        spell.name = model?.Name;
        spell.description = model?.Description;
        spell.image = model?.Image;
        spell.required_skills = spells_first_lvl[index].RequiredSkillIds;
        spell.required_skills.forEach(ds => structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
          spell.required_skills = sp.spell_id == ds ? spell.required_skills.concat(sp.required_skills) : spell.required_skills;
        }))));
        spell.state = "show";
        switch (spells_first_lvl.length) {
          case 3: {
            spell.style = spell.style_three;
            break;
          }
          case 4: {
            spell.style = spell.style_four;
            break;
          }
          case 5: {
            spell.style = spell.style_five;
            break;
          }
        }
      }
    })

    let spells_second_lvl = race.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[2].id == spell.DepthLevel);
    structure.sections[i].level_depth[2].count = spells_second_lvl.length;
    structure.sections[i].level_depth[2].spells.forEach((spell, index) => {
      if(spells_second_lvl[index]){
        let model = spellModel.find(id => {
          return spells_second_lvl[index].SkillId == id.Id;
        });
        spell.spell_id = model?.Id ?? "";
        spell.name = model?.Name;
        spell.description = model?.Description;
        spell.image = model?.Image;
        spell.required_skills = spells_second_lvl[index].RequiredSkillIds;
        spell.required_skills.forEach(ds => structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
          spell.required_skills = sp.spell_id == ds ? spell.required_skills.concat(sp.required_skills) : spell.required_skills;
        }))));
        spell.state = "show";
        switch (spells_second_lvl.length) {
          case 1: {
            spell.style = spell.style_one ? spell.style_one : "";
            break;
          }
          case 2: {
            spell.style = spell.style_two ? spell.style_two : "" ;
            break;
          }
          case 3: {
            spell.style = spell.style_three;
            break;
          }
          case 4: {
            spell.style = spell.style_four;
            break;
          }
          case 5: {
            spell.style = spell.style_five;
            break;
          }
        }
      }
    })

    let spells_third_lvl = race.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[3].id == spell.DepthLevel);
    structure.sections[i].level_depth[3].count = spells_third_lvl.length;
    structure.sections[i].level_depth[3].spells.forEach((spell, index) => {
      if(spells_third_lvl[index]){
        let model = spellModel.find(id => {
          return spells_third_lvl[index].SkillId == id.Id;
        });
        spell.spell_id = model?.Id ?? "";
        spell.name = model?.Name;
        spell.description = model?.Description;
        spell.image = model?.Image;
        spell.state = "show";

        spell.required_skills = spells_third_lvl[index].RequiredSkillIds;
        spell.required_skills.forEach(ds => structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
          spell.required_skills = sp.spell_id == ds ? spell.required_skills.concat(sp.required_skills) : spell.required_skills;
        }))));

        switch (spells_third_lvl.length) {
          case 1: {
            spell.style = spell.style_one ? spell.style_one : "";
            break;
          }
          case 2: {
            spell.style = spell.style_two ? spell.style_two : "" ;
            break;
          }
          case 3: {
            spell.style = spell.style_three;
            break;
          }
          case 4: {
            spell.style = spell.style_four;
            break;
          }
          case 5: {
            spell.style = spell.style_five;
            break;
          }
        }
      }
    })
  }
  return structure;
}

export function resetWheel(structure: structureModel): structureModel {
  for (let i = 0; i < structure.sections.length; i++) {
    for(let j = 0; j < 4; j++) {
      structure.sections[i].level_depth[j].spells.forEach(spell => spell.state = "show")
    }
  }
  return structure;
}

export function cleanWheel(structure: structureModel): structureModel {
  for (let i = 0; i < structure.sections.length; i++) {
    for(let j = 0; j < 4; j++) {
      structure.sections[i].level_depth[j].spells.forEach(spell => {
        spell.spell_id = "";
        spell.name = "";
        spell.description = "";
        spell.image = "";
        spell.state = "show";
      })
    }
  }
  return structure;
}
