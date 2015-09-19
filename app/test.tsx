/// <reference path="../typing/react.d.ts" />

/*
CommentBox
  +-- CommentList
  |     +-- MyComment 1
  |     +-- MyComment 2
  +-- CommentForm
*/

// MyComment

interface MyCommentProperies {
    author: string;
    children: React.ReactNode;
}

class MyComment extends React.Component<MyCommentProperies, any> {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}

// CommentList

interface CommentListProperties {
    data: { author: string; text: string }[];
}

class CommentList extends React.Component<CommentListProperties, any> {
    render() {
        let commentNodes = this.props.data.map(function(comment, index) {
            return (
                <MyComment author={comment.author} key={'comment_' + index}>
                    {comment.text}
                </MyComment>
            );
        });
        return (
            <div className="commentList">{commentNodes}</div>
        );
    }
}

// CommentForm

interface CommentFormProperties {
    onCommentSubmit(comment: { author: string, text: string }): void;
}

class CommentForm extends React.Component<CommentFormProperties, any> {
    refs: {
        author: any,
        text: any;
        [key: string]: React.Component<any, any>;
    }
    render() {
        function handleSubmit(e: Event) {
            e.preventDefault();
            var author = React.findDOMNode<HTMLInputElement>(this.refs.author).value.trim();
            var text = React.findDOMNode<HTMLInputElement>(this.refs.text).value.trim();
            this.props.onCommentSubmit({ author: author, text: text });
        }
        return (
            <form className="commentForm" onSubmit={handleSubmit.bind(this)} >
                <p><input type="text" placeholder="Your name..." ref="author" /></p>
                <p><input type="text" placeholder="Your comment..." ref="text" /></p>
                <input type="submit" value="Post" />
            </form>
        );
    }
}

// CommentBox

let dbComments = [
    { author: "Pete Hunt", text: "This is one comment" },
    { author: "Jordan Walke", text: "This is another comment" },
    { author: "Mike McCain", text: "This is another another comment" }
];

interface CommentBoxState {
    data: { author: string; text: string }[];
}

class CommentBox extends React.Component<any, CommentBoxState> {
    state = { data: [] };
    componentDidMount() {
        this.setState({ data: dbComments });
    }
    render() {
        function handleCommentSubmit(comment) {
            dbComments.push(comment);
            this.setState({ data: dbComments });
        }
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
};

React.render(
    <CommentBox/>,
    document.getElementById('content')
);
