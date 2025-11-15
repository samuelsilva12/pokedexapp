import { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function App(){
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/squirtle')
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((erro) => console.error("ERRO:", erro))
  },[]);
  if(!pokemon) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#FFCB05' />
        <Text>Carregando pokemon...</Text>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <Text style={styles.name}> {pokemon.name.toUpperCase()} </Text>
      <Image
        source={{uri: pokemon.sprites.front_default}}
        style={styles.image} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A75BB",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
})