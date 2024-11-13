import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const PerfilGestao = () => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [emailInstitucional, setEmailInstitucional] = useState('');
    const [emailPessoal, setEmailPessoal] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');

    // Função para buscar o perfil do usuário
    const fetchPerfil = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                Alert.alert('Erro', 'Token de autenticação não encontrado');
                return;
            }

            const response = await axios.get('http://localhost:3000/perfil', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const perfil = response.data;
            setNome(perfil.nome);
            setDataNascimento(perfil.dataNascimento);
            setEmailInstitucional(perfil.emailInstitucional);
            setEmailPessoal(perfil.emailPessoal || '');
            setNumeroCelular(perfil.numeroCelular || '');
            setFotoPerfil(perfil.fotoPerfil || ''); // Foto de perfil ou padrão
        } catch (error) {
            console.error(`[ERRO] Falha ao carregar perfil: ${error}`);
            Alert.alert('Erro', 'Falha ao carregar informações do perfil');
        }
    };

    // Função para atualizar o perfil do usuário
    const atualizarPerfil = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                Alert.alert('Erro', 'Token de autenticação não encontrado');
                return;
            }

            await axios.put(
                'http://localhost:3000/perfil',
                { emailPessoal, numeroCelular, fotoPerfil },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        } catch (error) {
            console.error(`[ERRO] Falha ao atualizar perfil: ${error}`);
            Alert.alert('Erro', 'Falha ao atualizar informações do perfil');
        }
    };

    // Função para selecionar imagem de perfil
    const selecionarImagem = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorCode) {
                console.error(`Erro ao selecionar imagem: ${response.errorMessage}`);
                Alert.alert('Erro', 'Não foi possível selecionar a imagem');
            } else {
                const uri = response.assets[0].uri;
                setFotoPerfil(uri); // Salva o caminho da imagem selecionada no estado
            }
        });
    };

    useEffect(() => {
        fetchPerfil();
    }, []);

    return (
        <View style={styles.container}>
            {/* Exibindo imagem de perfil */}
            <TouchableOpacity style={styles.fotoContainer} onPress={selecionarImagem}>
                <Image
                    source={{ uri: fotoPerfil || 'https://via.placeholder.com/150' }} // Foto padrão caso não exista
                    style={styles.fotoPerfil}
                />
                <Text style={styles.textoAlterarFoto}>Alterar foto de perfil</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{nome}</Text>

            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.value}>{dataNascimento}</Text>

            <Text style={styles.label}>Email Institucional:</Text>
            <Text style={styles.value}>{emailInstitucional}</Text>

            <Text style={styles.label}>Email Pessoal:</Text>
            <TextInput
                style={styles.input}
                value={emailPessoal}
                onChangeText={setEmailPessoal}
                placeholder="Digite seu email pessoal"
            />

            <Text style={styles.label}>Número de Celular:</Text>
            <TextInput
                style={styles.input}
                value={numeroCelular}
                onChangeText={setNumeroCelular}
                placeholder="Digite seu número de celular"
            />

            <Button title="Atualizar Perfil" onPress={atualizarPerfil} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    fotoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    fotoPerfil: {
        width: 150,
        height: 150,
        borderRadius: 75, // Para dar formato redondo à foto
        marginBottom: 10,
    },
    textoAlterarFoto: {
        fontSize: 16,
        color: '#007BFF',
    },
});

export default PerfilGestao;
