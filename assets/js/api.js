const API_KEY = "874293edb5124927bd23b373aed922f3";
// const API_ENDPOINT = "https://newsapi.org/v2/top-headlines?country=ma&category=sports&apiKey=" + API_KEY;
const API_ENDPOINT = "https://www.api.footballjournal.news/api/article/paginate/sa/10/";

const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";
let serverData = [];

let news_page = 0;


let loadingData = false;

function isDataNotloaded(){
    return serverData.length == 0;
}


function callapi(pageparam){
    // console.log('---------------------------callapi')
    // console.log('loadingData', loadingData)
    if (!loadingData) {
        loadingData = true;
        // var apiUrl = CORS_PROXY+API_ENDPOINT;
        var apiUrl = API_ENDPOINT;
        if (pageparam && pageparam.length) {
            apiUrl = apiUrl + pageparam;
        } else apiUrl = apiUrl + "0";

        // console.log('inside loadingData', loadingData)
        fetch(apiUrl).then(response => {
            return response.json();
        }).then(data => {
            // Work with JSON data here
            let articles = data;
            _.each(articles, (art) => {
                appendArticle(art);
            })
            // console.log('serverData.length', serverData.length)
            if (isDataNotloaded()) {
                window.scrollTo({ top: 0 });
            }
            serverData = _.union(serverData, data);
            loadingData = false;

        }).catch(err => {
            // Do something for an error here
        });
    }
}

window.onload = function () {

    window.scrollTo({ top: 0 });
    callapi();
};

function appendArticle(article){
    let articleContent = 
        '<div class="blog-card">' +
        '<div class="blog-card-banner" >' +
        '        <img src="' + (article.heroURL || "./assets/images/default-article.png") + '" alt="' + article.title+'"' +
        '          width="250" class="blog-banner-img">' +
        '      </div>' +
        '      <div class="blog-content-wrapper">' +

        '        <button class="blog-topic text-tiny">' + article.category+'</button>' +

        '        <h3>' +
        '          <a href="' + article.sourceURL +'" class="h3">' + article.title +
        '          </a>' +
        '        </h3>' +
        ( article.content ? '        <p class="blog-text">' + article.content + '        </p>' : "") +

        '        <div class="wrapper-flex">' +

        '          <div class="wrapper">' +
        '            <a href="' + article.sourceURL + '" class="h4">' + article.source + (article.author ? " - " + article.author : "") +'</a>' +

        '            <p class="text-sm">' +
        '              <time datetime="' + article.articleDate+'"></time>' +
        '            </p>' +
        '          </div>' +

        '        </div>' +

        '      </div>' +

        '    </div > ';


    document.getElementById("add_after_me").insertAdjacentHTML('beforebegin', articleContent);


}

function readSingleArticle(url){
    // let fullObj = _.find(serverData, (item)=>{
    //     return item.url == url;
    // })


    // // Put the object into storage
    // localStorage.setItem('selectedArticleURL', JSON.stringify(fullObj.url));


    // window.location.href = "./single_article";
    window.location.href = url;
}

function loadMore(page){
    let pageparam = "";
    if (page > 0 && serverData.length) {
        pageparam = ""+page;
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