/// <reference path="../typing/react.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyCommentProperies = (function () {
    function MyCommentProperies() {
    }
    return MyCommentProperies;
})();
var MyComment = (function (_super) {
    __extends(MyComment, _super);
    function MyComment() {
        _super.apply(this, arguments);
    }
    MyComment.prototype.render = function () {
        return (React.createElement("div", {"className": "comment"}, React.createElement("h2", {"className": "commentAuthor"}, this.props.author), this.props.children));
    };
    return MyComment;
})(React.Component);
var CommentListProperties = (function () {
    function CommentListProperties() {
    }
    return CommentListProperties;
})();
var CommentList = (function (_super) {
    __extends(CommentList, _super);
    function CommentList() {
        _super.apply(this, arguments);
    }
    CommentList.prototype.render = function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (React.createElement(MyComment, {"author": comment.author}, comment.text));
        });
        return (React.createElement("div", {"className": "commentList"}, commentNodes));
    };
    return CommentList;
})(React.Component);
var CommentForm = (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm() {
        _super.apply(this, arguments);
    }
    CommentForm.prototype.render = function () {
        function handleSubmit(e) {
            e.preventDefault();
            var author = React.findDOMNode(this.refs.author).value.trim();
            var text = React.findDOMNode(this.refs.text).value.trim();
            console.log(author, text);
        }
        return (React.createElement("form", {"className": "commentForm", "onSubmit": handleSubmit.bind(this)}, React.createElement("input", {"type": "text", "placeholder": "Your name", "ref": "author"}), React.createElement("input", {"type": "text", "placeholder": "Say something...", "ref": "text"}), React.createElement("input", {"type": "submit", "value": "Post"})));
    };
    return CommentForm;
})(React.Component);
var CommentBoxState = (function () {
    function CommentBoxState() {
    }
    return CommentBoxState;
})();
var comments = [
    { author: "Pete Hunt", text: "This is one comment" },
    { author: "Jordan Walke", text: "This is *another* comment" },
    { author: "Mike McCain", text: "This is also *another* comment" }
];
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox() {
        _super.apply(this, arguments);
    }
    CommentBox.prototype.getInitialState = function () {
        return { data: [] };
    };
    CommentBox.prototype.componentDidMount = function () {
        this.setState({ data: comments });
    };
    CommentBox.prototype.render = function () {
        function handleCommentSubmit(comment) {
            comments.push(comment);
            this.setState({ data: comments });
        }
        return (React.createElement("div", {"className": "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList, {"data": this.state.data}), React.createElement(CommentForm, {"onCommentSubmit": handleCommentSubmit.bind(this)})));
    };
    return CommentBox;
})(React.Component);
;
React.render(React.createElement(CommentBox, null), document.getElementById('content'));
