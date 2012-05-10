describe("Testemunha", function() {
  beforeEach(function(){
    crime = new Crime();
    testemunha = new Testemunha(crime);    
  });

  it("deve conhecer o crime dizendo o assassino, local e arma).", function() {
    testemunha.reconstituir_crime();   
    expect(testemunha.get_assassino()).not.toBeNull();
    expect(testemunha.get_local()).not.toBeNull();
    expect(testemunha.get_arma()).not.toBeNull();
  });
  
  it("não estava presente.", function(){    
    expect(function(){ new Testemunha(); }).toThrow(new Error("Testemunha deve conhecer o crime."));
  });
  
  it("apenas o assassino está inválido", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return "Handrus"; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["1"]);
  });

  it("apenas o local está inválido", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return pista[0]; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return "Telecamp"; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["2"]);
  });

  it("apenas arma está inválido", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return pista[0]; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return "Macbook"; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["3"]);
  });

  it("apenas o assassino e local estão inválidos", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return "Alberto"; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return "Telecamp"; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["1", "2"]);
  });

  it("apenas o assassino e arma estão inválidos", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return "Alberto"; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return "Ipod"; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["1", "3"]);
  });

  it("apenas o local e arma estão inválidos", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return pista[0]; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return "Telecamp"; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return "Ipod"; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["2", "3"]);
  });

  it("assassino, local e arma estão inválidos", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return "Handrus"; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return "Telecamp"; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return "Ipod"; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["1", "2", "3"]);
  });

  it("resolveu o crime", function(){
    var teoria = new Array();
    teoria.push("Patrik");
    teoria.push("Cit");
    teoria.push("Mouse");
    
    var detetive = new Detetive(crime);
    spyOn(detetive, "elaborar_teoria").andCallFake(function(){ return teoria; });

    var pista    = detetive.elaborar_teoria();
    
    var testemunha = new Testemunha(crime);
    spyOn(testemunha, "get_assassino").andCallFake(function(){ return pista[0]; });
    spyOn(testemunha, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(testemunha, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = testemunha.confirmar_teoria(pista);

    expect(codigo).toBeInside(["CIT"]);
    //expect(codigo).toContain(["CIT"]);
  });
});

describe("Crime", function() {
  it("possui uma lista de suspeitos, locais e armas", function() {
    var crime = new Crime(); 
    var suspeitos = crime.get_suspeitos();
    var locais    = crime.get_locais();
    var armas     = crime.get_armas();
    
    expect(suspeitos.length).toEqual(6);
    expect(locais.length).toEqual(10);
    expect(armas.length).toEqual(6);
  });
});

describe("Detetive", function(){
  beforeEach(function() {
    crime = new Crime();
    detetive = new Detetive(crime);
  });
  
  it("deve estar investigando um crime", function(){    
    expect(function(){ new Detetive(); }).toThrow(new Error("Detetive deve estar investigando um crime."));
    
    expect(detetive).toBeDefined();
  });
  
  it("deve saber elaborar teoria", function() {    
    var teoria   = detetive.elaborar_teoria();
    
    var suspeito = teoria[0];
    var local    = teoria[1];
    var arma     = teoria[2];
    
    expect(crime.get_suspeitos()).toContain(suspeito);
    expect(crime.get_locais()).toContain(local);
    expect(crime.get_armas()).toContain(arma);
  });
  
  it("deve solucionar caso", function() {
    var solucao = detetive.solucionar_crime();
    
    expect(solucao).toEqual([testemunha.get_assassino(), testemunha.get_local(), testemunha.get_arma()]);
  });
});