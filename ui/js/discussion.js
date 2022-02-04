$(document).ready(function () {
  const url = 'http://localhost:3000'
  let discussionId = ''
  let searchParams = new URLSearchParams(window.location.search)

  if (searchParams.has('discussionId'))
    discussionId = searchParams.get('discussionId')
  
  getDiscussion(url, discussionId)
  
  $('#discussion-comment').click(function (e) {
    e.preventDefault()
    const comment = $('#comment-content').val()
    const commentToSend = {
      "discussion": discussionId,
      "text": comment
    }
    $.post(`${url}/api/comments/`, commentToSend, function (data) {
      const error = data.error
      if (!error) {
        const comment = data.message.result
        addComment(comment)
      } else {
        console.log(error)
      }
    })
  })
})

function getDiscussion(url, discussionId) {
  if (discussionId !== null) {
    $.get(`${url}/api/discussions/${discussionId}`, function (data) {
      const discussion = data.message.result
      const comments = discussion.comments
      
      $('#discussion > h1').html(discussion.subject)
      comments.forEach(element => {
        addComment(element)
      });
      
    })
  } else {
    $('#discussion > h1').html('The discussion does not exists')
  }
}

function addComment(comment) {
  const html = `<div>
          <p class="user">${comment.user}</>
          <p class="comment">${comment.text}</>
          <p>
            <a id="upvote" href="#">${comment.upvote}</>
          </p>
        </div>`
  $('#discussion #comments').append(html)
}
