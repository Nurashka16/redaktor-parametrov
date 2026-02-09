import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ParamEditor, { type Props } from './ParamEditor';

const propsFirstTest: Props = {
    model: {
        paramValues: [
            { "paramId": 1, "value": "a" },
            { "paramId": 2, "value": "б" },
            { "paramId": 3, "value": "в" }
        ]
    },
    params: [
        { id: 1, name: "Назначение", type: "string" },
        { id: 2, name: "Длина", type: "string" }
    ]
};

const propsSecondTest: Props = {
    model: {
        paramValues: [
            { "paramId": 1, "value": "a" },
            { "paramId": 1, "value": "б" }
        ]
    },
    params: [
        { id: 1, name: "Назначение", type: "string" }
    ]
};

const propsThirdTest: Props = {
    model: {
        paramValues: [
            { "paramId": 1, "value": "a" },
            { "paramId": 1, "value": "б" }
        ]
    },
    params: [
        { id: 1, name: "Назначение", type: "string" }
    ]
};

describe('ParamEditor', () => {
    test('отображает все параметры', () => {
        render(<ParamEditor {...propsFirstTest} />);

        const firstParam = screen.getByText("Назначение");
        const secondParam = screen.getByText("Длина");
        const inputs = screen.getAllByRole("textbox");

        expect(firstParam).toBeInTheDocument();
        expect(secondParam).toBeInTheDocument();
        expect(inputs).toHaveLength(2);
        expect(inputs[0]).toHaveValue("a");
        expect(inputs[1]).toHaveValue("б");
    });

    test('инициализирует значения из model', () => {
        render(<ParamEditor {...propsSecondTest} />);
        const firstParam = screen.getByText("Назначение");
        const input = screen.getAllByRole("textbox");

        expect(firstParam).toBeInTheDocument();
        expect(input).toHaveLength(1);
        expect(input[0]).toHaveValue("б");
    });

    test('getModel возвращает обновлённые значения', () => {
        const myRef = React.createRef<ParamEditor>();
        render(<ParamEditor ref={myRef} {...propsThirdTest} />);
        const input = screen.getAllByRole("textbox");
        fireEvent.change(input[0], { target: { value: "новое значение" } });

        if (myRef.current) {
            const result = myRef.current.getModel();
            expect(result.paramValues[0].value).toBe("новое значение");
        }
    });
});