import {Routes, Route} from "react-router-dom"
import './App.css'
import LobbyScreen from "./components/Lobby"
import RoomPage from "./components/Room"

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<LobbyScreen/>}> </Route>
          <Route path="/room/:roomId" element={<RoomPage/>}> </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
