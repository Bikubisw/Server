// method to submit the form data for new post using AJAX
{
    let createPost = function() {
            let newPostform = $('#new-post-form');
            newPostform.submit(function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'post',
                    url: '/posts/create',
                    data: newPostform.serialize(),
                    success: function(data) {
                        let newPost = newpostDom(data.data.post);
                        $("#post-list-container>ul").prepend(newPost);
                        deletepost($(' .delete-post-button', newPost));

                    },
                    error: function(error) {
                        console.log(error.responseText);
                    }
                });
            });
        }
        // Create A post in DOM
    let newpostDom = function(post) {
            return $(`<li id="post-${post._id}">
        <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
    </small>
            ${post.content}
                <br>
                <small>
        ${post.user.name}
    </small>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">

                            <input type="text" name="content" placeholder="Type here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <button type="submit">Add Comment</button>

                        </form>

                            <div class="Post-comment-list">
                                <ul id="post-comments-${post._id}">
                                </ul>
                            </div>
                </div>
</li>`)
        }
        //method to delete a post from DOM
    let deletepost = function(deletelink) {
        $(deletelink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}