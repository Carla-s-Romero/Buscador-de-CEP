import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  async function buscar() {
    if (cep.trim() === "" || cep.length !== 8) {
      Alert.alert("CEP inválido!", "Digite um CEP com 8 dígitos.");
      return;
    }

    try {
      const response = await Api.get(`${cep}/json/`);
      if (response.data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
      } else {
        setLogradouro(response.data.logradouro || "N/A");
        setBairro(response.data.bairro || "N/A");
        setLocalidade(response.data.localidade || "N/A");
        setUf(response.data.uf || "N/A");
      }
    } catch (error) {
      console.log("Erro: " + error);
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>
      
      <View style={styles.containerCep}>
        <TextInput
          style={styles.cepInput}
          value={cep}
          onChangeText={setCep}
          placeholder="CEP"
          keyboardType="numeric"
          maxLength={8}
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
          <Text style={styles.textoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        placeholder="Logradouro"
        editable={false}
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        placeholder="Bairro"
        editable={false}
      />
      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        placeholder="Cidade"
        editable={false}
      />
      <TextInput
        style={styles.caixaTexto}
        value={uf}
        placeholder="Estado"
        editable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  top: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#018786",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  containerCep: {
    flexDirection: "row",
    height: 100,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cepInput: {
    borderColor: "#000",
    borderWidth: 2,
    width: 200,
    fontSize: 18,
    marginEnd: 10,
    padding: 15,
  },
  botaoBuscar: {
    backgroundColor: "#018786",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textoBuscar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  caixaTexto: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
