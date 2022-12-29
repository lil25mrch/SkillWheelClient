export interface heroInfoModel {
  id: string,
  defaultName: string,
  heroIds: string[]
}

export interface heroModel {
  id: string,
  name: string,
  defaultSkillIds: string[],
  description: string,
  image: string,
}

export const heroAr: heroInfoModel[] = [
  {
    "id": "humans",
    "defaultName": "Рыцарь",
    "heroIds": ["Rutger", "Vittorio", "Maeve", "Laszlo", "Ellaine", "Dougal", "Klaus", "Irina"]
  },
  {
    "id": "elves",
    "defaultName": "Рейнджер",
    "heroIds": ["Dirael", "Vinrael", "Gilraen", "Ylthin", "Anwen", "Talanar", "Ossir"]
  },
  {
    "id": "necr",
    "defaultName": "Некромант",
    "heroIds": ["Zoltan","Raven","Kaspar","Naadir","Deirdre","Vladimir","Orson","Lucretia"]
  },
  {
    "id": "liga",
    "defaultName": "Чернокнижник",
    "heroIds": ["Yrbeth","Lethos","Eruina","Sorgal","Sinitar","Kythra","Vayshan","Yrwanna"]
  },
  {
    "id": "demons",
    "defaultName": "Демонолог",
    "heroIds": ["Grawl","Deleb","Alastor","Grok","Nebiros","Marbas","Nymus","Jezebeth"]
  },
  {
    "id": "gnomy",
    "defaultName": "Рунный жрец",
    "heroIds": ["Ebba","Brand","Erling","Ingvar","Helmar","Karli","Inga","Svea",]
  },
  {
    "id": "magi",
    "defaultName": "Маг",
    "heroIds": ["Nur","Faiz","Havez","Razzak","Nathir","Narxes","Jhora","Galib"]
  },
  {
    "id": "varvars",
    "defaultName": "Варвар",
    "heroIds": ["Kragh","Urghat","Garuna","Gorshak","Haggash","Telsek","Kilghan"]
  }
]
