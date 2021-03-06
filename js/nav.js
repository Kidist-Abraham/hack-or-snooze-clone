"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show()
  $navFavorites.show()
  $navStories.show()
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show story adding form on click on "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $storyForm.show();
}

$navSubmit.on("click", navSubmitClick);



/** Show Favourite stories on click on "Favorite" */

function navFavoriteClick(evt) {
  console.debug("navFavoriteClick", evt);
  hidePageComponents();
  putFavoriteStoriesOnPage()
}

$navFavorites.on("click", navFavoriteClick);


/** Show current user's stories on click on "My Stories" */

function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  putMyStoriesOnPage()
}

$navStories.on("click", navMyStoriesClick)
