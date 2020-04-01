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

}

// FUNCTION generateTitleLinks // 

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  console.log('Iterating works!');

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  /* [DONE] for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);
  console.log(optArticleSelector + customSelector);

  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log('Article ID: ' + articleId);

    /* [DONE] find and get tittle from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('Article title: ' + articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('Link HTML: ' + linkHTML);

    /* [DONE] insert link into html variable */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();

// FUNCTION generateTags // 

function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

    /* END LOOP: for every article: */}

}
generateTags();

//* FUNCTION tagClickHandler *// 

function tagClickHandler(event) {

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefTag = clickedElement.getAttribute('href');
  console.log(hrefTag);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = hrefTag.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  //const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); //.post-tags .list a'
  for (let activeTag of activeTags) {

    /* [DONE] remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */}
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('a[href="' + hrefTag + '"]');
  console.log(targetTags);

  /* START LOOP: for each found tag link */
  for (let targetTag of targetTags) {

    /* [IN PROGRESS] add class active */
    targetTag.classList.add('active');
    /* END LOOP: for each found tag link */}
  /* [IN PROGRESS] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [IN PROGRESS] find all links to tags */
  const tags = document.querySelectorAll('.post-tags .list a');
  console.log(tags);
  /* START LOOP: for each link */
  for (let tag of tags) {
  /* [IN PROGRESS] add tagClickHandler as event listener for that link */ tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateAuthors() {
  /* [DONE] find all authors */
  const articleAuthors = document.querySelectorAll(optArticleSelector);
  console.log(articleAuthors);
  /* START LOOP: for every author: */
  for(let articleAuthor of articleAuthors) {

    /* [DONE] find author wrapper */
    const authorWrapper = articleAuthor.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute */
    const hrefAuthor = authorWrapper.getAttribute('data-author');
    console.log(hrefAuthor);

    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#' + hrefAuthor + '">' + hrefAuthor + '</a></li>';
    console.log(linkHTML);

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    authorWrapper.innerHTML = html;
  }
  //authorWrapper.innerHTML = html;
/* [DONE] insert HTML of all the links into the tags wrapper */
/* END LOOP: for every article: *////}
//}
}
generateAuthors();

//* FUNCTION tagClickHandler *// 

function authorClickHandler(event) {

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefAuthor = clickedElement.getAttribute('href');
  console.log(hrefAuthor);
  
  /* [IN PROGRESS] make a new constant "tag" and extract tag from the "href" constant */
  const nameAuthor = hrefAuthor.replace('#', '');
  console.log(nameAuthor);
  
  /* [IN PROGRESS] find all tag links with class active */
  //const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(activeTags);

  /* START LOOP: for each active tag link */
  //const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); //.post-tags .list a'
  //for (let activeTag of activeTags) {

  /* [IN PROGRESS] remove class active */
  //activeTag.classList.remove('active');


  /* END LOOP: for each active tag link *////}
  /* [IN PROGRESS] find all tag links with "href" attribute equal to the "href" constant */
  const targetAuthor = document.querySelectorAll('a[href="' + hrefAuthor + '"]');
  console.log(targetAuthor);

  /* START LOOP: for each found tag link */
  //for (let targetTag of targetTags) {

  /* [IN PROGRESS] add class active */
  //targetTag.classList.add('active');
  /* END LOOP: for each found tag link */////}
  /* [IN PROGRESS] execute function "generateTitleLinks" with article selector as argument */
  //generateTitleLinks('[data-author="' + hrefAuthor + '"]');
}

function addClickListenersToAuthors() {
  /* [IN PROGRESS] find all links to tags */
  const authors = document.querySelectorAll('.post-author a');
  console.log(authors);

  /* START LOOP: for each link */
  for (let author of authors) {

    /* [DONE] add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */}
}
addClickListenersToAuthors();
