{
    let createComment = function() {
        let newcommentform = $('#new-comment-form');
        newcommentform.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newcommentform.serialize(),
                success: function(data) {
                    let newComment = newCommentDom(data.data.comment);
                    $('#Post-comment-list>ul').prepend(newComment);
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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
    let newCommentDom = function(comment) {
        return $(`<li>
    <p>
            <small>
            <a href="/comments/destroy/${comment._id}">delete</a>
        </small>
            
                ${comment.content}
                    <br>
                    <small>
            ${comment.user.name}
        </small>
    </p>
</li>`);
    }
    createComment();

}