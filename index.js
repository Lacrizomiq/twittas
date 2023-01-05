
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

console.log(tweetsData)



/* event listener when an element is click on the document */
document.addEventListener('click', function(e) {
   if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
   } else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
   } else if(e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
   } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
   }
})

/* function that handle like click */
function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) { // https://scrimba.com/learn/frontend/like-a-tweet-part-5-find-the-tweet-object-co3ba42cfba3094334726d606
        return tweet.uuid === tweetId // iterates over tweetsData and use the uuid saved in tweetId to identify the liked tweet's object. Save that object into a const. 
    })[0] // filter method make it and array of 1 index, so we access the first element of the array 
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked // if false, flip to true, if false, flip to true (logical NOT operator)
    render()
}

/* function that handle the retweet click */
function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0] 
    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

/* function that show / unshow the replies of a tweet */
function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

/* function that makes whats happend on the tweet button */
function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value) {
    tweetsData.unshift({
        handle: `@ApuTheFrog`,
        profilePic: `images/apu-png.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
    tweetInput.value = ''
    }
}

/* function that get the html feed from tweetsData */
function getFeedHml() {
    let feedHtml = ''
    tweetsData.forEach(function(tweet) {
        let likeIconClass = ''
        if(tweet.isLiked) {
            likeIconClass = 'liked'
        }
        let retweetIconClass = ''
        if(tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''
        if(tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
            repliesHtml += `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                </div>
            </div>
            `
        })
        }
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>   
        </div>
        `
    })
    return feedHtml
}

/* function that render tweets on the screen */
function render() {
    document.getElementById('feed').innerHTML = getFeedHml() // Take control of the feed div and render the html code from getFeedHtml() inside
}

render()
