export type BookingRow = {
  id: string;
  service_name: string;
  service_price: number;
  doctor_name: string;
  slot_date: string;
  slot_time: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  patient_notes: string | null;
};
