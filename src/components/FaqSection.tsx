import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What freelance web development services do you offer?',
    answer: 'I build responsive business websites, portfolio sites, web applications, dashboards, REST APIs and full-stack MERN products using React, Node.js, Express and MongoDB.',
  },
  {
    question: 'Are you available as a freelance web developer in Jaipur?',
    answer: 'Yes. I am based in Jaipur, Rajasthan and work with local as well as remote clients across India on freelance web development projects.',
  },
  {
    question: 'Can you redesign or improve an existing website?',
    answer: 'Yes. I can modernize the interface, improve mobile responsiveness, optimize performance and extend an existing website with new frontend or backend features.',
  },
  {
    question: 'Which technologies do you use?',
    answer: 'My primary stack includes React, Next.js, TypeScript, Node.js, Express, MongoDB, MySQL and Tailwind CSS. I select the final tools according to the project requirements.',
  },
  {
    question: 'How can I discuss a project with you?',
    answer: 'Use the Hire Me button to contact me on WhatsApp or send an email with your goals, required features and preferred timeline. I will review the details and suggest the next steps.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 faq-section">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="faq-layout">
          <div className="faq-intro">
            <span className="section-label">Common questions</span>
            <h2 className="font-display">Before we build.</h2>
            <p>Quick answers about my freelance web development services, process and technology stack.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openIndex === index ? 'is-open' : ''}`} key={faq.question}>
                <button
                  type="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex((current) => current === index ? null : index)}
                >
                  <span className="faq-number">0{index + 1}</span>
                  <span>{faq.question}</span>
                  <Plus className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`}>
                  <div><p>{faq.answer}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
