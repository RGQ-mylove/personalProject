import { useState, useContext, type FormEvent } from 'react';
import { ParticleBgRefContext } from '../../context';

interface Message {
  name: string;
  text: string;
  time: string;
}

const STORAGE_KEY = 'homepage_messages';

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

const MessageSection = () => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const particleRef = useContext(ParticleBgRefContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const msg: Message = {
      name: name.trim(),
      text: text.trim(),
      time: new Date().toLocaleString(),
    };

    const updated = [msg, ...messages];
    setMessages(updated);
    saveMessages(updated);

    // Add a particle star at a random visible position
    const x = Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2;
    const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.3;
    particleRef.current?.addParticle?.(x, y);

    setText('');
  };

  return (
    <section className="message-section">
      <h2>Leave a Message</h2>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          placeholder="Your nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
        />
        <textarea
          className="message-textarea"
          placeholder="Say something nice..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
        />
        <button type="submit" className="message-submit">
          Send ✨
        </button>
      </form>
      <div className="message-list">
        {messages.map((m, i) => (
          <div key={i} className="message-item">
            <div className="message-item-name">{m.name}</div>
            <div className="message-item-text">{m.text}</div>
            <div className="message-item-time">{m.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MessageSection;
