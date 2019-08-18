var fases = {
    1: "ASDFGHJKLÇ",
    2: "ÇLKJHGFDSA",
    3: "ZXCVBNM,.;",
    4: ";.,MNBVCXZ",
    5: "QWERTYUIOP",
    6: "POIUYTREWQ",
    7: "ÇLKJHGFDSA",
    8: "ÇLKJHGFDSA",
    9: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10: "ZYXWVUTSRQPONMLKJIHGFEDCBA"
}

var num = 0;
var i = 0;
var fase_pronta = false;
var iniciado = false;
var erro;
var repete = 0;
var fase_atual = 0;
var timer = false;

function parabens() {

}

function iniciar(num) {
    timer = true;
    fase_atual = num;
    erro = 0;
    $("#erros").text("ERROS: " + erro);
    var i = 0;
    palavra = fases[num];
    $("#texto").text(palavra);
    $("#letra").text(palavra[0]);
    fase_pronta = true;
    $("#sucesso").prop("hidden", true);
    $("#fracasso").prop("hidden", true);
}



function teclar() {
    if (fase_pronta) {
        iniciado = true;
        if (timer) {
            timer = false;
            tempo();        
        } 
        var tecla = String.fromCharCode(event.keyCode).toUpperCase();
        if (palavra[i] == tecla) {
            i++
            if (i >= palavra.length) {
                repete++
                $("#repetir").text(repete + "/5");
                i = 0;
            }
            $("#letra").text(palavra[i]);
        } else {
            $("#erros").text("ERROS: " + ++erro);
        }
    } else {
        $("#aviso").prop("hidden", false);
    }
    if (repete >= 5) {
        repete = 0;
        parar();
        limpar();
        $("#repetir").text(repete + "/5");
        iniciado = false;
        fase_pronta = false;
        if (erro > 2) {
            $("#fracasso").prop("hidden", false);
            repete = 0;
        } else {
            $("#repetir").text(repete + "/5");
            $("#sucesso").prop("hidden", false);
            repete = 0;
            fase_atual++;
            botao = document.getElementById(fase_atual);
            botao.disabled = false;
        }
        $("#texto").text("");
        $("#letra").text("");
    }
}

document.body.onkeypress = teclar;

// CRONÔMETRO

var intervalo;

function tempo(op) {
	var s = 1;
	var m = 0;
	var h = 0;
	intervalo = window.setInterval(function() {
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").innerHTML = "0" + h + "h"; else document.getElementById("hora").innerHTML = h + "h";
		if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
		if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";		
		s++;
    },1000);
}

function parar() {
	window.clearInterval(intervalo);
}

function limpar() {
    document.getElementById('hora').innerHTML = "00h";
    document.getElementById('minuto').innerHTML = "00m";
    document.getElementById('segundo').innerHTML = "00s";
}



