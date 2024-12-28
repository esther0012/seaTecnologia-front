import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import Home from './components/home';
import Edicao from './components/edicao';
import Tabela from './components/tabela';
import Notificacao from './components/notificacao';
import Historico from './components/historico';
import MeuUsuario from './components/meuUsuario';
import { FaRegBuilding } from '@react-icons/all-files/fa/FaRegBuilding';
import { FaRegEdit } from '@react-icons/all-files/fa/FaRegEdit';
import { AiOutlineApartment } from '@react-icons/all-files/ai/AiOutlineApartment';
import { FaRegBell } from '@react-icons/all-files/fa/FaRegBell';
import { FaHistory } from '@react-icons/all-files/fa/FaHistory';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import './App.css';
import './index.css';
import StepsLayout from "./components/stepsLayout";
import Item2 from "./components/item2";
import Item1 from "./components/item1";

const App = () => {
    return (
        <Router>
            <AntLayout style={{ minHeight: '100vh' }}>
                <Sider
                    width={56}
                    style={{
                        height: '768px',
                        padding: 0,
                        overflow: 'hidden',
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        position: 'relative'
                    }}
                >
                    <div className="sidebar-bar"></div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
                            background: 'var(--Default, #649FBF)',
                            borderRight: 30,
                            gap: '0px',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <Menu.Item key="1" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><FaRegBuilding className="icon" /></div>}>
                            <Link to="/home">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><FaRegEdit className="icon" /></div>}>
                            <Link to="/">Edição</Link>
                        </Menu.Item>
                        <Menu.Item key="3" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><AiOutlineApartment className="icon" /></div>}>
                            <Link to="/tabelas">Tabelas</Link>
                        </Menu.Item>
                        <Menu.Item key="4" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><FaRegBell className="icon" /></div>}>
                            <Link to="/notificacoes">Notificações</Link>
                        </Menu.Item>
                        <Menu.Item key="5" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><FaHistory className="icon" /></div>}>
                            <Link to="/historico">Histórico</Link>
                        </Menu.Item>
                        <Menu.Item key="6" style={{ display: 'flex', justifyContent: 'center' }} icon={<div className="icon-container"><FaUser className="icon" /></div>}>
                            <Link to="/meu-usuario">Meu Usuário</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <AntLayout>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="/" element={<StepsLayout />}>
                                <Route index element={<Edicao />} />
                                <Route path="etapa1" element={<Item1 />} />
                                <Route path="etapa2" element={<Item2 />} />
                                <Route path="etapa3" element={<Edicao />} />
                                <Route path="etapa4" element={<Edicao />} />
                                <Route path="etapa5" element={<Edicao />} />
                                <Route path="etapa6" element={<Edicao />} />
                                <Route path="etapa7" element={<Edicao />} />
                                <Route path="etapa8" element={<Edicao />} />
                                <Route path="etapa9" element={<Edicao />} />
                            </Route>
                            <Route path="tabelas" element={<Tabela />} />
                            <Route path="notificacoes" element={<Notificacao />} />
                            <Route path="historico" element={<Historico />} />
                            <Route path="meu-usuario" element={<MeuUsuario />} />
                        </Routes>
                    </Content>
                </AntLayout>
            </AntLayout>
        </Router>
    );
};

export default App;