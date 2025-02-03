import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    stages:[
        {duration:'10s',target:100},
        {duration:'1m',target:100},
        {duration:'10s',target:1400},
        {duration:'3m',target:1400},
        {duration:'10s',target:100},
        {duration:'3m',target:100},
        {duration:'10s',target:0}
    ]
};

//Critérios
//1 - Excelente o sistema não apresenta queda na performance, apresentando tempo de resposta semelhante durante o tráfego baixo e alto
//2 - Bom o sistema apresenta um aumento no tempo de reposta, mas o sistema não apresenta falha
//3 - Insatisfatório o sistema apresenta falhas durante o tráfego alto, mas retorna a funcionar durante o tráfego baixo
//4 - Ruim o sistema trava e não se recupera depois que o tráfego diminui

export default function () {
    const res = http.get('https://serverest.dev/usuarios?nome=Thomas');
    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res, { 'sem usuários na lista': (r) => r.body.quantidade == 1 });
    sleep(1);
}