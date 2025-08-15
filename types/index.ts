export type flockSelective = {
  label: string;
  value: string;
};

export type FlockFormDataValidation = {
  flockName: boolean;
  numberOfBirds: boolean;
  age: boolean;
  locationCoop: boolean;
};

export type InputSearchResult = {
  id: string;
  value: string;
};
export type NotifyDay = {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
};
export type InputSearchResults = InputSearchResult[];

export type ScheduleFormData = {
  user_id: string;
  flock_id: string;
  feed: string;
  amount: string;
  time?: Date | null;
  repeat: NotifyDay;
  notify: boolean;
};
export type FlockFormData = {
  flockName: string;
  numberOfBirds: string;
  age: string;
  locationCoop: string;
};

export type FlockResponse = FlockFormData & {
  _id: string,
  flockOwner: string,
  breedType: string,
  flockPurpose: string
}
export const flockBreeds: flockSelective[] = [
    { label: "Broiler Chicken", value: "broiler" },
    { label: "Layer Chicken", value: "layer" },
    { label: "Free-Range Chicken", value: "free_range" },
    { label: "Roadrunner (Huku)", value: "roadrunner" },
    { label: "Quail", value: "quail" },
    { label: "Guinea Fowl", value: "guinea_fowl" },
    { label: "Turkey", value: "turkey" },
    { label: "Duck", value: "duck" },
  ];
export const flockPurposes: flockSelective[] = [
    { label: "Egg production (Layers)", value: "egg_production" },
    { label: "Meat production (Broilers)", value: "meat_production" },
    { label: "Breeding", value: "breeding" },
    { label: "Mixed Purposes", value: "mixed_purposes" },
];

export const displayValues = {
  broiler: "Broiler Chicken",
  layer: "Layer Chicken",
  free_range: "Free-Range Chicken",
  roadrunner: "Roadrunner (Huku)",
  quail: "Quail",
  guinea_fowl: "Guinea Fowl",
  turkey: "Turkey",
  egg_production: "Egg production (Layers)",
  meat_production : "Meat production (Broilers)",
  breeding: "Breeding", 
  mixed_purposes:"Mixed Purposes",
}