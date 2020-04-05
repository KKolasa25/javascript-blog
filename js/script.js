'use strict';

/* [NEW] */
const templates = {

  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsColumnLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML)
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  // Usuń aktywną klase ze wszystkich linków artykułow
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  // Dodaj klase "active" do klikniętgo linku
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  // Usuń klase aktywną ze wszystkich artykułów
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  // Dostań atrybut 'href' z klikniętego linku 
  /* [DPNE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  // Znajdź poprawny artykuł uzyając selektor, który wskazuje na wartość atrybutu 'href'
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  // Dodaj klase 'active' do poprawnego artykułu
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

}

// FUNCTION generateTitleLinks // 
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  console.log('Iterating works!');

  // Usuń zawartość listy tytułów
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  // Dla każdego artykułu
  /* [DONE] for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);
  console.log(optArticleSelector + customSelector);
  console.log('Author: ' + optArticleAuthorSelector + customSelector);

  for (let article of articles) {

    // Otrzymaj ID artykułu
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('Article ID: ' + articleId);

    // Znajdź i otrzymaj tytuł z elementu, który wskazuje tytuł
    /* [DONE] find and get tittle from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('Article title: ' + articleTitle);

    // Stwórz link HTML
    /* [DONE] create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('Link HTML: ' + linkHTML);

    /* [NEW] */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    // Zamieść link do zmiennej HTML
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

// FUNCTION calculateTagsParams //
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// FUNCTION generateTags // 

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  // Znajdź wszystkie artykuły
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // START pętla: dla każdego artykułu
  /* START LOOP: for every article: */
  for (let article of articles) {

    // Znajdź wrapper tagu
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);

    // Stwórz zmienna HTML z pustym stringiem
    /* [DONE] make html variable with empty string */
    let html = '';

    // Otrzymaj tagi z atrybutu data-tags
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    // Rozdziel tagi w tablicy
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    // START pętla: dla każdego tagu
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      // Wygeneruj linki HTML
      /* [DONE] generate HTML of the link */

      /* [NEW] */
      const linkHTMLData = {id:tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log('Link do tagu:' + linkHTML);

      // Dodaj wygenerowane linki do zmiennej HTML
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      // END pętla: dla każdego artykułu
      /* END LOOP: for each tag */
    }
    // Wstaw HTML wszystkich linków we wrapper tagów
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

    // END pętla: dla każdego artykułu
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in AllTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

}
generateTags();

//* FUNCTION tagClickHandler *// 

function tagClickHandler(event) {

  // Zapobiegnij domyślnym akcjom dla tego eventu
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  // Stwórz nowy const nazwyając go "clickedElement" i daj mu wartość "this"
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  // Stwórz nowy const "href" i odczytaj jego atrybut "href" klikniętego elementu
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefTag = clickedElement.getAttribute('href');
  console.log(hrefTag);

  // Stwórz nowy const "tag" i wyciągnij/zastąp tag z const "href"
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = hrefTag.replace('#tag-', '');
  console.log(tag);

  // Znajdź wszystkie linki tagów z aktywną klasą
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  // START pętla: dla każdego aktywnego linku tagu
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    // Usuń klase "active"
    /* [DONE] remove class active */
    activeTag.classList.remove('active');

    // END pętla: dla każdego aktywnego linku tagu
    /* END LOOP: for each active tag link */
  }
  // Znajż wszystkie linku tagu z atrybutem "href" którego wartość jest równa const "href"
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('a[href="' + hrefTag + '"]');
  console.log(targetTags);

  // Start pętla: dla każdego linku tagu
  /* START LOOP: for each found tag link */
  for (let targetTag of targetTags) {

    // Dodaj klase "active"
    /* [DONE] add class active */
    targetTag.classList.add('active');
    // END pętla: dla każdego linku tagu 
    /* END LOOP: for each found tag link */
  }

  // Wykonaj funkcje z selectorem artykułu jako argument
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  // Znajdź wszystkie linku do tagów
  /* [DONE] find all links to tags */
  const tags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tags);
  // START pętla: dla każdego linku 
  /* START LOOP: for each link */
  for (let tag of tags) {
    // Dodaj tagClickHandler jako nasłuchiwacz eventu dla tego linku
    /* [DONE] add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  // Znajdź wszystkich autorów
  /* [DONE] find all authors */
  const articleAuthors = document.querySelectorAll(optArticleSelector);
  console.log(articleAuthors);
  // START pętla: dla każdego autora
  /* START LOOP: for every author: */
  for (let articleAuthor of articleAuthors) {

    // Znajdź wrapper autora
    /* [DONE] find author wrapper */
    const authorWrapper = articleAuthor.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    // Stwórz zmienną HTML z pustym stringiem
    /* [DONE] make html variable with empty string */
    let html = '';

    // Otrzymaj autora z atrybutu data-author
    /* [DONE] get author from data-author attribute */
    const hrefAuthor = articleAuthor.getAttribute('data-author');
    console.log(hrefAuthor);

    // Wygeneruj link HTML
    /* [DONE] generate HTML of the link */

    /* [NEW] */
    const linkHTMLData = {id:hrefAuthor, title: hrefAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    // Dodaj wygenerowany kod do zmiennej HTML
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(hrefAuthor)) {
      /* [NEW] add generated code to allTags array */
      allAuthors[hrefAuthor] = 1;
    } else {
      allAuthors[hrefAuthor]++;
    }
    // Umieść HTML wszystkich linków do wrappera author
    /* [DONE] insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: *////}
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';
  const allAuthorsHTML = {authors: []};

  /* [NEW] START LOOP: for each tag in allAuthors */
  for (let hrefAuthor in allAuthors) {
    /* [NEW] generate code of link and add it to allAuthorsHTML */
    //allAuthorsHTML += hrefAuthor + ' (' + allAuthors[hrefAuthor] + ') ';
    //const authorlinkHTML = '<li><a href="#author-' + hrefAuthor + '">' + hrefAuthor + '</a>' + ' (' + allAuthors[hrefAuthor] + ') ' + '</li>';
    //allAuthorsHTML += authorlinkHTML;
    allAuthorsHTML.authors.push({
      hrefAuthor: hrefAuthor,
      count: allAuthors[hrefAuthor]
    });
  }
  /* [NEW] END LOOP: for each tag in allAuthors: */
  /* [NEW] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = templates.authorsColumnLink(allAuthorsHTML);

}
generateAuthors();

//* FUNCTION authorClickHandler *// 
function authorClickHandler(event) {

  // Zapobiegnij domyślnym akcjom dla tego eventu
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  // Stwórz nowy const o nazwie "clickedElement" i nadaj jej wartość "this"
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  // Stwórz nowy const "href" i odczytaj jego atrybut "href" klikniętego elementu
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefAuthor = clickedElement.getAttribute('href');
  console.log(hrefAuthor);

  // Dodaj klase "active" do klikniętego linku
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  // Stwórz nowy const i wydobądź z niej tag z const "href"
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const nameAuthor = hrefAuthor.replace('#author-', '');
  console.log(nameAuthor);

  // Znajdź wszyetkie linki tagu z klasą aktywną
  /* [DONE] find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);

  // START pętla: dla każdego aktywnego linku autora
  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {

    // Usuń aktywną klasę
    /* [DONE] remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link *////}

    // Znajdź wszystkie linku tagów z atrybutem "href" który ma wartość równą const "href"
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const targetAuthors = document.querySelectorAll('a[href="' + hrefAuthor + '"]');
    console.log(targetAuthors);

    /* START LOOP: for each found author link */
    for (let targetAuthor of targetAuthors) {

      /* [DONE] add class active */
      targetAuthor.classList.add('active');
    }
  }
  /* END LOOP: for each found author link *

  // Wykonaj funckje generateTitleLinks z ODPOWIEDNIM ARGUMENTEM JAKO SELEKTOREM
  /* [IN PROGRESS] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + nameAuthor + '"]');
}

function addClickListenersToAuthors() {
  // Znajdź wszystkie linki autorów
  /* [DONE] find all links to authors */
  const authors = document.querySelectorAll('a[href^="#author-"]');
  console.log(authors);

  /* START LOOP: for each link */
  for (let author of authors) {

    /* [DONE] add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();