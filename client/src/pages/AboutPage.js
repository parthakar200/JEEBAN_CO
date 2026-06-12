import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const MILESTONES = [
  {
    year: "2020",
    title: "Founded in Odisha",
    desc: "Started with a mission to simplify business compliance in India",
  },
  {
    year: "2021",
    title: "1,000 Clients",
    desc: "Reached our first major milestone of satisfied customers",
  },
  {
    year: "2022",
    title: "Business Expansion",
    desc: "Opened offices in Bhubaneswar, Soro",
  },
  {
    year: "2024",
    title: "3,000 Clients",
    desc: "Crossed 3K businesses served across India",
  },
  {
    year: "2025",
    title: "5,000 Clients",
    desc: "India's largest online corporate services platform",
  },
];

function TeamCard({ member, idx, featured }) {
  const hasPhoto = member.avatar && member.avatar.startsWith("data:");
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      key={idx}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: hasPhoto
          ? "#0f172a"
          : "linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)",
        width: 260,
        minHeight: 340,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 8px 32px rgba(0,0,0,.18)",
        transition: "transform 0.22s, box-shadow 0.22s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 18px 48px rgba(0,0,0,.28)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.18)";
      }}
    >
      {hasPhoto ? (
        <img
          src={member.avatar}
          alt={member.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(26,86,219,.7), rgba(124,58,237,.7))",
              border: "3px solid rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 900,
              color: "white",
              fontFamily: "var(--font-heading)",
            }}
          >
            {initials}
          </div>
        </div>
      )}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: hasPhoto
            ? "linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.65) 50%, rgba(0,0,0,.1) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.3) 70%, transparent 100%)",
          padding: "48px 18px 20px",
        }}
      >
        <h4
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "white",
            marginBottom: 3,
            fontFamily: "var(--font-heading)",
            lineHeight: 1.25,
          }}
        >
          {member.name}
        </h4>
        <p
          style={{
            fontSize: 12,
            color: "#93c5fd",
            fontWeight: 600,
            marginBottom: member.bio ? 6 : 0,
          }}
        >
          {member.role}
        </p>
        {member.bio && (
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.58)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

function SkeletonTeamCard() {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)",
        width: 260,
        minHeight: 340,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 8px 32px rgba(0,0,0,.18)",
        animation: "skeletonPulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ padding: "48px 18px 20px" }}>
        <div
          style={{
            height: 15,
            background: "rgba(255,255,255,.15)",
            borderRadius: 6,
            marginBottom: 8,
            width: "70%",
          }}
        />
        <div
          style={{
            height: 12,
            background: "rgba(255,255,255,.08)",
            borderRadius: 6,
            width: "50%",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  // const [team, setTeam] = useState([
  //   { name: 'Jeebanjyoti Dashmohapatra', role: 'Founder & Managing Partner', bio: 'M.COM. LLB with 10+ years in corporate law and compliance', avatar: '', isPinned: true },
  //   { name: 'Jagannath Jena', role: 'Chartered Accountant (CA)', bio: 'CA CS M.COM. with 5+ years Expert in business process automation and scale', avatar: '', isPinned: true },
  //   { name: 'Madhusudan Behera', role: 'Senior Consultant', bio: 'Led engineering at top fintech companies', avatar: '', isPinned: false },
  //   { name: 'Mihir Mohapatra', role: 'Senior Consultant', bio: 'CS with deep expertise in MCA and SEBI regulations', avatar: '', isPinned: false },
  // ]);
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    API.get("/team")
      .then((res) => {
        if (res.data.members?.length > 0) setTeam(res.data.members);
      })
      .catch(() => {})
      .finally(() => setTeamLoading(false));
  }, []);

  // Split pinned (top featured) vs rest (marquee)
  const pinnedTeam = team.filter((m) => m.isPinned).slice(0, 2);
  const restTeam = team.filter((m) => !m.isPinned);
  // Pad to at least 6 items so marquee fills the screen, then duplicate for seamless loop
  const padCount =
    restTeam.length > 0 ? Math.max(1, Math.ceil(6 / restTeam.length)) : 1;
  const paddedRest = Array.from({ length: padCount }, () => restTeam).flat();
  // Always exactly 2 copies so translateX(-50%) keyframe is always correct
  const marqueeTeam = [...paddedRest, ...paddedRest];

  return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      {/* For Search Engine Optimization */}
      <Helmet>
        <title>
          Jeeban & Co. - Company Registration, GST, ITR, Trademark India
        </title>
        <meta
          name="description"
          content="India's trusted platform for company registration, GST filing, trademark, and income tax services. Based in Soro, Baleshwar, Bhubaneswar, Odisha."
        />
        <meta
          name="keywords"
          content="company registration Bhubaneswar, GST registration Odisha, ITR filing Baleshwar, Project Funding, trademark India"
        />
      </Helmet>

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
          padding: "80px 0",
          color: "white",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,.1)",
              borderRadius: 99,
              padding: "6px 16px",
              marginBottom: 24,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,.8)",
            }}
          >
            🏆 Odisha's Trusted Tax, GST & Legal Consultancy
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "white",
              marginBottom: 20,
              lineHeight: 1.15,
            }}
          >
            Simplifying Compliance
            <br />
            for Every Business
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,.7)",
              maxWidth: 600,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Since 2020, Jeeban & CO has been on a mission to make business
            registration and compliance effortless for every Indian
            entrepreneur.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/services" className="btn btn-primary btn-lg">
              Explore Services
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#1a56db", padding: "40px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
            className="stats-bar"
          >
            {[
              { value: "1.3L+", label: "Services Delivered" },
              { value: "5k+", label: "Businesses Served" },
              { value: "20+", label: "Expert Professionals" },
              { value: "10 yrs", label: "Trusted Experience" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    fontFamily: "var(--font-heading)",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,.75)",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="mission-layout"
          >
            <div>
              <div className="section-label">Our Story</div>
              <h2 className="section-title">Built for India's entrepreneurs</h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#475569",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Jeeban & CO was founded in 2020 by a group of Chartered
                Accountants and Company Secretaries who saw a critical gap:
                small businesses were struggling to navigate India's complex
                regulatory landscape without expensive professional help.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: "#475569",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                We set out to democratize access to professional compliance
                services — making them affordable, transparent, and fully
                online. Today, we serve 5K+ businesses with expert-backed
                support.
              </p>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8 }}>
                Our platform handles everything from company incorporation and
                GST filing to trademark registration and payroll management —
                all under one roof.
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: "🎯",
                    title: "Our Mission",
                    desc: "Make every Indian business compliant, confident, and successful through accessible, tech-driven services.",
                  },
                  {
                    icon: "👁️",
                    title: "Our Vision",
                    desc: "To be the trusted compliance partner for every business in India — from idea to exit.",
                  },
                  {
                    icon: "💡",
                    title: "Our Approach",
                    desc: "Combine expert knowledge with technology to deliver fast, accurate, and affordable compliance services.",
                  },
                  {
                    icon: "🤝",
                    title: "Our Promise",
                    desc: "Transparent pricing, expert support, and a 30-day money-back guarantee on every service.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: 24,
                      background: "#f8fafc",
                      borderRadius: 16,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 10 }}>
                      {item.icon}
                    </div>
                    <h4
                      style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Our Journey
            </div>
            <h2 className="section-title">10 years of growth</h2>
          </div>
          <div
            style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 2,
                background: "#e2e8f0",
                transform: "translateX(-50%)",
              }}
            />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: "flex",
                  justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                  marginBottom: 32,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "45%",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 2px 12px rgba(0,0,0,.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#1a56db",
                      marginBottom: 4,
                    }}
                  >
                    {m.year}
                  </div>
                  <div
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}
                  >
                    {m.desc}
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 24,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#1a56db",
                    border: "3px solid white",
                    transform: "translateX(-50%)",
                    boxShadow: "0 0 0 3px rgba(26,86,219,.2)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Leadership
            </div>
            <h2 className="section-title">Meet our team</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              Led by seasoned professionals from law, finance, and technology
            </p>
          </div>

          {/* Pinned featured cards — up to 2, centered with skeleton loading feature*/}
          {teamLoading ? (
            <div
              style={{
                display: "flex",
                gap: 24,
                justifyContent: "center",
                marginBottom: 36,
                flexWrap: "wrap",
              }}
            >
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <SkeletonTeamCard key={i} />
                ))}
            </div>
          ) : (
            pinnedTeam.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  justifyContent: "center",
                  marginBottom: 36,
                  flexWrap: "wrap",
                }}
              >
                {pinnedTeam.map((member, idx) => (
                  <div key={idx} style={{ width: 300 }}>
                    <TeamCard member={member} idx={idx} featured />
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textAlign: "center",
            color: "#22c55e",
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          TEAM MEMBER'S
        </div>

        {/* Marquee — remaining members, full width */}
        {teamLoading ? (
          <div
            style={{
              display: "flex",
              gap: 20,
              padding: "8px 20px",
              overflow: "hidden",
            }}
          >
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonTeamCard key={i} />
              ))}
          </div>
        ) : (
          marqueeTeam.length > 0 && (
            <div style={{ overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 100,
                  background: "linear-gradient(to right, white, transparent)",
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
                  background: "linear-gradient(to left, white, transparent)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  width: "max-content",
                  padding: "8px 20px 16px",
                  animation: `marqueeScroll ${Math.max(16, paddedRest.length * 4)}s linear infinite`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animationPlayState = "paused";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.animationPlayState = "running";
                }}
              >
                {marqueeTeam.map((member, idx) => (
                  <TeamCard key={idx} member={member} idx={idx} />
                ))}
              </div>
            </div>
          )
        )}
      </section>

      {/* Awards & certifications */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Trust & Credentials
            </div>
            <h2 className="section-title">Recognised & Certified</h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              {
                icon: "🏅",
                title: "ISO 27001:2022",
                sub: "Information Security",
              },
              { icon: "🔐", title: "SSL Secured", sub: "256-bit Encryption" },
              {
                icon: "🏛️",
                title: "MCA Registered",
                sub: "eFiling Intermediary",
              },
              { icon: "⭐", title: "Google 4.8★", sub: "15,000+ Reviews" },
              { icon: "🛡️", title: "PCI DSS", sub: "Payment Security" },
              { icon: "🤝", title: "NASSCOM Member", sub: "IT Industry Body" },
            ].map((cert) => (
              <div
                key={cert.title}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "20px 28px",
                  textAlign: "center",
                  minWidth: 150,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{cert.icon}</div>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  {cert.title}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                  {cert.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .mission-layout { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
