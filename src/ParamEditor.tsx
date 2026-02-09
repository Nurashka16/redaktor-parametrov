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
    this.state = { selectedParam: new Map() };
  }

  public getModel(): Model {
    return { paramValues: [] };
  }

  render() {
    return <div></div>;
  }
}

export default ParamEditor;