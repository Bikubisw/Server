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
                        new PostComments(data.data.post._id);
                        new ToggleLike($(' .toggle-like-button', newPost));

                        new Noty({
                            theme: 'relax',
                            text: "Post published!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500

                        }).show();

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
    </small><br>
                    <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
        0 Likes
        </a>
    </small>
                <div class="post-comments">
                        <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">

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
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    let convertPostsToAjax = function() {
        $('#post-list-container>ul>li').each(function() {
            let self = $(this);
            // console.log(self);
            let deleteButton = $(' .delete-post-button', self);
            // console.log(deleteButton);
            deletepost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();

}