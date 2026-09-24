import TelaInicial from "./Componenetes/TelaInicial"
import TelaVideo from "./Componenetes/TelaVideo"
import TelaCiranda from "./Componenetes/TelaCiranda"
import TelaExemplos from "./Componenetes/TelaExemplos"
import TelaAtividades from "./Componenetes/TelaAtividades"
import TelaNiveis from "./Componenetes/TelaNiveis"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaAtividade from "./Componenetes/TelaAtividade"

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaInicial />} />
                <Route path="/video" element={<TelaVideo />}/>
                <Route path="/ciranda" element={<TelaCiranda />}/>
                <Route path="/exemplos" element={<TelaExemplos />}/>
                <Route path="/atividades" element={<TelaAtividades />}/>
                <Route path="/atividade/:nomeAtividade" element={<TelaNiveis />} />
                <Route path="/atividade/:nomeAtividade/:nivel/:passo" element={<TelaAtividade/>}/>
            </Routes>
        </BrowserRouter>
    )
}