import RootRouter from './routes/ReactRouter'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import Header from './layouts/Header'

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </div>
  )
}

export default App
