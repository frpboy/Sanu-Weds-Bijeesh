"use client";
import { useState } from "react";

interface Wish {
  text: string;
  author: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    text: "Wishing you both a lifetime of happiness and prosperity! Can't wait for the big day!",
    author: "Rahul & Family",
  },
];

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setWishes([{ text: message.trim(), author: name.trim() }, ...wishes]);
    setName("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
                />
              </div>

              <button
                type="submit"
                className={`submit-btn${sent ? " sent" : ""}`}
              >
                {sent ? (
                  <>
                    Sent! <i className="fas fa-check" />
                  </>
                ) : (
                  <>
                    Send Wishes <i className="fas fa-paper-plane" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Wish display */}
          <div className="wishes-display" id="wishes-list">
            {wishes.map((wish, i) => (
              <div key={i} className="wish-item animate-fade-in">
                <p className="wish-text">&ldquo;{wish.text}&rdquo;</p>
                <span className="wish-author">— {wish.author}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
