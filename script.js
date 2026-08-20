// ==========================================
// HORÁRIOS DA BARBEARIA
// ==========================================

const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
];


// Guarda o horário escolhido pelo cliente
let horarioEscolhido = "";


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const dataInput = document.getElementById("data");
const areaHorarios = document.getElementById("horarios");


// ==========================================
// IMPEDIR DATAS ANTERIORES A HOJE
// ==========================================

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

const dataMinima = `${ano}-${mes}-${dia}`;

dataInput.min = dataMinima;


// ==========================================
// QUANDO O CLIENTE ESCOLHER UMA DATA
// ==========================================

dataInput.addEventListener("change", mostrarHorarios);


// ==========================================
// MOSTRAR HORÁRIOS
// ==========================================

function mostrarHorarios() {

    // Limpa o horário escolhido
    horarioEscolhido = "";

    // Limpa os horários antigos
    areaHorarios.innerHTML = "";


    // Se nenhuma data foi escolhida
    if (dataInput.value === "") {
        return;
    }


    // Divide a data para evitar problemas de fuso horário
    const partes = dataInput.value.split("-");

    const data = new Date(
        partes[0],
        partes[1] - 1,
        partes[2]
    );


    // Descobre o dia da semana
    const diaSemana = data.getDay();


    // Domingo = 0
    // Segunda = 1
    // Terça = 2
    // Quarta = 3
    // Quinta = 4
    // Sexta = 5
    // Sábado = 6

    if (diaSemana === 0 || diaSemana === 1) {

        alert(
            "A Barbearia Rodrigues funciona de terça a sábado."
        );

        return;
    }


    // ==========================================
    // CRIAR OS BOTÕES DE HORÁRIO
    // ==========================================

    horarios.forEach(function (hora) {

        const botao = document.createElement("button");

        botao.type = "button";

        botao.className = "horario";

        botao.textContent = hora;


        // Quando clicar no horário
        botao.addEventListener("click", function () {

            // Remove seleção dos outros horários
            document
                .querySelectorAll(".horario")
                .forEach(function (btn) {

                    btn.classList.remove("selecionado");

                });


            // Seleciona o horário clicado
            botao.classList.add("selecionado");


            // Guarda o horário
            horarioEscolhido = hora;

        });


        // Coloca o botão na tela
        areaHorarios.appendChild(botao);

    });

}


// ==========================================
// CONFIRMAR AGENDAMENTO
// ==========================================

function agendar() {

    const nome =
        document.getElementById("nome").value.trim();


    const servico =
        document.getElementById("servico").value;


    const data =
        document.getElementById("data").value;


    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    if (
        nome === "" ||
        data === "" ||
        horarioEscolhido === ""
    ) {

        alert(
            "Preencha seu nome, escolha uma data e um horário."
        );

        return;
    }


    // ==========================================
    // FORMATAR DATA
    // ==========================================

    const partesData = data.split("-");

    const dataFormatada =
        `${partesData[2]}/${partesData[1]}/${partesData[0]}`;


    // ==========================================
    // MENSAGEM DO WHATSAPP
    // ==========================================

    const mensagem =
`Olá! Quero confirmar meu agendamento na Barbearia Rodrigues 💈

Nome: ${nome}

Serviço: ${servico}

Data: ${dataFormatada}

Horário: ${horarioEscolhido}`;


    // ==========================================
    // NÚMERO DO WHATSAPP
    // ==========================================

    const numero =
        "5511999999999";


    // ==========================================
    // CRIAR LINK
    // ==========================================

    const link =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;


    // ==========================================
    // ABRIR WHATSAPP
    // ==========================================

    window.open(link, "_blank");


    // Mensagem de confirmação
    alert(
        "Agendamento enviado! Você será direcionado para o WhatsApp."
    );

}