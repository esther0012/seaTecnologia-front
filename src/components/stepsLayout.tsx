import React, { useEffect } from 'react';
import { Steps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaRegBuilding } from '@react-icons/all-files/fa/FaRegBuilding';
import '../App.css';

const { Step } = Steps;

const StepsLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const steps = [
        { title: 'Item 1', route: '/etapa1' },
        { title: 'Item 2', route: '/etapa2' },
        { title: 'Item 3', route: '/etapa3' },
        { title: 'Item 4', route: '/etapa4' },
        { title: 'Item 5', route: '/etapa5' },
        { title: 'Item 6', route: '/etapa6' },
        { title: 'Item 7', route: '/etapa7' },
        { title: 'Item 8', route: '/etapa8' },
        { title: 'Item 9', route: '/etapa9' },
    ];

    const currentStep = steps.findIndex(step => step.route === location.pathname);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/etapa1');
        }
    }, [location, navigate]);

    const onStepChange = (current: number) => {
        navigate(steps[current].route);
    };

    return (
        <div className="steps-layout-container">
            <div className="edicao-bar">
                <div className="steps-container">
                    <Steps current={currentStep} onChange={onStepChange} direction="horizontal">
                        {steps.map((step, index) => (
                            <Step
                                key={index}
                                icon={
                                    <div className="steps-icon-container">
                                        <FaRegBuilding className="steps-icon" />
                                    </div>
                                }
                                title={step.title}
                            />
                        ))}
                    </Steps>
                </div>
                <div className="linha-pontilhada"></div>
            </div>
            <Outlet />
        </div>
    );
};

export default StepsLayout;