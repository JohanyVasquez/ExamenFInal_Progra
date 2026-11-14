import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "./src/lib/supabase";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, nuevaSesion) => {
        if (activo) {
          setSession(nuevaSesion);
          setCargando(false);
        }
      });

    supabase.auth.getSession()
      .then(({ data }) => {
        if (activo) {
          setSession(data.session);
          setCargando(false);
        }
      })
      .catch(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return session ? <HomeScreen /> : <LoginScreen />;
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
