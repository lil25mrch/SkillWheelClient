import { Component, OnInit } from "@angular/core";
import { structureDefault } from "src/app/structures/structureDefault";
import { sectionModel, spellInterface, structureModel } from "../../models/structure.model";
import { resetWheel, structureBuild } from "../../helpers/structure.builder";
import { races } from "../../data/races";
import { raceHelper } from "../../helpers/race.helper";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit{
  public structure = structureDefault;
  public races = races;
  public adminMode: boolean = false;

  public countSections: number[] = [];
  public countSpells: number = 0;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.structure = structureBuild(this.structure, races.humans);
    this.route.queryParams.subscribe(params => {
        this.adminMode = params.adminMode;
      }
    )
  }

  public isSpellShowed(spell: spellInterface) {
    return spell.state == 'show';
  }

  public isSpellHide(spell: spellInterface) {
    const maxCountSpells = 3;

    this.structure.sections.forEach(s => {
      let selectedSpells: spellInterface[] = [];
      s.level_depth.forEach(l => {
        if (l.id != 0) {
          selectedSpells = selectedSpells.concat(l.spells.filter(sp => sp.state == "selected"))
        }
      })

      if ((maxCountSpells - selectedSpells.length) == 1) {
        s.level_depth.forEach(l => {
          l.spells.forEach(sp => {
            if (sp.required_skills.length > 0 && sp.state != "selected" || spell.required_skills.includes(sp.spell_id)) {
              sp.state = "hide"
            }
          });
        })
      }
    });

    return spell.state == 'hide';
  }

  public isSpellSelected(spell: spellInterface) {
    return spell.state == 'selected';
  }

  public isSpellNotSelected(spell: spellInterface) {
    return spell.state == 'not_selected';
  }

  public isSpellPreSelected(spell: spellInterface) {
    if(spell.spell_id && spell.required_skills.length != 0) {
      // @ts-ignore
      spell.required_skills.forEach(s => document.getElementById(s).style.filter = "invert(100%) drop-shadow(2px 2px 2px violet)"
    )}
  }

  public clearSpellPreSelected(spell: spellInterface) {
    if(spell.spell_id && spell.required_skills.length != 0) {
      // @ts-ignore
      spell.required_skills.forEach(s => document.getElementById(s).style.filter = ""
      )}
  }

  public clickOutsideSpell(spell: spellInterface, spells: spellInterface[]) {
    let allSpells: spellInterface[] = [];
    this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
      if(sp.spell_id != "") {
        allSpells.push(sp)
      }
    })));

    if (allSpells.every(s => s.state == "show")) {
      this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.forEach(s => s.state = "not_selected")));
    }

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
    this.countSpellsSelected();
  }

  public clickInsideSpell(spell: spellInterface, spells: sectionModel) {
    if (spell.state == "selected") {

    }

    if (spell.state == "show" || spell.state == "not_selected") {
      let allSpells: spellInterface[] = [];
      this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.filter(sp => {
        if (sp.spell_id != "") {
          allSpells.push(sp)
        }
      })));

      if (allSpells.every(s => s.state == "show")) {
        this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.forEach(s => s.state = "not_selected")));
      }

      let sectionSpells: spellInterface[] = [];
      for (let i = 1; i < 4; i++) {
        sectionSpells = sectionSpells.concat(spells.level_depth[i].spells.filter(spell => spell.spell_id != ""));
      }
      let selectedSpells: spellInterface[] = sectionSpells.filter(s => s.state == "selected");

      if (sectionSpells.filter(s => s.state == "show").length == sectionSpells.length) {
        spell.state = "selected";
        sectionSpells.filter(s => s.spell_id != spell.spell_id).forEach(sp => sp.state = "not_selected");
        selectedSpells.push(spell);
      }

      this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.forEach(sp => {
        if (spell.required_skills.length > 0) {
          spell.required_skills.filter(ds => {
            if (sp.spell_id == ds) {
              sp.state = "selected";
              if (s.section_id == spells.section_id) {
                selectedSpells.push(spell);
              }
            }
          });
        }
      })))

      if ((spell.state == "not_selected") && selectedSpells.length < 3) {
        spell.state = "selected";

        if (!this.countSections.includes(spells.section_id)) {
          this.countSections.push(spells.section_id);
        }

        selectedSpells.push(spell);

        if (selectedSpells.length == 3) {
          sectionSpells.filter(s => s.state == "not_selected").forEach(sp => sp.state = "hide");
        }
      }

      if (this.countSections.length == 5) {
        this.structure.sections.filter(s => !this.countSections
          .some(c => c == s.section_id)).filter(s => s.section_id != 0)
          .forEach(l => l.level_depth.forEach(level => level.spells.forEach(sp => sp.state = "hide")))
      }

      if (sectionSpells.filter(s => s.state == "selected").length == 1 && spells.section_id) {
        this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 1)[0].state = "selected";
      }

      if (sectionSpells.filter(s => s.state == "selected").length == 2 && spells.section_id) {
        this.structure.sections[spells.section_id].level_depth[0].spells.forEach(s => {
          if (s.id == 1 || s.id == 2) {
            s.state = "selected";
          }
        })
      }

      if (sectionSpells.filter(s => s.state == "selected").length == 3 && spells.section_id) {
        this.structure.sections[spells.section_id].level_depth[0].spells.forEach(s => {
          s.state = "selected";
        });
      }

      this.structure.sections[spells.section_id].level_depth[0].spells.filter(s => s.id == 3)[0].state
      this.countSpellsSelected();
    }
  }

  public upload(files: any) {
    let file = files.target.files[0];
    let name = file.name.split(".", 1)[0];
    let fileName = raceHelper.find(r => r.id = name)?.file;
    if (fileName) {
      this.createWheel(fileName);
    } else {
      console.log("Неправильный файл");
    }
  };

  public createWheel(race: typeof races.humans): structureModel {
    this.resetWheel();
    this.countSections = [];
    this.countSpells = 0;
    return structureBuild(structureDefault, race);
  }

  public resetWheel(): structureModel {
    for (let i = 0; i < this.structure.sections.length; i++) {
      for(let j = 0; j < 4; j++) {
        this.structure.sections[i].level_depth[j].spells.forEach(spell => {
            spell.state = "show";
            spell.spell_id = "";
            spell.name = "";
            spell.description = "";
            spell.image = "";
            spell.required_skills = [];
          }
        )
      }
    }
    return structureDefault;
  }

  public reset() {
    this.countSections = [];
    this.countSpells = 0;
    this.structure = resetWheel(this.structure);
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

  public countSpellsSelected() {
    this.countSpells = 0;
    this.structure.sections.forEach(s => s.level_depth.forEach(l => l.spells.forEach(sp => {
      if (sp.state == "selected") {
        this.countSpells++;
      }
    })))
  }
}
