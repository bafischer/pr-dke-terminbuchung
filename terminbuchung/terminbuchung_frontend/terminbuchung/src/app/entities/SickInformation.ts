export type SickInformation = {

  id: number;
  symptoms: boolean;
  sick: boolean;
  symptomStartingDate?: Date;
  covidTestDate?: Date;
  medicationDate?: Date;
  quarantine: boolean;
  quarantineStartDate?: Date;
  quarantineEndDate?: Date;
}
