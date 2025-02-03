import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

//O teste de fumaça tem como objetivo apenas validar a execução da API, ou seja, ver no mínimo o sistema funciona sem quebrar
export const options = {
    iterations: 1,
    vus: 1
};

export default function () {
    const res = http.get('https://serverest.dev/usuarios?nome=Thomas');
    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res, { 'sem usuários na lista': (r) => r.body.quantidade == 1 });
    sleep(1);
}