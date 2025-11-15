import { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

export default function App(){
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1);
  const colors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};
const [bgColor, setBgColor] = useState("#585454ff");
  function next(){
    setId(id + 1)
  }; // função do botao de avancar
  function prev(){
    setId(id -1)
  }; // função do botao de voltar

  useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPokemon(data);
      const type = data.types[0].type.name;
      setBgColor(colors[type] || "#6d6969ff"); // aplica cor baseada no tipo
    })
    .catch((erro) => console.error("ERRO:", erro));
}, [id]); // numero do pokemon

  if(!pokemon) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#FFCB05' />
        <Text>Carregando pokemon...</Text>
      </View>
    );
  };
  return(
    <View style={[styles.container]}>

        <Text style={[styles.name,{color:bgColor}]}> {pokemon.name.toUpperCase()} </Text>
      <Image
        source={{uri: pokemon.sprites.front_default}}
        style={[styles.image, {backgroundColor:bgColor}]} />
      <Text style={[styles.textType,{backgroundColor:bgColor}]} >{pokemon.types[0].type.name.toUpperCase()}</Text>
      <TouchableOpacity onPress={()=>{next()}} style={styles.btn}>
        <Text style={styles.btntxt}>Proximo</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={()=>{prev()}} style={styles.btn}>
        <Text style={styles.btntxt}>Anterior</Text>
      </TouchableOpacity>
      <Text style={styles.txt}>Numero da pokedex: #{id}</Text>
 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#ccccccff'
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
    borderWidth:0.5,
    borderRadius:5,
    marginBottom:19,
  },
  txt:{
    fontSize:17,
    color:'#fff'

  },
  btn:{
    padding:10,
    borderRadius:5,
    marginBlock:10,
    backgroundColor:'red'
  },textType:{
    color:'#f8f5f5ff',
    width:80,
    textAlign:'center',
    fontSize:15,
    padding:4,
    borderWidth:2,
    borderRadius:5
  }
})