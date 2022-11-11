import { Component, OnInit } from "@angular/core";
import { structure } from "src/app/structures/structure";
import { sectionModel, spellInterface, structureModel } from "../../models/structure.model";
import { cleanWheel, resetWheel, structureBuild } from "../../helpers/structure.builder";
import { races } from "../../data/races";


@Component({
  selector: 'wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit{
  public structure = structure;
  public races = races;

  public countSections: number[] = [];

  ngOnInit(): void {
    this.structure = structureBuild(this.structure, races.humans);
  }

  public isSpellShowed(spell: spellInterface) {
    return spell.state == 'show';
  }

  public isSpellHide(spell: spellInterface) {
    return spell.state == 'hide';
  }

  public isSpellSelected(spell: spellInterface) {
    return spell.state == 'selected';
  }

  public isSpellNotSelected(spell: spellInterface) {
    return spell.state == 'not_selected';
  }

  public clickOutsideSpell(spell: spellInterface, spells: spellInterface[]) {
      if (spell.id == 1) {
        spells.forEach(spell => {
          if (spell.id == 1) {
            spell.state = "selected"
          }
          if (spell.id == 2) {
            spell.state = "not_selected"
          }
          if (spell.id == 3) {
            spell.state = "not_selected"
          }
        })
      }

      if (spell.id == 2) {
        spells.forEach(spell => {
          if (spell.id == 1) {
            spell.state = "selected"
          }
          if (spell.id == 2) {
            spell.state = "selected"
          }
          if (spell.id == 3) {
            spell.state = "not_selected"
          }
        })
      }

      if (spell.id == 3) {
        spells.forEach(spell => {
          if (spell.id == 1) {
            spell.state = "selected"
          }
          if (spell.id == 2) {
            spell.state = "selected"
          }
          if (spell.id == 3) {
            spell.state = "selected"
          }
        })
    }
  }

  public clickInsideSpell(spell: spellInterface, spells: sectionModel) {
    let outsideSpells = spells.level_depth[0].spells.filter(spell => spell.spell_id != "");
    let allSpells: spellInterface[] = [];
    this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
      if(sp.spell_id != "") {
        allSpells.push(sp)
      }
    })));

    if (allSpells.every(s => s.state == "show")) {
      this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.forEach(s => s.state = "not_selected")));
    }

    let sectionSpells: spellInterface[] = [];
    for (let i = 1; i < 4; i++ ) {
      sectionSpells = sectionSpells.concat(spells.level_depth[i].spells.filter(spell => spell.spell_id != ""));
    }
    let selectedSpells: spellInterface[] = sectionSpells.filter(s => s.state == "selected");

    if(sectionSpells.filter(s => s.state == "show").length == sectionSpells.length) {
      spell.state = "selected";
      sectionSpells.filter(s => s.spell_id != spell.spell_id).forEach(sp => sp.state = "not_selected");
      selectedSpells.push(spell);
    }

    if(spell.state == "not_selected" && selectedSpells.length < 3) {
        spell.state = "selected";

        if(!this.countSections.includes(spells.section_id)) {
          this.countSections.push(spells.section_id);
        }

        selectedSpells.push(spell);

        if(selectedSpells.length == 3) {
          sectionSpells.filter(s => s.state == "not_selected").forEach(sp => sp.state = "hide");
        }
    }

    if (this.countSections.length == 5) {
      this.structure.sections.filter(s => !this.countSections
        .some( c => c == s.section_id)).filter( s => s.section_id != 0)
        .forEach(l => l.level_depth.forEach(level => level.spells.forEach(sp => sp.state = "hide")))
    }

    if(sectionSpells.filter(s => s.state == "selected").length == 1 && spells.section_id) {
      this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 1)[0].state = "selected";
    }

    if(sectionSpells.filter(s => s.state == "selected").length == 2 && spells.section_id) {
      this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 2)[0].state = "selected";
    }

    if(sectionSpells.filter(s => s.state == "selected").length == 3 && spells.section_id) {
      this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 3)[0].state = "selected";
    }

    this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 3)[0].state
  }

  public createWheel(race: typeof races.humans): structureModel {
    this.clean();
    return structureBuild(this.structure, race);
  }

  public reset() {
    this.structure = resetWheel(this.structure);
  };

  public clean() {
    this.structure = cleanWheel(this.structure);
  };

  public trackById(index: number, section: sectionModel) {
      return section.section_id
  }

  public filterSection() {
      return this.structure.sections.filter(s => s.section_id != 0)
  }

  public spellHasName(spell: spellInterface): boolean {
      return spell.name != "";
  }
}
