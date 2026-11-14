import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthService } from "../services/AuthService";

export default function HomeScreen() {
  const [imagen, setImagen] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    try {
      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 0.7,
        });

      if (!resultado.canceled && resultado.assets.length > 0) {
        setImagen(resultado.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const tomarFoto = async () => {
    try {
      const permiso =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permiso.granted) {
        Alert.alert(
          "Permiso denegado",
          "Debe permitir el acceso a la cámara"
        );
        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.7,
        });

      if (!resultado.canceled && resultado.assets.length > 0) {
        setImagen(resultado.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo tomar la fotografía");
    }
  };

  const eliminarImagen = () => {
    setImagen(null);
  };

  const cerrarSesion = async () => {
    try {
      await AuthService.cerrarSesion();
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>
        Gestión de fotografías
      </Text>

      <View style={styles.boton}>
        <Button
          title="Seleccionar de galería"
          onPress={seleccionarImagen}
        />
      </View>

      <View style={styles.boton}>
        <Button
          title="Tomar fotografía"
          onPress={tomarFoto}
        />
      </View>

      {imagen ? (
        <View style={styles.vistaPrevia}>
          <Text style={styles.subtitulo}>
            Fotografía actual
          </Text>

          <Image
            source={{ uri: imagen }}
            style={styles.imagen}
            resizeMode="contain"
          />

          <Text style={styles.texto}>
            Para cambiarla, selecciona otra
            fotografía o toma una nueva.
          </Text>

          <Button
            title="Eliminar fotografía"
            color="red"
            onPress={eliminarImagen}
          />
        </View>
      ) : (
        <Text style={styles.texto}>
          No hay fotografía seleccionada
        </Text>
      )}

      <View style={styles.salir}>
        <Button
          title="Cerrar sesión"
          color="#555555"
          onPress={cerrarSesion}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  boton: {
    marginBottom: 15,
  },
  vistaPrevia: {
    alignItems: "center",
    marginTop: 25,
  },
  imagen: {
    width: 280,
    height: 280,
    marginBottom: 15,
  },
  texto: {
    textAlign: "center",
    marginVertical: 15,
  },
  salir: {
    marginTop: 35,
  },
});
