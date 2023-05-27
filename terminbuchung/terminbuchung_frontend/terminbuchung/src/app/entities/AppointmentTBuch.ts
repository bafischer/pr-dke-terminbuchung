
import {Person} from "./Person";

export type AppointmentTBuch = {

  date: string;
  person: Person;

  nameLocation: string;

  line: number;

  reason: string;

  article:  string;

  // wenn über Terminverwaltung Termine gelöscht werden, muss ich wissen welcher Termin betroffen ist
  idTerminverw: number;

  deleted: boolean;

  // plus im backend bei Anzahl der gebuchten Termine für Verabreichung von Medikamenten auf deleted = false einschränken
  // done, aber noch zu prüfen ob korrekt funktioniert




}
