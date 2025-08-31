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

export const VaccinationRoute: flockSelective[]= [
  { label: "Drinking water", value: "Drinking water" },
  { label: "Injection", value: "Injection" },
  { label: "Eye drop", value: "Eye drop" },
  { label: "Spray", value: "Spray" },
  { label: "Feed", value : "Feed"}    
]

export const VaccinationType: flockSelective[] = [
  { label: "Live attenuated", value: "Live attenuated" },
  { label: "Inactivated (killed)", value: "Inactivated (killed)" },
  { label: "Recombinant", value: "Recombinant" },
  { label: "Vector-based", value: "Vector-based" },
  { label: "DNA vaccine", value: "DNA vaccine" }
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

export interface VaccinationFormData {
  flockID: string;
  flockName: string;
  vaccineName: string;
  vaccineType: string;
  manufacturer: string;
  dosage: string;
  route: string;
}
export interface VaccinationRecord {
  _id? : string,
  flockID: string;
  flockName: string;
  vaccineName: string;
  vaccineType: string;
  manufacturer: string;
  dosage: string;
  route: "Drinking water" | "Injection" | "Eye drop" | "Spray" | "Feed" | string;
}
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
  _id: string;
  label: string;
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

export interface Schedule {
  _id: string;
  flockID: string;
  flockName: string;
  feed: string;
  amount: number | string;   
  time: string;              
  repeat: string;  
  notify: boolean;
}

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