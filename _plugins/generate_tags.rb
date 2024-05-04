module Jekyll
  class TagPagesGenerator < Generator
    safe true

    def generate(site)
      works_data = YAML.load_file("./_data/works.yml")

      all_tags = works_data.flat_map { |work| work['tags'] }.uniq

      all_tags.each do |tag|
        tagged_elements = works_data.select { |work| work['tags'] && work['tags'].include?(tag) }

        site.pages << TagPage.new(site, tag, tagged_elements)
      end
    end
  end

  class TagPage < Page
    def initialize(site, tag, tagged_elements)
      @site = site
      @base = site.source
      @dir = File.join('tags', tag.downcase.gsub(' ', '_'))
      @name = 'index.html'

      self.process(@name)
      self.data = {
        'layout' => 'tags',
        'title' => "Posts tagged as #{tag}",
        'tag' => tag,
        'tagged_elements' => tagged_elements
      }
    end
  end
end