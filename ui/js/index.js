const url = 'http://localhost:3000';

$.get(`${url}/api/discussions/`, function (data) {
  const discussions = data.message.result;
  discussions.forEach(element => {
    const html = `<article>
      <div>
        <a href="discussion.html?discussionId=${element._id}">${element.subject}</a>
      </div>
    </article>`
    $('#discussions-content').append(html)
  })
})