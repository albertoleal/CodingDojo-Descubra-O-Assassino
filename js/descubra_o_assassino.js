Array.prototype.remove_element = function(element){
  var el_position = this.indexOf(element);
  if (el_position == -1) {
    return false;
  }
  
  this.splice(this, 1);
}

Array.prototype.random = function(){
  var max = this.length;    
  el = Math.floor(Math.random(this) * max);    
  return this[el];
}

function Crime () {
  var assassino = null;
  var local     = null;
  var arma      = null;
  var solucionado = false;
  var suspeitos = new Array();
  var locais    = new Array();
  var armas     = new Array();

  suspeitos[0] = 'Charles B. Abbage';
  suspeitos[1] = 'Donald Duck Knuth';
  suspeitos[2] = 'Ada L. Ovelace';
  suspeitos[3] = 'Alan T. Uring';
  suspeitos[4] = 'Ivar J. Acobson';
  suspeitos[5] = 'Ras Mus Ler Dorf';
  
  locais[0] = 'Redmond';
  locais[1] = 'Palo Alto';
  locais[2] = 'San Francisco';
  locais[3] = 'Tokio';
  locais[4] = 'Restaurante no Fim do Universo';
  locais[5] = 'São Paulo';
  locais[6] = 'Cupertino';
  locais[7] = 'Helsinki';
  locais[8] = 'Maida Vale';
  locais[9] = 'Toronto';
  
  armas[0] = 'Peixeira';
  armas[1] = 'DynaTAC 8000X';
  armas[2] = 'Trezoitão';
  armas[3] = 'Trebuchet';
  armas[4] = 'Maça';
  armas[5] = 'Gládio';
    
  this.compor_cena = function () {
    if(assassino == null || local == null || arma == null){
      assassino = suspeitos.random();
      local     = locais.random();
      arma      = armas.random();
    }
  }

  this.get_assassino = function () {
    return suspeitos[assassino];
  }

  this.get_local = function () {
    return locais[local];
  }
  
  this.get_arma = function () {
    return armas[arma];
  } 

  this.solucionado = function(){
    return solucionado;
  }
  
  this.get_suspeitos = function(){ 
    return suspeitos;
  }
  this.get_locais = function(){
    return locais;
  }
  this.get_armas = function(){
    return armas;
  }
}

function Detetive (crime) {
  if (crime == "" || crime == undefined) {
    throw {
      name: "Error",
      message: "Detetive deve estar investigando um crime."
    }
  }
  
  var CRIME_SOLUCIONADO = "0";
  var ASSASSINO_ERRADO  = "1";
  var LOCAL_ERRADO      = "2";
  var ARMA_ERRADA       = "3";
  
  this.encontrar_pista = function() {
    var suspeitos = crime.get_suspeitos();
    var locais    = crime.get_locais();
    var armas     = crime.get_armas();
    
    //Fazendo o primeiro chute
    var assassino = suspeitos.random();
    var local     = locais.random();
    var arma      = armas.random();
    
    var pista = new Array();
    pista.push(assassino);
    pista.push(local);
    pista.push(arma);

    return pista;
  }
  
  this.solucionar_crime = function(pista){
    var code = new Array();
    
    if (pista[0] != crime.get_assassino()) {
      code.push(ASSASSINO_ERRADO);
    }
    if(pista[1] != crime.get_local()) {
      code.push(LOCAL_ERRADO);
    }
    if(pista[2] != crime.get_arma()) {
      code.push(ARMA_ERRADA);
    }
    if (code.length == 0) {
      code.push(CRIME_SOLUCIONADO);
    }
    
    return code.random();
  }
  
  
}
