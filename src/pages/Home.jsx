import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);
  const [backendStatus, setBackendStatus] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
      } else {
        setSession(data.session);
      }
    });
  }, []);

  useEffect(() => {
    if (!session) return;

    async function pingBackend() {
      try {
        const res = await fetch("https://site2reel.onrender.com/");
        const data = await res.json();
        setBackendStatus(data.message);
      } catch (err) {
        setBackendStatus("Failed to reach backend");
      }
    }

    pingBackend();
  }, [session]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (!session) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Site2Reel Tool</h2>
      <p>Welcome {session.user.email}</p>

      <p><b>Backend:</b> {backendStatus}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
