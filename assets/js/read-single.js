
window.onload = function () {
    readArticle();
};

function readArticle(){
    let selectedarticle = localStorage.getItem('selectedarticle');
    console.log('selectedarticle', JSON.parse(selectedarticle))
    appendArticle(JSON.parse(selectedarticle));
}

function appendArticle(article) {
    console.log('....', article)

    let articleContent =
        '<div class="blog-card">' +
        '<div class="blog-card-banner" >' +
        '        <img src="' + (article.urlToImage || "./assets/images/default-article.png") + '" alt="Building microservices with Dropwizard, MongoDB & Docker"' +
        '          width="250" class="blog-banner-img">' +
        '      </div>' +
        '      <div class="blog-content-wrapper">' +

        '        <button class="blog-topic text-tiny">Sports</button>' +

        '        <h3>' +
        '          <a href="#" class="h3">' + article.title +
        '          </a>' +
        '        </h3>' +
        (article.content ? '        <p class="blog-text">' + article.content + '        </p>' : "") +

        '        <div class="wrapper-flex">' +

        '          <div class="wrapper">' +
        '            <a href="' + article.url + '" class="h4">' + article.source.name + (article.author ? " - " + article.author : "") + '</a>' +

        '            <p class="text-sm">' +
        '              <time datetime="' + article.publishedAt + '"></time>' +
        '            </p>' +
        '          </div>' +

        '        </div>' +

        '      </div>' +

        '    </div > ';


    document.getElementById("add_after_me").insertAdjacentHTML('afterend', articleContent);


}