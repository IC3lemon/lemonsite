import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const socials = [
  {
    label: "GitHub",
    handle: "IC3lemon",
    url: "https://github.com/IC3lemon",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "madhav-menon",
    url: "https://linkedin.com/in/madhav-menon-a190912b0/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  // {
  //   label: "Instagram",
  //   handle: "@madhavocado",
  //   url: "https://instagram.com/madhavocado",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  //       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  //     </svg>
  //   ),
  // },
  {
    label: "Email",
    handle: "madhav1.mitmpl2023@learner.manipal.edu",
    url: "mailto:madhav1.mitmpl2023@learner.manipal.edu",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xlgpzjvq");

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tighter mb-2">
        Contact <span className="font-hand text-accent text-2xl">// ping me</span>
      </h2>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        {">>>"} send some bread.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6 items-start max-w-3xl">

        {/* ── FORM ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-foreground p-6 bg-background"
          style={{ boxShadow: "4px 4px 0px 0px hsl(var(--border))" }}
        >
          {state.succeeded ? (
            <div className="flex flex-col gap-2 py-4">
              <p className="font-mono text-sm font-bold text-foreground">message_sent() ✓</p>
              <p className="font-mono text-xs text-muted-foreground">// i'll get back to you soon</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="font-mono text-xs font-bold block mb-1">char* name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full border-2 border-foreground px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ background: "transparent" }}
                  placeholder="your_name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="font-mono text-xs text-destructive mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-xs font-bold block mb-1">char* email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full border-2 border-foreground px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ background: "transparent" }}
                  placeholder="you@domain.tld"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="font-mono text-xs text-destructive mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-xs font-bold block mb-1">char* message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border-2 border-foreground bg-background px-3 py-2 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="// write your message here..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="font-mono text-xs text-destructive mt-1" />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                className="border-2 border-foreground bg-foreground text-primary-foreground px-6 py-2.5 font-mono text-sm font-bold tracking-tight cursor-pointer disabled:opacity-50"
                whileHover={{ x: -2, y: -2, boxShadow: "5px 5px 0px 0px hsl(var(--border))" }}
                whileTap={{ x: 2, y: 2, boxShadow: "1px 1px 0px 0px hsl(var(--border))" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
              >
                {state.submitting ? "sending..." : "send_message()"}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* ── SOCIALS ── */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {socials.map(({ label, handle, url, icon }, i) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-foreground p-3 bg-background flex items-center gap-3 group"
              style={{ boxShadow: "3px 3px 0px 0px hsl(var(--border))" }}
              whileHover={{ x: -2, y: -2, boxShadow: "5px 5px 0px 0px hsl(var(--border))" }}
              whileTap={{ x: 1, y: 1, boxShadow: "1px 1px 0px 0px hsl(var(--border))" }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.07 } }}
            >
              <span className="text-foreground group-hover:text-accent transition-colors shrink-0">
                {icon}
              </span>
              <div className="font-mono overflow-hidden">
                <p className="text-xs font-bold text-foreground leading-none">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{handle}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;