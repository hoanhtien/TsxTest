/// <reference path="../typing/react.d.ts" />

class MyCommentProperies implements React.Props<any> {
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

class CommentListProperties implements React.Props<any> {
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

/*class CommentForm extends React.Component<any, any> {
    handleSubmit(e: Event) {
        e.preventDefault();
        var author = React.findDOMNode(this.refs['author']).nodeValue.trim();
        var text = React.findDOMNode(this.refs['text']).nodeValue.trim();
        console.log('author: ' + author);
        console.log('text: ' + text);
    }
    render() {
        <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Your name" ref="author" />
            <input type="text" placeholder="Say something..." ref="text" />
            <input type="submit" value="Post" />
        </form>
    }
}*/

class CommentBoxState {
    public data: { author: string; text: string }[];
}

function randomString() {
    return Math.random().toString(36).substring(7);
}

let spec: React.ComponentSpec<any, CommentBoxState> = {
    getInitialState() {
        return { data: [] };
    },
    componentDidMount() {
        let tmp = [
            { author: " Pete Hunt", text: "This is one comment" },
            { author: "Jordan Walke", text: "This is *another* comment" }
            { author: "Mike McCain", text: "This is also *another* comment" }
        ];
        let self = this;
        self.setState({ data: tmp });
    },
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
            </div>
        );
    }
};

let CommentBox = React.createClass(spec);

React.render(
    <CommentBox/>,
    document.getElementById('content')
);
