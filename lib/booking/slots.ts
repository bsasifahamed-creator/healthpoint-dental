import { addMinutes, format, parse, isBefore, addDays, startOfDay } from 'date-fns';

export const CLINIC_OPEN = '13:00';
export const CLINIC_CLOSE = '21:00';
export const SLOT_DURATION = 30;
export const SLOT_BUFFER = 5;
export const MIN_LEAD_TIME = 60;

export function generateDailySlots(date: Date): string[] {
  const slots: string[] = [];
  const open = parse(CLINIC_OPEN, 'HH:mm', date);
  const close = parse(CLINIC_CLOSE, 'HH:mm', date);
  let cursor = open;
  while (
    isBefore(addMinutes(cursor, SLOT_DURATION), close) ||
    +addMinutes(cursor, SLOT_DURATION) === +close
  ) {
    slots.push(format(cursor, 'HH:mm'));
    cursor = addMinutes(cursor, SLOT_DURATION + SLOT_BUFFER);
  }
  return slots;
}

/** `dateStr` = yyyy-MM-dd (Dubai clinic day); slot time interpreted in +04:00. */
export function isSlotBookable(dateStr: string, slotTime: string): boolean {
  const slot = new Date(`${dateStr}T${slotTime}:00+04:00`);
  const minBookable = addMinutes(new Date(), MIN_LEAD_TIME);
  return slot.getTime() >= minBookable.getTime();
}

export function getBookableDateRange(): { min: Date; max: Date } {
  const today = startOfDay(new Date());
  return { min: today, max: addDays(today, 30) };
}

export function slotToTimestamp(date: string, time: string): string {
  return `${date}T${time}:00+04:00`;
}
