import ContactForm from "@/components/ContactForm";
import { sanityFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

type ContactPage = {
  email?: string;
  socialLinks?: { platform: string; url: string }[];
};

export default async function ContactsPage() {
  const contactPage = await sanityFetch<ContactPage>(contactPageQuery);

  return (
    <section className="view">
      <div className="contact-wrap">
        <h1>Get in touch</h1>
        <p className="lead">For exhibitions, commissions, or press inquiries.</p>

        {contactPage?.email || (contactPage?.socialLinks?.length ?? 0) > 0 ? (
          <div className="contact-details">
            {contactPage?.email ? (
              <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
            ) : null}
            {contactPage?.socialLinks?.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.platform}
              </a>
            ))}
          </div>
        ) : null}

        <ContactForm />
      </div>
    </section>
  );
}
