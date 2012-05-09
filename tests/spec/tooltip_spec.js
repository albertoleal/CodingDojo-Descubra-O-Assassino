function fixture_product_page(product){
    if ( typeof product == 'undefined' ) {
        product = 'FAKEStelara';
    }
    
    loadFixtures('tooltip/tooltip_header.html');
    $(".wrapper-tooltip").before('<input type="hidden" name="edit-slc-current-product" id="edit-slc-current-product" value="'+ product +'" />');
}
function fixture_home_page(){
    loadFixtures('tooltip/tooltip_header.html');
    
    $(".wrapper-tooltip").before('<select name="edit-slc-product" id="edit-slc-product"> <option value="FAKEStelara">FAKEStelara</option><option value="FAKERemicade">FAKERemicade</option></select>');
}

describe("Tooltip", function() {
	beforeEach(function() {
  	Tooltip.reset();
  });
    
  it("should appear on the screen when the user is on Product Page.", function() {
        fixture_product_page("FAKERemicade");
        
        //Mocking a method b/c we are not testing it on this spec.
        //spyOn(Tooltip, "is_product_page").andCallFake(function(){ return true; });
      //Tooltip.is_product = true;
            
        waitsFor(function() {
						spyOn(Tooltip, "load_tooltip_content").andCallFake(function(){ return true; });
		    		$('.middle-tooltip h2').after("<div class='tooltip_content "+Tooltip.current_product +"'>jasmine</div>");
            return Tooltip.load_tooltip();
        }, "Could not complete the call to get information for Tooltip");    
        
        runs(function() {
            expect($(".btn-tooltip")).toBeVisible();
        });
  });

	it("should disappear when the user is on Home Page.", function() {
		fixture_home_page();

		//Mocking a method b/c we are not testing it on this spec.
		spyOn(Tooltip, "is_product_page").andCallFake(function(){ return false; });
		Tooltip.is_product = false;    

		waitsFor(function() {
		return Tooltip.load_tooltip();
		}, "Could not complete the call to get information for Tooltip");    

		runs(function() {
		expect($(".tooltip")).not.toBeVisible();
		});
	});

	it("should display a content related to the Product itself.", function() {
		fixture_product_page("Remicade");

		Tooltip.reset_cookie();
		Tooltip.check_first_access();

		spyOn(Tooltip, "load_tooltip_content").andCallFake(function(){ return true; });
		$('.middle-tooltip h2').after("<div class='tooltip_content "+Tooltip.current_product +"'>jasmine</div>");   

		Tooltip.load_tooltip();

		expect($(".tooltip_content")).toBeVisible();
		expect(Tooltip.retrieve_product_name()).toEqual("Remicade");
		expect($(".tooltip_content")).toHaveClass(Tooltip.current_product);        
	});

	it("should be closed when the user clicks outside the tooltip window.", function() {
		Tooltip.reset_cookie();
		fixture_product_page("FAKEStelara");  

		Tooltip.check_first_access();
		Tooltip.load_tooltip();
		spyOnEvent($(document), "click");
		$(document).click();
		expect("click").toHaveBeenTriggeredOn($(document));
		expect($(".tooltip")).not.toBeVisible();
	});

	it("should be opened when the user clicks on its icon link on the header.", function() {
		fixture_product_page("Stelara");
		

		Tooltip.first_access = false;

		waitsFor(function() {
			spyOn(Tooltip, "load_tooltip_content").andCallFake(function(){ return true; })
			$('.middle-tooltip h2').after("<div class='tooltip_content "+Tooltip.current_product +"'>jasmine</div>");
			
			return Tooltip.load_tooltip();
		}, "Could not complete the call to get information for Tooltip");    

		runs(function() {
			expect($(".btn-tooltip")).toBeVisible();
			expect($(".tooltip")).not.toBeVisible();

			spyOnEvent($(".btn-tooltip"), "click");
			$(".btn-tooltip").click();
			expect("click").toHaveBeenTriggeredOn($(".btn-tooltip"));
			expect($(".tooltip")).toBeVisible();
		});
	});

	it("should close the tooltip window when the user clicks on its icon twice.", function() {
		fixture_product_page("Stelara");

		Tooltip.first_access = false;

		waitsFor(function() {
			return Tooltip.load_tooltip();
		}, "Could not complete the call to get information for Tooltip");    

		runs(function() {
			expect($(".btn-tooltip")).toBeVisible();
			expect($(".tooltip")).not.toBeVisible();

			spyOnEvent($(".btn-tooltip"), "click");
			$(".btn-tooltip").click();
			expect("click").toHaveBeenTriggeredOn($(".btn-tooltip"));
			expect($(".tooltip")).toBeVisible();
			$(".btn-tooltip").click();
			expect($(".tooltip")).not.toBeVisible();
		});
	});

	it("should be displayed automatically on the first access", function() {
		fixture_product_page("FAKEStelara");

		expect(Tooltip.reset_cookie()).toBeTruthy();
		expect(Tooltip.check_first_access()).toBeTruthy();

		waitsFor(function() {
			return Tooltip.load_tooltip();
		}, "Could not complete the call to get information for Tooltip");

		runs(function() {
			expect($(".tooltip")).toBeVisible();

			//Now we click on the tooltip button and its window must be closed
			spyOnEvent($(".btn-tooltip"), "click");
			$(".btn-tooltip").click();
			expect("click").toHaveBeenTriggeredOn($(".btn-tooltip"));
			expect($(".tooltip")).not.toBeVisible();
		});
	});

	it("should be hidden if it is not the first access", function() {
		fixture_product_page("Remicade");

		Tooltip.is_product_page();
		expect(Tooltip.create_cookie()).toBeTruthy();
		expect(Tooltip.check_first_access()).toBeFalsy();

		waitsFor(function() {
			return Tooltip.load_tooltip();
		}, "Could not complete the call to get information for Tooltip");

		runs(function() {
			expect($(".tooltip")).not.toBeVisible();
		});
	});

	it("should be able to generate a class for products that have 2 or more words", function() {
		fixture_product_page("Remicade Fake");

		Tooltip.reset_cookie();
		Tooltip.check_first_access();

		spyOn(Tooltip, "load_tooltip_content").andCallFake(function(){ return true; });
		$('.middle-tooltip h2').after("<div class='tooltip_content "+Tooltip.product_class() +"'>jasmine</div>");   

		Tooltip.load_tooltip();

		expect($(".tooltip_content")).toBeVisible();
		expect(Tooltip.product_class()).toEqual("Remicade-Fake");
		expect($(".tooltip_content")).toHaveClass(Tooltip.product_class());
	});
  
	describe("units", function() {
        
    it("the current page is a Product Page", function() {
            fixture_product_page("Zytiga");
            
            expect($("#edit-slc-product")).not.toBeVisible();
            expect(Tooltip.is_product_page()).toBeTruthy();
      });
    
		it("the current page is a Home Page", function() {
			fixture_home_page();

			expect($("#edit-slc-product")).toBeVisible();
			expect(Tooltip.is_product_page()).toBeFalsy();          
			Tooltip.load_tooltip();
			expect($(".wrapper-tooltip")).not.toBeVisible();
		});

		it("should throw an exception if the element is not on the HTML rendered", function() {
	    loadFixtures('tooltip/tooltip_header.html');
  
	    expect(function(){ Tooltip.is_product_page()}).toThrow(new Error("Element not found on the screen."));
		});

		it("should load product's tooltip information from server ", function() {          
	    fixture_product_page("FAKEStelara");
	    expect(Tooltip.retrieve_product_name()).toEqual("FAKEStelara");
		});

		it("should reset the cookie properly", function() {
			fixture_product_page("Remicade");
			expect(Tooltip.reset_cookie()).toBeTruthy();
			expect($.cookie("first_access")).toBeNull();
		});

		it("should create and validate a cookie", function() {
			expect(Tooltip.reset_cookie()).toBeTruthy();
			fixture_product_page("Remicade");

			Tooltip.check_first_access();
			waitsFor(function() {
				return Tooltip.load_tooltip();
			}, "Could not complete the call to get information for Tooltip");

			runs(function() {
				 expect($.cookie("first_access")).not.toBeNull();
				 expect(Tooltip.validate_cookie("Remicade")).toBeTruthy(); 
			});        
		});

		it("should reset the object properly", function() {
			Tooltip.reset();
	    expect(Tooltip.is_product).toBeFalsy();
	    expect(Tooltip.current_product).toEqual("home");
	    expect(Tooltip.title).toEqual("");
	    expect(Tooltip.content).toEqual("");
	    expect(Tooltip.first_access).toBeFalsy();
		});
	});
});