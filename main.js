//document.getElementById('inputForm').addEventListener('submit', saveData); 

document.querySelector('form').addEventListener('submit', saveBookList);

function saveBookList(e) {
    
  var StudentName = document.getElementById('sName').value;
	var BookTitle = document.getElementById('bTitle').value;
	var RentDate = document.getElementById('rDate').value; 
  var id = chance.guid();
    
  var book = {
    sName: StudentName,
		bTitle: BookTitle,
		rDate: RentDate,
    id: id    
  }
  
  if(localStorage.getItem('books') === null){
		var books = []; 
		books.push(book); 
		localStorage.setItem('books', JSON.stringify(books));
  }else{
    var books = JSON.parse(localStorage.getItem('books'));
		books.push(book); 
		localStorage.setItem('books', JSON.stringify(books)); 
  }
	
	document.querySelector('form').reset(); 
	
	fetchBooks(); 
    
  e.preventDefault();
}

function fetchBooks(){
	
	var books = JSON.parse(localStorage.getItem('books')); 
	
	document.getElementById('showBookList').innerHTML = ''; 
	
	for(var i = 0; i < books.length; i++ ){
		var studentName = books[i].sName;
		var bookTitle = books[i].bTitle;
		var rentDate = books[i].rDate;	
		var id = books[i].id;
		
		document.getElementById('showBookList').innerHTML += '<div class="well">' +
																									 '<h3>Books Summary'	+ '</h4>' +
																									 '<h4>Student name: '	+ studentName + '</h4>' +
																									 '<h4>Book title: '	+ bookTitle + '</h4>' +
																									 '<h4>Rent date: '	+ rentDate + '</h4>' +
																									 '<a href="#" onclick=deletebooks(\''+id+'\') class="btn btn-danger">Delete</a>' + 
																									 '</div>'
	};
	
}

function deletebooks(id){
	var books = JSON.parse(localStorage.getItem('books'));
	for(var i = 0; i < books.length; i++){
		if(books[i].id === id){
			books.splice(i,1); 
		}
	}
	
	localStorage.setItem('books', JSON.stringify(books));
	
	fetchBooks(); 
}