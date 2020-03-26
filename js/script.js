'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DPNE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');


 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){
  console.log('Iterating works!');
  
  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [IN PROGRESS] for each article */
  
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log (articleTitle);

    /* [IN PROGRESS] get the title from the title element */

    /* [IN PROGRESS] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log (linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;

    /* [IN PROGRESS] insert link into titleList */
  }
  
  titleList.innerHTML = html;

}

generateTitleLinks();

}

const links = document.querySelectorAll('.titles a');
console.log('Links' + links);

for (let link of links) {
link.addEventListener('click', titleClickHandler);
}