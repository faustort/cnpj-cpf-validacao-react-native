import { cnpj, cpf } from "cpf-cnpj-validator";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
export default function InputCCValidator({ tipo }) {
    const [valor, setValor] = useState("");
    const [isValid, setIsValid] = useState(null);
    function validar(texto) {
        if(texto.length > 14) return;
        setValor(mask(texto));
        setIsValid(
            texto.length === 11 ? cpf.isValid(texto) : cnpj.isValid(texto)
        )
        console.log();
    }

    function mask(texto) {
        if (texto.length === 11) {
            return cpf.format(texto);
        } else if (texto.length === 14) {
            return cnpj.format(texto);
        } else {
            return texto;
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Insira CPF ou CNPJ"
                value={valor}
                onChangeText={validar}
            />
            {isValid ? null : (<Text style={styleInput.error}>CNPJ ou CPF inválido</Text>)}
        </View>
    );

}

const styleInput = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 8,
        margin: 8,
    },
    error: {
        color: "red",
        fontSize: 12,
        margin: 8,
    },
})