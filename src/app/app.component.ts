import { Component, OnInit } from "@angular/core";
import { structure } from "src/app/structures/structure";
import humans from "src/app/data/humans.json";
import spellModel from "src/app/data/spell.json";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public structure = structure;

  public spellCountFC = 4;
  public spellCountSC = 3;
  public spellCountFrC = 5;

  ngOnInit(): void {
    this.createWheel();
  }

  public createWheel() {
    for (let i = 0; i < structure.sections.length; i++) {
      let humanSpells = humans.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[0].id == spell.DepthLevel);
      structure.sections[i].level_depth[0].spells.forEach((spell, index) => {
        let model = spellModel.find(id => humanSpells[index].SkillId == id.Id);
        spell.spell_id = model?.Id;
        spell.name = model?.Name;
        spell.description = model?.Description;
        spell.image = model?.Image;
        switch (humanSpells.length) {
          case 4: {
            spell.style = spell.style_four;
            break;
          }
        }
      })

      let humanSpells1 = humans.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[1].id == spell.DepthLevel);
      structure.sections[i].level_depth[1].count = humanSpells1.length;
      structure.sections[i].level_depth[1].spells.forEach((spell, index) => {
        if(humanSpells1[index]){
          let model = spellModel.find(id => {
            return humanSpells1[index].SkillId == id.Id;
          });
          spell.spell_id = model?.Id;
          spell.name = model?.Name;
          spell.description = model?.Description;
          spell.image = model?.Image;
          switch (humanSpells1.length) {
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

      let humanSpells2 = humans.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[2].id == spell.DepthLevel);
      structure.sections[i].level_depth[2].count = humanSpells2.length;
      structure.sections[i].level_depth[2].spells.forEach((spell, index) => {
        if(humanSpells2[index]){
          let model = spellModel.find(id => {
            return humanSpells2[index].SkillId == id.Id;
          });
          spell.spell_id = model?.Id;
          spell.name = model?.Name;
          spell.description = model?.Description;
          spell.image = model?.Image;
          switch (humanSpells2.length) {
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

      let humanSpells3 = humans.filter(spell => structure.sections[i].section_id == spell.SectionId && structure.sections[i].level_depth[3].id == spell.DepthLevel);
      structure.sections[i].level_depth[3].count = humanSpells3.length;
      structure.sections[i].level_depth[3].spells.forEach((spell, index) => {
        if(humanSpells3[index]){
          let model = spellModel.find(id => {
            return humanSpells3[index].SkillId == id.Id;
          });
          spell.spell_id = model?.Id;
          spell.name = model?.Name;
          spell.description = model?.Description;
          spell.image = model?.Image;
          switch (humanSpells3.length) {
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
  }

  public internalSpells = [
    {
      id: 217,
      style: "top: 20%; left: 45.5%;"
    },
    {
      id: 218,
      style: "top: 60.3%; left: 24.63%;"
    },
    {
      id: 219,
      style: "top: 60.3%; left: 65.63%;"
    },
    {
      id: 220,
      style: "top: 46%; left: 45.5%;"
    }
  ];
}

