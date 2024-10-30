import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

const PerfilGestao = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [emailPessoal, setEmailPessoal] = useState('');

    const fetchProfileData = async () => {
        try {
            const idPessoa = '1'; // Exemplo de ID
            const response = await fetch(`http://localhost:3000/perfil/${idPessoa}`);

            if (response.ok) {
                const data = await response.json();
                console.log('[INFO] Dados do perfil recebidos:', data);
                setProfileData(data);
                setEmailPessoal(data.emailPessoal || ''); // Define o email pessoal, se existir
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
        try {
            const idPessoa = '1'; // Exemplo de ID
            const response = await fetch(`http://localhost:3000/perfil/${idPessoa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailPessoal }),
            });

            if (response.ok) {
                alert('Perfil atualizado com sucesso!');
                setEditing(false);
                fetchProfileData(); // Atualiza os dados do perfil
            } else {
                console.warn('[AVISO] Não foi possível atualizar o perfil:', response.status);
                setError('Erro ao atualizar perfil.');
            }
        } catch (error) {
            console.error('[ERRO] Erro ao atualizar dados do perfil:', error);
            setError('Erro ao atualizar dados do perfil.');
        }
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
                    <Text style={styles.name}>{profileData.nome}</Text>
                    <Text style={styles.email}>Email Institucional: {profileData.emailInstitucional}</Text>
                    <Text style={styles.email}>Email Pessoal:</Text>
                    {editing ? (
                        <TextInput
                            style={styles.input}
                            value={emailPessoal}
                            onChangeText={setEmailPessoal}
                            placeholder="Digite seu email pessoal"
                        />
                    ) : (
                        <Text style={styles.email}>{profileData.emailPessoal}</Text>
                    )}
                    {editing ? (
                        <Button title="Salvar Alterações" onPress={updateProfileData} />
                    ) : (
                        <Button title="Editar Perfil" onPress={() => setEditing(true)} />
                    )}
                </>
            ) : (
                <Text>Perfil não encontrado.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default PerfilGestao;
