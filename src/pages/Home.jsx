import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
      } else {
        setSession(data.session);
      }
    });
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (!session) return null; // avoids showing blank before redirect

  return (
    <div style={{ padding: 20 }}>
      <h2>Site2Reel Tool</h2>
      <p>Welcome {session.user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}