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
var CommentBoxState = (function () {
    function CommentBoxState() {
    }
    return CommentBoxState;
})();
function randomString() {
    return Math.random().toString(36).substring(7);
}
var spec = {
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        var tmp = [
            { author: " Pete Hunt", text: "This is one comment" },
            { author: "Jordan Walke", text: "This is *another* comment" },
            { author: "Mike McCain", text: "This is also *another* comment" }
        ];
        var self = this;
        self.setState({ data: tmp });
    },
    render: function () {
        return (React.createElement("div", {"className": "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList, {"data": this.state.data})));
    }
};
var CommentBox = React.createClass(spec);
React.render(React.createElement(CommentBox, null), document.getElementById('content'));
