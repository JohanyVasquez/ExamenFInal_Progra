import { supabase } from "../lib/supabase";

export const AuthService = {
  async login(email: string, password: string) {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;
  },

  async cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },
};
