 /* Aula 8: Mini projeto 1 - Calculadora simples

    Crie uma calculadora simples que permita ao usuário realizar operações básicas como adição, subtração, 
    multiplicação e divisão.
    A calculadora deve solicitar ao usuário dois números e a operação desejada, 
    e então exibir o resultado da operação.
    Tambbém deve permitir que o usuário realize múltiplas operações até que ele decida sair.
 
 */
const prompt = require('prompt-sync')({ sigint: true });

console.log("Bem-vindo à Calculadora Simples!");
let continuar = true;

while (continuar) {
    const num1 = parseFloat(prompt("Digite o primeiro número: "));
    const num2 = parseFloat(prompt("Digite o segundo número: "));
    const operacao = prompt("Escolha a operação (+, -, *, /) ou 'sair' para encerrar: ");

    let resultado;
    switch (operacao) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                console.log("Erro: Divisão por zero não é permitida.");
                continue;
            }
            break;
        case 'sair':
            continuar = false;
            console.log("Encerrando a calculadora. Até mais!");
            continue;
        default:
            console.log("Operação inválida. Tente novamente.");
            continue;
    }

    console.log(`O resultado de ${num1} ${operacao} ${num2} é: ${resultado}`);
}   

