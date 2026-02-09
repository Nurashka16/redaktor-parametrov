import React from "react";

type Color = "red" | "blue";

export interface Param {
  id: number;
  name: string;
  type: "string";
}
interface ParamValue {
  paramId: number;
  value: string;
}
export interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface State {
  selectedParam: Map<number, string>;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialMap = new Map<number, string>();
    this.props.params.forEach((param) => {
      const values = this.props.model.paramValues
        .filter(pv => pv.paramId === param.id)
        .map(pv => pv.value);
      initialMap.set(param.id, values.length > 0 ? values[values.length - 1] : "");
    });
    this.state = { selectedParam: initialMap };
  }

  public getModel(): Model {
    const paramValues = this.props.params.map(param => ({
      paramId: param.id,
      value: this.state.selectedParam.get(param.id) || ""
    }));
    return {
      paramValues,
      ...(this.props.model.colors !== undefined && { colors: this.props.model.colors })
    };
  }

  public changeParamsModel(id: number, value: string) {
    this.setState(prevState => {
      const newMap = new Map(prevState.selectedParam);
      newMap.set(id, value);
      return { selectedParam: newMap };
    });
  }

  render() {
    const { params } = this.props;
    return (
      <div>
        {params.map((param) => (
          <div key={param.id} style={{ textAlign: "center" }}>
            <span>{param.name}</span>
            <input
              type="text"
              value={this.state.selectedParam.get(param.id) ?? ""}
              onChange={(e) => this.changeParamsModel(param.id, e.target.value)}
              style={{ marginLeft: "10px", marginTop: "5px" }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor;