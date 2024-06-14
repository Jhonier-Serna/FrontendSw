export class EventModel {
  id?: number;
  eventName?: string;
  category?: string;
  date?: Date;
  places?: number;
  startTime?: Date;
  endTime?: Date;
  place?: string;
  entityInCharge?: string;
  description?: string;
  fileLinks!: string[];
}
