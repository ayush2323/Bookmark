showBookmark();

const container = document.querySelector('.container');
const head = document.querySelector('.head');
const content = document.querySelector('.content');
const overlay = document.getElementById('overlay');
const close = document.querySelector('.close');
const enterBookmark = document.querySelector('.enterBookmark');
const submit = document.getElementById('submit');
const del = document.querySelector('.delete');
const textTitle = document.getElementById('text-title');
const textLink = document.getElementById('text-link');
const alert = document.getElementById('alert');
const insert = document.getElementById('insert');
const comfirmbtn = document.getElementById('comfirmbtn');
const box = document.getElementById('box');

head.addEventListener('click', () => {
    enterBookmark.classList.add('active');
    overlay.classList.add('active');
    content.classList.add('active');
});

close.addEventListener('click', () => {
    enterBookmark.classList.remove('active');
    overlay.classList.remove('active');
    content.classList.remove('active');
});

submit.addEventListener('click', () => {
    let textTitle = document.getElementById('text-title');
    let textLink = document.getElementById('text-link');
    let bookmark = localStorage.getItem('bookmark');

    if(bookmark == null){
        bookmarkObj = [];
    }
    else{
        bookmarkObj = JSON.parse(bookmark);
    }

    if(textLink.value == "" && textTitle.value == ""){
        let add = "input can't be empty";
        insert.innerHTML = add;
        alert.style.display = 'block';
        enterBookmark.style.opacity = '0.8';
    }
    else if(textLink.value == "" ){
        textTitle.value = "";
        let add = "link can't be empty";
        insert.innerHTML = add;
        alert.style.display = 'block';
        enterBookmark.style.opacity = '0.8';
    }
    else if(textTitle.value == ""){
        textLink.value = "";
        let add = "title can't be empty";
        insert.innerHTML = add;
        alert.style.display = 'block';
        enterBookmark.style.opacity = '0.8';
    }
    else{
        let myObj = {
            title: textTitle.value,
            link: textLink.value
        }
        bookmarkObj.push(myObj);
        localStorage.setItem('bookmark', JSON.stringify(bookmarkObj));
        textTitle.value = "";
        textLink.value = "";
        enterBookmark.classList.remove('active');
        overlay.classList.remove('active');
        content.classList.remove('active');
        showBookmark();
    }
});

textLink.addEventListener('blur', () => {
    console.log("link is blurred");
    let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    let str = textLink.value;
    if(regex.test(str)){
        validLink = true;
    }
    else{
        console.log('link is not valid');
        let add = "Enter valid link";
        insert.innerHTML = add;
        alert.style.display = 'block';
        textLink.value = "";
        enterBookmark.style.opacity = '0.8';
    }
});

comfirmbtn.addEventListener('click', () => {
    alert.style.display = 'none';
    enterBookmark.style.opacity = '1';
})

function showBookmark() {
    let bookmark = localStorage.getItem("bookmark");
    if(bookmark == null){
        bookmarkObj = [];
    }
    else{
        bookmarkObj = JSON.parse(bookmark);
    }
    let html = "";
    bookmarkObj.forEach(function(element,index) {
        html += `
        <div class="same-card">
            <button id="${index}" onclick="deleteBookmark(this.id)" class="delete">&times;</button>
            <div class="same">
                <h5 class="book-title">${element.title}</h5>
                <a target="_blank" href="${element.link}"><button class="open"> Go To Site</button></a>
            </div>
        </div>`;
    });
    let book = document.getElementById('bookmark');
    if(bookmarkObj.length != 0){
        book.innerHTML = html;
    }
    else{
        book.innerHTML = `<h1 id="empty">Nothing to show! Use "Add a Bookmark" section above to add bookmark.</h1>`;
    }
}

function deleteBookmark(index) {
    let bookmark = localStorage.getItem("bookmark");
    if(bookmark == null){
        bookmarkObj = [];
    }
    else{
        bookmarkObj = JSON.parse(bookmark);
    }

    bookmarkObj.splice(index, 1);
    localStorage.setItem('bookmark', JSON.stringify(bookmarkObj));
    showBookmark();
}