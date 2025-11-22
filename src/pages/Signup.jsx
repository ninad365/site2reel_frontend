import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else alert("Check your email for verification!");
  }

  return (
    <div className="container">
      <img src="/logo.png" className="logo" alt="Site2Reel Logo" />

      <h2>Create Account</h2>

      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={signUp}>Sign Up</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
