import React, { useState, useEffect } from 'react';
import { Switch, Form, Popover, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import '../App.css';
import Foto from '../assets/Foto.png';
import elementos from '../assets/elementos.png';
import { Usuario, deletarUsuario } from "../services/usuarioService";

const Item1 = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [showOnlyActive, setShowOnlyActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3001/usuarios');
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSwitchChange = (checked: boolean) => {
        setIsButtonDisabled(!checked);
    };

    const handleAddEmployee = () => {
        navigate('/etapa2');
    };

    const handleShowOnlyActive = () => {
        setShowOnlyActive(!showOnlyActive);
    };

    const handleClearFilters = () => {
        setShowOnlyActive(false);
    };

    const handleEdit = (id: string) => {
        // Lógica para editar o usuário
    };

    const handleDelete = async (id: string) => {
        try {
            await deletarUsuario(id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const quantidadeUsuarios = usuarios.filter(usuario => usuario.ativo);
    const usuariosFiltrados = showOnlyActive ? usuarios.filter(usuario => usuario.ativo) : usuarios;

    const popoverContent = (id: string) => (
        <div>
            <Button type="link" onClick={() => handleEdit(id)}>Editar</Button>
            <Button type="link" danger onClick={() => handleDelete(id)}>Excluir</Button>
        </div>
    );

    return (
        <div>
            <div className="etapa1-direction">
                <div className="etapa1-content">
                    <div>
                        <p className="p-margin">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            In suscipit suscipit porttitor. Suspendisse ex lorem,
                            rhoncus nec ante eu, venenatis aliquam turpis. Nulla
                            facilisi. Curabitur nec mattis dolor. Nulla finibus
                            bibendum ligula tempus vehicula. Ut at tristique libero,
                            nec efficitur dui. Aliquam erat volutpat. Fusce quam sem,
                            tempus nec justo eget, luctus scelerisque velit. Nam
                            sollicitudin purus urna, vitae ornare neque tincidunt vel.
                            Proin ac lacinia erat, et commodo felis. Phasellus tempor
                            tellus eu vulputate tempus.
                        </p>
                    </div>
                    <div className="etapa1-img">
                        <img src={Foto} alt="Foto"/>
                    </div>
                </div>
                <div>
                    <div className="quadrado">Funcionário(s)</div>
                    <div className="barra">
                        <div>
                            <button className="novo-botao" onClick={handleAddEmployee}>
                                + Adicionar Funcionário
                            </button>
                        </div>
                        <div className="botoes-container">
                            <button className="botao" onClick={handleShowOnlyActive}>
                                Ver apenas ativos
                            </button>
                            <button className="botao1" onClick={handleClearFilters}>
                                Limpar filtros
                            </button>
                            <div
                                className="quantidade-ativos">Ativos {quantidadeUsuarios.length}/{usuarios.length}</div>
                        </div>
                        {usuariosFiltrados.length > 0 ? (
                            usuariosFiltrados.map((usuario: Usuario) => (
                                <div key={usuario.id} className="barra-funcionarios">
                                    <div className="usuario-info">
                                        <p className="usuario-nome p-margin">Nome: {usuario.nome}</p>
                                        <div className="usuario-detalhes">
                                            <p className="usuario-cpf p-margin">CPF: {usuario.cpf}</p>
                                            <p className="usuario-cargo p-margin">Cargo: {usuario.cargo}</p>
                                            <p className="usuario-status p-margin">Status: {usuario.ativo ? 'Ativo' : 'Inativo'}</p>
                                        </div>
                                    </div>
                                    <div className="barra-direita">
                                        <Popover content={popoverContent(usuario.id ?? '')} trigger="click">
                                            <div className="elemento-barra">
                                                <div className="elemento-barra">
                                                    ...
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-margin">Nenhum usuário encontrado.</p>
                        )}
                        <div className="switch">
                            <p className="etapa-switch">A etapa está concluída?</p>
                            <Form
                                name="switchForm"
                                initialValues={{ativo: false}}
                            >
                                <Form.Item
                                    name="ativo"
                                    valuePropName="checked"
                                >
                                    <Switch
                                        defaultChecked={false}
                                        onChange={handleSwitchChange}
                                        checkedChildren="Sim"
                                        unCheckedChildren="Não"
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="proximo-passo-custom">
                        <button className="proximo-passo" disabled={isButtonDisabled} onClick={handleAddEmployee}>
                            Próximo passo
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <img src={elementos} alt="elementos" className="elementos-img"/>
            </div>
        </div>
    );
};

export default Item1;