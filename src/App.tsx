import React from "react";
import ParamEditor, { type Model, type Param } from "./ParamEditor";


const model: Model = {
  paramValues: [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ]
}
const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string"

  },
  {
    id: 2,
    name: "Длина",
    type: "string"
  }
]

function App() {
  return (
    <ParamEditor
      model={model} params={params} />
  )
}

export default App;
