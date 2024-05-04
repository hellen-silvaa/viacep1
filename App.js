import { StatusBar } from "expo-status-bar";
import { Image,ScrollView, StyleSheet,Text,TextInput,View,} from "react-native"; 
import ViacepLogo from "./assets/viaCepLogo.jpg";
import { useEffect, useState } from "react";
import {api} from "./axios"

export default function App() {
  const [cepInformado, setCepInformado] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  async function handleCepSelected() {
    try {
      const response = await api.get(`${cepInformado}/json`);

      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setCidade(response.data.localidade)
      setUf(response.data.uf)

    }catch (error){
      console.log('erro de api');
      console.log(error);
    }
  }

  useEffect(() => {
    handleCepSelected();
  },[cepInformado])
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={{ position: "absolute", top: 40, flex: 1 }}
        source={ViacepLogo}
      />

      <View style={styles.containerInfos}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}>Nome:</Text>
          <TextInput
            placeholder="Informe o seu nome"
            style={styles.inputStyles}
          />

          <Text style={styles.textStyle}>CEP:</Text>
          <TextInput
            placeholder="Informe o seu CEP"
            style={styles.inputStyles}
            keyboardType="numeric"
            onChangeText={(txt) => setCepInformado(txt)}
          />

          <Text style={styles.textStyle}>Logradouro:</Text>
          <TextInput
            placeholder="Informe o seu endereço"
            style={styles.inputStyles}
            value={logradouro}
          />

          <Text style={styles.textStyle}>Número:</Text>
          <TextInput
            placeholder="Informe o número"
            style={styles.inputStyles}
            keyboardType="numeric"
          />

          <Text style={styles.textStyle}>Bairro:</Text>
          <TextInput
            placeholder="Informe o seu Bairro"
            style={styles.inputStyles}
            keyboardType="numeric"
            value={bairro}
          />

          <Text style={styles.textStyle}>Cidade:</Text>
          <TextInput
            placeholder="Informe a sua cidade"
            style={styles.inputStyles}
            value={cidade}
          />

          <Text style={styles.textStyle}>UF:</Text>
          <TextInput placeholder="Informe o UF" 
          style={styles.inputStyles} 
          value={uf}
          />
         
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfos: {
    flex: 1,

    width: "90%",
    height: "60%",
    marginTop: 250,
  },
  inputStyles: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    borderColor: "#6c9c5e",
    marginTop: 10,
    marginBottom: 10,
  },

  textStyle: {
    fontSize: 16,
    color: "#417B35",
  },
});
