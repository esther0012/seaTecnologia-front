import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Foto from "../assets/Foto.png";
import {Button, Checkbox, Form, Input, Radio, Select, Switch, Upload} from "antd";
import elementos from "../assets/elementos.png";
import {UploadOutlined} from '@ant-design/icons';
import InputMask from 'react-input-mask';
import {criarUsuario, obterUsuarios, Usuario} from '../services/usuarioService';

const {Option} = Select;

const Item2 = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [hideDivs, setHideDivs] = useState(false);
    const [activities, setActivities] = useState<{}[]>([]);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [epis, setEpis] = useState<{}[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosObtidos = await obterUsuarios();
                setUsuarios(usuariosObtidos);
            } catch (error) {
                console.error('Erro ao obter usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSwitchChange = (checked: boolean) => {
        setIsButtonDisabled(!checked);
    };

    const handleSubmit = async (values: any) => {
        try {
            const novoUsuario = await criarUsuario(values);
            console.log('Usuário criado:', novoUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    const handleAddActivity = () => {
        setActivities([...activities, {}]);
    };

    const handleAddEmployee = () => {
        navigate('/etapa3');
    };

    const handleRemoveEmployee = () => {
        navigate('/etapa1');
    };

    const handleRemoveActivity = (index: number) => {
        setActivities(activities.filter((_, i) => i !== index));
    };

    const handleAddEpi = () => {
        setEpis([...epis, {}]);
    };

    const handleRemoveEpi = (index: number) => {
        setEpis(epis.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="etapa1-direction">
                <div className="etapa1-content">
                    <div>
                        <p>
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
                    <div className="barra1">
                        <div className="barra-customizada">
                            <div className="switch">
                                <p className="etapa-switch">O trabalhador está ativo ou inativo?</p>
                            </div>
                            <div>
                                <Switch
                                    defaultChecked={false}
                                    onChange={handleSwitchChange}
                                    checkedChildren="Ativo"
                                    unCheckedChildren="Inativo"
                                />
                            </div>
                        </div>
                        <div className="barra-customizada" style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                <div style={{flex: 1}}>
                                    <p>Nome</p>
                                    <Form
                                        form={form}
                                        name="basic"
                                        initialValues={{remember: true}}
                                        onFinish={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="nome"
                                            rules={[{required: true, message: 'Por favor, insira seu nome!'}]}
                                        >
                                            <Input placeholder="Digite o nome"/>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div style={{flex: 1}}>
                                    <p>Gênero</p>
                                    <Form
                                        form={form}
                                        initialValues={{gender: null}}
                                        onFinish={handleSubmit}
                                        layout="vertical"
                                    >
                                        <Form.Item
                                            name="genero"
                                            rules={[{required: true, message: 'Por favor, selecione seu gênero!'}]}
                                        >
                                            <Radio.Group>
                                                <Radio value="female">Feminino</Radio>
                                                <Radio value="male">Masculino</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                <div style={{flex: 1}}>
                                    <p>CPF</p>
                                    <Form
                                        form={form}
                                        name="basic2"
                                        initialValues={{remember: true}}
                                        onFinish={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="cpf"
                                            rules={[{required: true, message: 'Por favor, insira seu CPF!'}]}
                                        >
                                            <InputMask mask="999.999.999-99" placeholder="Digite o CPF">
                                                {(inputProps: any) => <Input {...inputProps} />}
                                            </InputMask>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div style={{flex: 1}}>
                                    <p>Data de Nascimento</p>
                                    <Form
                                        form={form}
                                        name="basic2"
                                        initialValues={{remember: true}}
                                        onFinish={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="dataNascimento"
                                            rules={[{
                                                required: true,
                                                message: 'Por favor, insira sua Data de Nascimento!'
                                            }]}
                                        >
                                            <InputMask mask="99/99/9999" placeholder="Digite a data de nascimento">
                                                {(inputProps: any) => <Input {...inputProps} />}
                                            </InputMask>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                <div style={{flex: 1}}>
                                    <p>RG</p>
                                    <Form
                                        form={form}
                                        name="basic3"
                                        initialValues={{remember: true}}
                                        onFinish={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="rg"
                                            rules={[{required: true, message: 'Por favor, insira seu RG!'}]}
                                        >
                                            <InputMask mask="999999-9" placeholder="Digite o RG">
                                                {(inputProps: any) => <Input {...inputProps} />}
                                            </InputMask>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div style={{flex: 1}}>
                                    <p>Cargo</p>
                                    <Form
                                        form={form}
                                        name="basic2"
                                        initialValues={{remember: true}}
                                        onFinish={handleSubmit}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="cargo"
                                            rules={[{required: true, message: 'Por favor, insira seu cargo!'}]}
                                        >
                                            <Input placeholder="Digite o cargo"/>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <div className="barra-customizada" style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                <div style={{flex: 1}}>
                                    <p>Quais EPIs o trabalho usa na atividade?</p>
                                    <div style={{flex: 1}}>
                                        <Form
                                            form={form}
                                            name="basic2"
                                            initialValues={{remember: true}}
                                            onFinish={handleSubmit}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                name="usaEpi"
                                                valuePropName="checked"
                                            >
                                                <Checkbox onChange={(e) => setHideDivs(e.target.checked)}>
                                                    O trabalhador não usa EPI.
                                                </Checkbox>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            {!hideDivs && (
                                <div className="barra-customizada" style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{flex: 1, width: '100%'}}>
                                        <p>Selecione a atividade:</p>
                                        <Form
                                            form={form}
                                            name="basic2"
                                            initialValues={{remember: true}}
                                            onFinish={handleSubmit}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                name="atividade"
                                                rules={[{
                                                    required: true,
                                                    message: 'Por favor, selecione sua atividade!'
                                                }]}
                                            >
                                                <Select>
                                                    <Option value="atividade1">Atividade 1</Option>
                                                    <Option value="atividade2">Atividade 2</Option>
                                                </Select>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div style={{flex: 1, width: '100%'}}>
                                        <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                            <div style={{flex: 1}}>
                                                <p>Selecione o EPI:</p>
                                                <Form
                                                    form={form}
                                                    name="basic2"
                                                    initialValues={{remember: true}}
                                                    onFinish={handleSubmit}
                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                        name="epi"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Por favor, selecione seu EPI!'
                                                        }]}
                                                    >
                                                        <Select>
                                                            <Option value="calcado">Calçado de segurança</Option>
                                                            <Option value="capacete">Capacete</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                            <div style={{flex: 1}}>
                                                <p>Informe o número do CA:</p>
                                                <Form
                                                    form={form}
                                                    name="basic2"
                                                    initialValues={{remember: true}}
                                                    onFinish={handleSubmit}
                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                        name="numeroCa"
                                                        rules={[{required: true, message: 'Por favor, insira seu CA!'}]}
                                                    >
                                                        <InputMask mask="9999" placeholder="Digite o número do CA">
                                                            {(inputProps: any) => <Input {...inputProps} />}
                                                        </InputMask>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                            <div>
                                                <button className="botaoEpi" onClick={handleAddEpi}>Adicionar EPI
                                                </button>
                                            </div>
                                        </div>
                                        {epis.map((_, index) => (
                                            <div key={index} style={{display: 'flex', gap: '20px', width: '100%'}}>
                                                <div style={{flex: 1}}>
                                                    <p>Selecione o EPI:</p>
                                                    <Form
                                                        form={form}
                                                        name="basic2"
                                                        initialValues={{remember: true}}
                                                        onFinish={handleSubmit}
                                                        autoComplete="off"
                                                    >
                                                        <Form.Item
                                                            name={`epi${index}`}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Por favor, selecione seu EPI!'
                                                            }]}
                                                        >
                                                            <Select>
                                                                <Option value="calcado">Calçado de segurança</Option>
                                                                <Option value="capacete">Capacete</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                                <div style={{flex: 1}}>
                                                    <p>Informe o número do CA:</p>
                                                    <Form
                                                        form={form}
                                                        name="basic2"
                                                        initialValues={{remember: true}}
                                                        onFinish={handleSubmit}
                                                        autoComplete="off"
                                                    >
                                                        <Form.Item
                                                            name={`numeroCa${index}`}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Por favor, insira seu CA!'
                                                            }]}
                                                        >
                                                            <InputMask mask="9999" placeholder="Digite o número do CA">
                                                                {(inputProps: any) => <Input {...inputProps} />}
                                                            </InputMask>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                                <div>
                                                    <button className="botaoEpi"
                                                            onClick={() => handleRemoveEpi(index)}>Excluir EPI
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {activities.map((_, index) => (
                                        <div key={index} className="barra-customizada" style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <div style={{flex: 1, width: '100%'}}>
                                                <p>Selecione a atividade:</p>
                                                <Form
                                                    form={form}
                                                    name="basic2"
                                                    initialValues={{remember: true}}
                                                    onFinish={handleSubmit}
                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                        name={`atividade${index}`}
                                                        rules={[{
                                                            required: true,
                                                            message: 'Por favor, selecione sua atividade!'
                                                        }]}
                                                    >
                                                        <Select>
                                                            <Option value="atividade1">Atividade 1</Option>
                                                            <Option value="atividade2">Atividade 2</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                gap: '20px',
                                                width: '100%',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div style={{flex: 1}}>
                                                    <p>Selecione o EPI:</p>
                                                    <Form
                                                        form={form}
                                                        name="basic2"
                                                        initialValues={{remember: true}}
                                                        onFinish={handleSubmit}
                                                        autoComplete="off"
                                                    >
                                                        <Form.Item
                                                            name={`epi${index}`}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Por favor, selecione seu EPI!'
                                                            }]}
                                                        >
                                                            <Select>
                                                                <Option value="calcado">Calçado de segurança</Option>
                                                                <Option value="capacete">Capacete</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                                <div style={{flex: 1}}>
                                                    <p>Informe o número do CA:</p>
                                                    <Form
                                                        form={form}
                                                        name="basic2"
                                                        initialValues={{remember: true}}
                                                        onFinish={handleSubmit}
                                                        autoComplete="off"
                                                    >
                                                        <Form.Item
                                                            name={`numeroCa${index}`}
                                                            rules={[{
                                                                required: true,
                                                                message: 'Por favor, insira seu CA!'
                                                            }]}
                                                        >
                                                            <InputMask mask="9999" placeholder="Digite o número do CA">
                                                                {(inputProps: any) => <Input {...inputProps} />}
                                                            </InputMask>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                                <div>
                                                    <button className="botaoEpi">Adicionar EPI</button>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="botao-excluir-atividade"
                                                        onClick={() => handleRemoveActivity(index)}>
                                                    Excluir atividade
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <button className="adicionar-atividade" onClick={handleAddActivity}>
                                            Adicionar outra atividade
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!hideDivs && (
                            <div className="barra-customizada" style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <p>Adicione Atestado de Saúde (opcional):</p>
                                <div style={{display: 'flex', gap: '20px', width: '100%'}}>
                                    <Upload>
                                        <Button icon={<UploadOutlined/>} className="adicionar-atividade">
                                            Selecionar arquivo
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                        )}
                        <div>
                            <button className="salvar" onClick={form.submit}>
                                Salvar
                            </button>
                        </div>
                    </div>
                    <div className="passo-container">
                        <div className="passo-anterior-custom">
                            <button className="passo-anterior" onClick={handleRemoveEmployee}>
                                Passo anterior
                            </button>
                        </div>
                        <div className="proximo-passo-custom">
                            <button className="proximo-passo" onClick={handleAddEmployee}>
                                Próximo passo
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <img src={elementos} alt="elementos" className="elementos-img"/>
            </div>
        </div>
    );
};

export default Item2;