function Crime () {
  var assassino = null;
  var local     = null;
  var arma      = null;
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
    assassino = random_pistas(suspeitos);
    local     = random_pistas(locais);
    arma      = random_pistas(armas);
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
  
  function random_pistas (pistas) {
    var max_pistas = pistas.length;    
    pista = Math.floor(Math.random(pistas) * max_pistas);    
    return pista;
  }
}