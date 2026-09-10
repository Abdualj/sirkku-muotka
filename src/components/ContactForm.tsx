"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");

  function validate(data: { name: string; email: string; message: string }) {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Please enter your name.";
    if (!data.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!EMAIL_PATTERN.test(data.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!data.message.trim()) errors.message = "Please enter a message.";
    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return <p className="form-status success">Message sent — thank you for reaching out.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" />
        {fieldErrors.name ? <p className="field-error">{fieldErrors.name}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@email.com" />
        {fieldErrors.email ? <p className="field-error">{fieldErrors.email}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me a little about what you have in mind…"
        />
        {fieldErrors.message ? <p className="field-error">{fieldErrors.message}</p> : null}
      </div>

      <button type="submit" className="submit-btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" ? <p className="form-status error">{statusMessage}</p> : null}
    </form>
  );
}
