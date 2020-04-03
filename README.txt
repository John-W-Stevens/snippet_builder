Welcome to Snippet Builder

Snippet Builder facilitates the easy creation of snippets for Sublime Text and Visual Studio Code.
Both of these IDE's lack a helpful interface for creating your own snippets. This app is designed to make creating snippets for both IDEs simple and intuitive.

Snippet Builder uses embedded ACE editors (https://ace.c9.io/) and was designed with Bootstrap 4.
It is functional, though still needs testing (something I am working on). In addition the "about" link and all three links on the bottom aren't functional yet.

Snippet Builder supports the input of a description, tab trigger, and scope as well as the use of tabstops, placeholders, and the insertion of a final cursor position.

Get Snippet Builder:

1. Download the repo: git clone git@github.com:John-W-Stevens/snippet_builder.git
2. Open index.html in the browser.

Use Snippet Builder:

1. Select either Sublime Text or Visual Studio Code (Sublime Text is selected by default)
2. Choose your programming language from the dropdown (select TEXT if you want plain text)
3. Input values for description, tab trigger, and scope (scope is optional)
4. Type your snippet (or paste in your code) into the code editor on the left
5. Insert placeholders
	a. To insert a tabstop, select a location (or highlight text for replacement) and press command+i (windows+i)
	b. To insert a placeholder, select text and press command+j (windows+j)	
	c. To set the final cursor position, select a location and press command+k (windows+k)
	d. Reset placeholders if you need to start over
6. Copy your snippet manually or click "Copy to clipboard" to get your snippet
7. Open a new snippet file in either Sublime Text or VS Code and replace the entire contents of that file with your snippet.
8. Save the snippet file and enjoy using your snippet!

To Create a snippet in Sublime Text:
	a. Create a new snippet file (Tools/Developer/New Snippet...)
	b. Replace the entire contents of the file with your snippet
	c. Save the file as: your_snippet_name.sublime-snippet
		Note: You can name the file whatever you want but the ".sublime-snippet" is a required extension
		Note: Unless necessary, save the file in its default location
	d. Now open a new file in Sublime Text and use your tab trigger to insert your snippet

To Create a snippet in VS Code:
	a. Create a new snippet file (Code/Preferences/User Snippets)
	b. Select "New Global Snippets file..." (to create a global snippet.)
	c. Name the snippet file whatever you want
	d. Replace the entire contents of the file with your snippet
	e. Save the file. You can now start using your snippet!
