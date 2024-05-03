module Jekyll
  class TagPagesGenerator < Generator
    safe true

    def generate(site)
      # Leer archivo YAML
      works_data = YAML.load_file("_data/works.yml")

      # Crear una lista de todos los tags sin duplicados
      all_tags = works_data.flat_map { |work| work['tags'] }.uniq

      # Iterar sobre cada tag
      all_tags.each do |tag|
        # Crear una lista de elementos que contienen el tag actual
        tagged_elements = works_data.select { |work| work['tags'] && work['tags'].include?(tag) }

        # Generar la página para el tag actual
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
        'layout' => 'tags', # Layout específico para las páginas de tag
        'title' => "Posts tagged as #{tag}",
        'tag' => tag,
        'tagged_elements' => tagged_elements
      }
    end
  end
end
