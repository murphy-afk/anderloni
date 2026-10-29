import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { postJson } from '../lib/api.js';
import { contact } from '../data/site.js';

// Contact page: plain page with details and a validated form.
// The form posts to the inquiries endpoint of the Express API.
export default function Contatti() {
  usePageTitle('Contatti, Guido Anderloni');

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = contact.required;
    if (!values.email.trim()) {
      next.email = contact.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = contact.invalidEmail;
    }
    if (!values.message.trim()) next.message = contact.required;
    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('sending');
    try {
      const { ok, data } = await postJson('/api/inquiries', values);
      const payload = await data;
      if (!ok) {
        // Server side validation, when the field is reported.
        if (payload?.field) {
          setErrors((current) => ({ ...current, [payload.field]: payload.error }));
        }
        setStatus('failed');
        return;
      }
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('failed');
    }
  }

  return (
    <div className="page container">
      <PageHeader eyebrow="Contatti" title={contact.title} intro={contact.intro} />

      <div className="contact">
        <div className="contact__details">
          <dl className="facts">
            <div className="facts__row">
              <dt className="facts__label">Email</dt>
              <dd className="facts__value">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div className="facts__row">
              <dt className="facts__label">Indirizzo</dt>
              <dd className="facts__value">
                <address>{contact.address}</address>
              </dd>
            </div>
          </dl>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field">
            <label className="form__label" htmlFor="nome">
              {contact.fields.name}
            </label>
            <input
              className="form__input"
              id="nome"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'nome-errore' : undefined} />
            {errors.name ? (
              <p className="form__error" id="nome-errore">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="email">
              {contact.fields.email}
            </label>
            <input
              className="form__input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-errore' : undefined} />
            {errors.email ? (
              <p className="form__error" id="email-errore">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="form__field">
            <label className="form__label" htmlFor="messaggio">
              {contact.fields.message}
            </label>
            <textarea
              className="form__textarea"
              id="messaggio"
              name="message"
              rows={7}
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'messaggio-errore' : undefined} />
            {errors.message ? (
              <p className="form__error" id="messaggio-errore">
                {errors.message}
              </p>
            ) : null}
          </div>

          <p className="form__note">{contact.privacyNote}</p>

          <div className="form__actions">
            <button className="button" type="submit" disabled={status === 'sending'}>
              {contact.fields.submit}
            </button>
          </div>

          {status === 'sent' ? (
            <p className="form__status form__status--ok" role="status">
              {contact.success}
            </p>
          ) : null}
          {status === 'failed' ? (
            <p className="form__status form__status--error" role="status">
              {contact.error}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}