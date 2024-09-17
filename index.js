import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];
let postIdCounter = 1;

// Post constructor
function Post(title, content) {
    this.id = postIdCounter++;
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

// Add a post to the posts array
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}
function updatePost(id, title, content) {
    let post = posts.find(post => post.id === id);
    
    if (post) {
        post.title = newTitle;
        post.content = newContent;
        post.rawDate = new Date(); 
        post.date = post.rawDate.toLocaleString();
        return true; 
    } else {
        return false;
    }
}
function deletePost(index) {
    posts.splice(index, 1);
}
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use static middleware and body-parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display posts
app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

// Route to render a form for creating a new post
app.get("/create", (req, res) => {
    res.render("create", {posts: posts});
});

// Route to handle post creation (form submission)
app.post("/create", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        addPost(title, content);
    }
    res.redirect("/");
});

app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["id"];
    editPost(index, title, content);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("update", {postId: index, title: post.title, content: post.content});
});

app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

app.get("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Start the server and add initial posts
app.listen(port, () => {
    addPost(
        "The Time I Tried to Do Yoga and My Cat Thought It Was Playtime",
        "A story about a person attempting to find inner peace with a yoga routine, only to have their cat turn it into an Olympic event of chaos. Expect tales of tangled limbs, hair attacks, and a downward dog interrupted by feline acrobatics.\n"
    );
    addPost(
        "I Tried to Impress My Date with Homemade Pasta... And Set Off the Fire Alarm",
        " What could go wrong when trying to make homemade pasta for the first time? Everything. The article details how an innocent attempt at being romantic turned into a kitchen nightmare of boiling-over pasta water, undercooked noodles, and a smoke-filled kitchen."
    );
    console.log(`Breaking News: Our app is all ears at Port ${port}, ready to boogie to the sweet sounds of data! 🎵🕺😄`);
});
