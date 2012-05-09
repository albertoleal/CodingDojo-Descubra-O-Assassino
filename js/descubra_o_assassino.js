function Crime () {
  var assassino = local = arma = null;
  
  this.compor_elementos = function () {
    
  }

  this.get_assassino = function () {
    var suspeitos = new Array();
    
    suspeitos[0] = 'Charles B. Abbage';
    suspeitos[1] = 'Donald Duck Knuth';
    suspeitos[2] = 'Ada L. Ovelace';
    suspeitos[3] = 'Alan T. Uring';
    suspeitos[4] = 'Ivar J. Acobson';
    suspeitos[5] = 'Ras Mus Ler Dorf';
    
    var max_suspeitos = suspeitos.length;
    
    suspeito = Math.floor(Math.random(suspeitos) * max_suspeitos);
    
    return suspeito;
  }

  this.get_local = function () {
    var locais = new Array();
    
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
    
    var max_locais = locais.length;
    
    local = Math.floor(Math.random(locais) * max_locais);
  
    return local;
  }
  
  this.get_arma = function () {
    var armas = new Array();

    armas[0] = 'Peixeira';
    armas[1] = 'DynaTAC 8000X';
    armas[2] = 'Trezoitão';
    armas[3] = 'Trebuchet';
    armas[4] = 'Maça';
    armas[5] = 'Gládio';
    
    var max_armas = armas.length;
    
    arma = Math.floor(Math.random(armas) * max_armas);
    
    return arma;
  } 
}