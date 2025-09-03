/* Aula 9: Mini projeto 2 - Conclave
Aplicar os conceitos de: vetores, laços de repetição, contadores e acumuladores, estrutura de decisão;
Entrada e saída de dados, Menus e lógica condicional ( 2/3 dos votos).

    Crie um programa que simule um conclave onde os cardeais votam para eleger um novo Papa.
    O programa deve permitir que o usuário insira o número de cardeais participantes e, em seguida, 
    solicitar que cada cardeal vote em um dos candidatos disponíveis.

    Arquitetura do sistema:

    Cada cardeal tem direito a um voto válido, e deve ter menos de 80 anos para participar da votação,
    calculados com base na data de nascimento fornecida.
    Serão 5 candidatos (1, 2, 3, 4, 5), considerados os "preferiti" no conclave.
    
    Estrutura para votação:

    - Inicialmete, o sistema de perguntar o número de cardeais participantes (entre 1 e 135). Se o número de 
    cardeais for inválido (não estando entre 1 e 135), o sistema deve informar que o número é inválido e 
    solicitar que o usuário tente novamente;
    - O sistema deve perguntar o idioma que o cardeal deseja conduzir a votação,
    podendo ser Português-BR, Inglês ou Italiano.
    - Depois, o sistema deve perguntar (já no idioma escolhido) a data de nascimento do cardeal votante, 
    validar o voto pela idade (inferior a 80 anos), e exibir um menu com os candidatos preferiti e seus 
    respectivos números.
    - Cada cardeal deve inserir o número do candidato em quem deseja votar. Se o cardeal inserir um número 
    inválido (não correspondente a nenhum candidato), o sistema deve informar que o voto é inválido e 
    solicitar que o cardeal tente novamente.
    - O programa deve contar os votos e determinar o vencedor com base na maioria dos votos (2/3 dos votos 
    válidos).
    - Se nenhum candidato alcançar a maioria, o programa deve informar que uma nova votação será necessária.
    - O programa deve exibir o resultado da votação, nos três idiomas (para ser legível para todos os cardeais), 
    incluindo o número de votos para cada candidato e o vencedor, se houver.
    - Além disso, o sistema deve distinguir entre votos válidos, inválidos, e cardeais que não votaram 
    por serem maiores de 80 anos (cardeais inelegíveis).

    Regra para o voto: 
    
    1) Idade: A regra estabelece que apenas os cardeais com menos de 80 anos no início da 
    "Sede Vacante" (período em que a cátedra de São Pedro está vaga) têm o direito de votar.
    Ao todo, no ano de 2025, existem 135 cardeais como possíveis eleitores.
    A idade é calculada com base na data de nascimento do cardeal em relação à data em que a Sede Vacante começa.
    Portanto, se um cardeal completar 80 anos antes ou durante o período da Sede Vacante, ele não poderá 
    participar da eleição papal.

    2) A data do conclave é definida 20 dias após a morte ou renúncia de um papa. 
    E.: Data de falecimento do Papa Francisco: 21 de abril de 2025.

    Candidatos (Preferiti): Cardeal Robert Prevost (EUA); Cardeal Pietro Parolin (Itália); 
                            Cardeal Luis Antonio Tagle (Filipinas); Cardeal Péter Erdö (Hungria);
                            Cardeal Fridolin Ambongo (República Democrática do Congo).
*/



// Função para calcular a idade: 

function calcularIdade(dataNascimento, dataReferencia) {
    const nascimento = new Date(dataNascimento);   // Data de nascimento do cardeal
    const referencia = new Date(dataReferencia);   // Data de referência (início da Sede Vacante)
    let idade = referencia.getFullYear() - nascimento.getFullYear();  // Cálculo inicial da idade
    const mes = referencia.getMonth() - nascimento.getMonth();        // Diferença de meses
    if (mes < 0 || (mes === 0 && referencia.getDate() < nascimento.getDate())) {   // Ajuste se o aniversário ainda não ocorreu no ano da referência
        idade--;
    }        
    return idade;   // Retorna a idade calculada
}

// Função para exibir o menu de candidatos no idioma escolhido

function exibirMenuCandidatos(idioma) { 
    const menus = {
        'PT-BR': `Menu de Candidatos:
        1. Cardeal Robert Prevost (EUA)
        2. Cardeal Pietro Parolin (Itália)
        3. Cardeal Luis Antonio Tagle (Filipinas)
        4. Cardeal Péter Erdö (Hungria)
        5. Cardeal Fridolin Ambongo (República Democrática do Congo)`,
        'EN': `Candidates Menu:
        1. Cardinal Robert Prevost (USA)
        2. Cardinal Pietro Parolin (Italy)
        3. Cardinal Luis Antonio Tagle (Philippines)
        4. Cardinal Péter Erdö (Hungary)
        5. Cardinal Fridolin Ambongo (Democratic Republic of the Congo)`,
        'IT': `Menu dei Candidati:
        1. Cardinale Robert Prevost (USA)
        2. Cardinale Pietro Parolin (Italia)
        3. Cardinale Luis Antonio Tagle (Filippine)
        4. Cardinale Péter Erdö (Ungheria)
        5. Cardinale Fridolin Ambongo (Repubblica Democratica del Congo)`
    };
    return menus[idioma];   // Retorna o menu no idioma selecionado
}   

// Função para exibir mensagens no idioma escolhido:
function exibirMensagem(idioma, tipo, detalhes = '') {
    const mensagens = {
        'PT-BR': {
            'numero_cardeais': 'Por favor, insira o número de cardeais (1-135): ',
            'numero_invalido': 'Número de cardeais inválido. Tente novamente.',
            'idioma': 'Escolha o idioma para a votação (PT-BR, EN, IT): ',
            'data_nascimento': 'Por favor, insira sua data de nascimento (YYYY-MM-DD): ',
            'idade_invalida': 'Você não é elegível para votar (80 anos ou mais).',
            'voto_invalido': 'Voto inválido. Por favor, tente novamente.',
            'voto_registrado': 'Voto registrado com sucesso.',
            'resultado': `Habemus Papam. Resultado da Votação:\n${detalhes}`,
            'novo_conclave': "Nenhum candidato alcançou a maioria. Será necessário um novo conclave.",
            'votos_candidato': 'Votos para o candidato',
            'votos_invalidos': 'Votos inválidos',
            'cardeais_inelegiveis': 'Cardeais inelegíveis (80 anos ou mais)',
            'votos_validos': 'Votos válidos',
            'total_votos': 'Total de votos',
            'vencedor': 'O vencedor é o candidato'
        },
        'EN': {
            'numero_cardeais': 'Please enter the number of cardinals (1-135): ',
            'numero_invalido': 'Invalid number of cardinals. Please try again.',
            'idioma': 'Choose the language for voting (PT-BR, EN, IT): ',
            'data_nascimento': 'Please enter your date of birth (YYYY-MM-DD): ',
            'idade_invalida': 'You are not eligible to vote (80 years or older).',
            'voto_invalido': 'Invalid vote. Please try again.',
            'voto_registrado': 'Vote successfully recorded.',
            'resultado': `Habemus Papam. Voting Result:\n${detalhes}`,
            'novo_conclave': "No candidate reached the majority. A new conclave will be necessary.",
            'votos_candidato': 'Votes for candidate',
            'votos_invalidos': 'Invalid votes',
            'cardeais_inelegiveis': 'Ineligible cardinals (80 years or older)',
            'votos_validos': 'Valid votes',
            'total_votos': 'Total votes',
            'vencedor': 'The winner is candidate'
        },
        'IT': {
            'numero_cardeais': 'Per favore, inserisci il numero di cardinali (1-135): ',
            'numero_invalido': 'Numero di cardinali non valido. Per favore riprova.',
            'idioma': 'Scegli la lingua per la votazione (PT-BR, EN, IT): ',
            'data_nascimento': 'Per favore, inserisci la tua data di nascita (YYYY-MM-DD): ',
            'idade_invalida': 'Non sei idoneo a votare (80 anni o più).',
            'voto_invalido': 'Voto non valido. Per favore riprova.',
            'voto_registrado': 'Voto registrato con successo.',
            'resultado': `Habemus Papam. Risultato della votazione:\n${detalhes}`,
            'novo_conclave': "Nessun candidato ha raggiunto la maggioranza. Sarà necessario un nuovo conclave.",
            'votos_candidato': 'Voti per il candidato',
            'votos_invalidos': 'Voti non validi',
            'cardeais_inelegiveis': 'Cardinali non idonei (80 anni o più)',
            'votos_validos': 'Voti validi',
            'total_votos': 'Totale voti',
            'vencedor': 'Il vincitore è il candidato'
        }
    };
    return mensagens[idioma][tipo];   // Retorna a mensagem no idioma e tipo especificados
}  

// Função principal do conclave:

function conclave() {
    const dataSedeVacante = '2025-04-21';  // Data de início da Sede Vacante (21 de abril de 2025)
    const dataConclave = new Date(new Date(dataSedeVacante).setDate(new Date(dataSedeVacante).getDate() + 20));  // Data do conclave (20 dias após a Sede Vacante)
    const dataReferencia = dataSedeVacante;  // Data de referência para cálculo de idade
    const maxCardeais = 135;  // Número máximo de cardeais
    const minCardeais = 1;   // Número mínimo de cardeais

    let numCardeais;
    // Solicita o número de cardeais participantes e valida a entrada
    do {
        numCardeais = parseInt(prompt(exibirMensagem('PT-BR', 'numero_cardeais')));
        if (isNaN(numCardeais) || numCardeais < minCardeais || numCardeais > maxCardeais) {
            console.log(exibirMensagem('PT-BR', 'numero_invalido'));
        }
    } while (isNaN(numCardeais) || numCardeais < minCardeais || numCardeais > maxCardeais);

    let votos = [0, 0, 0, 0, 0];  // Array para contar os votos de cada candidato
    let votosInvalidos = 0;
    let cardeaisInelegiveis = 0;
    let votosValidos = 0;
    let idioma;

    // Loop para cada cardeal votar
    for (let i = 0; i < numCardeais; i++) {
        // Solicita o idioma de votação e valida a entrada
        do {
            idioma = prompt(exibirMensagem('PT-BR', 'idioma')).toUpperCase();
        } while (!['PT-BR', 'EN', 'IT'].includes(idioma));
        // Solicita a data de nascimento do cardeal e calcula a idade
        const dataNascimento = prompt(exibirMensagem(idioma, 'data_nascimento'));
        const idade = calcularIdade(dataNascimento, dataReferencia);  // Calcula a idade do cardeal
        if (idade >= 80) {
            console.log(exibirMensagem(idioma, 'idade_invalida'));
            cardeaisInelegiveis++;
            continue;  // Cardeal não é elegível para votar
        } 
        // Exibe o menu de candidatos no idioma escolhido
        console.log(exibirMenuCandidatos(idioma));
        let voto;
        // Solicita o voto do cardeal e valida a entrada
        do {
            voto = parseInt(prompt(exibirMensagem(idioma, 'voto_invalido')));
            if (isNaN(voto) || voto < 1 || voto > 5) {
                console.log(exibirMensagem(idioma, 'voto_invalido'));
            }  // Voto inválido
        } while (isNaN(voto) || voto < 1 || voto > 5); // Validação do voto
        votos[voto - 1]++;  // Incrementa o voto para o candidato escolhido
        votosValidos++;
        console.log(exibirMensagem(idioma, 'voto_registrado'));  // Confirmação do voto registrado
    }
    // Calcula o total de votos
    const totalVotos = votosValidos + votosInvalidos + cardeaisInelegiveis;
    const maioria = Math.ceil((2/3) * votosValidos);  // Calcula a maioria necessária (2/3 dos votos válidos)
    let vencedor = null;
    // Determina se há um vencedor
    for (let i = 0; i < votos.length; i++) {
        if (votos[i] >= maioria) {
            vencedor = i + 1;  // Candidato vencedor (índice + 1)
            break;
        }
    }
    // Prepara os detalhes do resultado da votação (votos por candidato, votos inválidos, cardeais inelegíveis.
    // votos válidos e total de votos, em todos os idiomas (PT-BR, EN, IT):
    let detalhes = '';
    for (let i = 0; i < votos.length; i++) {
        detalhes += `${exibirMensagem('PT-BR', 'votos_candidato')} ${i + 1}: ${votos[i]}\n`;
        detalhes += `${exibirMensagem('EN', 'votos_candidato')} ${i + 1}: ${votos[i]}\n`;
        detalhes += `${exibirMensagem('IT', 'votos_candidato')} ${i + 1}: ${votos[i]}\n`;
    }
    detalhes += `${exibirMensagem('PT-BR', 'votos_invalidos')}: ${votosInvalidos}\n`;
    detalhes += `${exibirMensagem('EN', 'votos_invalidos')}: ${votosInvalidos}\n`;
    detalhes += `${exibirMensagem('IT', 'votos_invalidos')}: ${votosInvalidos}\n`;
    detalhes += `${exibirMensagem('PT-BR', 'cardeais_inelegiveis')}: ${cardeaisInelegiveis}\n`;
    detalhes += `${exibirMensagem('EN', 'cardeais_inelegiveis')}: ${cardeaisInelegiveis}\n`;
    detalhes += `${exibirMensagem('IT', 'cardeais_inelegiveis')}: ${cardeaisInelegiveis}\n`;
    detalhes += `${exibirMensagem('PT-BR', 'votos_validos')}: ${votosValidos}\n`;
    detalhes += `${exibirMensagem('EN', 'votos_validos')}: ${votosValidos}\n`;
    detalhes += `${exibirMensagem('IT', 'votos_validos')}: ${votosValidos}\n`;
    detalhes += `${exibirMensagem('PT-BR', 'total_votos')}: ${totalVotos}\n`;
    detalhes += `${exibirMensagem('EN', 'total_votos')}: ${totalVotos}\n`;
    detalhes += `${exibirMensagem('IT', 'total_votos')}: ${totalVotos}\n`;
    // Exibe o resultado da votação
    if (vencedor) {
        detalhes += `${exibirMensagem('PT-BR', 'vencedor')}: ${vencedor}\n`;
        detalhes += `${exibirMensagem('EN', 'vencedor')}: ${vencedor}\n`;
        detalhes += `${exibirMensagem('IT', 'vencedor')}: ${vencedor}\n`;
        console.log(exibirMensagem('PT-BR', 'resultado', detalhes));
        console.log(exibirMensagem('EN', 'resultado', detalhes));
        console.log(exibirMensagem('IT', 'resultado', detalhes));
    } else {
        console.log(exibirMensagem('PT-BR', 'novo_conclave'));
        console.log(exibirMensagem('EN', 'novo_conclave'));
        console.log(exibirMensagem('IT', 'novo_conclave'));
    }

// Inicia o conclave
conclave();
}

