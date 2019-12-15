# medium-2-md

A CLI tool which converts medium posts (html) into Jekyll/Hugo compatible markdown files. Also downloads images and adds yaml front matter to the converted markdown files.
It works with both exported Medium posts (local files) and post urls; converts all exported posts (or a url) to markdown using a single command. It could be useful in scenarios when you want to migrate your blog away from Medium to Jekyll or Hugo (or something similar, which supports markdown content).

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

That's it. The output markdown files will be stored in a sub-directory called `md_<a big number>` in the input posts directory itself. (By the way, that big number is coming from the Date.now() JavaScript function added to differentiate the output folders in case we go crazy with it.)

The converted markdown files include front matter containing title, description, published date and canonical URL of the original Medium post/story. The images from the Medium posts are downloaded in a sub-directory called `img` inside the output directory.

### Convert from post URL

The CLI tool can also be used to convert a single Medium post from it's url. It requires an additional parameter `-o` for output directory where the converted markdown file can be written. To convert a Medium post to markdown from it's url, run the following command after installing the npm package,

```code
medium-2-md convertUrl '<url of the Medium post>' -o '<path of output directory>' -fi
```

> The `convertUrl` function also supports parsing of tags. In the converted markdown file, the `keywords` field in the front matter contains the medium tags of the post.

### Optional flags

The `convertLocal` command supports the following optional flags,

1. `-d` or `--drafts`: Convert the drafts too.
1. `-f` or `--frontMatter`: Add the front matter on top of the markdown file.
1. `-i` or `--images`: Download images to a local `img` sub-directory.

The `-f` and `-i` flags are supported by the `convertUrl` command also.

#### Example: Convert from local - drafts enabled

```code
medium-2-md convertLocal E:\\path\\to\\posts\\dir -d
```

#### Example: Convert from local - images enabled

```code
medium-2-md convertLocal E:\\path\\to\\posts\\dir -i
```

#### Example: Convert from url - front matter enabled

```code
medium-2-md convertUrl https://medium.com/abcd/new-post-993fbe47 -o E:\\path\\to\\output\\dir -f
```

Note: The flags do not support any defaults. You need to add them in order to get the respective results (drafts, images and/or front matter inclusion).

### Image Download

When using the `-i` or `--images` flag, the images are downloaded into a sub-directory called `img` inside the output directory. If this `img` directory does not already exist, it is created. If it already exists, the downloaded images are saved inside the existing directory. The image elements in the converted markdown files link to their respective local paths from the `img` sub-directory.

## Dependencies

This package uses:

1. [turndown](https://github.com/domchristie/turndown) - html to markdown conversion.
1. [cheerio](https://github.com/cheeriojs/cheerio) - to select and extract relevant html attributes from Medium posts' html files.
1. [commander](https://github.com/tj/commander.js) - to enable command line interface.
1. [js-yaml](https://github.com/nodeca/js-yaml) - to add yaml front matter to markdown files.
1. [node-fetch](https://github.com/bitinn/node-fetch) - to get Medium post body from its url.
