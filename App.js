import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function App() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const buscarPersonagem = async (url) => {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      return dados;
    };

    const buscarTodosPersonagens = async () => {
      const urls = Array.from({ length: 10 }, (_, index) =>
        `https://swapi.dev/api/people/${index + 1}/`
      );

      try {
        const dadosPersonagens = await Promise.all(urls.map(buscarPersonagem));
        setPessoas(dadosPersonagens);
      } catch (erro) {
        console.error('Erro ao buscar personagens:', erro);
      }
    };

    buscarTodosPersonagens();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.force}>Que a força esteja com você!</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.texto}>Personagens</Text>
      {pessoas && pessoas.length > 0 ? (
        pessoas.map((pessoas, index) => (
          <Text key={index} style={styles.nome}>
            {pessoas.name}
          </Text>
        ))
      ) : (
        <Text style={styles.carregando}>Carregando ...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  force:{
    fontSize:15,
    fontStyle: 'italic',
    marginBottom: 20,
    color: 'yellow'
  },
  logo: {
    width: '300px',
    height: '200px',
    marginBottom: 20,
  },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  nome: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  carregando: {
    fontSize: 18,
    marginTop: 20,
    color: 'white'
  },
});
