"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let star = story.isFavorite ? "&#11088;" : "&#9734;"
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class= "star"> ${star} </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  hidePageComponents()
  $allStoriesList.empty()

  storyList.stories.forEach( story => {
    
    currentUser.favorites.some(fav => fav.storyId === story.storyId) ?
    story.isFavorite = true :
    story.isFavorite = false
  }) 
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle story form submission. */

async function submitStory(evt) {
  evt.preventDefault();

  // grab the author, title and url
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();


  await storyList.addStory(currentUser, {title , author, url});
  putStoriesOnPage()
  $storyForm.hide();
}

$storyForm.on("submit", submitStory);


/**
 * Show favorite stories
 */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  hidePageComponents() 
  
  $favoriteStoriesList.empty()
  let favStories = storyList.stories.filter(story=> currentUser.favorites.some(fav => fav.storyId === story.storyId))

  // loop through all favorite stories and generate HTML for them
  for (let story of favStories) {
    story.isFavorite = true
    const $story = generateStoryMarkup(story);
    $favoriteStoriesList.append($story);
  }

  $favoriteStoriesList.show();
} 




/**
 * Show current user's stories
 */

function generateStoryMarkupWithDelete(story) {
  // console.debug("generateStoryMarkup", story);
  let star = story.isFavorite ? "&#11088;" : "&#9734;"
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
     
      <span class= "star"> ${star} </span>
      <span class= "remove"> &#10540; </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
       
      </li>
    `);
}


function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");
  hidePageComponents() 
 
  $ownStoriesList.empty()

  let ownStories = storyList.stories.filter(story=> currentUser.ownStories.some(own => own.storyId === story.storyId))

  ownStories.forEach( story => {
    
    currentUser.favorites.some(fav => fav.storyId === story.storyId) ?
    story.isFavorite = true :
    story.isFavorite = false
  }) 

  // loop through all ownStories stories and generate HTML for them
  for (let story of ownStories) {
    const $story = generateStoryMarkupWithDelete(story);
    $ownStoriesList.append($story);
  }

  $ownStoriesList.show();
}

