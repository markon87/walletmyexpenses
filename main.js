$(document).ready(function(){
	//Switch between cards
	$(".cards-container").on("click", ".card", function(){
		$(".cards-container .card").removeClass("active");
		$(this).addClass("active");
		
		var cardNo = $(this).attr("data-id");
		$(".card-info").removeClass("active");
		$("#" + cardNo).addClass("active");
		$(".wallets, .menu-overlay").removeClass("on");
		$("#nav-icon").removeClass("open");
	});


	//Add new card form slide in
	$(".add-new-card").on("click", function(){
		$(".add-new, .overlay").addClass("on");
	});

	//Overlay divs
	$(".overlay, .close").on("click", function(){
		$(".add-new, .overlay").removeClass("on");
		$("html, body").removeClass("no-scroll");
	});
	$(".menu-overlay").on("click", function(){
		$(".menu-overlay, .wallets").removeClass("on");
		$("#nav-icon").removeClass("open");
		$("html, body").removeClass("no-scroll"); // + added line
	});

	//html & body no scroll
	$("#nav-icon").on("click", function(){
		//$("html, body").toggleClass("no-scroll"); // - removed line
		if($("html, body").hasClass("no-scroll")){     // + added next 4 lines
			$("html, body").removeClass("no-scroll");
		}else{
			$("html, body").addClass("no-scroll");
		}
	});
	$(".add-new-card").on("click", function(){
		if(!($("html, body").hasClass("no-scroll"))){
			$("html, body").addClass("no-scroll");
		}
	});

	

	//Menu toggle
	$("#nav-icon, nav ul li a").click(function(){
		$("#nav-icon").toggleClass("open");
        $("section.wallets, .menu-overlay").toggleClass("on");
	});

	//Limit input to numbers only
	$("input").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    //Add new credit card
    $(".choose-card img").on("click", function(){  //Choose credit card
    	$(".choose-card img").removeClass("active");
    	$(this).addClass("active");
    });

    $(".btn-add").on("click", function(){

		//Find last 4 digits
		var cardDigit = parseInt($(".enter-card-number input").val(), 10) % 10000;

		//Random number for card balance
		var cardBalance = Math.floor(Math.random() * 9999) + 100;

		//Count elements and add plus one, new id
		var newId = $(".cards-container").children().length + 1;

		//Parse date
		var date = $(".enter-exp-date input").val();
		var month = date.toString().substr(0, 2);
		var year = parseInt(date, 10) % 100;

		var choosenCard;
		$(".choose-card img").each(function(){
			if($(this).hasClass("active")){
				choosenCard = $(this).attr("data-card");
			}
			return;
		});

		//Check if fields are empty
		var cardNoLenght = $(".enter-card-number input").val().length;
		if(cardNoLenght > 0 && $(".choose-card img").hasClass("active")){
			if(month <= 12 && date.length > 3 && cardNoLenght > 15){	//Check the date and card number 
				$(".cards-container .card").removeClass("active");
				$(".card-info").removeClass("active");
				$(".add-new, .overlay").removeClass("on");
				$("html, body").removeClass("no-scroll");


				$( ".cards-container" ).prepend(

				  "<div class='card active' data-id='" + newId + "'><span class='delete'>X</span>"+"<img src='img/" + choosenCard + ".png' alt='Credit card' />"+
				  "<p class='card-number'>**** **** **** <span>" + cardDigit + "</span></p>"+
				  "<p class='valid-thru'>Valid Thru: <span class='date'>" + month +"/" + year + "</span></p>"+
							"</div>"
				);
				$( ".balance" ).prepend(

				  "<div id='" + newId + "' class='card-info active'>"+
						"<div class='header'>"+
							"<h1>Current Balance</h1><p class='curr-balance'>$" + cardBalance +".<span class='cents'>00</span></p>"+
						"</div><div class='transaction-container'>"+"</div><p>No recent transactions available.</p></div>"
				);

				$(".choose-card img").removeClass("active");
				$("input").val("");
			}else{
				alert("Check if the date and card number are valid.");
			}	
		}else{
			alert("All fields are required.");
		}
		
	});

    //Delete credit card
	$(".cards-container").on("click",".delete", function(e){
		var deletedCardId = $(this).parent().attr("data-id");
		$(this).parent().remove();
		$("#" + deletedCardId).remove();
		$(".cards-container .card:first-child, .balance .card-info:first-child").addClass("active");
		e.stopPropagation();
	});
	
});

$( window ).resize(function() {
	if ($(window).width() > 960 && $(".menu-overlay").hasClass("on")) {
	   $("html, body").removeClass("no-scroll");
	   $(".menu-overlay, .wallets").removeClass("on");
	   $(".menu-toggle").removeClass("open");
	}
});
