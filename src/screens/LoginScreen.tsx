import React, { useState } from "react";
import {
  View, Text, TextInput, Button,
  Alert, StyleSheet, ActivityIndicator
} from "react-native";
import { AuthService } from "../services/AuthService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Aviso", "Complete todos los campos");
      return;
    }

    setCargando(true);

    try {
      await AuthService.login(email.trim(), password);
    } catch (error) {
      Alert.alert("Error", "Verifique su correo y contraseña");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {cargando ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="Ingresar"
          onPress={iniciarSesion}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
});
