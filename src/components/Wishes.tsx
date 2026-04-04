"use client";
import { useState, useEffect } from "react";

interface Wish {
  name: string;
  message: string;
  attending: boolean;
  headcount: number;
  created_at: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState(true);
  const [headcount, setHeadcount] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setWishes(data); })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          attending,
          headcount,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setWishes((prev) => [
        {
          name: name.trim(),
          message: message.trim(),
          attending,
          headcount,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setName("");
      setMessage("");
      setAttending(true);
      setHeadcount(1);
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="wishes" className="section alt-bg">
      <div className="container">
        <h2 className="section-title">RSVP &amp; Wishes</h2>

        <div className="wishes-container">
          {/* Form */}
          <div className="wishes-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="guest-name">Your Name</label>
                <input
                  type="text"
                  id="guest-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  disabled={status === "loading"}
                />
              </div>

              {/* Attending toggle */}
              <div className="form-group">
                <label>Will you be attending?</label>
                <div className="rsvp-toggle">
                  <button
                    type="button"
                    className={`rsvp-btn${attending ? " active" : ""}`}
                    onClick={() => setAttending(true)}
                  >
                    <i className="fas fa-check" /> Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    className={`rsvp-btn${!attending ? " active decline" : ""}`}
                    onClick={() => setAttending(false)}
                  >
                    <i className="fas fa-times" /> Regretfully Declines
                  </button>
                </div>
              </div>

              {/* Headcount — only when attending */}
              {attending && (
                <div className="form-group">
                  <label htmlFor="headcount">Number of Guests</label>
                  <div className="headcount-wrap">
                    <button
                      type="button"
                      className="headcount-btn"
                      onClick={() => setHeadcount((n) => Math.max(1, n - 1))}
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <span className="headcount-value">{headcount}</span>
                    <button
                      type="button"
                      className="headcount-btn"
                      onClick={() => setHeadcount((n) => Math.min(20, n + 1))}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="guest-message">Blessing / Message <span className="label-optional">(optional)</span></label>
                <textarea
                  id="guest-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Write your heartfelt wishes…"
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                className={`submit-btn${status === "sent" ? " sent" : ""}`}
                disabled={status === "loading"}
              >
                {status === "loading" && (<><i className="fas fa-spinner fa-spin" /> Sending…</>)}
                {status === "sent"    && (<><i className="fas fa-check" /> Sent!</>)}
                {status === "error"   && (<><i className="fas fa-exclamation" /> Failed — try again</>)}
                {status === "idle"    && (<><i className="fas fa-paper-plane" /> Send RSVP</>)}
              </button>
            </form>
          </div>

          {/* RSVP summary */}
          {!fetching && wishes.length > 0 && (() => {
            const attending = wishes.filter((w) => w.attending !== false);
            const guests = attending.reduce((s, w) => s + (w.headcount || 1), 0);
            return (
              <div className="rsvp-summary">
                <i className="fas fa-users" />
                <span>
                  <strong>{attending.length}</strong>{" "}{attending.length === 1 ? "person" : "people"}{" "}attending
                  &nbsp;&middot;&nbsp;
                  <strong>{guests}</strong> total {guests === 1 ? "guest" : "guests"}
                </span>
              </div>
            );
          })()}

          {/* Wish display */}
          <div className="wishes-display" id="wishes-list">
            {fetching && (
              <p style={{ color: "#999", textAlign: "center" }}>Loading…</p>
            )}
            {!fetching && wishes.length === 0 && (
              <p style={{ color: "#999", textAlign: "center" }}>
                Be the first to RSVP!
              </p>
            )}
            {wishes.map((wish, i) => (
              <div key={i} className="wish-item animate-fade-in">
                <div className="wish-rsvp-badge">
                  {wish.attending ? (
                    <span className="badge-attending">
                      <i className="fas fa-check-circle" /> Attending
                      {wish.headcount > 1 && ` · ${wish.headcount} guests`}
                    </span>
                  ) : (
                    <span className="badge-decline">
                      <i className="fas fa-times-circle" /> Unable to attend
                    </span>
                  )}
                </div>
                {wish.message && (
                  <p className="wish-text">&ldquo;{wish.message}&rdquo;</p>
                )}
                <span className="wish-author">— {wish.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
