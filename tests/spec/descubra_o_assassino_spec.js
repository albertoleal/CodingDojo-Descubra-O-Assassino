describe("Crime", function() {
  beforeEach(function(){
    crime = new Crime;    
  });

  it("deve nos permitir escolher o assassino, local e arma.", function() {
    crime.compor_cena();   
    expect(crime.get_assassino()).not.toBeNull();
    expect(crime.get_local()).not.toBeNull();
    expect(crime.get_arma()).not.toBeNull();
  });

  it("deve retornar a mesma composição(assassino, local e arma) caso não seja solucionado.", function() {
    crime.compor_cena();
    var assassino = crime.get_assassino();
    var local     = crime.get_local();
    var arma      = crime.get_arma();

    crime.compor_cena();
    var assassino2 = crime.get_assassino();
    var local2     = crime.get_local();
    var arma2      = crime.get_arma();

    expect(assassino).toEqual(assassino2);
    expect(local).toEqual(local2);
    expect(arma).toEqual(arma2);

    expect(crime.solucionado()).toBeFalsy();
  });
});

describe("Detetive", function(){
  it("deve estar investigando um crime", function(){    
    expect(function(){ new Detetive(); }).toThrow(new Error("Detetive deve estar investigando um crime."));
    
    var crime = new Crime();
    var detetive = new Detetive(crime);
    expect(detetive).toBeDefined();
  });
  
  

  it("apenas o assassino está inválido", function(){
    var crime = new Crime();  

    var detetive = new Detetive(crime);
    var pista    = detetive.encontrar_pista();

    spyOn(crime, "get_assassino").andCallFake(function(){ return "Patrik" });
    spyOn(crime, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(crime, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = detetive.solucionar_crime(pista);
    
    expect(codigo).toBeInside(["1"]);
  });

  it("apenas o local está inválido", function(){
    var crime = new Crime();  

    var detetive = new Detetive(crime);
    var pista    = detetive.encontrar_pista();

    spyOn(crime, "get_assassino").andCallFake(function(){ return pista[0] });
    spyOn(crime, "get_local").andCallFake(function(){ return "Clube"; });
    spyOn(crime, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = detetive.solucionar_crime(pista);
    
    expect(codigo).toBeInside(["2"]);
  });

  it("apenas arma está inválido", function(){
    var crime = new Crime();  

    var detetive = new Detetive(crime);
    var pista    = detetive.encontrar_pista();

    spyOn(crime, "get_assassino").andCallFake(function(){ return pista[0] });
    spyOn(crime, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(crime, "get_arma").andCallFake(function(){ return "Macbook"; });

    var codigo   = detetive.solucionar_crime(pista);
    
    expect(codigo).toBeInside(["3"]);    
  });

  it("apenas o assassino e local estão inválidos", function(){
    var crime = new Crime();  

    var detetive = new Detetive(crime);
    var pista    = detetive.encontrar_pista();

    spyOn(crime, "get_assassino").andCallFake(function(){ return "Ringo" });
    spyOn(crime, "get_local").andCallFake(function(){ return "Mouse"; });
    spyOn(crime, "get_arma").andCallFake(function(){ return pista[2]; });

    var codigo   = detetive.solucionar_crime(pista);
  
    expect(codigo).toBeInside(["1", "2"]);
  });

  it("apenas o assassino e arma estão inválidos", function(){
    var crime = new Crime();  

    var detetive = new Detetive(crime);
    var pista    = detetive.encontrar_pista();

    spyOn(crime, "get_assassino").andCallFake(function(){ return pista[0] });
    spyOn(crime, "get_local").andCallFake(function(){ return pista[1]; });
    spyOn(crime, "get_arma").andCallFake(function(){ return "Tesoura"; });

    var codigo   = detetive.solucionar_crime(pista);
  
    expect(codigo).toBeInside(["1", "3"]);
  });

  xit("apenas o local e arma estão inválidos", function(){
    //deve retornar 2 OU 3;
  });

  xit("assassino, local e arma estão inválidos", function(){
    //deve retornar 1 OU 2 OU 3;
  });

  xit("resolveu o crime", function(){
    //deve retornar 0;
  });
});