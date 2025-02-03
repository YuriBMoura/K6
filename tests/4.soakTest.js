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
        {duration:'2m',target:400},
        {duration:'3h56m',target:400},
        {duration:'2m',target:0}
    ]
};

//Garante a confiabilidade em longos períodos de tempo
//Pontos considerados:
//1 - O sistema não sofre de bugs ou vazamentos de memória
//2 - Verifique se as reinicializações inesperadas do aplicativo não perdem solicitações
//3 - Encontre bugs relacionados a condições de corrida que aparecem esporadicamente
//** Condição de corrida: Quando 2 recursos computacionais tentam acessar a mesma informação
//4 - Certificar que o banco de dados não esgote o espaço de armazenamento alocado e pare
//5 - Certificar que os logs não esgote o espaço de armazenamento em disco alocado
//6 - Certificar que os serviços externos dos quais o sistema consome não parem de funcionar após uma certa quantidade de solicitações

//trabalhar com 80% da carga de usuários máximos evitando o ponto de ruptura da aplicação
//validar requisitos de infraestrutura da empresa para validar os custos envolvidos no teste
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