/// <reference path="../typing/react.d.ts" />

class MyCommentProperies {
    public author: string;
    public children: React.ReactNode;
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

class CommentListProperties {
    public data: { author: string; text: string }[];
}

class CommentList extends React.Component<CommentListProperties, any> {
    render() {
        let commentNodes = this.props.data.map(function(comment) {
            return (
                <MyComment author={comment.author}>
                    {comment.text}
                </MyComment>
            );
        });
        return (
            <div className="commentList">{commentNodes}</div>
        );
    }
}

interface CommentFormProperties {
    onCommentSubmit(comment: { author: string, content: string }): void;
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
            console.log(author, text);
        }
        return (
            <form className="commentForm" onSubmit={handleSubmit.bind(this) } >
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
                </form>
        );
    }
}

class CommentBoxState {
    public data: { author: string; text: string }[];
}

let comments = [
    { author: "Pete Hunt", text: "This is one comment" },
    { author: "Jordan Walke", text: "This is *another* comment" },
    { author: "Mike McCain", text: "This is also *another* comment" }
];

class CommentBox extends React.Component<any, CommentBoxState> {
    getInitialState() {
        return { data: [] };
    }
    componentDidMount() {
        this.setState({ data: comments });
    }
    render() {
        function handleCommentSubmit(comment) {
            comments.push(comment);
            this.setState({ data: comments });
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
