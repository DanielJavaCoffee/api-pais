document.getElementById('card').style.setProperty('display', 'none', 'important');

function busca() {

    const inputElement = document.getElementById('input');
    const input = inputElement.value;

    if (input === '') {
        alert('Informe o nome do País, por favor!');
        return;
    }

    if (!isNaN(input)) {
        alert('Por favor, informe um nome de país válido, não um número!');
        return;
    }

    let bandeira = document.getElementById('bandeira');
    let nome = document.getElementById('nome');
    let capital = document.getElementById('capital');
    let continente = document.getElementById('continente');
    let populacao = document.getElementById('populacao');

    fetch(`https://restcountries.com/v3.1/name/${input}?fullText=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error('País não encontrado');
            }
            document.getElementById('card').style.setProperty('display', 'block', 'important');
            return response.json();
        })
        .then(data => {
            console.log(data);
            bandeira.src = data[0].flags.svg;
            nome.innerHTML = data[0].name.common;
            capital.innerHTML = data[0].capital[0];
            continente.innerHTML = data[0].continents[0];
            populacao.innerHTML = data[0].population.toLocaleString();
        })
        .catch(error => {
            alert('Nome de País inválido.');
            console.error('Erro:', error);
        });
}