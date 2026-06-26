const organization = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Health Point Dental Clinic',
  url: 'https://healthpointdental.ae',
  logo: 'https://healthpointdental.ae/health%20point%20png%20logo.png',
  description: 'Trusted dental care in Al Barsha 1, Dubai. DHA Licensed. Walk-ins daily 8AM–8PM.',
  image: 'https://healthpointdental.ae/health%20point%20png%20logo.png',
  email: 'healthpoint316@gmail.com',
  telephone: '+971585886915',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office 603, Bedaia Building, Al Barsha First',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  priceRange: 'AED 79 – AED 2,500',
  areaServed: 'Dubai',
  sameAs: [
    'https://wa.me/971585886915',
    'tel:+971585886915',
  ],
};

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does scaling cost at Health Point Dental?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scaling starts at just AED 79 at Health Point Dental Clinic in Al Barsha, Dubai.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the clinic hours?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Health Point Dental is open daily from 8:00 AM to 8:00 PM, including weekends. Walk-ins are welcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Health Point Dental located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are located at Office 603, Bedaia Building, Al Barsha 1, Dubai, UAE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Health Point Dental DHA licensed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Health Point Dental Clinic is fully DHA licensed, ensuring high-quality and safe dental care.',
      },
    },
  ],
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
