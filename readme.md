# medium-2-md

A CLI tool which converts medium posts (html) into Jekyll/Hugo compatible markdown files. Also downloads images and adds yaml front matter to the converted markdown files.
It works with exported Medium posts (local html files) and converts all exported posts to markdown using a single command. It could be useful in scenarios when you want to migrate your blog away from Medium to Jekyll or Hugo (or something similar, which supports markdown content).

## Steps to use

### Convert local Medium exports

1. Export and extract your Medium posts from your Medium account.
    1. Go to `https://medium.com/me/settings` and scroll to `Download your information`. Click the download button. This will give you a `medium-export.zip` archive containing all your Medium content.
    1. Extract the .zip archive downloaded in the previous step. It will have a sub-directory called `posts`.
    1. Copy the path of this `posts` directory.
1. Install `node.js` and `medium-2-md` on your system.
    1. Download and Install node.js - [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
    1. Install medium-2-md - `npm i -g medium-2-md`.
1. Run the following command to convert all your Medium posts (html) to markdown files,

```code
medium-2-md convertLocal '<path of the posts directory>' -dfi
```

That's it. The output markdown files will be stored in a sub-directory called `md_<a big number>` in the input posts directory itself. (By the way, that big number is coming from the Date.now() JavaScript function, added to differentiate multiple output folders.)

The converted markdown files include front matter containing title, description, published date and canonical URL of the original Medium post/story. The images from the Medium posts are downloaded in a sub-directory called `img` inside the output directory.

### Optional flags

The `convertLocal` command supports the following optional flags,

1. `-d` or `--drafts`: Convert the drafts too.
1. `-f` or `--frontMatter`: Add the front matter on top of the markdown file.
1. `-i` or `--images`: Download images to a local `img` sub-directory.

#### Example: Convert from local - drafts enabled

```code
medium-2-md convertLocal E:\\path\\to\\posts\\dir -d
```

#### Example: Convert from local - images enabled

```code
medium-2-md convertLocal E:\\path\\to\\posts\\dir -i
```

Note: The flags do not support any defaults. You need to add them in order to get the respective results (drafts, images and/or front matter inclusion).

### Image Download

When using the `-i` or `--images` flag, the images are downloaded into a sub-directory called `img` inside the output directory. If this `img` directory does not already exist, it is created. If it already exists, the downloaded images are saved inside the existing directory. The image elements in the converted markdown files link to their respective local paths from the `img` sub-directory.

## Dependencies

This package uses:

1. [turndown](https://github.com/domchristie/turndown) - to convert html into markdown.
1. [cheerio](https://github.com/cheeriojs/cheerio) - to select and extract relevant html attributes from Medium posts' html files.
1. [commander](https://github.com/tj/commander.js) - to enable command line interface.
1. [js-yaml](https://github.com/nodeca/js-yaml) - to add yaml front matter to markdown files.
1. [node-fetch](https://github.com/bitinn/node-fetch) - to download images.
