
window.onload = function () {
    readArticle();
};

function readArticle(){
    let selectedArticleURL = localStorage.getItem('selectedArticleURL');
    console.log('selectedArticleURL', JSON.parse(selectedArticleURL))
    appendArticle(JSON.parse(selectedArticleURL));
}

function appendArticle(articleurl) {
    let articleContent = '<iframe src="' + articleurl +'" frameborder="0" style="    width: 100%; height: 100vh;"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    document.getElementById("add_after_me").insertAdjacentHTML('afterend', articleContent);
}

function goBack(){
    localStorage.setItem('selectedArticleURL', null);
    window.location.href = "./";
}