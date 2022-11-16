const API_KEY = "dbe25773eee642da8aa0b07903b56c92";
const API_ENDPOINT = "https://newsapi.org/v2/top-headlines?country=ma&category=sports&apiKey=" + API_KEY;

const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";
let serverData = [];

let news_page = 0;

function callapi(pageparam){
    var apiUrl = CORS_PROXY+API_ENDPOINT;
    if (pageparam && pageparam.length) {
        apiUrl = apiUrl +pageparam;
    }
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
    // Work with JSON data here
    let articles = data.articles;
    serverData = data.articles;
    _.each(articles, (art)=>{
        appendArticle(art);
    })
    if (!pageparam) {
        window.scrollTo({ top: 0 });
    }

    }).catch(err => {
    // Do something for an error here
});
}

window.onload = function () {

    window.scrollTo({ top: 0 });
    callapi();
};

function appendArticle(article){

    let articleContent = 
        '<div class="blog-card">' +
        '<div class="blog-card-banner" >' +
        '        <img src="' + (article.urlToImage || "./assets/images/default-article.png") + '" alt="Building microservices with Dropwizard, MongoDB & Docker"' +
        '          width="250" class="blog-banner-img">' +
        '      </div>' +
        '      <div class="blog-content-wrapper">' +

        '        <button class="blog-topic text-tiny">Sports</button>' +

        '        <h3>' +
        '          <a onclick="readSingleArticle(\''+article.url+'\')" class="h3">' + article.title +
        '          </a>' +
        '        </h3>' +
        ( article.description ? '        <p class="blog-text">' + article.description + '        </p>' : "") +

        '        <div class="wrapper-flex">' +

        '          <div class="wrapper">' +
        '            <a href="'+article.url+'" class="h4">' + article.source.name + (article.author ? " - " + article.author : "") +'</a>' +

        '            <p class="text-sm">' +
        '              <time datetime="' + article.publishedAt+'"></time>' +
        '            </p>' +
        '          </div>' +

        '        </div>' +

        '      </div>' +

        '    </div > ';


    document.getElementById("add_after_me").insertAdjacentHTML('beforebegin', articleContent);


}

function readSingleArticle(url){
    let fullObj = _.find(serverData, (item)=>{
        return item.url == url;
    })
    window.location.href = fullObj.url;;
}

function loadMore(page){
    let pageparam = "";
    if (page > 0 && serverData.length) {
        pageparam = "&page="+page;
    }
    callapi(pageparam);
}

window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
        news_page++;
        loadMore(news_page);
    }
};

function loadMoreClick(){
    news_page++;
    loadMore(news_page);
}