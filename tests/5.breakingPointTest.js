import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import executors from '../utils/executors';

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    executor: executors.usuariosVirtuaisContantes,
    stages:[
        {duration:'2h',target:20000}
    ]
};

//Teste de ponto de interrupção, também conhecido como teste de capacidade, teste de carga pontual ou teste de limite
//Qual a finalidade desse teste?
//1 - Ajustar/Cuidar de pontos fracos do sistema, buscando limites maiores suportados pelo sistema
//2 - Ajudar a planejar e verificar a correção de sistema com baixo limite de utilização
// Quando executar um breakpoint teste?
//1 - Após mudanças significativas na base de código/infraestrutura
//2 - Consumo elevado de recursos pelo seu sistema
//3 - Carga do sistema cresce continuamente?
//Pontos de atenção
//1 - Atenção com a elasticidade de ambiente de nuvem
//2 - Aumento de carga gradual para essa modalidade
//3 - Tipo de teste de ciclo iterativo
//4 - Interrupção manual ou automática
//Neste teste utilizaremos Thresholds para interrupção do teste, quando houver estouro no limite de falhas programadas.

export default function () {
    const res = http.get('https://serverest.dev/usuarios?nome=Thomas');
    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res, { 'sem usuários na lista': (r) => r.body.quantidade == 1 });
    sleep(1);
}