import type { ServiceKey } from './services';

export const CLINIC_WHATSAPP = '971585886915';

/**
 * Per-treatment WhatsApp message draft.
 * Each function receives the patient name + preferred time and returns the
 * pre-formatted message body. WhatsApp will URL-encode this for us via
 * `encodeURIComponent` at the call site.
 *
 * Keep the tone warm, brief, and useful for the receptionist (mention the
 * specific treatment, any relevant context, and the preferred time).
 */
export const WHATSAPP_TEMPLATES: Record<
  ServiceKey,
  (params: { name: string; preferredTime: string; serviceName: string; price: number; unit: string }) => string
> = {
  scaling: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Scaling & Polishing visit (AED 79).`,
      preferredTime ? `Preferred time: ${preferredTime}.` : `Could you share the next available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  whitening: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'm interested in Teeth Whitening (AED 299). I'd like to know:`,
      `• Whether in-clinic or take-home trays would suit me better`,
      `• Any sensitivity precautions I should know about`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `Could you share the next available consultation slot?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  hollywood: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to discuss a Hollywood Smile consultation (AED 999).`,
      `I'm interested in understanding the treatment plan, timeline, and whether veneers or crowns are best for my case.`,
      ``,
      preferredTime ? `Preferred time for a consultation: ${preferredTime}.` : `When could I come in for an assessment?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  'root-canal': ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Root Canal consultation (from AED 399).`,
      `I'm currently experiencing some tooth pain/sensitivity and would like to be seen soon.`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `Can you fit me in at the earliest available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  crown: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Crown appointment (AED 299).`,
      `Could you let me know what's included in the quote and how many visits to expect?`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When is your next available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  braces: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Braces / Aligners consultation (from AED 399).`,
      `Please let me know:`,
      `• Whether metal, ceramic, or clear aligners would suit my case`,
      `• An indicative treatment timeline and total cost`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When could I come in for a consultation?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  filling: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Filling appointment (from AED 139).`,
      preferredTime ? `Preferred time: ${preferredTime}.` : `Could you share the next available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  extraction: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a tooth Extraction (from AED 99).`,
      `Please let me know if I need to come in for an X-ray assessment first.`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `What's the earliest you can see me?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  denture: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Denture consultation (from AED 249).`,
      `Could you tell me:`,
      `• Whether partial or complete dentures would suit me`,
      `• How many visits the full treatment usually takes`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When could I come in for an assessment?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  implants: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Dental Implants consultation (from AED 499).`,
      `I'm interested in understanding the full treatment plan, timeline, and costs.`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When could I come in for an assessment?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  veneers: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Veneers consultation (from AED 799).`,
      `I'm interested in porcelain veneers for a smile makeover.`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When could I come in for a consultation?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  invisalign: ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'm interested in Invisalign clear aligners (from AED 599).`,
      `Could you let me know:`,
      `• Whether Invisalign is suitable for my case`,
      `• An indicative treatment timeline and total cost`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When could I come in for a consultation?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),

  'braces-adjustment': ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Braces Adjustment appointment (from AED 99).`,
      preferredTime ? `Preferred time: ${preferredTime}.` : `Could you share the next available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thank you!`,
    ]
      .filter(Boolean)
      .join('\n'),

  'crowns-bridges': ({ name, preferredTime }) =>
    [
      `Hi Health Point Dental,`,
      ``,
      `I'd like to book a Crowns & Bridges consultation (from AED 299).`,
      `Could you let me know what's included in the quote and how many visits to expect?`,
      ``,
      preferredTime ? `Preferred time: ${preferredTime}.` : `When is your next available slot?`,
      name ? `My name is ${name}.` : ``,
      `Thanks!`,
    ]
      .filter(Boolean)
      .join('\n'),
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
