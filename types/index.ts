export type flockSelective = {
  label: string;
  value: string;
};
export type FlockFormData = {
  flockName: string;
  numberOfBirds: string;
  age: string;
  locationCoop: string;
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
