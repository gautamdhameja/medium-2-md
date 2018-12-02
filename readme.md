# medium-2-md

Converts medium posts (html) into Jekyll/Hugo compatible markdown files. Also extracts and adds yaml front matter to the converted markdown files.
This package works only with already exported Medium posts and not with post urls. It converts all exported posts to markdown using a single command. It is mainly useful in scenarios when you want to migrate your blog away from Medium to Jekyll or Hugo (or something similar which supports markdown content).

## Steps to use

1. Export and extract your Medium posts from your Medium account.
    1. Go to `https://medium.com/me/settings` and scroll to `Download your information`. Click the download button. This will give you a `medium-export.zip` archive containing all your Medium content.
    1. Extract the .zip archive downloaded in the previous step. It will have a sub-directory called `posts`.
    1. Copy the path of this `posts` directory.
1. Install `node.js` and `medium-2-md` on your system.
    1. Download and Install node.js - [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
    1. Install medium-2-md - `npm i -g medium-2-md`.
1. Run the following command to convert all your Medium posts (html) to markdown files,

```code
medium-2-md convert '<path of the posts directory>' -df
```

### Optional flags

The `convert` command supports the following optional flags,

1. `-d` or `--drafts` which means if you want to convert the drafts too.
1. `-f` or `--frontMatter` which means if you want to add the front matter on top of the markdown file.

#### Example: Drafts enabled

```code
medium-2-md convert '<path of the posts directory>' -d
```

#### Example: Front matter enabled

```code
medium-2-md convert '<path of the posts directory>' -f
```

#### Example: Both drafts and front matter enabled

```code
medium-2-md convert '<path of the posts directory>' -df
```

Note: The flags do not support any defaults. You need to add them in order to get the respective results (drafts and/or front matter inclusion).

## Dependencies

This package uses:

1. [turndown](https://github.com/domchristie/turndown) for html to markdown conversion.
1. [cheerio](https://github.com/cheeriojs/cheerio) for selecting and extracting relevant html attributes from Medium posts' html files.
1. [commander](https://github.com/tj/commander.js) for enabling the command line interface.
1. [js-yaml](https://github.com/nodeca/js-yaml) for writing the yaml front matter to the markdown files.

## Inspiration

Most of the inspiration for this package is coming from another package, [medium-to-markdown](https://github.com/SkillFlowHQ/medium-to-markdown), which supports similar functions but it only works on a single post url and does not convert local files or collection of files (exported content).