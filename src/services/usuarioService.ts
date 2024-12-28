// src/services/usuarioService.ts

const API_URL = 'http://localhost:3001/usuarios';

export interface Usuario {
    id?: string;
    ativo: boolean;
    nome: string;
    genero: string;
    cpf: string;
    dataNascimento: string;
    rg: string;
    cargo: string;
    usaEpi: boolean;
    atividade: string;
    epi: string;
    numeroCa: string;
    arquivo: string;
}

export const criarUsuario = async (usuario: Usuario): Promise<Usuario> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Erro ao criar usuário');
    }
};

export const obterUsuarios = async (): Promise<Usuario[]> => {
    const response = await fetch(API_URL);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Erro ao obter usuários');
    }
};

export const atualizarUsuario = async (id: number, usuarioAtualizado: Usuario): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Erro ao atualizar usuário');
    }
};

export const deletarUsuario = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
    }
};