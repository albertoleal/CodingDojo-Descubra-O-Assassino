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
  var suspeitos = new Array();
  var locais    = new Array();
  var armas     = new Array();

  suspeitos[0] = 'Charles B. Abbage';
  // suspeitos[1] = 'Donald Duck Knuth';
  // suspeitos[2] = 'Ada L. Ovelace';
  // suspeitos[3] = 'Alan T. Uring';
  // suspeitos[4] = 'Ivar J. Acobson';
  // suspeitos[5] = 'Ras Mus Ler Dorf';
  
  locais[0] = 'Redmond';
  // locais[1] = 'Palo Alto';
  // locais[2] = 'San Francisco';
  // locais[3] = 'Tokio';
  // locais[4] = 'Restaurante no Fim do Universo';
  // locais[5] = 'São Paulo';
  // locais[6] = 'Cupertino';
  // locais[7] = 'Helsinki';
  // locais[8] = 'Maida Vale';
  // locais[9] = 'Toronto';
  
  armas[0] = 'Peixeira';
  // armas[1] = 'DynaTAC 8000X';
  // armas[2] = 'Trezoitão';
  // armas[3] = 'Trebuchet';
  // armas[4] = 'Maça';
  // armas[5] = 'Gládio';
  
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
  
  var suspeitos = crime.get_suspeitos();
  var locais    = crime.get_locais();
  var armas     = crime.get_armas();
  
  this.elaborar_teoria = function() {    
    var assassino = suspeitos.random();
    var local     = locais.random();
    var arma      = armas.random();
    
    var pista = new Array();
    pista.push(assassino);
    pista.push(local);
    pista.push(arma);

    return pista;
  }
  
  this.solucionar_crime = function () {
    var testemunha = new Testemunha(crime);
    testemunha.reconstituir_crime();
    
    solucionado = false;
    teoria = this.elaborar_teoria();
    
  
    while(solucionado == false){
      teoria = this.elaborar_teoria();
      var check_teoria = testemunha.confirmar_teoria(teoria);
      
      if (check_teoria === "CIT") {
        solucionado = true;
        
      }
      
      if (check_teoria == "1") {
       // alert("11:"+ teoria[0]);
        suspeitos.remove_element(teoria[0]);
      }
      
      if (check_teoria == "2") {
          //      alert("22:"+ teoria[0]);
        locais.remove_element(teoria[1]);
      }
      
      
      if (check_teoria == "3") {
       //         alert("33:"+ teoria[0]);
        armas.remove_element(teoria[2]);
      }
      
      /*switch(check_teoria) {
        case "0":
          solucionado = true;
          alert(teoria[0]);
         // alert("Assassino: "+ teoria + " Local: "+ teoria[1]  + " Arma: "+ teoria[2] +"Assassino: "+ testemunha.get_assassino() + " Local: "+ testemunha.get_local()  + " Arma: "+ testemunha.get_arma() );
          break;
        case "1":
          suspeitos.remove_element(teoria[0]);
          break;
        case "2":
          locais.remove_element(teoria[1]);
          break;
        case "3":
          armas.remove_element(teoria[2]);
          break;    
      }*/
    }
    alert(teoria);
    return teoria; 
  }
}

function Testemunha(crime) {
  if (crime == "" || crime == undefined) {
    throw {
      name: "Error",
      message: "Testemunha deve conhecer o crime."
    }
  }
  
  var assassino = null;
  var local     = null;
  var arma      = null;
  
  var CRIME_SOLUCIONADO = "CIT";
  var ASSASSINO_ERRADO  = "1";
  var LOCAL_ERRADO      = "2";
  var ARMA_ERRADA       = "3";
  
  this.reconstituir_crime = function () {
    if(assassino == null || local == null || arma == null){
      assassino = crime.get_suspeitos().random();
      local     = crime.get_locais().random();
      arma      = crime.get_armas().random();
    }
    //alert("Crime"+ assassino +" "+ local + " "+ arma);
  }
  
  this.confirmar_teoria = function(teoria){
    var code = new Array();
    
    if (teoria[0] != this.get_assassino()) {
      code.push(ASSASSINO_ERRADO);
    }
    if(teoria[1] != this.get_local()) {
      code.push(LOCAL_ERRADO);
    }
    if(teoria[2] != this.get_arma()) {
      code.push(ARMA_ERRADA);
    }
    if (code.length == 0) {
      code.push(CRIME_SOLUCIONADO);
    }
    
    return code.random();
  }

  this.get_assassino = function () {
    var suspeitos = crime.get_suspeitos();
    return assassino;
  }

  this.get_local = function () {
    var locais = crime.get_locais();
    return local;
  }
  
  this.get_arma = function () {
    var armas = crime.get_armas();
    return arma;
  } 
}
