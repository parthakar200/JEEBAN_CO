import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/sections/Hero";
import ServiceCard from "../components/ui/ServiceCard";
import { CATEGORIES, TESTIMONIALS } from "../utils/servicesData";
import { useServices } from "../context/ServicesContext";

import { Helmet } from 'react-helmet-async';

function FAQ({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        overflow: "hidden",
        background: "white",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <div
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? "#1a56db" : "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d={open ? "M3 7h8" : "M7 3v8M3 7h8"}
              stroke={open ? "white" : "#475569"}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div
          style={{
            padding: "0 24px 20px",
            fontSize: 15,
            color: "#475569",
            lineHeight: 1.7,
            borderTop: "1px solid #f1f5f9",
          }}
        >
          {answer}
        </div>
      )}
      <style>{`
        @keyframes testimonialScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const FAQS = [
  {
    question: "How can Jeeban & CO help my business with GST registration?",
    answer:
      "Jeeban & CO provides comprehensive GST registration services, ensuring your business complies with GST laws. From registration to timely return filing and tax planning, our experts handle everything so you can focus on growing your business.",
  },
  {
    question: "How long does company registration take?",
    answer:
      "Private Limited Company registration typically takes 15-20 business days after all documents are submitted. This includes name approval, DIN/DSC processing, and Certificate of Incorporation from ROC.",
  },
  {
    question: "What documents are needed for trademark registration?",
    answer:
      "You need applicant's PAN card, business registration proof, logo file (if word + logo mark), and a Power of Attorney. Our team guides you through the entire process.",
  },
  {
    question: "Can I file GST returns myself using Jeeban & CO?",
    answer:
      "Yes! Our LEDGERS platform allows you to file GST returns yourself with AI-powered assistance. Alternatively, our experts can file on your behalf for a nominal fee.",
  },
  {
    question: "What is the difference between Private Limited Company and LLP?",
    answer:
      "A Private Limited Company requires minimum 2 directors/shareholders and is ideal for startups seeking investment. LLP requires 2 partners and is better for professional services with simpler compliance requirements.",
  },
];

function SkeletonCard() {
  return (
    <div style={{
      borderRadius: 16, border: '1px solid #e2e8f0',
      padding: 24, background: 'white',
      animation: 'skeletonPulse 1.5s ease-in-out infinite',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e2e8f0', marginBottom: 16 }} />
      <div style={{ height: 18, background: '#e2e8f0', borderRadius: 6, marginBottom: 10, width: '70%' }} />
      <div style={{ height: 13, background: '#f1f5f9', borderRadius: 6, marginBottom: 6, width: '100%' }} />
      <div style={{ height: 13, background: '#f1f5f9', borderRadius: 6, marginBottom: 6, width: '85%' }} />
      <div style={{ height: 13, background: '#f1f5f9', borderRadius: 6, marginBottom: 20, width: '60%' }} />
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ height: 10, background: '#f1f5f9', borderRadius: 4, width: 60, marginBottom: 6 }} />
          <div style={{ height: 20, background: '#e2e8f0', borderRadius: 6, width: 80 }} />
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: '#e2e8f0' }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  // Pad testimonials so marquee fills screen with no gaps — always 2 copies for seamless -50% loop
  const _tPad = Array.from(
    { length: Math.max(1, Math.ceil(5 / TESTIMONIALS.length)) },
    () => TESTIMONIALS,
  ).flat();
  const testimonialMarquee = [..._tPad, ..._tPad];

  // const { services: SERVICES_DATA } = useServices();
  const { services: SERVICES_DATA, servicesLoading } = useServices();
  const popularServices = SERVICES_DATA.filter((s) => s.isPopular).slice(0, 6);
  const [activeCategory, setActiveCategory] = useState("startup");
  const categoryServices = SERVICES_DATA.filter(
    (s) => s.category === activeCategory,
  );

  return (
    <div>
      {/* For Search Engine Optimization */}
      <Helmet>
        <title>Jeeban & Co. - Company Registration, GST, ITR, Trademark India</title>
        <meta name="description" content="India's trusted platform for company registration, GST filing, trademark, and income tax services. Based in Soro, Baleshwar, Bhubaneswar, Odisha." />
        <meta name="keywords" content="company registration Bhubaneswar, GST registration Odisha, ITR filing Baleshwar, Project Funding, trademark India" />
      </Helmet>
      
      <Hero />

      {/* Popular Services */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div className="section-label">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1l1.56 3.16L12 4.73l-2.5 2.44.59 3.45L7 9.07 4.91 10.62l.59-3.45L3 4.73l3.44-.57L7 1z"
                    fill="#1a56db"
                  />
                </svg>
                Most Popular
              </div>
              <h2 className="section-title">Start with our bestsellers</h2>
              <p className="section-desc">
                Trusted by millions of businesses across India
              </p>
            </div>
            <Link to="/services" className="btn btn-outline">
              View All Services →
            </Link>
          </div>

          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {popularServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </div> */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {servicesLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : popularServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              All Services
            </div>
            <h2 className="section-title">Browse by category</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              End-to-end support for every stage of your business journey
            </p>
          </div>

          {/* Category tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 99,
                  border: "1.5px solid",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s",
                  borderColor:
                    activeCategory === cat.id ? "#1a56db" : "#e2e8f0",
                  background: activeCategory === cat.id ? "#1a56db" : "white",
                  color: activeCategory === cat.id ? "white" : "#475569",
                }}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {categoryServices.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div> */}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
  {servicesLoading
    ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
    : categoryServices.map(service => <ServiceCard key={service.id} service={service} compact />)
  }
</div>
        </div>
      </section>

      {/* Why Jeeban & CO */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <div className="section-label">Why Choose Us</div>
              <h2 className="section-title">
                India's trusted platform for business solutions
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#475569",
                  lineHeight: 1.7,
                  marginBottom: 36,
                }}
              >
                From incorporation to compliance — end-to-end support to help
                you start, manage, and grow your business at every stage.
              </p>

              {[
                // { icon: '🤖', title: 'AI-Powered Automation', desc: 'Smart automation reduces manual work, minimizes errors, and ensures compliance with all regulatory requirements.' },
                {
                  icon: "👨‍💼",
                  title: "20+ Experts",
                  desc: "Chartered accountants, company secretaries, and legal professionals dedicated to your business.",
                },
                {
                  icon: "🔒",
                  title: "Secure & Confidential",
                  desc: "ISO 27001 certified platform with end-to-end encryption. Your data stays safe.",
                },
                {
                  icon: "💸",
                  title: "Transparent Pricing",
                  desc: "No hidden charges. What you see is what you pay. Government fees are always disclosed upfront.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{ display: "flex", gap: 16, marginBottom: 24 }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      background: "#f0f4ff",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats card */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a56db, #1240a8)",
                borderRadius: 24,
                padding: 48,
                color: "white",
              }}
            >
              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                Trusted by founders from 50+ cities
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,.7)",
                  marginBottom: 40,
                  lineHeight: 1.6,
                }}
              >
                10+ years of experience helping businesses stay compliant
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                {[
                  { value: "1.3L+", label: "Services Delivered" },
                  { value: "5K+", label: "Happy Clients" },
                  { value: "20+", label: "Professionals" },
                  { value: "10+ yrs", label: "Experience" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "rgba(255,255,255,.1)",
                      borderRadius: 16,
                      padding: 20,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 800,
                        fontFamily: "var(--font-heading)",
                        color: "white",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,.7)",
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 32,
                  padding: 20,
                  background: "rgba(255,255,255,.1)",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,.7)",
                    marginBottom: 8,
                  }}
                >
                  Google Rating
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{ fontSize: 28, fontWeight: 800, color: "white" }}
                  >
                    4.8
                  </span>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ fontSize: 18 }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                    (1,500+ reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 768px) { .container > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Customer Stories
            </div>
            <h2 className="section-title">Trusted by India's entrepreneurs</h2>
          </div>

          {/* Marquee scroll */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: "linear-gradient(to right, #f8fafc, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background: "linear-gradient(to left, #f8fafc, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 20,
                width: "max-content",
                animation: "testimonialScroll 32s linear infinite",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {testimonialMarquee.map((t, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: 24, width: 320, flexShrink: 0 }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ color: "#f59e0b", fontSize: 14 }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#475569",
                      lineHeight: 1.7,
                      marginBottom: 20,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "#e0e7ff",
                        color: "#1a56db",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>
                        {t.role} · {t.location}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#1a56db", marginTop: 2 }}
                      >
                        {t.service}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                className="section-label"
                style={{ justifyContent: "center" }}
              >
                FAQs
              </div>
              <h2 className="section-title">Frequently asked questions</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQS.map((faq, i) => (
                <FAQ key={i} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "80px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontFamily: "var(--font-heading)",
              color: "white",
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Ready to get started?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#94a3b8",
              marginBottom: 36,
              maxWidth: 480,
              margin: "0 auto 36px",
            }}
          >
            Create an account to start your company registration or migrate your
            existing business. No credit card required.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="btn btn-lg"
              style={{
                background: "rgba(255,255,255,.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,.2)",
              }}
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
      <style>
{`
  @keyframes skeletonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`}
</style>
    </div>
  );
}


