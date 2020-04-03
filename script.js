
$(document).ready(function(){

	// Initialize two instances of ACE editor, #editor (user input) and #output (user's formated snippet)
    var editor = ace.edit("aceEditor");
    editor.setTheme("ace/theme/xcode"); // chrome is also good
    editor.session.setMode("ace/mode/javascript");

    var output = ace.edit("output");
    output.setTheme("ace/theme/xcode"); // chrome is also good
    output.session.setMode("ace/mode/javascript");
	
    // Initialize user input variables
	var code; // user's code inside #editor
	var description = "description" // user's description input
	var trigger = "none" // user's trigger input
	var scope = "global" // user's scope input
	var language; // user's programming language selection


	// 1. The following code is for the dropdown-menu programming language feature

	// 1a. on user's language selection, change dropdown text, mark as active, and set #editor's mode
	$(document).on("click",".dropdown-item-name",function(){
		selection = $(this).text()
		$("#dropdownMenu2").text(selection)
		$("#dropdownMenu2").addClass("active")
		editor.session.setMode("ace/mode/"+selection.toLowerCase())
	})
	// 1b. Update the dropdown display based on user's search input
	var options = {
	   	valueNames: ['dropdown-item-name']
	};
	var optionslist = new List('dropdown-sorted-list', options);

	// 1c. makes whatever dropdown item is in focus appear active and then inactive on focusout
	$(document).on("focus",".dropdown-item-name",function(){
		$(this).addClass("active")
	})
	$(document).on("focusout",".dropdown-item-name",function(){
		$(this).removeClass("active")
	})

	// 1d. make programming language label response
	function setProgrammingLanguageTitle(){
		if ($("#dropdownMenu2").text() == "Programming Language" || $("#dropdownMenu2").text() == "Language"){
			size = $('#sizer').find('div:visible').data('size');
			if ($("#dropdownMenu2").text() == "Programming Language" && size == "sm" || size == "md"){
				$("#dropdownMenu2").text("Language")
			} 
			else if ($("#dropdownMenu2").text() == "Language" && size == "xs" || size == "lg" || size == "xl"){
				$("#dropdownMenu2").text("Programming Language")
			} 
		}
	}
	$(window).on("resize",function(){
		setProgrammingLanguageTitle()
	})

	// 2. Get value of user's description, trigger, and scope inputs then update #output to reflect these changes in real time

	// 2a. Get user's description input, update description variable, and update #output in real time (on keyup)
	$(document).on("keyup","#desc",function(){
		description = $("#desc").val();
		updateOutput();
	})

	// 2b. Get user's trigger input, update trigger variable, and update #output in real time (on keyup)
	$(document).on("keyup","#trig",function(){
		trigger = $("#trig").val();
		updateOutput();
	})

	// 2c. Get user's scope input, update scope variable, and update #output in real time (on keyup)
	$(document).on("keyup","#scope",function(){
		scope = $("#scope").val();
		updateOutput();
	})

	// 2d. emphasizes the input boxes (description, trigger, scope) when a user mouses over
	$(document).on("mouseover","input",function(){
		$(this).select();
	})

	// 2e. activate tooltips
	$("[data-toggle='tooltip']").tooltip()

	
	// 2f. change placeholders in input boxes (description, trigger, scope) based on viewport size
	function changePlaceholders(){
		size = $('#sizer').find('div:visible').data('size')
				if (size == "lg" || size == "xl"){
					$("#desc").attr("placeholder","i.e. 'JS for loop'")
					$("#trig").attr("placeholder","i.e. 'for'")
					$("#scope").attr("placeholder","i.e. 'source.js'")
				}
				else if (size == "md"){
					$("#desc").attr("placeholder","desc")
					$("#trig").attr("placeholder","trigger")
					$("#scope").attr("placeholder","scope")
				}
				else {
					$("#desc").attr("placeholder","// Snippet description (i.e., 'JS for loop'). Optional.")
					$("#trig").attr("placeholder","// Snippet tab trigger (i.e., 'for'). Required.")	
					$("#scope").attr("placeholder","// Snippet scope (i.e., 'source.js') Optional, default is global.")	
				}
	}

	// 2f1. call changePlaceholders on on startup (to apply the right placeholders based on startup viewport size)
	changePlaceholders(); 

	// 2f2. run changePlaceholders each time the screen is resized
	$(window).on("resize",function(){
		changePlaceholders();
	})

	// 3. Get user's IDE selection (default is Sublime Text)

	// function updates the header over #output ("Your Sublime Text/VS Code snippet:")
	function updateHeading(){
		if (ide == "st3"){ // use Sublime Text 3 heading
			$(".your_snippet").text("Your Sublime Text Snippet:")
			$(".hidden_heading").text("Your Sublime Text Snippet:")
		}
		else { // use Visual Studio Code heading
			$(".your_snippet").text("Your VS Code Snippet:")
			$(".hidden_heading").text("Your VS Code Snippet:")
		}
	}

	// function adds/removes the active class to whichever ide button is selected
	function toggleIDEbutton(){
		if (ide == "st3"){
			$(".st3").addClass("active")
			$(".vsc").removeClass("active")
		}
		else {
			$(".vsc").addClass("active")
			$(".st3").removeClass("active")			
		}
	}

	// 3a. Set default to Sublime Text
	var ide = "st3" // default is Sublime Text (st3)
	updateHeading() // run this at startup to set the header over #output to ("Your Sublime Text Snippet")
	toggleIDEbutton() // run at startup to show Sublime Text is selected

	// 3b. have #output default to sublime text
	output.session.setMode("ace/mode/html") // set mode to HTML because this is how Sublime Text formats its snippets
	output.session.setUseWorker(false) // disables syntax error messaging for #output
	output.setValue(formatSublime()) // format #output for Sublime Text
	output.clearSelection(); // disables ACE's default setting of highlighting the entirety of #output on input

	// 3c. Change settings from Sublime Text to VS Code depending on button click
	$(document).on("click",".st3",function(){ // .st3 is the Sublime Text button
		ide = "st3"
		updateOutput()
		updateHeading()
		toggleIDEbutton()
	})

	$(document).on("click",".vsc",function(){ // .vsx is the VS Code button
		ide = "vsc"
		updateOutput()
		updateHeading()
		toggleIDEbutton()
	})

	// Functions for formating the snippets based on IDE selection

	function formatSublime(){
		// formats user's input into a valid Sublime Text 3 snippet
		length = editor.session.getLength()
		lines = editor.session.getLines(0,length-1)
		
		snippet = '<snippet>\n'+
		'   <content><![CDATA[\n'

		for (var i=0; i<lines.length; i++){
			snippet += lines[i] + '\n'
		}

		snippet += ']]></content>\n'

		if (description == "description" || description == ""){
			snippet += '<!-- <description>'+description+'</description> -->\n'
		}
		else {
			snippet += '<description>'+description+'</description\n'
		}

		if (trigger == "none" || trigger == ""){
			snippet += '<!-- <tabTrigger>'+trigger+'</tabTrigger> -->\n'
		}
		else {
			snippet += '<tabTrigger>'+trigger+'</tabTrigger>\n'
		}

		if (scope == "global" || scope == ""){
			snippet += '<!-- <scope>'+scope+'</scope> -->\n'
		}
		else {
			snippet += '<scope>'+scope+'</scope>\n'
		}

		snippet += '</snippet>'

		return snippet
	}

	function formatVSCode(){
		// formats the user's input into a valid VS code snippet

		length = editor.session.getLength()
		lines = editor.session.getLines(0,length-1)

		code_lines = [];
		for (var i=0; i<lines.length; i++){
			code_lines.push('       '+'"'+lines[i]+'"'+',\n')
		}

		snippet = '{\n   '+'"'+description+'"'+': {'+'\n'+
		'   "prefix": '+'"'+trigger+'"'+',\n'+
		'   "body": [\n'

		for (var i=0; i<code_lines.length; i++){
			snippet += code_lines[i]
		}

		snippet += '    ],\n'+'   "description": "'+description+'"}\n}'

		return snippet
	}

	// 4. Placeholder feature (supports the insertion of tabstops,placeholders, and a final cursor position. Also has a reset placeholders feature)

	// 4a. Track the number of tabstops and placeholders in use:
	var placeholders = { // different kinds of placeholders
		tabstop: 0, // tabstops start with $1, $2, etc.
		placeholder: 0, // placeholders start with  {$1: content}
		final_cursor_location_set: false
	}

	// 4b. Track keydown events to detect valid commands (command+i, command+j, command+k)
	var keyMap = {
		91: false, // command keyCode
		73: false, // i keyCode
		74: false, // j keyCode
		75: false  // k keyCode
	}

	// 4c. Add tabstops, placeholders, and final cursor position
	$(document).on("keydown","#aceEditor",function(e){

		if (e.keyCode in keyMap){
			keyMap[e.keyCode] = true;
			// command + i -> insert a tabstop
			if (keyMap[91] && keyMap[73]){
				editor.session.setUseWorker(false) // disables syntax error message
				placeholders.tabstop += 1
				// in an instance where text is highlighted, replace text with tabstop:
				start = editor.getSelectionRange().start
				end = editor.getSelectionRange().end
				if (start != end){
					editor.session.replace(editor.getSelectionRange(),"$"+placeholders.tabstop)
				}
				// in an instance where nothing is selected:
				else {
					editor.session.insert(editor.getCursorPosition(), "$"+placeholders.tabstop);
				}
				// set keys to false:
				keyMap[91] = false
				keyMap[73] = false
				// update the #output
				updateOutput()				
				return
			}

			// command + j -> insert a placeholder
			else if (keyMap[91] && keyMap[74]){
				editor.session.setUseWorker(false) // disables syntax error message
				start = editor.getSelectionRange().start
				end = editor.getSelectionRange().end
				editor.session.insert(end,"}")
				placeholders.placeholder += 1
				editor.session.insert(start,"${"+placeholders.placeholder+":")
				// set keys to false
				keyMap[91] = false
				keyMap[74] = false
				// update #output
				updateOutput()
				return
			}

			// command + k -> insert final cursor position (only if it hasn't already been placed)
			else if (keyMap[91] && keyMap[75] && placeholders.final_cursor_location_set == false){
				editor.session.setUseWorker(false) // disables syntax error message
				placeholders.final_cursor_location_set = true
				editor.session.insert(editor.getCursorPosition(), "$0");
				// set keys to false
				keyMap[91] = false
				keyMap[75] = false
				// update #output
				updateOutput()
				return
			}		
		}
	})

	// 4d. Update #output on each keyup event in #editor (updates output in real time)
	$(document).on("keyup","#aceEditor",function(e){
		if (e.keyCode in keyMap){
			keyMap[e.keyCode] = false;
		}
		updateOutput() // updates output after each key up event
	})

	// 4e. Reset placeholders feature

	// 4e1. Store the value of editor session without any placeholders:
	var without_placeholders = editor.getValue() // the default value of the editor session at startup

	// 4e2. On #editor change, if no placeholders added, update without_placeholders variable
	$(document).on("keyup","#aceEditor",function(){
		if (placeholders.tabstop == 0 && placeholders.placeholder == 0 && placeholders.final_cursor_location_set == false){
			without_placeholders = editor.getValue();
		}
	})
	
	// 4e3. On #reset placeholders click, change #editor to without_placeholders and reset placeholders object
	$(".reset_placeholders").on("click",function(){
		editor.setValue(without_placeholders)
		editor.clearSelection(); // disables ACE's default setting of highlighting the entirety of #output on input
		updateOutput(); // have changes reflected in #output
		placeholders.tabstop = 0; // reset tabstop value
		placeholders.placeholder = 0; // reset placeholder value
		placeholders.final_cursor_location_set = false; // reset final cursor position
		// editor.clearSelection(); // disables ACE's default setting of highlighting the entirety of #output on input

	})

	// Have changes in #editor automatically reflect in #output
	function updateOutput(){
		val = editor.getValue();
		if (ide == "st3"){
			// format for Sublime Text
			output.session.setMode("ace/mode/html") // Sublime text format for snippets
			output.session.setUseWorker(false) // disables error
			output.setValue(formatSublime())
			output.clearSelection();
		}
		else if (ide == "vsc"){
			// format for VS Code
			output.session.setMode("ace/mode/python") // VS Code format for snippets
			code = formatVSCode()
			output.setValue(code)
			output.clearSelection();
		}
	}

	// 5. copy to clipboard feature
	$(document).on("click",".copy2clipboard",function(){
		// 5a. create a temporary <textarea> element
		clipboard = document.createElement('textarea');
		// 5b. copy the value of #output onto the clipboard
		clipboard.value = output.getValue();
		// 5c. append this element to the <body>
		document.body.appendChild(clipboard);
		// 5d. select the content 
		clipboard.select();
		// 5e. copy it
		document.execCommand("copy");
		// 5f. remove the <textarea> element from <body>
		document.body.removeChild(clipboard)
		$(".copy2clipboard").focus() // leaves the border around the button raised until the user focuses on another element
	})

});

