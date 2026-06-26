'use client';

import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, DollarSign, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Booking {
  id: string;
  service_name: string;
  service_key: string;
  service_price: number;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  patient_notes: string;
  slot_date: string;
  slot_time: string;
  doctor_name: string;
  status: string;
}

interface EditBookingModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdate: (updates: Partial<Booking>) => Promise<void>;
}

const SERVICES = [
  { key: 'scaling-polishing', name: 'Scaling & Polishing', price: 79 },
  { key: 'teeth-whitening', name: 'Teeth Whitening', price: 299 },
  { key: 'hollywood-smile', name: 'Hollywood Smile', price: 999 },
  { key: 'root-canal', name: 'Root Canal Treatment', price: 399 },
  { key: 'crown', name: 'Dental Crown', price: 299 },
  { key: 'crowns-bridges', name: 'Crowns & Bridges', price: 299 },
  { key: 'veneers', name: 'Veneers', price: 799 },
  { key: 'dental-implants', name: 'Dental Implants', price: 499 },
  { key: 'braces', name: 'Braces Installation', price: 399 },
  { key: 'braces-adjustment', name: 'Braces Adjustment', price: 99 },
  { key: 'invisalign', name: 'Invisalign', price: 599 },
  { key: 'filling', name: 'Composite Filling', price: 139 },
  { key: 'extraction', name: 'Tooth Extraction', price: 99 },
  { key: 'denture', name: 'Denture', price: 249 },
];

const STATUS_OPTIONS = [
  { value: 'pending', label: '⏳ Pending', color: 'text-amber-600' },
  { value: 'confirmed', label: '✅ Confirmed', color: 'text-green-600' },
  { value: 'completed', label: '✓ Completed', color: 'text-blue-600' },
  { value: 'cancelled', label: '✕ Cancelled', color: 'text-red-600' },
];

export function EditBookingModal({ booking, onClose, onUpdate }: EditBookingModalProps) {
  const [formData, setFormData] = useState({
    service_name: booking.service_name,
    service_price: booking.service_price,
    slot_date: booking.slot_date,
    slot_time: booking.slot_time,
    patient_name: booking.patient_name,
    patient_phone: booking.patient_phone,
    patient_email: booking.patient_email,
    patient_notes: booking.patient_notes || '',
    status: booking.status,
    doctor_name: booking.doctor_name,
  });
  const [saving, setSaving] = useState(false);

  const handleServiceChange = (serviceKey: string) => {
    const service = SERVICES.find(s => s.key === serviceKey);
    if (service) {
      setFormData(prev => ({
        ...prev,
        service_name: service.name,
        service_price: service.price,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdate(formData);
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update booking');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card-strong w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-b from-white/90 to-transparent backdrop-blur-sm border-b border-stroke px-6 py-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">Edit Booking</h2>
            <button
              onClick={onClose}
              className="size-9 rounded-full hover:bg-white/50 transition-colors flex items-center justify-center"
            >
              <X className="size-5 text-ink-mid" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Service Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Activity className="size-4 text-teal" />
                Service
              </label>
              <select
                value={formData.service_name}
                onChange={e => handleServiceChange(e.target.value)}
                className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
              >
                {SERVICES.map(s => (
                  <option key={s.key} value={s.name}>
                    {s.name} (AED {s.price})
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="size-4 text-green" />
                <span className="font-semibold text-green">AED {formData.service_price}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Calendar className="size-4 text-teal" />
                  Date
                </label>
                <input
                  type="date"
                  value={formData.slot_date}
                  onChange={e => setFormData(prev => ({ ...prev, slot_date: e.target.value }))}
                  className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Clock className="size-4 text-teal" />
                  Time
                </label>
                <input
                  type="time"
                  value={formData.slot_time}
                  onChange={e => setFormData(prev => ({ ...prev, slot_time: e.target.value }))}
                  className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
                />
              </div>
            </div>

            {/* Patient Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <User className="size-4 text-teal" />
                Patient Information
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-ink-mid mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.patient_name}
                    onChange={e => setFormData(prev => ({ ...prev, patient_name: e.target.value }))}
                    className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
                    placeholder="Patient name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-ink-mid mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.patient_phone}
                    onChange={e => setFormData(prev => ({ ...prev, patient_phone: e.target.value }))}
                    className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-ink-mid mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.patient_email}
                    onChange={e => setFormData(prev => ({ ...prev, patient_email: e.target.value }))}
                    className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50"
                    placeholder="patient@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Notes & Addons */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Activity className="size-4 text-teal" />
                Notes / Addons
              </label>
              <textarea
                value={formData.patient_notes}
                onChange={e => setFormData(prev => ({ ...prev, patient_notes: e.target.value }))}
                rows={3}
                className="w-full rounded-2xl border border-stroke px-4 py-3 text-sm bg-white/50 resize-none"
                placeholder="E.g., + Scaling addon (AED 79), Patient prefers Dr. Iqra..."
              />
              <p className="text-xs text-ink-mid">
                💡 Tip: Add extra services here like "+ Scaling & Polishing (AED 79)" or "+ Fluoride treatment (AED 50)"
              </p>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Activity className="size-4 text-teal" />
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: opt.value }))}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      formData.status === opt.value
                        ? 'bg-teal text-white shadow-lg scale-[1.02]'
                        : 'bg-white/50 text-ink hover:bg-white/80'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4 border-t border-stroke">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-full font-semibold text-ink bg-white/50 hover:bg-white/80 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-full font-semibold text-white bg-teal hover:bg-teal/90 transition-colors disabled:opacity-50 liquid-cta"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
