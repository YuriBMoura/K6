import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import executors from './utils/executors.js';

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    scenarios: {
        contacts: {
            executor: executors.iteracoesCompartilhadas,
            iterations: 100,
            vus: 5
        }
    }
};

export default function () {
    const res = http.get('https://serverest.dev/usuarios?nome=Thomas');
    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res, { 'sem usuários na lista': (r) => r.body.quantidade == 1 });
    sleep(1);
}