module Jekyll
  class TagPagesGenerator < Generator
    safe true

    def generate(site)
      tag_mapping = {}

      tags_posts = {}

      site.posts.docs.each do |post|
        next unless post.published?
        post.data['tags'].each do |tag|
          normalized_tag = tag.downcase.gsub(' ', '_')

          tag_mapping[tag] = normalized_tag

          tags_posts[normalized_tag] ||= []
          tags_posts[normalized_tag] << post
        end
      end

      site.data['tag_mapping'] = tag_mapping

      tags_posts.each do |normalized_tag, posts|
        if normalized_tag
          site.pages << TagPage.new(site, tag_mapping.key(normalized_tag), normalized_tag, posts)
        end
      end
    end
  end

  class TagPage < Page
    def initialize(site, tag, normalized_tag, posts)
      @site = site
      @base = site.source
      @dir = File.join('tags', normalized_tag)
      @name = 'index.html'

      self.process(@name)
      self.data = {
        'layout' => 'tags',
        'title' => "Posts tagged as #{tag}",
        'original_tag' => tag,
        'normalized_tag' => normalized_tag,
        'posts' => posts
      }
    end
  end
end