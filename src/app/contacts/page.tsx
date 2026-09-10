import ContactForm from "@/components/ContactForm";

export default function ContactsPage() {
  return (
    <section className="view">
      <div className="contact-wrap">
        <h1>Get in touch</h1>
        <p className="lead">For exhibitions, commissions, or press inquiries.</p>
        <ContactForm />
      </div>
    </section>
  );
}
