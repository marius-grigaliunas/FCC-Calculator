import { Calculator } from "./Components/Calculator.tsx"

function App() {

  // different colors gradient

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="p-4 border ">
          <h1>Calculator </h1>
          <Calculator/>
        </div>
      </div>
    </>
  )
}

export default App
