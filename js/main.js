// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;

//save form values as a bookmark 
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
//local storage 
	//is bookmark empty ?
	if(localStorage.getItem('bookmarks') === null){
		//initializing an empty array for bookmarks
		var bookmarks = [];
		//add the bookmark to the empty bookmarks array 
		bookmarks.push(bookmark);
		// set to localstorage and turn it into string beforehand rather than json data 
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	} else {
		//get bookmarks from localstorage 
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
		//add bookmark to the array 
		bookmarks.push(bookmark);
		//re-set back to local storage !
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	}
//prevent submit form action 
  e.preventDefault();
}


// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}


//receive the bookmarks in order to display on the page 
// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}
 
