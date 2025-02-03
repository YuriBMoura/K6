// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from 'k6/http';

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { check, sleep } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }


export const options = {
    // Define the number of iterations for the test
    iterations: 10,
    vus:5
};

//Checks são usados para criar métricas booleanas, por exemplo, caso você tenha um retorno diferente de statusCode == 200, essa fará um levantamento de casos de sucesso e falha, mas se quiser que uma falhar pare os testes, a mesma deve ser associada a um Thresholds

//Exemplos de Métricas CHECKS
// check(res, {
//     'is status 200': (r) => r.status === 200,
//   });

//   check(res, {
//     'verify homepage text': (r) =>
//       r.body.includes('Collection of simple web-pages suitable for load testing'),
//   });


//Thresholds são os critérios de aceitação para os testes de carga seguirem, por exemplo, caso eu tenha um escopo de testes que espera que 1% apenas das requisições falhem e 95% sejam executadas em menos de 200ms
// export const options = {
//     thresholds: {
//       http_req_failed: ['rate<0.01'], // http errors should be less than 1%
//       http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
//     },
//   };
  

// k6 run my-first-test.js --vus 1000 --summary-trend-stats="med,p(95),p(99.9)"

// export const options = {
//     vus: 10,
//     duration: '30s',
//   };

//Para definir RampUp e RampDown, utilizamos a propriedade stages
// export const options = {
//     stages: [
//       { duration: '30s', target: 20 },
//       { duration: '1m30s', target: 10 },
//       { duration: '20s', target: 0 },
//     ],
//   };


// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
    // Make a GET request to the target URL
    const res = http.get('https://serverest.dev/usuarios?nome=Thomas');

    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res, { 'sem usuários na lista': (r) => r.body.quantidade == 1 });

    console.log(res)

    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}