describe("Crime", function() {
  it("deve nos permitir escolher o assassino, local e arma", function() {
    crime = new Crime;
    crime.compor_elementos();
     
    expect(crime.get_assassino()).not.toBeNull();
    expect(crime.get_local()).not.toBeNull();
    expect(crime.get_arma()).not.toBeNull();
  });
});