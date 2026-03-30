"use client";
import { useState, useEffect } from "react";

interface Wish {
  name: string;
  message: string;
  created_at: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [fetching, setFetching] = useState(true);

  // Load all wishes on mount
  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setWishes(data);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error("Failed");

      // Prepend new wish optimistically
      setWishes((prev) => [
        { name: name.trim(), message: message.trim(), created_at: new Date().toISOString() },
        ...prev,
      ]);
      setName("");
      setMessage("");
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
        <h2 className="section-title">Blessings &amp; Wishes</h2>

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
                  placeholder="John Doe"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="form-group">
                <label htmlFor="guest-message">Your Blessing</label>
                <textarea
                  id="guest-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Write your heartfelt message here..."
                  required
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                className={`submit-btn${status === "sent" ? " sent" : ""}`}
                disabled={status === "loading"}
              >
                {status === "loading" && (
                  <>Sending… <i className="fas fa-spinner fa-spin" /></>
                )}
                {status === "sent" && (
                  <>Sent! <i className="fas fa-check" /></>
                )}
                {status === "error" && (
                  <>Failed — try again <i className="fas fa-exclamation" /></>
                )}
                {status === "idle" && (
                  <>Send Wishes <i className="fas fa-paper-plane" /></>
                )}
              </button>
            </form>
          </div>

          {/* Wish display */}
          <div className="wishes-display" id="wishes-list">
            {fetching && (
              <p style={{ color: "#999", textAlign: "center" }}>
                Loading wishes…
              </p>
            )}

            {!fetching && wishes.length === 0 && (
              <p style={{ color: "#999", textAlign: "center" }}>
                Be the first to leave a blessing!
              </p>
            )}

            {wishes.map((wish, i) => (
              <div key={i} className="wish-item animate-fade-in">
                <p className="wish-text">&ldquo;{wish.message}&rdquo;</p>
                <span className="wish-author">— {wish.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
