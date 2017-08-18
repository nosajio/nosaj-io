# 🌍 nosaj.io
#### v 4.1.2

This is my personal site. Here's all you need to know about it in two bullet points:

- It is super simple — all server side rendering from pug templates. No bells and whistles makes it easier to focus on the important stuff...
- The site is made to be fast fast fast. It contains a bunch of fun optimisations and progressive web app features to get as close to zero wait as possible without being too obsessive.

# Blog blocks
Blog posts can accommodate various elements within the markdown. These elements are identifiable by class names:
- `.image` An embedded image.
  - `.image.fill` Make the image take up 100% of the width.
  - `.image.narrow` Letterbox image.
- `.embed` Embedded element (usually a tweet or something).
- `.video` A video from YouTube / Vimeo etc.
- `.package` A download, or multiple downloads
  - `.package.repo` The link is pointed at a git repo
  - `.package.link` The link is just a link
- `.emphasis` A block of emphasised content. 
- `.box` Put a grey box behind the content. Good for emphasis and abstract/meta content.
