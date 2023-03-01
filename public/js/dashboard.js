const myBtn1 = document.getElementById("add-tweet");
const text = document.getElementById('text');
const tweetForm = document.getElementById('tweet-form');
const userName = document.getElementById('user-name').innerHTML;
const trending = document.getElementById('trends-for-you');
const d = new Date();
let curTime = d.getTime();
let tweetID = 0;
let isClickedLike= false;
let isClickedRetweet= false;
let isClickedBookmark= false;


let tweets = JSON.parse(localStorage.getItem('tweets')) || []


if(localStorage.getItem('tweets')){
    tweets.map((tweet) =>{
        createTweet(tweet)
    })
}




function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
let ID = getRandomIntInclusive(0, 10000000);


myBtn1.addEventListener('click', function(){
   
    console.log(text.value)
    set(ref(db, "Tweets/" + userName.split(" ")[1]+ "/" + ID), {
        author: userName.split(" ")[1],
        username: userName.split(" ")[1],
        handle: userName.split(" ")[1],
        id: ID,
        time: curTime,
        tweet: text.value,
        bookmarks: 0,
        likes: 0,
        retweets: 0,
        comments: 0
    })
    console.log('Done')
    trigger();
   
})




function trigger(){
    if (text.value == ''){
        return
    }
    const tweet = {
        user: userName.split(" ")[1],
        handle: userName.split(" ")[1],
        content: text.value,
        id: ID,
        liked: false,
        bookmarked: false,
        retweet: false
    }
    tweets.unshift(tweet)
    localStorage.setItem('tweets',JSON.stringify(tweets))
    tweetForm.reset()
    location.reload()
}




function createTweet(tweet){  
  let favColor = "black"
  console.log(tweet)
  if (tweet['liked'] == true){
    favColor = "rgb(255, 7, 115)";
  }
  document.getElementById("add-to-me").innerHTML +=
      `<div class="tweet">
      <img class="tweet-author-logo" src=""/>
      <div class="tweet-main">
        <div class="tweet-header">
          <div class="tweet-username">${tweet.user} </div>
            <div class="tweet-handle"> @${tweet.handle} </div>
            <div class="tweet-time\"> 39m </div>
          </div>
          <div class="tweet-content"> ${tweet.content} </div>
          <div class="tweet-footer">
            <span class="material-symbols-outlined icon comment" id="comment"> chat_bubble </span>
            <a class="retweet-btn"><span class="material-symbols-outlined icon retweet" id="retweet" > repeat </span></a>
            <a class="like-btn"><p style="display: none">${tweet.id}</p><span class="material-symbols-outlined icon like" id="like" style = "color: ${favColor}"> favorite </span></a>
            <a class="bookmark-btn"><span class="material-symbols-outlined icon bookmark" id="bookmark"> bookmark </span></a>
          </div>
        </div>
      </div>
  </div>`    
}


/*
- Person submits the tweet text
- Creates the tweets class
- Append to an array


<div class="tweet">
        <img class="tweet-author-logo" src=""/>
        <div class="tweet-main">
          <div class="tweet-header">
            <div class="tweet-username">${tweet.user} </div>
              <div class="tweet-handle"> @${tweet.handle} </div>
              <div class="tweet-time\"> 39m </div>
            </div>
            <div class="tweet-content"> ${tweet.content} </div>
            <div class="tweet-footer">
              <span class="material-symbols-outlined icon comment" id="comment"> chat_bubble </span>
              <a id="retweet-btn"><span class="material-symbols-outlined icon retweet" id="retweet"> repeat </span></a>
              <a id="like-btn"><span class="material-symbols-outlined icon like" id="like"> favorite </span></a>
              <a id="bookmark-btn"><span class="material-symbols-outlined icon bookmark" id="bookmark"> bookmark </span></a>
            </div>
          </div>
        </div>
*/


const likes = document.getElementsByClassName('like-btn').length;
for (let i = 0; i < likes; i++){
  console.log(i)
    document.querySelectorAll('.like-btn')[i].addEventListener('click', function(e){
        let id = document.getElementsByClassName("like-btn");
        id = id[0].getElementsByTagName('p')[0].innerText
        console.log(tweets[i])
        tweets[i] = likeTweet(tweets[i], i)
        console.log(tweets)
        console.log(localStorage.tweets)
    })
}


const retweet = document.getElementsByClassName('retweet-btn').length;
for (let i = 0; i < retweet; i++){
    document.querySelectorAll('.retweet-btn')[i].addEventListener('click', function(e){
          tweets[i] = retweetTweet(tweets[i], i);
          console.log(tweets[i])
    })
}


const bookmark = document.getElementsByClassName('bookmark-btn').length;
for (let i = 0; i < bookmark; i++){
    document.querySelectorAll('.bookmark-btn')[i].addEventListener('click', function(e){
          tweets[i] = bookmarkTweet(tweets[i], i);
    })
}




function likeTweet(tweet, i){
  if (tweet['liked'] == false){
    tweet['liked'] = true;
    document.querySelectorAll('.like-btn')[i].children['like'].style.color = "rgb(255, 7, 115)";
  } else{
    tweet['liked'] = false;
    document.querySelectorAll('.like-btn')[i].children['like'].style.color = "black";
  }
  return tweet
}


function retweetTweet(tweet, i){
  if (tweet['retweet'] == false){
    tweet['retweet'] = true;
    document.querySelectorAll('.retweet-btn')[i].children['retweet'].style.color = "rgb(0, 186, 124)";
  } else{
    tweet['retweet'] = false;
    document.querySelectorAll('.retweet-btn')[i].children['retweet'].style.color = "black";
  }
  return tweet
}


function bookmarkTweet(tweet, i){
  if (tweet['bookmarked'] == false){
    tweet['bookmarked'] = true;
    document.querySelectorAll('.bookmark-btn')[i].children['bookmark'].style.color = "#1da1f2";
  } else{
    tweet['bookmarked'] = false;
    document.querySelectorAll('.bookmark-btn')[i].children['bookmark'].style.color = "black";
  }
  return tweet
}
