document.getElementById('formBookmark').addEventListener('submit', addBookmark);
fetchBookmarks();

function addBookmark(e) {
    var siteName = document.getElementById('txtSiteName').value;
    var siteUrl = document.getElementById('txtSiteUrl').value;
    if (!validate(siteName, siteUrl)) {
        alert("Please fill the blank fields");
        return;
    }

    var newBookmark = {
        siteName: siteName,
        siteUrl: siteUrl
    }

    var bookmarks = getlocalBookmarks() || [];

    bookmarks.push(newBookmark);
    localStorage.setItem('tf-bookmarks', JSON.stringify(bookmarks));

    document.getElementById(formBookmark).reset();
     document.getElementById("txtSiteName").focus();
    
    fetchBookmarks();
    e.preventDefault();
   
}


function fetchBookmarks() {
    var bookmarks = getlocalBookmarks();
    var html = '';
    var resultsContainer = document.getElementById('bookmarkResults');
    if (bookmarks && bookmarks.length > 0) {
        resultsContainer.innerHTML = '';
        for (var i = 0; i < bookmarks.length; i++) {
            var siteName = bookmarks[i].siteName;
            var siteUrl = bookmarks[i].siteUrl;

            resultsContainer.innerHTML += '<div class="well"><h4>' + siteName +
                '<a class="btn btn-danger pull-right" onclick="removeBookmark(\'' + siteUrl + '\')" href="#">Delete</a>' +
                '<a class="btn btn-success pull-right" href="' + siteUrl + '" target="_blank">Visit</a>' +
                '</h4>';
        }

    }

    else {
        resultsContainer.innerHTML = "<p>Once you add a bookmark, it will appear here</p>"
    }
}

function getlocalBookmarks() {
    var bookmarks = [];
    var localBookmarks = localStorage.getItem('tf-bookmarks');
    if (localBookmarks) {
        bookmarks = JSON.parse(localBookmarks);
    }
    return bookmarks;
}

function removeBookmark(siteUrl) {
    var bookmarks = getlocalBookmarks();
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteUrl == siteUrl)
            bookmarks.splice(i, 1);
    }

    localStorage.setItem('tf-bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}


function validate(siteName, siteUrl) {
    if (!siteName || !siteUrl) 
        return false;
    
    return true;
}
