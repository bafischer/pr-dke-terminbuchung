import {SickInformation} from "./SickInformation";


export type Person = {
  svnr: string;
  firstName: string;
  lastName: string;
  birthday: Date;

  email: string;

  phoneNr: string;

  streetAndDoorNr: string;

  postalCode: number;

  city: string;
  county: string;

}
