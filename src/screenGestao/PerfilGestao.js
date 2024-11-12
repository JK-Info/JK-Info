import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Button, ActivityIndicator, StyleSheet, TextInput, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


const PerfilGestao = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [emailPessoal, setEmailPessoal] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Função para buscar dados do perfil
    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log('[INFO] Token JWT:', token);
            const response = await fetch(`http://localhost:3000/perfil`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('[INFO] Dados do perfil recebidos:', data);
                setProfileData(data);
                setEmailPessoal(data.emailPessoal || '');
                setNumeroCelular(data.numeroCelular || '');
            } else {
                console.warn('[AVISO] Não foi possível encontrar o perfil:', response.status);
                setError('Perfil não encontrado.');
            }
        } catch (error) {
            console.error('[ERRO] Erro ao buscar dados do perfil:', error);
            setError('Erro ao buscar dados do perfil.');
        } finally {
            setLoading(false);
        }
    };

    const updateProfileData = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
            const response = await fetch('http://localhost:3000/perfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Corrigido para template literal
                },
                body: JSON.stringify({ emailPessoal, numeroCelular, profileImage }),
            });
    
            if (!response.ok) throw new Error('Erro ao atualizar perfil');
            alert('Perfil atualizado com sucesso!');
            setEditing(false);
        } catch (error) {
            alert('Erro ao atualizar perfil: ' + error.message);
        }
    };

    const selecaoImagem = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets) {
                const selectedImage = response.assets[0];
                setProfileImage(selectedImage.uri);
                console.log('[INFO] Imagem selecionada:', selectedImage.uri);
            } else {
                console.log('Seleção de imagem cancelada ou sem ativos.');
            }
        });
    };


    useEffect(() => {
        fetchProfileData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Tentar novamente" onPress={fetchProfileData} />
            </View>
        );
    }

    return (
        <View style={styles.Informacoescontainer}>
            {profileData ? (
                <>
                    <TouchableOpacity onPress={editing ? selecaoImagem : null}>
                        <Image
                            source={profileImage ? { uri: profileImage } : require('../../assets/FotosPerfil/Foto-perfil-Anonima.jpg')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>

                    <Text style={styles.name}>{profileData.nome}</Text>
                    <Text style={styles.email}>Email Institucional: {profileData.emailInstitucional}</Text>
                    <Text style={styles.email}>Email Pessoal: {emailPessoal}</Text>
                    <Text style={styles.email}>Número Celular: {numeroCelular}</Text>

                    {editing && (
                        <>
                            <Text style={styles.email}>Insira aqui Seu Email Pessoal:</Text>
                            <TextInput
                                style={styles.input}
                                value={emailPessoal}
                                onChangeText={setEmailPessoal}
                                placeholder="Digite seu email pessoal"
                            />
                            <Text style={styles.email}>Insira aqui seu Número de Telefone:</Text>
                            <TextInput
                                style={styles.input}
                                value={numeroCelular}
                                onChangeText={setNumeroCelular}
                                placeholder="Digite seu número de telefone"
                            />
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={editing ? updateProfileData : () => setEditing(true)}
                    >
                        <Text style={styles.buttonText}>{editing ? 'Salvar Alterações' : 'Editar Perfil'}</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Perfil não encontrado.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    Informacoescontainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default PerfilGestao;
