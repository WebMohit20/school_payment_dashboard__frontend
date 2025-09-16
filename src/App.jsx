import './App.css'
import TransactionsOverview from './dashboardPages/TransactionsOverview'


function App() {
  return (
    <div data-theme={"light"}>
    <div className="min-h-screen flex  items-start justify-center bg-base-200">
      {/* <h1 className="text-3xl font-bold">🚀 DaisyUI + Tailwind v4</h1> */}
      <TransactionsOverview/>
      {/* <button className="btn btn-primary mt-4">Primary Button</button> */}

      {/* <div className="loading loading-spinner loading-lg mt-4">loader</div> */}
    </div>
    </div>
  )
}

export default App
