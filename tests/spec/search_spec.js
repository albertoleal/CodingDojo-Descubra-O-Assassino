describe("Search", function() {
	describe("Home Page", function() {
		it("should disable the submit button when there is no Product selected.", function() {
			loadFixtures('search/home_page.html');
			
			Search.load();
			
			expect(Search.toggle_button()).toBeFalsy();
			$("input#edit-search-term").val("Search for something");	
			expect(Search.toggle_button()).toBeFalsy();
		});

		it("should enable the submit button when there is a Product selected and a query to search", function() {
			loadFixtures('search/home_page.html');
			
			Search.load();
			$("input#edit-search-term").val("Search for something");	
			$("select#edit-slc-product option:last").attr('selected','selected');
			expect(Search.toggle_button()).toBeTruthy();
		});
		
		it("should clean up the search term field when the user remove the focus from that and the term == '' ", function() {
		  loadFixtures('search/home_page.html');
			
			Search.load();
			$("input#edit-search-term").val("Search for something");
			$("input#edit-search-term").blur();
			expect($("input#edit-search-term").val()).toEqual("Search for something");
			
			$("input#edit-search-term").val("");
			$("input#edit-search-term").blur();
			expect($("input#edit-search-term").val()).toEqual(Search.default_search_term);
		});
		
		it("should clean up the term field when the user clicks on it", function() {
		  loadFixtures('search/home_page.html');
			
			Search.load();
			expect($("input#edit-search-term").val()).toEqual(Search.default_search_term);
			$("input#edit-search-term").focus();
			expect($("input#edit-search-term").val()).toEqual("");
			
			//Put the focus out and check if the default value returns.
			$("input#edit-search-term").blur();
			expect($("input#edit-search-term").val()).toEqual(Search.default_search_term);
		});
		
		describe("units", function() {
			it("assumes a default message - web", function() {
			  loadFixtures('search/home_page.html');
				
				$("body").addClass("web");
				Search.load();
				expect(Search.default_search_term).toEqual("Enter a word, phrase, or question");
			});			
			
			it("assumes a different default message for mobile", function() {
			  loadFixtures('search/home_page.html');
				
				$("body").addClass("mobile");
				Search.load();
				expect(Search.default_search_term).toEqual("Word, phrase, or question");
			});
		});
	});
});