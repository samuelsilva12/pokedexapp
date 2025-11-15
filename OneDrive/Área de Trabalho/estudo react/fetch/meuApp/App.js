import { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

export default function App(){
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1)
  
  function next(){
    setId(id + 1)
  }
  function prev(){
    setId(id -1)
  }
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((erro) => console.error("ERRO:", erro))
  },[id]);
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
      <TouchableOpacity onPress={()=>{next()}} style={styles.btn}>
        <Text style={styles.btntxt}>Proximo</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={()=>{prev()}} style={styles.btn}>
        <Text style={styles.btntxt}>Anterior</Text>
      </TouchableOpacity>
      <Text style={styles.txt}>Numero da pokedex: {id}</Text>
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
    width: 200,
    height: 200,
    marginTop: 20,
  },
  btn:{
    padding:10,
    borderRadius:5,
    backgroundColor:'red',
    marginBlock:10
  }
})