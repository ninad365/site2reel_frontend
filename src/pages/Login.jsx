import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/";
    }
  }

  return (
    <div className="container">
      <img src="/logo.png" className="logo" alt="Site2Reel Logo" />
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={signIn}>Login</button>

      <p>
        No account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
