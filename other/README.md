# Regex

1. Replace html links to markdown links:

   - input: `<a\shref="([^"]*)">([^<]*)<\/a>`
   - output: `[$2]($1)`
