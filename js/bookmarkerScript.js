var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var submitbookmark = document.querySelector('#bookmarkForm button');
var errorSiteName=document.getElementById('errorSiteName');
errorSiteName.style.display="none";
var errorSiteUrl=document.getElementById('errorSiteUrl');
errorSiteUrl.style.display="none";



if(localStorage.getItem('bookmarkListStorage')==null){
    var bookmarkItemsArray=[];
}else{
    bookmarkItemsArray=JSON.parse(localStorage.getItem("bookmarkListStorage"));
    displaybookmarkList();
}

submitbookmark.addEventListener('click',addBookmarkItem);
function addBookmarkItem(eventInformation){
    eventInformation.preventDefault();
    if(!validateBookmarkInputs()){        
        bookmarkItem={
            siteName:siteName.value,
            siteUrl:siteUrl.value
        };
        bookmarkItemsArray.push(bookmarkItem);
        localStorage.setItem('bookmarkListStorage' ,JSON.stringify(bookmarkItemsArray));
        displaybookmarkList();
        clearForm();
    }    
}

function displaybookmarkList(){
    var cartona="";
    for(var i = 0 ;i<bookmarkItemsArray.length;i++){
        cartona+=` <div class="bookmarkRow col-10 d-flex align-items-center justify-content-between py-4 ">
        <span class="font-weight-bolder">${bookmarkItemsArray[i].siteName}</span>
        <div class="bookmarkControlPanel">
            <a href="${bookmarkItemsArray[i].siteUrl}" target="_blank" class="btn btn-primary">visit</a>
            <button onclick="deleteBookmarkItem(${i})" class="btn btn-danger">delete</button>
        </div>
   </div>
        `;
    };
    document.querySelector('#bookmarkData>div').innerHTML =cartona;
}

function deleteBookmarkItem(index){
    bookmarkItemsArray.splice(index,1);
    localStorage.setItem('bookmarkListStorage',JSON.stringify(bookmarkItemsArray));
    displaybookmarkList();
}

function validateBookmarkInputs(){
    if(siteName.value=="" && siteUrl.value!=""){
        errorSiteName.style.display="block";
        errorSiteUrl.style.display="none";
        return true;
    } 
    else if(siteName.value !="" && siteUrl.value ==""){
        errorSiteName.style.display="none";
        errorSiteUrl.style.display="block";
        return true;
    }
    else if (siteName.value=="" && siteUrl.value=="") {
        errorSiteName.style.display="block";
        errorSiteUrl.style.display="block";
        return true;
    }
    else {
        errorSiteName.style.display="none";
        errorSiteUrl.style.display="none";
        return false;
    }
}

function clearForm(){
    siteName.value="";
    siteUrl.value="";
}

