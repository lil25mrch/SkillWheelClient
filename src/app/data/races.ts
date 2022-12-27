import humans from "src/app/data/humans.json";
import elves from "src/app/data/elves.json";
import necr from "src/app/data/necr.json";
import liga from "src/app/data/liga.json";
import demons from "src/app/data/demons.json";
import gnomy from "src/app/data/gnomy.json";
import magi from "src/app/data/magi.json";
import varvars from "src/app/data/varvars.json";

export interface raceInfoModel {
  id: string,
  name: string,
  content: raceModel[]
}

export interface raceModel {
  SkillId: string,
  SectionId: number,
  DepthLevel: number,
  RequiredSkillIds: string[],

}

export const racesAr: raceInfoModel[] = [
  {
    id: "humans",
    name: "Humans",
    content: humans
  },
  {
    id: "elves",
    name: "Elves",
    content: elves
  },
  {
    id: "necr",
    name: "Necr",
    content: necr
  },
  {
    id: "liga",
    name: "Liga",
    content: liga
  },
  {
    id: "demons",
    name: "Demons",
    content: demons
  },
  {
    id: "gnomy",
    name: "Gnomy",
    content: gnomy
  },

  {
    id: "magi",
    name: "Magi",
    content: magi
  },

  {
    id: "varvars",
    name: "Varvars",
    content: varvars
  }
]
